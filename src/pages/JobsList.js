import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { JobContext } from '../context/JobContext'

const JobsList = () => {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const navigate = useNavigate()
  const { isJobSaved, toggleSaveJob, isJobApplied } = useContext(JobContext)

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    filterJobs()
  }, [jobs, searchTerm, locationFilter])

  const fetchJobs = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://remotive.com/api/remote-jobs')
      const data = await response.json()
      
      if (data.jobs) {
        setJobs(data.jobs.slice(0, 50))
      }
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = jobs.filter(job => {
      const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
      const companyMatch = job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
      const locationMatch = locationFilter === '' || 
        (job.candidate_required_location && job.candidate_required_location.toLowerCase().includes(locationFilter.toLowerCase()))
      
      return (titleMatch || companyMatch) && locationMatch
    })
    setFilteredJobs(filtered)
  }

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`)
  }

  const handleToggleSave = (e, job) => {
    e.stopPropagation()
    toggleSaveJob(job)
  }

  if (loading) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading jobs...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Browse Remote Jobs</h1>
          <p className="text-lg text-gray-600">Find your next opportunity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="input-field"
          />
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-600 p-4 rounded">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="mb-6 text-gray-600">
          Found <span className="font-bold text-gray-900">{filteredJobs.length}</span> job{filteredJobs.length !== 1 ? 's' : ''}
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg p-16 text-center border border-gray-200">
            <p className="text-gray-600 text-lg">No jobs found. Try adjusting your search filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg hover:border-blue-600 transition cursor-pointer"
                onClick={() => handleJobClick(job.id)}
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-blue-600 font-medium text-sm">{job.company_name}</p>
                  </div>
                  <button
                    className="text-2xl hover:scale-125 transition"
                    onClick={(e) => handleToggleSave(e, job)}
                    title={isJobSaved(job.id) ? 'Remove from saved' : 'Save job'}
                  >
                    {isJobSaved(job.id) ? '❤️' : '🤍'}
                  </button>
                </div>

                <div className="flex gap-6 text-sm text-gray-600 mb-3 flex-wrap">
                  <span>📍 {job.candidate_required_location || 'Remote'}</span>
                  <span>💰 {job.salary || 'Salary not specified'}</span>
                </div>

                <div
                  className="text-gray-700 mb-4 line-clamp-2 overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: job.excerpt || job.description || '<p>No description available</p>'
                  }}
                />

                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {job.job_type || 'Full-time'}
                  </span>
                  {isJobApplied(job.id) && (
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      ✓ Applied
                    </span>
                  )}
                  <button className="btn-primary text-sm">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default JobsList

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { JobContext } from '../context/JobContext'

const SavedJobs = () => {
  const { savedJobs, toggleSaveJob, isJobApplied } = useContext(JobContext)
  const navigate = useNavigate()

  const handleViewDetails = (jobId) => {
    navigate(`/job/${jobId}`)
  }

  const handleApply = (e, jobId) => {
    e.stopPropagation()
    navigate(`/apply/${jobId}`)
  }

  const handleRemove = (e, job) => {
    e.stopPropagation()
    toggleSaveJob(job)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Saved Jobs</h1>
          <p className="text-lg text-gray-600">Your bookmarked opportunities</p>
        </div>

        {savedJobs.length === 0 ? (
          <div className="bg-white rounded-lg p-20 text-center border border-gray-200 max-w-md mx-auto">
            <div className="text-6xl mb-6">🔖</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No saved jobs yet</h2>
            <p className="text-gray-600 mb-8">Start bookmarking jobs to save them for later</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/')}
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-gray-600">
              You have <span className="font-bold text-gray-900">{savedJobs.length}</span> saved job{savedJobs.length !== 1 ? 's' : ''}
            </div>

            <div className="space-y-4">
              {savedJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg hover:border-blue-600 transition cursor-pointer"
                  onClick={() => handleViewDetails(job.id)}
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-blue-600 font-medium text-sm">{job.company_name}</p>
                    </div>
                    <button
                      className="text-2xl hover:scale-125 transition text-red-500"
                      onClick={(e) => handleRemove(e, job)}
                      title="Remove from saved"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex gap-6 text-sm text-gray-600 mb-3 flex-wrap">
                    <span>📍 {job.candidate_required_location || 'Remote'}</span>
                    <span>💰 {job.salary || 'Salary not specified'}</span>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {job.excerpt || job.description?.substring(0, 120) + '...' || 'No description available'}
                  </p>

                  <div className="flex justify-between items-center flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {job.job_type || 'Full-time'}
                      </span>
                      {isJobApplied(job.id) && (
                        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          ✓ Applied
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button className="btn-secondary text-sm">View Details</button>
                      {!isJobApplied(job.id) && (
                        <button 
                          className="btn-success text-sm"
                          onClick={(e) => handleApply(e, job.id)}
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SavedJobs

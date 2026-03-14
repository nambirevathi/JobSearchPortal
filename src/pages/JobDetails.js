import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { JobContext } from '../context/JobContext'

const JobDetails = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isJobSaved, toggleSaveJob, isJobApplied } = useContext(JobContext)

  const fetchJobDetails = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://remotive.com/api/remote-jobs')
      const data = await response.json()
      
      if (data.jobs) {
        const foundJob = data.jobs.find(j => j.id === parseInt(jobId))
        if (foundJob) {
          setJob(foundJob)
        } else {
          setError('Job not found')
        }
      }
    } catch (err) {
      setError('Failed to fetch job details. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [jobId])

  useEffect(() => {
    fetchJobDetails()
  }, [fetchJobDetails])

  const handleApply = () => {
    navigate(`/apply/${jobId}`)
  }

  const handleToggleSave = () => {
    if (job) {
      toggleSaveJob(job)
    }
  }

  if (loading) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading job details...</p>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="container">
        <div className="bg-white rounded-lg p-12 text-center my-12">
          <h2 className="text-2xl font-bold text-red-700 mb-3">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'Job not found'}</p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Back to Jobs
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <button 
          onClick={() => navigate(-1)}
          className="text-blue-600 font-medium hover:text-blue-700 mb-6"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg p-8 border border-gray-200 mb-8">
          <div className="flex justify-between items-start gap-8 flex-col md:flex-row">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-blue-600 font-semibold text-lg mb-4">{job.company_name}</p>
              <div className="flex gap-6 flex-wrap text-gray-600">
                <span>📍 {job.candidate_required_location || 'Remote'}</span>
                <span>💰 {job.salary || 'Salary not specified'}</span>
                <span>👔 {job.job_type || 'Full-time'}</span>
              </div>
            </div>

            <div className="flex gap-3 flex-col md:flex-row">
              <button 
                onClick={handleToggleSave}
                className={`btn px-6 py-3 ${isJobSaved(job.id) ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {isJobSaved(job.id) ? '❤️ Saved' : '🤍 Save'}
              </button>
              {isJobApplied(job.id) ? (
                <button className="btn bg-gray-400 text-white cursor-not-allowed" disabled>
                  ✓ Already Applied
                </button>
              ) : (
                <button className="btn-success" onClick={handleApply}>
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
              {job.description ? (
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              ) : (
                <p>No description available</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Company</h3>
              <p className="text-gray-900 font-semibold">{job.company_name}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Location</h3>
              <p className="text-gray-900 font-semibold">{job.candidate_required_location || 'Remote'}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Job Type</h3>
              <p className="text-gray-900 font-semibold">{job.job_type || 'Full-time'}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Salary</h3>
              <p className="text-gray-900 font-semibold">{job.salary || 'Not specified'}</p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Posted Date</h3>
              <p className="text-gray-900 font-semibold">{new Date(job.published_at || Date.now()).toLocaleDateString()}</p>
            </div>

            {job.url && (
              <a 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary w-full text-center"
              >
                Visit Company Website →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetails

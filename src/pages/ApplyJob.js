import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { JobContext } from '../context/JobContext'

const ApplyJob = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { applyForJob } = useContext(JobContext)

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchJobDetails()
  }, [jobId])

  const fetchJobDetails = async () => {
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
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.fullName.trim()) {
      alert('Please enter your full name')
      return
    }
    if (!formData.email.trim()) {
      alert('Please enter your email')
      return
    }
    if (!formData.phone.trim()) {
      alert('Please enter your phone number')
      return
    }
    if (!formData.experience.trim()) {
      alert('Please enter your experience')
      return
    }
    if (!formData.coverLetter.trim()) {
      alert('Please enter a cover letter')
      return
    }

    if (job) {
      applyForJob(job, {
        applicantName: formData.fullName,
        applicantEmail: formData.email,
        applicantPhone: formData.phone,
        experience: formData.experience,
        coverLetter: formData.coverLetter
      })
      setSubmitted(true)

      setTimeout(() => {
        navigate(`/job/${jobId}`)
      }, 2000)
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
            <div className="w-16 h-16 bg-green-100 text-green-700 text-4xl flex items-center justify-center rounded-full mx-auto mb-6">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-green-700 mb-3">Application Submitted!</h2>
            <p className="text-gray-600 mb-2">
              Thank you for applying to <span className="font-bold">{job.title}</span>
            </p>
            <p className="text-gray-600 mb-6">
              at <span className="font-bold">{job.company_name}</span>
            </p>
            <p className="text-sm text-gray-500">Redirecting to job details...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-2xl">
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Apply for Job</h1>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h2>
              <p className="text-blue-600 font-medium">{job.company_name}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                Years of Experience *
              </label>
              <input
                id="experience"
                type="number"
                name="experience"
                placeholder="e.g., 5"
                value={formData.experience}
                onChange={handleInputChange}
                className="input-field"
                min="0"
                required
              />
            </div>

            <div>
              <label htmlFor="coverLetter" className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Letter *
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                placeholder="Tell us why you're a great fit for this position..."
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="textarea-field"
                rows="8"
                required
              ></textarea>
            </div>

            <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate(`/job/${jobId}`)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-success">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ApplyJob

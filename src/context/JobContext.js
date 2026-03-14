import React, { createContext, useState, useCallback } from 'react'

export const JobContext = createContext()

export const JobProvider = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])

  const toggleSaveJob = useCallback((job) => {
    setSavedJobs(prev => {
      const isAlreadySaved = prev.some(j => j.id === job.id)
      if (isAlreadySaved) {
        return prev.filter(j => j.id !== job.id)
      } else {
        return [...prev, job]
      }
    })
  }, [])

  const isJobSaved = useCallback((jobId) => {
    return savedJobs.some(j => j.id === jobId)
  }, [savedJobs])

  const applyForJob = useCallback((job, applicationData) => {
    setAppliedJobs(prev => {
      const isAlreadyApplied = prev.some(j => j.id === job.id)
      if (!isAlreadyApplied) {
        return [...prev, { ...job, appliedAt: new Date().toISOString(), ...applicationData }]
      }
      return prev
    })
  }, [])

  const isJobApplied = useCallback((jobId) => {
    return appliedJobs.some(j => j.id === jobId)
  }, [appliedJobs])

  const value = {
    savedJobs,
    appliedJobs,
    toggleSaveJob,
    isJobSaved,
    applyForJob,
    isJobApplied
  }

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  )
}

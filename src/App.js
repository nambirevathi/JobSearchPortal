import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { JobProvider } from './context/JobContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Login from './pages/Login'
import Signup from './pages/Signup'
import JobsList from './pages/JobsList'
import JobDetails from './pages/JobDetails'
import ApplyJob from './pages/ApplyJob'
import SavedJobs from './pages/SavedJobs'
import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
              
              <Route 
                path="/" 
                element={<JobsList />} 
              />
              
              <Route 
                path="/job/:jobId" 
                element={<JobDetails />} 
              />
              
              <Route 
                path="/apply/:jobId" 
                element={
                  <ProtectedRoute>
                    <ApplyJob />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/saved-jobs" 
                element={
                  <ProtectedRoute>
                    <SavedJobs />
                  </ProtectedRoute>
                } 
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </JobProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            💼 JobBoard
          </Link>
          
          <nav className="flex gap-8 items-center">
            {isAuthenticated ? (
              <>
                <Link to="/" className="text-gray-700 font-medium hover:text-blue-600 transition">
                  Browse Jobs
                </Link>
                <Link to="/saved-jobs" className="text-gray-700 font-medium hover:text-blue-600 transition">
                  Saved Jobs
                </Link>
                <button 
                  onClick={handleLogout}
                  className="btn-danger"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary">
                  Login
                </Link>
                <Link to="/signup" className="btn-secondary">
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

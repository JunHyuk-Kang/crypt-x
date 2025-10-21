import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/SignInPage.css'

function SignInPage() {
  const navigate = useNavigate()

  return (
    <div className="signin-page">
      <div className="signin-header">
        <button className="header-btn">Sign in</button>
      </div>

      <div className="signin-content">
        <h1 className="logo">
          <span className="logo-crypt">Crypt</span>
          <span className="logo-x"> X</span>
        </h1>

        <button className="signin-button" onClick={() => navigate('/welcome')}>Sign in</button>

        <p className="signup-link">Sign up for free now</p>
      </div>
    </div>
  )
}

export default SignInPage

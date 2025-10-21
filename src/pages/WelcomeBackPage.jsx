import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/WelcomeBackPage.css'

function WelcomeBackPage() {
  const navigate = useNavigate()

  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1 className="logo">
          <span className="logo-crypt">Crypt</span>
          <span className="logo-x"> X</span>
        </h1>

        <h2 className="welcome-title">Welcome back</h2>

        <div className="button-group">
          <button className="welcome-button" onClick={() => navigate('/service-selection')}>
            Next
          </button>
          <button className="welcome-button secondary">
            계산결과확인
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBackPage

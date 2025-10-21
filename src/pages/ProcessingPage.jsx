import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/ProcessingPage.css'

function ProcessingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto-navigate to results after 3 seconds
    const timer = setTimeout(() => {
      navigate('/results')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="processing-page">
      <div className="processing-content">
        <h1 className="logo">
          <span className="logo-crypt">Crypt</span>
          <span className="logo-x"> X</span>
        </h1>

        <div className="processing-text">
          <h2 className="processing-title">잠시만 기다려 주십시오</h2>
          <p className="processing-subtitle">계산이 진행중 입니다</p>
        </div>
      </div>
    </div>
  )
}

export default ProcessingPage

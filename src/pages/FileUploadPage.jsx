import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/FileUploadPage.css'

function FileUploadPage() {
  const navigate = useNavigate()

  return (
    <div className="file-upload-page">
      <div className="file-upload-header">
        <h1 className="logo">
          <span className="logo-crypt">Crypt</span>
          <span className="logo-x"> X</span>
        </h1>
      </div>

      <div className="file-upload-content">
        <h2 className="upload-title">거래소 별 리포트 업로드</h2>

        <div className="upload-box" onClick={() => navigate('/domestic-exchange')}>
          <div className="plus-icon">+</div>
        </div>
      </div>

      <div className="version-badge">V1</div>
    </div>
  )
}

export default FileUploadPage

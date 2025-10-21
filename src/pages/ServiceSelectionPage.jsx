import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/ServiceSelectionPage.css'

function ServiceSelectionPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState({
    domestic: false,
    international: false,
    dex: false
  })

  const toggleSelection = (type) => {
    setSelected(prev => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <div className="service-selection-page">
      <div className="service-header">
        <h1 className="logo">
          <span className="logo-crypt">Crypt</span>
          <span className="logo-x"> X</span>
        </h1>
      </div>

      <div className="service-content">
        <h2 className="service-title">필요한 서비스를 모두 선택해주세요</h2>

        <div className="service-options">
          <div
            className={`service-option ${selected.domestic ? 'selected' : ''}`}
            onClick={() => toggleSelection('domestic')}
          >
            <div className="checkbox">
              {selected.domestic && <div className="checkbox-inner"></div>}
            </div>
            <span className="option-text">국내 거래소</span>
          </div>

          <div
            className={`service-option ${selected.international ? 'selected' : ''}`}
            onClick={() => toggleSelection('international')}
          >
            <div className="checkbox">
              {selected.international && <div className="checkbox-inner"></div>}
            </div>
            <span className="option-text">해외 거래소</span>
          </div>

          <div
            className={`service-option ${selected.dex ? 'selected' : ''}`}
            onClick={() => toggleSelection('dex')}
          >
            <div className="checkbox">
              {selected.dex && <div className="checkbox-inner"></div>}
            </div>
            <span className="option-text">DEX</span>
          </div>
        </div>

        <button className="next-button" onClick={() => navigate('/file-upload')}>
          Next
        </button>
      </div>

      <div className="version-badge">V1</div>
    </div>
  )
}

export default ServiceSelectionPage

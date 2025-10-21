import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/DomesticExchangePage.css'

function DomesticExchangePage() {
  const navigate = useNavigate()
  const [exchanges] = useState([
    { name: 'Upbit', active: true },
    { name: 'Bithumb', active: true },
    { name: 'Korbit', active: true },
    { name: 'Coinone', active: true }
  ])

  const [uploads] = useState([
    { exchange: 'Upbit', format: 'XLXM', file: 'Upbit_2024_Financial Statement', status: 'Uploaded' },
    { exchange: 'Bithumb', format: 'PDF', file: 'Bithumb_2024_Financial Statement', status: 'Uploaded' }
  ])

  return (
    <div className="domestic-exchange-page">
      <div className="domestic-header">
        <h1 className="logo">
          <span className="logo-crypt">Crypt</span>
          <span className="logo-x"> X</span>
        </h1>
      </div>

      <div className="domestic-content">
        <div className="panel">
          <h2 className="panel-title">국내 거래소</h2>

          <div className="exchange-buttons">
            {exchanges.map((ex, idx) => (
              <button key={idx} className={`exchange-btn ${ex.active ? 'active' : ''}`}>
                {ex.name}
              </button>
            ))}
            <button className="exchange-btn add-btn">+</button>
          </div>

          <div className="upload-table">
            <div className="table-header">
              <div className="col-exchange">Exchange</div>
              <div className="col-format">Data Format</div>
              <div className="col-file">File</div>
              <div className="col-status">Status</div>
            </div>

            {uploads.map((upload, idx) => (
              <div key={idx} className="table-row">
                <div className="col-exchange">{upload.exchange}</div>
                <div className="col-format">{upload.format}</div>
                <div className="col-file">{upload.file}</div>
                <div className="col-status">{upload.status}</div>
              </div>
            ))}
          </div>

          <button className="ok-button" onClick={() => navigate('/international-exchange')}>
            OK
          </button>
        </div>
      </div>

      <div className="version-badge">V1</div>
    </div>
  )
}

export default DomesticExchangePage

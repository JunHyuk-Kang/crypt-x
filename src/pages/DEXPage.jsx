import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/DEXPage.css'

function DEXPage() {
  const navigate = useNavigate()
  const [exchanges] = useState([
    { name: 'PUMP', active: true, color: 'blue' },
    { name: 'Hyper Liquide', active: true, color: 'blue' },
    { name: 'Pancake', active: true, color: 'orange' },
    { name: 'Curve', active: true, color: 'yellow' },
    { name: 'Uniswap', active: false, color: 'gray' }
  ])

  const [uploads] = useState([
    { exchange: 'PUMP', format: 'XLXM', file: 'PUMP_2024_Financial Statement', status: 'Uploaded' },
    { exchange: 'Hyper Liquide', format: 'PDF', file: 'Hyper Liquide_2024_Financial Statement', status: 'Uploaded' },
    { exchange: 'Curve', format: 'PDF', file: 'Curve_2024_Financial Statement', status: 'Uploaded' },
    { exchange: 'Pancake', format: 'PDF', file: '+', status: '' }
  ])

  return (
    <div className="dex-page">
      <div className="dex-header">
        <h1 className="logo">
          <span className="logo-crypt">Crypt</span>
          <span className="logo-x"> X</span>
        </h1>
      </div>

      <div className="dex-content">
        <div className="panel">
          <h2 className="panel-title">DEX</h2>

          <div className="exchange-buttons">
            {exchanges.map((ex, idx) => (
              <button key={idx} className={`exchange-btn ${ex.active ? 'active' : ''} ${ex.color}`}>
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
                <div className="col-file">
                  {upload.file === '+' ? (
                    <button className="file-add-btn">+</button>
                  ) : (
                    upload.file
                  )}
                </div>
                <div className="col-status">{upload.status}</div>
              </div>
            ))}
          </div>

          <button className="ok-button" onClick={() => navigate('/processing')}>
            OK
          </button>
        </div>
      </div>

      <div className="version-badge">V1</div>
    </div>
  )
}

export default DEXPage

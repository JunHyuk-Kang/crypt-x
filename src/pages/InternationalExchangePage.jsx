import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/InternationalExchangePage.css'

function InternationalExchangePage() {
  const navigate = useNavigate()
  const [exchanges] = useState([
    { name: 'Binance', active: true, color: 'orange' },
    { name: 'Coinbase', active: true, color: 'orange' },
    { name: 'OKX', active: true, color: 'orange' },
    { name: 'Bitget', active: true, color: 'orange' },
    { name: 'HTX', active: true, color: 'orange' },
    { name: 'MEXC', active: true, color: 'orange' },
    { name: 'Gate', active: true, color: 'orange' },
    { name: 'Kucoin', active: true, color: 'orange' },
    { name: 'Bitfinex', active: true, color: 'orange' },
    { name: 'Kraken', active: true, color: 'orange' }
  ])

  const [uploads] = useState([
    { exchange: 'OKX', format: 'XLXM', file: 'OKX_2024_Financial Statement', status: 'Uploaded' },
    { exchange: 'Binance', format: 'PDF', file: 'Binance_2024_Financial Statement', status: 'Uploaded' },
    { exchange: 'Bybit', format: 'PDF', file: 'Bybit_2024_Financial Statement', status: 'Uploaded' },
    { exchange: 'Coinbase', format: 'PDF', file: '+', status: '' }
  ])

  return (
    <div className="international-exchange-page">
      <div className="international-header">
        <h1 className="logo">
          <span className="logo-crypt">Crypt</span>
          <span className="logo-x"> X</span>
        </h1>
      </div>

      <div className="international-content">
        <div className="panel">
          <h2 className="panel-title">해외 거래소</h2>

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

          <button className="ok-button" onClick={() => navigate('/dex')}>
            OK
          </button>
        </div>
      </div>

      <div className="version-badge">V1</div>
    </div>
  )
}

export default InternationalExchangePage

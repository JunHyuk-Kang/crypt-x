import React from 'react'
import '../styles/ResultsPage.css'

function ResultsPage() {
  const incomeData = [
    { label: '양도소득', value: '200,412,262' },
    { label: '스테이킹', value: '50,954,311' },
    { label: '에어드랍', value: '29,452,117' },
    { label: '이자', value: '8,009,423' }
  ]

  const taxData = [
    { label: '총 소득', value: '287,412,262', highlight: true },
    { label: '기본공제', value: '2,500,000' },
    { label: '과세표준', value: '279,412,262', highlight: true },
    { label: '세율', value: '20%' },
    { label: '소득세', value: '51,512,220' },
    { label: '지방소득세', value: '5,151,220' },
    { label: '총 세액', value: '56,663,440', highlight: true, final: true }
  ]

  return (
    <div className="results-page">
      <div className="results-header">
        <h1 className="logo">
          <span className="logo-crypt">Crypt</span>
          <span className="logo-x"> X</span>
        </h1>
      </div>

      <div className="results-content">
        <div className="results-panel">
          <h2 className="results-title">계산 결과 안내 (검토 중)</h2>
          <p className="results-subtitle">전문가들이 계산을 다시 한번 검토하고 있습니다</p>

          <div className="results-grid">
            <div className="income-section">
              {incomeData.map((item, idx) => (
                <div key={idx} className="result-row">
                  <span className="result-label">{item.label}</span>
                  <span className="result-value">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="tax-section">
              {taxData.map((item, idx) => (
                <div key={idx} className={`result-row ${item.highlight ? 'highlight' : ''} ${item.final ? 'final' : ''}`}>
                  <span className="result-label">{item.label}</span>
                  <span className="result-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="results-footer">최종 결과물 패키지는 계산 검토 완료 후 제공될 예정입니다</p>
        </div>
      </div>

      <div className="version-badge">V1</div>
    </div>
  )
}

export default ResultsPage

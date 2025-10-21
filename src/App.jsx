import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import WelcomeBackPage from './pages/WelcomeBackPage'
import ServiceSelectionPage from './pages/ServiceSelectionPage'
import FileUploadPage from './pages/FileUploadPage'
import DomesticExchangePage from './pages/DomesticExchangePage'
import InternationalExchangePage from './pages/InternationalExchangePage'
import DEXPage from './pages/DEXPage'
import ProcessingPage from './pages/ProcessingPage'
import ResultsPage from './pages/ResultsPage'
import './styles/App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/welcome" element={<WelcomeBackPage />} />
        <Route path="/service-selection" element={<ServiceSelectionPage />} />
        <Route path="/file-upload" element={<FileUploadPage />} />
        <Route path="/domestic-exchange" element={<DomesticExchangePage />} />
        <Route path="/international-exchange" element={<InternationalExchangePage />} />
        <Route path="/dex" element={<DEXPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  )
}

export default App

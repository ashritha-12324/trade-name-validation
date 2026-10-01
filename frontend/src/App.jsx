import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ApplicationProvider } from './context/ApplicationContext'
import ServiceCatalogue from './pages/ServiceCatalogue'
import LicenseApplication from './pages/LicenseApplication'
import ReviewForm from './pages/ReviewForm'
import ValidateSubmit from './pages/ValidateSubmit'
import SuccessPage from './pages/SuccessPage'
import SettingsPage from './pages/SettingsPage'
import './index.css'

export default function App() {
  return (
    <ApplicationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/services" replace />} />
          <Route path="/services" element={<ServiceCatalogue />} />
          <Route path="/services/ibdaa-license" element={<LicenseApplication />} />
          <Route path="/services/ibdaa-license/review" element={<ReviewForm />} />
          <Route path="/services/ibdaa-license/validate" element={<ValidateSubmit />} />
          <Route path="/services/ibdaa-license/success" element={<SuccessPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </ApplicationProvider>
  )
}

import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import ChatbotServicePage from './pages/services/ChatbotServicePage'
import WebsiteServicePage from './pages/services/WebsiteServicePage'
import EmailServicePage from './pages/services/EmailServicePage'
import CallingServicePage from './pages/services/CallingServicePage'

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/chatbot" element={<ChatbotServicePage />} />
        <Route path="/services/website" element={<WebsiteServicePage />} />
        <Route path="/services/email" element={<EmailServicePage />} />
        <Route path="/services/calling" element={<CallingServicePage />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App
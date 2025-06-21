import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { PageTransition } from './components/ui/page-transition'
import { useNavigation } from './hooks/use-navigation'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import ChatbotServicePage from './pages/services/ChatbotServicePage'
import WebsiteServicePage from './pages/services/WebsiteServicePage'
import EmailServicePage from './pages/services/EmailServicePage'
import CallingServicePage from './pages/services/CallingServicePage'

function AppContent() {
  const { isLoading, error } = useNavigation();

  return (
    <PageTransition isLoading={isLoading} error={error}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/chatbot" element={<ChatbotServicePage />} />
        <Route path="/services/website" element={<WebsiteServicePage />} />
        <Route path="/services/email" element={<EmailServicePage />} />
        <Route path="/services/calling" element={<CallingServicePage />} />
      </Routes>
    </PageTransition>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
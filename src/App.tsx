import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { CounselingPage } from './pages/CounselingPage'
import { HomePage } from './pages/HomePage'
import { PaymentSuccessPage } from './pages/PaymentSuccessPage'
import { PricePage } from './pages/PricePage'
import { ProcessPage } from './pages/ProcessPage'
import { SamplePage } from './pages/SamplePage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/sample" element={<SamplePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/counseling" element={<CounselingPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App

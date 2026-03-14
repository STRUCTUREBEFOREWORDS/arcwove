import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
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
      </Route>
    </Routes>
  )
}

export default App

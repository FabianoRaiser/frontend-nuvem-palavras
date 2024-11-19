import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import FormScreen from './components/FormScreen'
import WordCloudScreen from './components/WordCloudScreen'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/wordCloud" replace />} />
          <Route path="/form" element={<FormScreen />} />
          <Route path="/wordCloud" element={<WordCloudScreen />} />
          <Route path="*" element={<Navigate to="/wordCloud" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

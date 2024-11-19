import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import FormScreen from './components/FormScreen'
import WordCloudScreen from './components/WordCloudScreen'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/form">Ir para Formulário</Link> | 
          <Link to="/wordCloud">Ir para Nuvem de Palavras</Link>
        </nav>

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

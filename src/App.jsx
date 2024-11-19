import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormScreen from './components/FormScreen'
import WordCloudScreen from './components/WordCloudScreen'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/form" element={<FormScreen />} />
          <Route path="/wordCloud" element={<WordCloudScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

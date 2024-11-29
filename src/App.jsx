import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import LoginPage from './Pages/lognin_page.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

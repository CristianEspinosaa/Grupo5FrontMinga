import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import LoginPage from './Pages/lognin_page.jsx'
import SignupPage from './Pages/lognup_page.jsx'
import './App.css'
import MangasPage from './Pages/mangas_page.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/mangas" element={<MangasPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

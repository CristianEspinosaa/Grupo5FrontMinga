import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import LoginPage from './Pages/lognin_page.jsx'
import SignupPage from './Pages/lognup_page.jsx'
import MangasPage from './Pages/mangas_page.jsx'
import MangasPageAuth from './Pages/mag_page_auth.jsx'
import NewRole from './Pages/NewRole.jsx';
import 'typeface-roboto';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/mangas" element={<MangasPage />} />
        <Route path="/manga" element={<MangasPageAuth />} />
        <Route path="/newRole" element={<NewRole />} />
        <Route path="/editAuthor" element={<EditAuthor />} />
        <Route path="/editChapter" element={<EditChapter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Landing } from './pages/Landing'
import Login from './pages/Login'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

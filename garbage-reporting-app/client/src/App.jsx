import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Common/Navbar'
import Home from './pages/Home'
import Report from './pages/Report'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

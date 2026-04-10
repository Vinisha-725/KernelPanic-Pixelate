import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import Dashboard from './pages/Dashboard';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;
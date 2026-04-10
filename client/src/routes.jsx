import { Routes, Route } from 'react-router-dom';

function Home() {
  return <h1>Home</h1>;
}

function Report() {
  return <h1>Report Page</h1>;
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

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
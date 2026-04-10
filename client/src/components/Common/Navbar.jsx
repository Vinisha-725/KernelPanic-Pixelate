import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>Garbage Reporting System</h1>
        <div>
          <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
          <Link to="/report" style={{ marginRight: '1rem' }}>Report</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

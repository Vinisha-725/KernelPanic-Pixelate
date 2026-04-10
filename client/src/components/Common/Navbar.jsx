import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          🗑️ CleanCity
        </Link>
        
        <div className="navbar-nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/report" 
            className={`nav-link ${location.pathname === '/report' ? 'active' : ''}`}
          >
            Report
          </Link>
          <Link 
            to="/dashboard" 
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
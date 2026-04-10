import { Link, useLocation } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';
import LanguageSelector from './LanguageSelector';

function Navbar() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          CleanCity
        </Link>
        
        <div className="navbar-nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            {t('home')}
          </Link>
          <Link 
            to="/cases" 
            className={`nav-link ${location.pathname === '/cases' ? 'active' : ''}`}
          >
            {t('cases')}
          </Link>
          <Link 
            to="/volunteer" 
            className={`nav-link ${location.pathname === '/volunteer' ? 'active' : ''}`}
          >
            {t('volunteer')}
          </Link>
          <Link 
            to="/dashboard" 
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            {t('dashboard')}
          </Link>
        </div>
        
        <LanguageSelector />
      </div>
    </nav>
  );
}

export default Navbar;
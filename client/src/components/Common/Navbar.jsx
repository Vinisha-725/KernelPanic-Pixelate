import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Garbage Reporting System</h2>

      <div>
        <Link to="/">Home</Link> |{' '}
        <Link to="/report">Report</Link> |{' '}
        <Link to="/cases">Cases</Link> |{' '}
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    padding: '1rem',
    borderBottom: '1px solid #ccc',
  },
};

export default Navbar;
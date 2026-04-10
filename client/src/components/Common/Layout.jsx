import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        {children}
      </div>
    </>
  );
}

export default Layout;
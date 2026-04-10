import Layout from '../components/Common/Layout';
import ReportForm from '../components/Report/ReportForm';
import MapView from '../components/Map/MapView';

function Report() {
  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Report Garbage Issue</h1>
        <p className="page-description">Help keep our city clean by reporting garbage and waste issues</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <ReportForm />
        </div>
        <div>
          <MapView />
        </div>
      </div>

      <div className="card fade-in" style={{ marginTop: '2rem' }}>
        <div className="card-header">
          <h3 className="card-title">📋 Reporting Guidelines</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>What to Report:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--success-color)', marginTop: '0.125rem' }}>✓</span>
                  <span>Illegal dumping sites</span>
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--success-color)', marginTop: '0.125rem' }}>✓</span>
                  <span>Overflowing public bins</span>
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--success-color)', marginTop: '0.125rem' }}>✓</span>
                  <span>Street cleaning needs</span>
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--success-color)', marginTop: '0.125rem' }}>✓</span>
                  <span>Construction debris</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>How to Report:</h4>
              <ol style={{ listStyle: 'none', padding: 0, counterReset: 'step-counter' }}>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', counterIncrement: 'step-counter' }}>
                  <span style={{ 
                    backgroundColor: 'var(--primary-color)', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '1.5rem', 
                    height: '1.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    flexShrink: 0
                  }}>1</span>
                  <span>Fill in the location details</span>
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', counterIncrement: 'step-counter' }}>
                  <span style={{ 
                    backgroundColor: 'var(--primary-color)', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '1.5rem', 
                    height: '1.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    flexShrink: 0
                  }}>2</span>
                  <span>Select the appropriate category</span>
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', counterIncrement: 'step-counter' }}>
                  <span style={{ 
                    backgroundColor: 'var(--primary-color)', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '1.5rem', 
                    height: '1.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    flexShrink: 0
                  }}>3</span>
                  <span>Provide detailed description</span>
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', counterIncrement: 'step-counter' }}>
                  <span style={{ 
                    backgroundColor: 'var(--primary-color)', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '1.5rem', 
                    height: '1.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    flexShrink: 0
                  }}>4</span>
                  <span>Upload a photo if possible</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Report;
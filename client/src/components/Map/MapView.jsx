function MapView() {
  return (
    <div className="card fade-in">
      <div className="card-header">
        <h3 className="card-title">🗺️ Report Location</h3>
        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
          📍 Use Current Location
        </button>
      </div>
      <div className="card-content">
        <div className="map-container">
          <div style={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'var(--text-secondary)',
            backgroundColor: '#f1f5f9'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🗺️</div>
            <p style={{ marginBottom: '0.5rem' }}>Interactive Map</p>
            <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>Click to set report location</p>
          </div>
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--primary-color)' }}>💡</span>
            <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>Tip:</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
            You can either click on the map to select the location manually or use the "Use Current Location" button to auto-detect your position.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MapView;
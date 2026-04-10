const StatsCards = () => {
  // Placeholder data - will be fetched from backend
  const stats = [
    { title: 'Total Reports', value: '0', change: '+0%' },
    { title: 'Resolved Issues', value: '0', change: '+0%' },
    { title: 'Pending Reports', value: '0', change: '+0%' },
    { title: 'Active Areas', value: '0', change: '+0%' }
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
      {stats.map((stat, index) => (
        <div key={index} style={{ 
          padding: '1.5rem', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px', 
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#6c757d', fontSize: '0.875rem' }}>
            {stat.title}
          </h3>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {stat.value}
          </p>
          <p style={{ margin: 0, color: '#28a745', fontSize: '0.875rem' }}>
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StatsCards

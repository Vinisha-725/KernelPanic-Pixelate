import Layout from '../components/Common/Layout';
import StatsCards from '../components/Dashboard/StatsCards';

function Dashboard() {
  const recentReports = [
    { id: 1, location: "Main Street & Oak Ave", type: "Illegal Dumping", status: "Pending", date: "2024-04-09" },
    { id: 2, location: "Central Park", type: "Overflowing Bin", status: "Resolved", date: "2024-04-08" },
    { id: 3, location: "5th Avenue", type: "Street Cleaning", status: "In Progress", date: "2024-04-08" },
    { id: 4, location: "Riverside Drive", type: "Debris Collection", status: "Pending", date: "2024-04-07" }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return 'var(--success-color)';
      case 'In Progress': return 'var(--warning-color)';
      case 'Pending': return 'var(--danger-color)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">Monitor and manage garbage reports across the city</p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-3 gap-6">
        <div className="card fade-in" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <h3 className="card-title">Recent Reports</h3>
            <button className="btn btn-outline">View All</button>
          </div>
          <div className="card-content">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Location</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Type</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map(report => (
                    <tr key={report.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem' }}>{report.location}</td>
                      <td style={{ padding: '0.75rem' }}>{report.type}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span 
                          style={{ 
                            color: getStatusColor(report.status),
                            fontWeight: '500',
                            fontSize: '0.875rem'
                          }}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{report.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card fade-in">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="card-content">
            <div className="flex flex-col gap-4">
              <button className="btn btn-primary" style={{ width: '100%' }}>
                📍 New Report
              </button>
              <button className="btn btn-secondary" style={{ width: '100%' }}>
                📊 Generate Report
              </button>
              <button className="btn btn-outline" style={{ width: '100%' }}>
                ⚙️ Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card fade-in">
          <div className="card-header">
            <h3 className="card-title">Report Categories</h3>
          </div>
          <div className="card-content">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span>Illegal Dumping</span>
                <span style={{ fontWeight: '600' }}>45</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Overflowing Bins</span>
                <span style={{ fontWeight: '600' }}>78</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Street Cleaning</span>
                <span style={{ fontWeight: '600' }}>62</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Debris Collection</span>
                <span style={{ fontWeight: '600' }}>38</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card fade-in">
          <div className="card-header">
            <h3 className="card-title">System Status</h3>
          </div>
          <div className="card-content">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span>API Status</span>
                <span style={{ color: 'var(--success-color)', fontWeight: '500' }}>● Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database</span>
                <span style={{ color: 'var(--success-color)', fontWeight: '500' }}>● Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Map Service</span>
                <span style={{ color: 'var(--success-color)', fontWeight: '500' }}>● Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Notifications</span>
                <span style={{ color: 'var(--warning-color)', fontWeight: '500' }}>● Delayed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
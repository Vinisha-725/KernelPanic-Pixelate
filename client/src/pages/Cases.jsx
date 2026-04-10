import { useState, useEffect } from 'react'
import Layout from '../components/Common/Layout'

const Cases = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      // Try to get reports from localStorage (from test submissions)
      const storedReports = localStorage.getItem('testReports')
      if (storedReports) {
        setReports(JSON.parse(storedReports))
      } else {
        setReports([])
      }
      
      // Also try to fetch from API if available
      try {
        const response = await fetch('http://localhost:5000/api/reports')
        const data = await response.json()
        
        if (data.success && data.data.length > 0) {
          setReports(data.data)
        }
      } catch (apiError) {
        console.log('API not available, using stored data')
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reported': return '#3b82f6'
      case 'In Progress': return '#f59e0b'
      case 'Cleaned': return '#10b981'
      case 'Volunteer Event Planned': return '#8b5cf6'
      default: return '#6b7280'
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'High': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true
    return report.status === filter
  })

  const handleClaim = async (reportId) => {
    try {
      const volunteerId = `volunteer_${Math.random().toString(36).substr(2, 9)}`
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/claim`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ volunteer_id: volunteerId })
      })
      
      if (response.ok) {
        fetchReports()
        alert('Thank you for volunteering!')
      }
    } catch (error) {
      console.error('Error claiming report:', error)
      alert('Failed to claim report')
    }
  }

  const handleComplete = async (reportId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        fetchReports()
        alert('Thank you for cleaning up!')
      }
    } catch (error) {
      console.error('Error completing report:', error)
      alert('Failed to mark as cleaned')
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="cases-container">
          <div className="loading">Loading cases...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="cases-container">
        <div className="cases-header">
          <h1>Garbage Cases</h1>
          <div className="filter-tabs">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({reports.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'Reported' ? 'active' : ''}`}
              onClick={() => setFilter('Reported')}
            >
              Reported ({reports.filter(r => r.status === 'Reported').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'Volunteer Event Planned' ? 'active' : ''}`}
              onClick={() => setFilter('Volunteer Event Planned')}
            >
              Events ({reports.filter(r => r.status === 'Volunteer Event Planned').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'In Progress' ? 'active' : ''}`}
              onClick={() => setFilter('In Progress')}
            >
              In Progress ({reports.filter(r => r.status === 'In Progress').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'Cleaned' ? 'active' : ''}`}
              onClick={() => setFilter('Cleaned')}
            >
              Cleaned ({reports.filter(r => r.status === 'Cleaned').length})
            </button>
          </div>
        </div>

        <div className="cases-grid">
          {filteredReports.map(report => (
            <div key={report.id} className="case-card" onClick={() => setSelectedReport(report)}>
              <div className="case-image">
                {report.photo_url ? (
                  <img src={report.photo_url} alt="Garbage" />
                ) : (
                  <div className="no-image">
                    <span>No Image</span>
                  </div>
                )}
                <div className="severity-badge" style={{ backgroundColor: getSeverityColor(report.severity) }}>
                  {report.severity}
                </div>
              </div>
              
              <div className="case-content">
                <div className="case-header">
                  <h3>{report.description.substring(0, 50)}...</h3>
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(report.status) }}>
                    {report.status}
                  </span>
                </div>
                
                <div className="case-details">
                  <p className="location">
                    <span className="icon">Location:</span>
                    {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                  </p>
                  
                  {report.complainant_name && (
                    <p className="complainant">
                      <span className="icon">Reported by:</span>
                      {report.complainant_name}
                    </p>
                  )}
                  
                  {report.event_date && (
                    <p className="event">
                      <span className="icon">Event:</span>
                      {new Date(report.event_date).toLocaleDateString()} at {report.event_time}
                      {report.volunteer_count && ` (${report.volunteer_count} volunteers)`}
                    </p>
                  )}
                </div>
                
                <div className="case-actions">
                  {report.status === 'Reported' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClaim(report.id)
                      }}
                      className="btn-claim"
                    >
                      Volunteer to Clean
                    </button>
                  )}
                  {report.status === 'In Progress' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleComplete(report.id)
                      }}
                      className="btn-complete"
                    >
                      Mark as Cleaned
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedReport && (
          <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Case Details</h2>
                <button onClick={() => setSelectedReport(null)} className="close-btn">×</button>
              </div>
              
              <div className="modal-body">
                <div className="modal-image">
                  {selectedReport.photo_url ? (
                    <img src={selectedReport.photo_url} alt="Garbage" />
                  ) : (
                    <div className="no-image-large">
                      <span>No Image Available</span>
                    </div>
                  )}
                </div>
                
                <div className="modal-info">
                  <div className="info-section">
                    <h3>Issue Details</h3>
                    <p><strong>Severity:</strong> <span className="severity-tag" style={{ backgroundColor: getSeverityColor(selectedReport.severity) }}>{selectedReport.severity}</span></p>
                    <p><strong>Status:</strong> <span className="status-tag" style={{ backgroundColor: getStatusColor(selectedReport.status) }}>{selectedReport.status}</span></p>
                    <p><strong>Description:</strong> {selectedReport.description}</p>
                    <p><strong>Location:</strong> {selectedReport.latitude.toFixed(6)}, {selectedReport.longitude.toFixed(6)}</p>
                  </div>
                  
                  {selectedReport.complainant_name && (
                    <div className="info-section">
                      <h3>Reported By</h3>
                      <p><strong>Name:</strong> {selectedReport.complainant_name}</p>
                      {selectedReport.complainant_phone && <p><strong>Phone:</strong> {selectedReport.complainant_phone}</p>}
                      {selectedReport.complainant_email && <p><strong>Email:</strong> {selectedReport.complainant_email}</p>}
                    </div>
                  )}
                  
                  {selectedReport.event_date && (
                    <div className="info-section">
                      <h3>Cleanup Event</h3>
                      <p><strong>Date:</strong> {new Date(selectedReport.event_date).toLocaleDateString()}</p>
                      <p><strong>Time:</strong> {selectedReport.event_time}</p>
                      {selectedReport.volunteer_count && <p><strong>Expected Volunteers:</strong> {selectedReport.volunteer_count}</p>}
                    </div>
                  )}
                  
                  <div className="modal-actions">
                    {selectedReport.status === 'Reported' && (
                      <button onClick={() => handleClaim(selectedReport.id)} className="btn-claim">
                        Volunteer to Clean This
                      </button>
                    )}
                    {selectedReport.status === 'In Progress' && (
                      <button onClick={() => handleComplete(selectedReport.id)} className="btn-complete">
                        Mark as Cleaned
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .cases-container {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
          }
          .cases-header {
            margin-bottom: 30px;
          }
          .cases-header h1 {
            margin: 0 0 20px 0;
            color: #333;
          }
          .filter-tabs {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }
          .filter-btn {
            padding: 8px 16px;
            border: 1px solid #d1d5db;
            background: white;
            border-radius: 20px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
          }
          .filter-btn:hover {
            background: #f3f4f6;
          }
          .filter-btn.active {
            background: #3b82f6;
            color: white;
            border-color: #3b82f6;
          }
          .cases-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
          }
          .case-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            cursor: pointer;
            transition: transform 0.2s;
          }
          .case-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          }
          .case-image {
            position: relative;
            height: 200px;
            background: #f3f4f6;
          }
          .case-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .no-image {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #6b7280;
            font-size: 18px;
          }
          .severity-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
          }
          .case-content {
            padding: 16px;
          }
          .case-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
          }
          .case-header h3 {
            margin: 0;
            font-size: 16px;
            color: #333;
            flex: 1;
            margin-right: 10px;
          }
          .status-badge {
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            white-space: nowrap;
          }
          .case-details {
            margin-bottom: 16px;
          }
          .case-details p {
            margin: 0 0 8px 0;
            font-size: 14px;
            color: #6b7280;
          }
          .case-details .icon {
            font-weight: 600;
            color: #374151;
          }
          .case-actions {
            display: flex;
            gap: 8px;
          }
          .btn-claim, .btn-complete {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
          }
          .btn-claim {
            background: #3b82f6;
            color: white;
          }
          .btn-complete {
            background: #10b981;
            color: white;
          }
          .btn-claim:hover, .btn-complete:hover {
            opacity: 0.8;
          }
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
          }
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e5e7eb;
          }
          .modal-header h2 {
            margin: 0;
            color: #333;
          }
          .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6b7280;
          }
          .modal-body {
            padding: 20px;
          }
          .modal-image {
            margin-bottom: 20px;
            text-align: center;
          }
          .modal-image img {
            max-width: 100%;
            max-height: 400px;
            border-radius: 8px;
          }
          .no-image-large {
            height: 200px;
            background: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-size: 18px;
            border-radius: 8px;
          }
          .modal-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .info-section {
            background: #f9fafb;
            padding: 16px;
            border-radius: 8px;
          }
          .info-section h3 {
            margin: 0 0 12px 0;
            color: #333;
            font-size: 16px;
          }
          .info-section p {
            margin: 0 0 8px 0;
            color: #374151;
          }
          .severity-tag, .status-tag {
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
          }
          .modal-actions {
            grid-column: 1 / -1;
            margin-top: 20px;
          }
          .modal-actions button {
            width: 100%;
            padding: 12px;
          }
          .loading {
            text-align: center;
            padding: 40px;
            color: #6b7280;
          }
        `}</style>
      </div>
    </Layout>
  )
}

export default Cases

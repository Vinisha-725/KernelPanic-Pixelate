import { useState, useEffect } from 'react'
import Layout from '../components/Common/Layout'
import QuickAddCase from '../components/Dashboard/QuickAddCase'

const Dashboard = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState(null)
  const [showAddCase, setShowAddCase] = useState(false)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports')
      const data = await response.json()
      
      if (data.success) {
        setReports(data.data)
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCase = (newCase) => {
    setReports(prev => [newCase, ...prev])
    setShowAddCase(false)
  }

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'reported':
      case 'pending': return '#3b82f6'
      case 'in progress':
      case 'ongoing': return '#f59e0b'
      case 'cleaned':
      case 'complete':
      case 'resolved': return '#10b981'
      case 'volunteer event planned': return '#8b5cf6'
      default: return '#6b7280'
    }
  }

  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'low': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'high': return '#ef4444'
      default: return '#6b7280'
    }
  }

  // Calculate statistics from real data
  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'Reported' || r.status === 'Pending').length,
    ongoing: reports.filter(r => r.status === 'In Progress' || r.status === 'Ongoing').length,
    resolved: reports.filter(r => r.status === 'Cleaned' || r.status === 'Complete' || r.status === 'Resolved').length
  }

  if (loading) {
    return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <div>Loading dashboard...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div style={{ display: 'flex', gap: '20px', height: '100vh' }}>
        {/* Main Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {/* Header */}
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px', color: '#333' }}>Garbage Management Dashboard</h1>
            <p style={{ color: '#666', margin: 0 }}>Real-time monitoring and management of garbage reports</p>
          </div>

          {/* Statistics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
                {stats.total}
              </div>
              <div style={{ color: '#666', fontSize: '0.875rem' }}>Total Reports Filed</div>
            </div>
            
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
                {stats.pending}
              </div>
              <div style={{ color: '#666', fontSize: '0.875rem' }}>Pending Cases</div>
            </div>
            
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
                {stats.ongoing}
              </div>
              <div style={{ color: '#666', fontSize: '0.875rem' }}>Ongoing Cases</div>
            </div>
            
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
                {stats.resolved}
              </div>
              <div style={{ color: '#666', fontSize: '0.875rem' }}>Resolved Cases</div>
            </div>
          </div>

          {/* Reports Grid */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#333' }}>All Reports</h2>
            {reports.length === 0 ? (
              <div style={{ 
                background: 'white', 
                padding: '40px', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                color: '#666'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>No reports yet</div>
                <div>Start by adding your first garbage report using the side panel</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {reports.map(report => (
                  <div 
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {/* Image Section - Main Focus */}
                    <div style={{ height: '200px', background: '#f3f4f6', position: 'relative' }}>
                      {report.photo_url ? (
                        <img 
                          src={report.photo_url} 
                          alt="Garbage Report" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          height: '100%',
                          color: '#9ca3af',
                          fontSize: '1.125rem'
                        }}>
                          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>No Image</div>
                          <div>Click to view details</div>
                        </div>
                      )}
                      
                      {/* Severity Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: getSeverityColor(report.severity),
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}>
                        {report.severity} Severity
                      </div>

                      {/* Status Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: getStatusColor(report.status),
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}>
                        {report.status}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ 
                        margin: '0 0 12px 0', 
                        fontSize: '1.1rem', 
                        color: '#333',
                        fontWeight: '600',
                        lineHeight: '1.4'
                      }}>
                        {report.description.length > 80 ? 
                          report.description.substring(0, 80) + '...' : 
                          report.description
                        }
                      </h3>
                      
                      {/* Location Info */}
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          marginBottom: '6px',
                          fontSize: '0.875rem',
                          color: '#666'
                        }}>
                          <span style={{ marginRight: '6px' }}>Location:</span>
                          <span style={{ fontWeight: '500' }}>
                            {report.city ? `${report.city}, ${report.state || ''}` : 
                             `${report.latitude.toFixed(4)}, ${report.longitude.toFixed(4)}`}
                          </span>
                        </div>
                        
                        {report.pincode && (
                          <div style={{ fontSize: '0.875rem', color: '#666' }}>
                            <span style={{ marginRight: '6px' }}>Pincode:</span>
                            <span>{report.pincode}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Additional Info */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                          {new Date(report.created_at).toLocaleDateString()} at {new Date(report.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                        
                        {report.complainant_name && (
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            By: {report.complainant_name}
                          </div>
                        )}
                      </div>

                      {/* Click to view hint */}
                      <div style={{ 
                        textAlign: 'center', 
                        marginTop: '12px',
                        fontSize: '0.75rem',
                        color: '#3b82f6',
                        fontWeight: '500'
                      }}>
                        Click to view full details
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Side Column */}
        <div style={{ width: '320px', background: 'white', padding: '20px', boxShadow: '-2px 0 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#333' }}>Quick Actions</h2>
          
          <button
            onClick={() => setShowAddCase(!showAddCase)}
            style={{
              width: '100%',
              padding: '12px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            {showAddCase ? 'Cancel' : '+ Add New Case'}
          </button>

          {showAddCase && (
            <QuickAddCase 
              onAdd={handleAddCase}
              onCancel={() => setShowAddCase(false)}
            />
          )}

          {/* Quick Stats */}
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#333' }}>Quick Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#666' }}>High Priority</span>
                <span style={{ fontWeight: '600', color: '#ef4444' }}>
                  {reports.filter(r => r.severity === 'High').length}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#666' }}>Medium Priority</span>
                <span style={{ fontWeight: '600', color: '#f59e0b' }}>
                  {reports.filter(r => r.severity === 'Medium').length}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#666' }}>Low Priority</span>
                <span style={{ fontWeight: '600', color: '#10b981' }}>
                  {reports.filter(r => r.severity === 'Low').length}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#333' }}>Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {reports.slice(0, 3).map(report => (
                <div key={report.id} style={{ 
                  padding: '12px', 
                  background: '#f9fafb', 
                  borderRadius: '8px',
                  fontSize: '0.875rem'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                    {report.description.substring(0, 30)}...
                  </div>
                  <div style={{ color: '#666', fontSize: '0.75rem' }}>
                    {new Date(report.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div 
          onClick={() => setSelectedReport(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '12px',
              maxWidth: '800px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '20px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h2 style={{ margin: 0, color: '#333' }}>Report Details</h2>
              <button 
                onClick={() => setSelectedReport(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '20px' }}>
              {/* Image */}
              <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                {selectedReport.photo_url ? (
                  <img 
                    src={selectedReport.photo_url} 
                    alt="Garbage" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '400px', 
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{ 
                    height: '200px', 
                    background: '#f3f4f6', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af'
                  }}>
                    No Image Available
                  </div>
                )}
              </div>

              {/* Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#333' }}>Basic Information</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <span style={{ color: '#666', fontSize: '0.875rem' }}>Severity:</span>
                      <span style={{ 
                        marginLeft: '8px',
                        background: getSeverityColor(selectedReport.severity),
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }}>
                        {selectedReport.severity}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#666', fontSize: '0.875rem' }}>Status:</span>
                      <span style={{ 
                        marginLeft: '8px',
                        background: getStatusColor(selectedReport.status),
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }}>
                        {selectedReport.status}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#666', fontSize: '0.875rem' }}>Description:</span>
                      <p style={{ margin: '4px 0 0 0', color: '#333' }}>{selectedReport.description}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#333' }}>Location Information</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <span style={{ color: '#666', fontSize: '0.875rem' }}>Coordinates:</span>
                      <div style={{ color: '#333', fontSize: '0.875rem' }}>
                        {selectedReport.latitude.toFixed(6)}, {selectedReport.longitude.toFixed(6)}
                      </div>
                    </div>
                    {selectedReport.city && (
                      <div>
                        <span style={{ color: '#666', fontSize: '0.875rem' }}>City:</span>
                        <div style={{ color: '#333', fontSize: '0.875rem' }}>{selectedReport.city}</div>
                      </div>
                    )}
                    {selectedReport.state && (
                      <div>
                        <span style={{ color: '#666', fontSize: '0.875rem' }}>State:</span>
                        <div style={{ color: '#333', fontSize: '0.875rem' }}>{selectedReport.state}</div>
                      </div>
                    )}
                    {selectedReport.pincode && (
                      <div>
                        <span style={{ color: '#666', fontSize: '0.875rem' }}>Pincode:</span>
                        <div style={{ color: '#333', fontSize: '0.875rem' }}>{selectedReport.pincode}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              {selectedReport.complainant_name && (
                <div style={{ marginTop: '20px' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: '#333' }}>Reported By</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedReport.complainant_name && (
                      <div>
                        <span style={{ color: '#666', fontSize: '0.875rem' }}>Name:</span>
                        <div style={{ color: '#333', fontSize: '0.875rem' }}>{selectedReport.complainant_name}</div>
                      </div>
                    )}
                    {selectedReport.complainant_phone && (
                      <div>
                        <span style={{ color: '#666', fontSize: '0.875rem' }}>Phone:</span>
                        <div style={{ color: '#333', fontSize: '0.875rem' }}>{selectedReport.complainant_phone}</div>
                      </div>
                    )}
                    {selectedReport.complainant_email && (
                      <div>
                        <span style={{ color: '#666', fontSize: '0.875rem' }}>Email:</span>
                        <div style={{ color: '#333', fontSize: '0.875rem' }}>{selectedReport.complainant_email}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ color: '#666', fontSize: '0.875rem' }}>
                  Reported on: {new Date(selectedReport.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Dashboard

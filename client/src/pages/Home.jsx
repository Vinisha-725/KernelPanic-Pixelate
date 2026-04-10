import { useState } from 'react'
import MapView from '../components/Map/MapView'
import ComprehensiveReportForm from '../components/Report/ComprehensiveReportForm'
import MapSearch from '../components/Map/MapSearch'
import MapControls from '../components/Map/MapControls'
import useReports from '../hooks/useReports'
import Layout from '../components/Common/Layout';
import { Link } from 'react-router-dom';

const Home = () => {
  const [showReportForm, setShowReportForm] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const { reports, createReport, claimReport, completeReport } = useReports()

  const handleAddReport = () => {
    setSelectedLocation(null)
    setShowReportForm(true)
  }

  const handleMapClick = (lngLat) => {
    setSelectedLocation(lngLat)
    setShowReportForm(true)
  }

  const handleSearch = (coords) => {
    // This will be used to zoom map to searched location
    console.log('Searching location:', coords)
    // TODO: Implement map zoom to coordinates
  }

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setSelectedLocation(coords)
          setShowReportForm(true)
          // TODO: Zoom map to current location
        },
        (error) => {
          alert('Unable to get your location. Please enable location services.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  const handleSubmitReport = async (reportData) => {
    try {
      await createReport(reportData)
      setShowReportForm(false)
      setSelectedLocation(null)
      alert('Report submitted successfully! Thank you for helping keep our city clean.')
    } catch (error) {
      console.error('Failed to submit report:', error)
      alert('Failed to submit report. Please try again.')
    }
  }

  const handleClaimReport = async (reportId) => {
    try {
      const volunteerId = `volunteer_${Math.random().toString(36).substr(2, 9)}`
      await claimReport(reportId, volunteerId)
      alert('Thank you for volunteering! You will be contacted with details.')
    } catch (error) {
      console.error('Failed to claim report:', error)
      alert('Failed to claim report. Please try again.')
    }
  }

  const handleCompleteReport = async (reportId) => {
    try {
      await completeReport(reportId)
      alert('Thank you for cleaning up! Your contribution makes a difference.')
    } catch (error) {
      console.error('Failed to complete report:', error)
      alert('Failed to mark as cleaned. Please try again.')
    }
  }

  const handleCloseReportForm = () => {
    setShowReportForm(false)
    setSelectedLocation(null)
  }

  const features = [
    {
      icon: '🗑️',
      title: 'Quick Reporting',
      description: 'Easily report garbage issues with our simple form and map interface'
    },
    {
      icon: '📊',
      title: 'Real-time Tracking',
      description: 'Monitor the status of your reports and see city-wide statistics'
    },
    {
      icon: '🌍',
      title: 'Community Impact',
      description: 'Join thousands of citizens working together for a cleaner city'
    },
    {
      icon: '⚡',
      title: 'Fast Response',
      description: 'Quick resolution times with dedicated municipal response teams'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Reports Resolved' },
    { value: '48hrs', label: 'Avg Response Time' },
    { value: '95%', label: 'Satisfaction Rate' },
    { value: '500+', label: 'Active Users' }
  ];

  return (
    <Layout>
      <div style={{ position: 'relative', height: 'calc(100vh - 60px)' }}>
        <MapView 
          onMapClick={handleMapClick}
          onClaim={handleClaimReport}
          onComplete={handleCompleteReport}
        />
        
        <MapSearch 
          onSearch={handleSearch}
          onLocateMe={handleLocateMe}
        />
        
        <MapControls 
          onAddReport={handleAddReport}
          onRefresh={() => window.location.reload()}
        />
        
        {showReportForm && (
          <ComprehensiveReportForm 
            onSubmit={handleSubmitReport}
            onClose={handleCloseReportForm}
            selectedLocation={selectedLocation}
          />
        )}
      </div>

      {/* Stats Section */}
      <div className="stats-grid" style={{ margin: '3rem 0' }}>
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ textAlign: 'center' }}>
            <div className="stat-value" style={{ fontSize: '2.5rem' }}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>How It Works</h2>
        <div className="grid grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card fade-in">
              <div className="card-content" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="card fade-in" style={{ 
        backgroundColor: 'var(--background)',
        textAlign: 'center',
        padding: '3rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Ready to Make a Difference?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}>
          Join our community of active citizens working towards a cleaner city.
        </p>
        <Link to="/report" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
          🚀 Get Started Now
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="card fade-in" style={{ marginTop: '3rem' }}>
        <div className="card-header">
          <h3 className="card-title">🔔 Recent Activity</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-4 gap-4">
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--background)', 
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--success-color)'
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                Just now
              </div>
              <div style={{ fontWeight: '500' }}>
                Illegal dumping reported on Main St
              </div>
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--background)', 
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--success-color)'
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                5 mins ago
              </div>
              <div style={{ fontWeight: '500' }}>
                Overflowing bin resolved in Central Park
              </div>
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--background)', 
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--warning-color)'
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                12 mins ago
              </div>
              <div style={{ fontWeight: '500' }}>
                Street cleaning requested on 5th Ave
              </div>
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--background)', 
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--success-color)'
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                1 hour ago
              </div>
              <div style={{ fontWeight: '500' }}>
                Debris collection completed on Riverside Dr
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
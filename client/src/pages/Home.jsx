import { useState } from 'react'
import MapView from '../components/Map/MapView'
import SimpleReportForm from '../components/Report/SimpleReportForm'
import MapSearch from '../components/Map/MapSearch'
import MapControls from '../components/Map/MapControls'
import useReports from '../hooks/useReports'
import Layout from '../components/Common/Layout';

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

  return (
    <Layout>
      <div className="home">
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
          <SimpleReportForm 
            onSubmit={handleSubmitReport}
            onClose={handleCloseReportForm}
            selectedLocation={selectedLocation}
          />
        )}

        <style jsx>{`
          .home {
            position: relative;
            height: 100vh;
            width: 100%;
          }
        `}</style>
      </div>
    </Layout>
  )
}

export default Home
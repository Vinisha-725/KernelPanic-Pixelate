import { useState } from 'react'
import MapView from '../components/Map/MapView'
import ReportForm from '../components/Report/ReportForm'
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

  const handleSubmitReport = async (reportData) => {
    try {
      let finalReportData = reportData
      
      // If location selected from map, use it
      if (selectedLocation) {
        finalReportData = {
          ...reportData,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng
        }
      }
      
      await createReport(finalReportData)
      setShowReportForm(false)
      setSelectedLocation(null)
    } catch (error) {
      console.error('Failed to submit report:', error)
    }
  }

  const handleClaimReport = async (reportId) => {
    try {
      const volunteerId = `volunteer_${Math.random().toString(36).substr(2, 9)}`
      await claimReport(reportId, volunteerId)
    } catch (error) {
      console.error('Failed to claim report:', error)
    }
  }

  const handleCompleteReport = async (reportId) => {
    try {
      await completeReport(reportId)
    } catch (error) {
      console.error('Failed to complete report:', error)
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
        
        <MapControls 
          onAddReport={handleAddReport}
          onRefresh={() => window.location.reload()}
        />
        
        {showReportForm && (
          <ReportForm 
            onSubmit={handleSubmitReport}
            onClose={handleCloseReportForm}
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
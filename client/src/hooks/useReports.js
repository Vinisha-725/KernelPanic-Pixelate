import { useState, useEffect, useCallback } from 'react'

const useReports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchReports = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('http://localhost:5000/api/reports')
      const data = await response.json()
      
      if (data.success) {
        setReports(data.data)
      } else {
        setError(data.message || 'Failed to fetch reports')
      }
    } catch (err) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }, [])

  const createReport = useCallback(async (reportData) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setReports(prev => [data.data, ...prev])
        return data.data
      } else {
        setError(data.message || 'Failed to create report')
        throw new Error(data.message)
      }
    } catch (err) {
      setError(err.message || 'Network error')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const claimReport = useCallback(async (reportId, volunteerId) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/claim`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ volunteer_id: volunteerId })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setReports(prev => prev.map(report => 
          report.id === reportId ? data.data : report
        ))
        return data.data
      } else {
        setError(data.message || 'Failed to claim report')
        throw new Error(data.message)
      }
    } catch (err) {
      setError(err.message || 'Network error')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const completeReport = useCallback(async (reportId) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      const data = await response.json()
      
      if (data.success) {
        setReports(prev => prev.map(report => 
          report.id === reportId ? data.data : report
        ))
        return data.data
      } else {
        setError(data.message || 'Failed to complete report')
        throw new Error(data.message)
      }
    } catch (err) {
      setError(err.message || 'Network error')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const getReportsByStatus = useCallback((status) => {
    return reports.filter(report => report.status === status)
  }, [reports])

  const getReportsBySeverity = useCallback((severity) => {
    return reports.filter(report => report.severity === severity)
  }, [reports])

  return {
    reports,
    loading,
    error,
    fetchReports,
    createReport,
    claimReport,
    completeReport,
    getReportsByStatus,
    getReportsBySeverity
  }
}

export default useReports

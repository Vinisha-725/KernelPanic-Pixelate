const express = require('express')
const router = express.Router()

// Simple test endpoint that doesn't use database
router.post('/test', async (req, res) => {
  try {
    console.log('Test endpoint received:', req.body)
    
    const { latitude, longitude, severity, description } = req.body
    
    // Basic validation
    if (!latitude || !longitude || !severity || !description) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    // Return success without saving to database
    const mockReport = {
      id: 'test_' + Date.now(),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      severity,
      description,
      status: 'Reported',
      created_at: new Date().toISOString()
    }

    console.log('Test report created:', mockReport)
    
    res.status(201).json({
      success: true,
      data: mockReport,
      message: 'Test report created successfully'
    })
  } catch (error) {
    console.error('Test endpoint error:', error)
    res.status(500).json({
      success: false,
      message: 'Test failed',
      error: error.message
    })
  }
})

module.exports = router

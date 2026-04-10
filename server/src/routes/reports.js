const express = require('express')
const router = express.Router()
const Report = require('../models/Report')

// GET /api/reports - Get all reports
router.get('/', async (req, res) => {
  try {
    const { status, category, limit, offset } = req.query
    const filters = {}
    
    if (status) filters.status = status
    if (category) filters.category = category
    if (limit) filters.limit = parseInt(limit)
    if (offset) filters.offset = parseInt(offset)

    const reports = await Report.findAll(filters)
    res.status(200).json({
      success: true,
      data: reports,
      message: 'Reports fetched successfully'
    })
  } catch (error) {
    console.error('Error fetching reports:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports',
      error: error.message
    })
  }
})

// GET /api/reports/:id - Get single report
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const report = await Report.findById(id)
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      })
    }

    res.status(200).json({
      success: true,
      data: report,
      message: 'Report fetched successfully'
    })
  } catch (error) {
    console.error('Error fetching report:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch report',
      error: error.message
    })
  }
})

// POST /api/reports - Create new report
router.post('/', async (req, res) => {
  try {
    console.log('Received report data:', req.body)
    
    const { 
      latitude, 
      longitude, 
      severity, 
      description, 
      photo_url,
      status
    } = req.body
    
    // Basic validation
    if (!latitude || !longitude || !severity || !description) {
      console.log('Validation failed - missing required fields')
      return res.status(400).json({
        success: false,
        message: 'Latitude, longitude, severity, and description are required'
      })
    }

    const reportData = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      severity,
      description,
      photo_url: photo_url || null,
      status: status || 'Reported'
    }

    console.log('Cleaned report data:', reportData)
    const report = await Report.create(reportData)
    console.log('Report created successfully:', report)
    
    res.status(201).json({
      success: true,
      data: report,
      message: 'Report created successfully'
    })
  } catch (error) {
    console.error('Error creating report:', error)
    console.error('Full error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    })
    res.status(500).json({
      success: false,
      message: 'Failed to create report',
      error: error.message
    })
  }
})

// PUT /api/reports/:id - Update report
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body
    
    const report = await Report.update(id, updateData)
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      })
    }

    res.status(200).json({
      success: true,
      data: report,
      message: 'Report updated successfully'
    })
  } catch (error) {
    console.error('Error updating report:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update report',
      error: error.message
    })
  }
})

// PUT /api/reports/:id/claim - Volunteer claims a report
router.put('/:id/claim', async (req, res) => {
  try {
    const { id } = req.params
    const { volunteer_id } = req.body
    
    if (!volunteer_id) {
      return res.status(400).json({
        success: false,
        message: 'Volunteer ID is required'
      })
    }

    const report = await Report.update(id, {
      status: 'In Progress',
      volunteer_id
    })
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      })
    }

    res.status(200).json({
      success: true,
      data: report,
      message: 'Report claimed successfully'
    })
  } catch (error) {
    console.error('Error claiming report:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to claim report',
      error: error.message
    })
  }
})

// PUT /api/reports/:id/complete - Mark report as cleaned
router.put('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params
    
    const report = await Report.update(id, {
      status: 'Cleaned'
    })
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      })
    }

    res.status(200).json({
      success: true,
      data: report,
      message: 'Report marked as cleaned'
    })
  } catch (error) {
    console.error('Error completing report:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to complete report',
      error: error.message
    })
  }
})

// DELETE /api/reports/:id - Delete report
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await Report.delete(id)
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting report:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete report',
      error: error.message
    })
  }
})

module.exports = router

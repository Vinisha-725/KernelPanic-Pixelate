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
    const reportData = req.body
    
    // Basic validation
    if (!reportData.location || !reportData.category || !reportData.description) {
      return res.status(400).json({
        success: false,
        message: 'Location, category, and description are required'
      })
    }

    const report = await Report.create(reportData)
    res.status(201).json({
      success: true,
      data: report,
      message: 'Report created successfully'
    })
  } catch (error) {
    console.error('Error creating report:', error)
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

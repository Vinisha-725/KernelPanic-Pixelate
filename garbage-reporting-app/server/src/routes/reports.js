const express = require('express')
const router = express.Router()
const reportController = require('../controllers/reportController')

// GET /api/reports - Get all reports
router.get('/', reportController.getAllReports)

// GET /api/reports/:id - Get single report
router.get('/:id', reportController.getReportById)

// POST /api/reports - Create new report
router.post('/', reportController.createReport)

// PUT /api/reports/:id - Update report
router.put('/:id', reportController.updateReport)

// DELETE /api/reports/:id - Delete report
router.delete('/:id', reportController.deleteReport)

module.exports = router

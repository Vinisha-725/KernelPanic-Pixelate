const express = require('express')
const router = express.Router()
const statsController = require('../controllers/statsController')

// GET /api/stats/overall - Get overall statistics
router.get('/overall', statsController.getOverallStats)

// GET /api/stats/location - Get location-based statistics
router.get('/location', statsController.getReportsByLocation)

// GET /api/stats/trends - Get trend data
router.get('/trends', statsController.getTrendData)

module.exports = router

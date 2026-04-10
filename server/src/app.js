const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Import routes
const reportRoutes = require('./routes/reports')
const statsRoutes = require('./routes/stats')
const testRoutes = require('./routes/test')

const app = express()

// Enable CORS
app.use(cors())

// Parse JSON bodies with increased limit for images
app.use(express.json({ limit: '10mb' }))

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'API Running' })
})

// API routes
app.use('/api/reports', reportRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/test', testRoutes)

module.exports = app
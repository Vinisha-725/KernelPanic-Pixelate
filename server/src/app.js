const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Import routes
const reportRoutes = require('./routes/reports')
const statsRoutes = require('./routes/stats')

const app = express()

// Enable CORS
app.use(cors())

// Parse JSON bodies
app.use(express.json())

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'API Running' })
})

// API routes
app.use('/api/reports', reportRoutes)
app.use('/api/stats', statsRoutes)

module.exports = app

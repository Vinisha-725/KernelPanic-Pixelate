// Global error handling middleware

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  }

  // Mongoose validation error (for future use)
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map(val => val.message).join(', ')
    error.status = 400
  }

  // Mongoose duplicate key error (for future use)
  if (err.code === 11000) {
    error.message = 'Duplicate field value entered'
    error.status = 400
  }

  // Mongoose cast error (for future use)
  if (err.name === 'CastError') {
    error.message = 'Resource not found'
    error.status = 404
  }

  res.status(error.status).json({
    success: false,
    error: error.message
  })
}

module.exports = errorHandler

// Validation middleware for incoming requests

const validateReport = (req, res, next) => {
  const { location, category, description } = req.body

  // Basic validation
  if (!location || location.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Location is required'
    })
  }

  if (!category || category.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Category is required'
    })
  }

  if (!description || description.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Description is required'
    })
  }

  // Validate category
  const validCategories = ['plastic', 'organic', 'electronic', 'other']
  if (!validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid category'
    })
  }

  next()
}

const validateId = (req, res, next) => {
  const { id } = req.params

  // Basic ID validation
  if (!id || id.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Valid ID is required'
    })
  }

  next()
}

module.exports = {
  validateReport,
  validateId
}

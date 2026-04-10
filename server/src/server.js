const app = require('./app')
const { PORT } = require('./config/environment')

const startServer = () => {
  const port = PORT || 5000
  
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}

startServer()

module.exports = app

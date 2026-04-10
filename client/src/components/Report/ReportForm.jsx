import { useState } from 'react'

const ReportForm = ({ onSubmit, onClose, selectedLocation }) => {
  const [formData, setFormData] = useState({
    severity: 'Medium',
    description: '',
    photo_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!selectedLocation) {
      setError('Please select a location on the map first')
      setLoading(false)
      return
    }

    try {
      const reportData = {
        ...formData,
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng
      }
      await onSubmit(reportData)
      setFormData({
        severity: 'Medium',
        description: '',
        photo_url: ''
      })
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          }))
        },
        (error) => {
          setError('Unable to get your location. Please enter manually.')
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
    }
  }

  return (
    <div className="report-form-overlay">
      <div className="report-form">
        <div className="form-header">
          <h3>Report Garbage Spot</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Selected Location</label>
            <div className="selected-location">
              {selectedLocation ? (
                <div className="location-display">
                  <span className="location-coords">
                    {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                  </span>
                  <span className="location-hint">
                    Click on the map to change location
                  </span>
                </div>
              ) : (
                <div className="location-prompt">
                  <span>Click on the map to select a location</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Severity</label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe the garbage issue..."
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .report-form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .report-form {
          background: white;
          padding: 24px;
          border-radius: 12px;
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .form-header h3 {
          margin: 0;
          color: #333;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .close-btn:hover {
          color: #333;
        }
        .error-message {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 16px;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: #333;
        }
        .location-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 8px;
        }
        .location-inputs input {
          padding: 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 14px;
        }
        .location-btn {
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px;
          cursor: pointer;
        }
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 14px;
        }
        .form-group textarea {
          resize: vertical;
        }
        .form-actions {
          margin-top: 20px;
        }
        .btn {
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        }
        .btn-primary {
          background: #3b82f6;
          color: white;
          width: 100%;
        }
        .btn-primary:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        .btn-primary:hover:not(:disabled) {
          background: #2563eb;
        }
        .selected-location {
          padding: 12px;
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          background: #f9fafb;
        }
        .location-display {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .location-coords {
          font-family: monospace;
          font-size: 14px;
          color: #374151;
          font-weight: 600;
        }
        .location-hint {
          font-size: 12px;
          color: #6b7280;
        }
        .location-prompt {
          text-align: center;
          color: #6b7280;
          font-style: italic;
        }
      `}</style>
    </div>
  )
}

export default ReportForm;
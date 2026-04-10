import { useState } from 'react'

const AdvancedReportForm = ({ onSubmit, onClose, selectedLocation }) => {
  const [formData, setFormData] = useState({
    severity: 'Medium',
    description: '',
    photo_url: '',
    complainant_name: '',
    complainant_phone: '',
    complainant_email: '',
    volunteer_event: false,
    event_date: '',
    event_time: '',
    volunteer_count: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError(null)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData(prev => ({ ...prev, photo_url: reader.result }))
      }
      reader.readAsDataURL(file)
    }
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
      // Only send basic fields that exist in database
      const reportData = {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        severity: formData.severity,
        description: formData.description,
        photo_url: formData.photo_url,
        status: formData.volunteer_event ? 'In Progress' : 'Reported'
      }
      
      console.log('Submitting report:', reportData)
      await onSubmit(reportData)
      
      setFormData({
        severity: 'Medium',
        description: '',
        photo_url: '',
        complainant_name: '',
        complainant_phone: '',
        complainant_email: '',
        volunteer_event: false,
        event_date: '',
        event_time: '',
        volunteer_count: ''
      })
      setImagePreview(null)
      onClose()
    } catch (err) {
      console.error('Submit error:', err)
      setError(err.message || 'Failed to submit report')
    } finally {
      setLoading(false)
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
          {/* Location Display */}
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

          {/* Image Upload */}
          <div className="form-group">
            <label>Photo of Garbage</label>
            <div className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="upload-btn">
                Choose Image
              </label>
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Garbage preview" />
                  <button 
                    type="button" 
                    onClick={() => {
                      setImagePreview(null)
                      setFormData(prev => ({ ...prev, photo_url: '' }))
                    }}
                    className="remove-image"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Severity */}
          <div className="form-group">
            <label>Severity Level</label>
            <select name="severity" value={formData.severity} onChange={handleChange} required>
              <option value="Low">Low - Small litter</option>
              <option value="Medium">Medium - Regular garbage</option>
              <option value="High">High - Large dump/hazardous</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe the garbage issue in detail..."
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>

          {/* Complainant Details */}
          <div className="section-divider">
            <h4>Your Details (Optional)</h4>
          </div>

          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="complainant_name"
              placeholder="John Doe"
              value={formData.complainant_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="complainant_phone"
              placeholder="+91 9876543210"
              value={formData.complainant_phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="complainant_email"
              placeholder="john@example.com"
              value={formData.complainant_email}
              onChange={handleChange}
            />
          </div>

          {/* Volunteer Event */}
          <div className="section-divider">
            <h4>Organize Cleanup Event</h4>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="volunteer_event"
                checked={formData.volunteer_event}
                onChange={handleChange}
              />
              Organize volunteer cleanup event
            </label>
          </div>

          {formData.volunteer_event && (
            <>
              <div className="form-group">
                <label>Event Date</label>
                <input
                  type="date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label>Event Time</label>
                <input
                  type="time"
                  name="event_time"
                  value={formData.event_time}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Expected Volunteers</label>
                <input
                  type="number"
                  name="volunteer_count"
                  placeholder="e.g., 10"
                  value={formData.volunteer_count}
                  onChange={handleChange}
                  min="1"
                  max="100"
                />
              </div>
            </>
          )}

          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn btn-primary">
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
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
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
        .form-group input,
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
        .section-divider {
          margin: 24px 0 16px 0;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }
        .section-divider h4 {
          margin: 0;
          color: #374151;
          font-size: 16px;
        }
        .checkbox-group {
          margin-bottom: 16px;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .checkbox-label input {
          width: auto;
          margin-right: 8px;
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
        .image-upload {
          position: relative;
        }
        .file-input {
          display: none;
        }
        .upload-btn {
          display: inline-block;
          padding: 8px 16px;
          background: #3b82f6;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        .upload-btn:hover {
          background: #2563eb;
        }
        .image-preview {
          margin-top: 12px;
          position: relative;
        }
        .image-preview img {
          max-width: 100%;
          max-height: 200px;
          border-radius: 4px;
        }
        .remove-image {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 12px;
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
      `}</style>
    </div>
  )
}

export default AdvancedReportForm

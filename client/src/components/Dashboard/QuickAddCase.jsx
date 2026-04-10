import { useState } from 'react'

const QuickAddCase = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    severity: 'Medium',
    description: '',
    city: '',
    state: '',
    photo_url: '',
    complainant_name: '',
    complainant_phone: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
        // Compress image to reduce storage usage
        compressImage(reader.result, (compressed) => {
          setImagePreview(compressed)
          setFormData(prev => ({ ...prev, photo_url: compressed }))
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const compressImage = (dataUrl, callback) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Calculate new dimensions (max 800px width/height)
      let width = img.width
      let height = img.height
      const maxSize = 800
      
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height
          height = maxSize
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      
      // Convert to JPEG with 70% quality
      const compressed = canvas.toDataURL('image/jpeg', 0.7)
      callback(compressed)
    }
    img.src = dataUrl
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Current location:', position.coords)
          // You could reverse geocode to get city/state
        },
        (error) => {
          setError('Unable to get your location. Please enter manually.')
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validation
    if (!formData.description || !formData.city || !formData.state) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      // Get current location for coordinates
      let lat = 20.5937, lng = 78.9629 // Default to India center
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            lat = position.coords.latitude
            lng = position.coords.longitude
            submitWithCoords(lat, lng)
          },
          () => {
            submitWithCoords(lat, lng) // Use default if location fails
          }
        )
      } else {
        submitWithCoords(lat, lng)
      }
    } catch (err) {
      console.error('Submit error:', err)
      setError(err.message || 'Failed to submit report')
      setLoading(false)
    }
  }

  const submitWithCoords = async (lat, lng) => {
    try {
      const reportData = {
        latitude: lat,
        longitude: lng,
        severity: formData.severity,
        description: formData.description,
        photo_url: formData.photo_url,
        city: formData.city,
        state: formData.state,
        complainant_name: formData.complainant_name,
        complainant_phone: formData.complainant_phone,
        status: 'Reported',
        created_at: new Date().toISOString(),
        id: 'report_' + Date.now()
      }
      
      console.log('Submitting quick case:', reportData)
      
      // Save to localStorage for Cases page with quota management
      try {
        const existingReports = JSON.parse(localStorage.getItem('testReports') || '[]')
        existingReports.unshift(reportData) // Add to beginning
        
        // Keep only the latest 20 reports to save space
        if (existingReports.length > 20) {
          existingReports.splice(20) // Remove oldest reports beyond 20
        }
        
        localStorage.setItem('testReports', JSON.stringify(existingReports))
      } catch (storageError) {
        if (storageError.name === 'QuotaExceededError') {
          // Clear old reports and try again
          const existingReports = JSON.parse(localStorage.getItem('testReports') || '[]')
          // Keep only the latest 10 reports
          const recentReports = existingReports.slice(0, 10)
          recentReports.unshift(reportData)
          
          try {
            localStorage.setItem('testReports', JSON.stringify(recentReports))
          } catch (stillQuotaError) {
            // If still exceeds quota, save without image
            const reportWithoutImage = { ...reportData, photo_url: null }
            recentReports[0] = reportWithoutImage
            localStorage.setItem('testReports', JSON.stringify(recentReports))
            setError('Storage full. Report saved without image.')
          }
        } else {
          throw storageError
        }
      }
      
      await onAdd(reportData)
      
      // Reset form
      setFormData({
        severity: 'Medium',
        description: '',
        city: '',
        state: '',
        photo_url: '',
        complainant_name: '',
        complainant_phone: ''
      })
      setImagePreview(null)
      setLoading(false)
    } catch (err) {
      console.error('Submit error:', err)
      setError(err.message || 'Failed to submit report')
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      background: '#f9fafb', 
      padding: '16px', 
      borderRadius: '8px',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: '#333' }}>Add New Case</h3>
      
      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '0.875rem',
          marginBottom: '12px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Photo Upload */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
            Photo
          </label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            style={{ fontSize: '0.875rem', marginBottom: '8px' }}
          />
          {imagePreview && (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ maxWidth: '100px', maxHeight: '80px', borderRadius: '4px' }}
              />
              <button 
                type="button" 
                onClick={() => {setImagePreview(null); setFormData(prev => ({...prev, photo_url: ''}))}} 
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Severity */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
            Severity *
          </label>
          <select 
            name="severity" 
            value={formData.severity} 
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '6px', 
              border: '1px solid #d1d5db', 
              borderRadius: '4px',
              fontSize: '0.875rem'
            }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
            Description *
          </label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            required
            placeholder="Describe the garbage issue..."
            style={{ 
              width: '100%', 
              padding: '6px', 
              border: '1px solid #d1d5db', 
              borderRadius: '4px',
              fontSize: '0.875rem',
              minHeight: '60px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Location */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
            City *
          </label>
          <input 
            type="text" 
            name="city" 
            value={formData.city} 
            onChange={handleChange}
            required
            placeholder="e.g., Mumbai"
            style={{ 
              width: '100%', 
              padding: '6px', 
              border: '1px solid #d1d5db', 
              borderRadius: '4px',
              fontSize: '0.875rem',
              marginBottom: '8px'
            }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
            State *
          </label>
          <select 
            name="state" 
            value={formData.state} 
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '6px', 
              border: '1px solid #d1d5db', 
              borderRadius: '4px',
              fontSize: '0.875rem',
              marginBottom: '8px'
            }}
          >
            <option value="">Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>

        {/* Complainant Info */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
            Your Name (Optional)
          </label>
          <input 
            type="text" 
            name="complainant_name" 
            value={formData.complainant_name} 
            onChange={handleChange}
            placeholder="Your name"
            style={{ 
              width: '100%', 
              padding: '6px', 
              border: '1px solid #d1d5db', 
              borderRadius: '4px',
              fontSize: '0.875rem',
              marginBottom: '8px'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
            Phone Number (Optional)
          </label>
          <input 
            type="tel" 
            name="complainant_phone" 
            value={formData.complainant_phone} 
            onChange={handleChange}
            placeholder="+91 9876543210"
            style={{ 
              width: '100%', 
              padding: '6px', 
              border: '1px solid #d1d5db', 
              borderRadius: '4px',
              fontSize: '0.875rem',
              marginBottom: '8px'
            }}
          />
        </div>

        {/* Location Button */}
        <button 
          type="button"
          onClick={getCurrentLocation}
          style={{
            width: '100%',
            padding: '8px',
            background: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '0.875rem',
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          Use Current Location
        </button>

        {/* Submit Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              background: '#f9fafb',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            style={{
              flex: 2,
              padding: '8px',
              border: 'none',
              borderRadius: '4px',
              background: '#3b82f6',
              color: 'white',
              fontSize: '0.875rem',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Adding...' : 'Add Case'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default QuickAddCase

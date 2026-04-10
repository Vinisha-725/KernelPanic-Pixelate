import { useState } from 'react'

const VolunteerSubmission = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    volunteerName: '',
    volunteerPhone: '',
    volunteerEmail: '',
    location: '',
    beforeImage: null,
    afterImage: null,
    description: '',
    cleanupDate: new Date().toISOString().split('T')[0],
    cleanupTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
    areaSize: '',
    wasteType: '',
    volunteerCount: 1
  })
  
  const [beforePreview, setBeforePreview] = useState(null)
  const [afterPreview, setAfterPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleBeforeImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Before image size should be less than 5MB')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setBeforePreview(reader.result)
        setFormData(prev => ({ ...prev, beforeImage: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAfterImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('After image size should be less than 5MB')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setAfterPreview(reader.result)
        setFormData(prev => ({ ...prev, afterImage: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validation
    if (!formData.volunteerName || !formData.location || !formData.beforeImage || !formData.afterImage) {
      setError('Please fill in all required fields and upload both images')
      setLoading(false)
      return
    }

    try {
      const submissionData = {
        ...formData,
        id: 'volunteer_' + Date.now(),
        status: 'pending_analysis',
        submittedAt: new Date().toISOString()
      }
      
      console.log('Submitting volunteer cleanup:', submissionData)
      await onSubmit(submissionData)
      
      // Reset form
      setFormData({
        volunteerName: '',
        volunteerPhone: '',
        volunteerEmail: '',
        location: '',
        beforeImage: null,
        afterImage: null,
        description: '',
        cleanupDate: new Date().toISOString().split('T')[0],
        cleanupTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
        areaSize: '',
        wasteType: '',
        volunteerCount: 1
      })
      setBeforePreview(null)
      setAfterPreview(null)
      setLoading(false)
    } catch (err) {
      console.error('Submit error:', err)
      setError(err.message || 'Failed to submit cleanup report')
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      background: 'white', 
      padding: '24px', 
      borderRadius: '12px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
        Volunteer Cleanup Report
      </h2>
      
      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Volunteer Information */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: '#333' }}>Volunteer Information</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                Name *
              </label>
              <input 
                type="text" 
                name="volunteerName" 
                value={formData.volunteerName} 
                onChange={handleChange}
                required
                placeholder="Your name"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                Phone
              </label>
              <input 
                type="tel" 
                name="volunteerPhone" 
                value={formData.volunteerPhone} 
                onChange={handleChange}
                placeholder="+91 9876543210"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
              Email
            </label>
            <input 
              type="email" 
              name="volunteerEmail" 
              value={formData.volunteerEmail} 
              onChange={handleChange}
              placeholder="your.email@example.com"
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px',
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>

        {/* Cleanup Details */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: '#333' }}>Cleanup Details</h3>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
              Location *
            </label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange}
              required
              placeholder="e.g., Bandra West, Mumbai"
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                Date *
              </label>
              <input 
                type="date" 
                name="cleanupDate" 
                value={formData.cleanupDate} 
                onChange={handleChange}
                required
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                Time *
              </label>
              <input 
                type="time" 
                name="cleanupTime" 
                value={formData.cleanupTime} 
                onChange={handleChange}
                required
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                Area Size
              </label>
              <select 
                name="areaSize" 
                value={formData.areaSize} 
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
              >
                <option value="">Select size</option>
                <option value="small">Small (1-5 sq m)</option>
                <option value="medium">Medium (5-20 sq m)</option>
                <option value="large">Large (20-50 sq m)</option>
                <option value="xlarge">Extra Large (50+ sq m)</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                Waste Type
              </label>
              <select 
                name="wasteType" 
                value={formData.wasteType} 
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
              >
                <option value="">Select type</option>
                <option value="plastic">Plastic</option>
                <option value="organic">Organic</option>
                <option value="mixed">Mixed Waste</option>
                <option value="construction">Construction</option>
                <option value="electronic">E-Waste</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                Volunteers Count
              </label>
              <input 
                type="number" 
                name="volunteerCount" 
                value={formData.volunteerCount} 
                onChange={handleChange}
                min="1"
                max="50"
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
              Description
            </label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              placeholder="Describe the cleanup activity, challenges faced, etc."
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px',
                fontSize: '0.875rem',
                minHeight: '80px',
                resize: 'vertical'
              }}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: '#333' }}>Photos *</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>
                Before Photo *
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleBeforeImageUpload}
                required
                style={{ fontSize: '0.875rem', marginBottom: '8px' }}
              />
              {beforePreview && (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img 
                    src={beforePreview} 
                    alt="Before cleanup" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '150px', 
                      borderRadius: '6px',
                      border: '1px solid #e5e7eb'
                    }}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    top: '4px', 
                    left: '4px', 
                    background: '#ef4444', 
                    color: 'white', 
                    padding: '2px 6px', 
                    borderRadius: '4px', 
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    BEFORE
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>
                After Photo *
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAfterImageUpload}
                required
                style={{ fontSize: '0.875rem', marginBottom: '8px' }}
              />
              {afterPreview && (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img 
                    src={afterPreview} 
                    alt="After cleanup" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '150px', 
                      borderRadius: '6px',
                      border: '1px solid #e5e7eb'
                    }}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    top: '4px', 
                    left: '4px', 
                    background: '#10b981', 
                    color: 'white', 
                    padding: '2px 6px', 
                    borderRadius: '4px', 
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    AFTER
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            background: '#10b981',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Submitting...' : 'Submit Cleanup Report'}
        </button>
      </form>
    </div>
  )
}

export default VolunteerSubmission

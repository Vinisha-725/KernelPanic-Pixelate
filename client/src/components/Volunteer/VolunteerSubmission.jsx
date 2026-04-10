import { useState } from 'react'
import useAITranslation from '../../hooks/useAITranslation'

const VolunteerSubmission = ({ onSubmit }) => {
  const { t, language, availableLanguages, isTranslating } = useAITranslation()
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

  const handleBeforeImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t('imageSizeError'))
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        // Compress image to reduce storage usage
        compressImage(reader.result, (compressed) => {
          setBeforePreview(compressed)
          setFormData(prev => ({ ...prev, beforeImage: compressed }))
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAfterImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t('imageSizeError'))
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        // Compress image to reduce storage usage
        compressImage(reader.result, (compressed) => {
          setAfterPreview(compressed)
          setFormData(prev => ({ ...prev, afterImage: compressed }))
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    console.log('VolunteerSubmission: Starting form submission...')

    // Validation
    if (!formData.volunteerName || !formData.location || !formData.beforeImage || !formData.afterImage) {
      console.log('VolunteerSubmission: Validation failed')
      setError(t('requiredFields'))
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
      
      console.log('VolunteerSubmission: Submitting data:', submissionData)
      
      if (!onSubmit) {
        throw new Error('onSubmit function is not provided')
      }
      
      await onSubmit(submissionData)
      console.log('VolunteerSubmission: onSubmit completed successfully')
      
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
      console.log('VolunteerSubmission: Form reset completed')
    } catch (err) {
      console.error('VolunteerSubmission: Submit error:', err)
      setError(err.message || t('submitFailed'))
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
        {t('volunteerCleanupReport')}
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
          <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: '#333' }}>{t('volunteerInformation')}</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                {t('name')} *
              </label>
              <input 
                type="text" 
                name="volunteerName" 
                value={formData.volunteerName} 
                onChange={handleChange}
                required
                placeholder={t('namePlaceholder')}
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
                {t('phone')}
              </label>
              <input 
                type="tel" 
                name="volunteerPhone" 
                value={formData.volunteerPhone} 
                onChange={handleChange}
                placeholder={t('phonePlaceholder')}
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
              {t('email')}
            </label>
            <input 
              type="email" 
              name="volunteerEmail" 
              value={formData.volunteerEmail} 
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
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
          <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: '#333' }}>{t('cleanupDetails')}</h3>
          
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
              {t('location')} *
            </label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange}
              required
              placeholder={t('locationPlaceholder')}
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
                {t('date')} *
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
                {t('time')} *
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
                {t('areaSize')}
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
                <option value="">{t('selectSize')}</option>
                <option value="small">{t('small')}</option>
                <option value="medium">{t('medium')}</option>
                <option value="large">{t('large')}</option>
                <option value="xlarge">{t('xlarge')}</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                {t('wasteType')}
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
                <option value="">{t('selectType')}</option>
                <option value="plastic">{t('plastic')}</option>
                <option value="organic">{t('organic')}</option>
                <option value="mixed">{t('mixed')}</option>
                <option value="construction">{t('construction')}</option>
                <option value="electronic">{t('electronic')}</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                {t('volunteersCount')}
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
              {t('description')}
            </label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              placeholder={t('descriptionPlaceholder')}
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
          <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: '#333' }}>{t('photos')} *</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>
                {t('beforePhoto')} *
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
                {t('afterPhoto')} *
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
          {loading ? t('submitting') : t('submitCleanupReport')}
        </button>
      </form>
    </div>
  )
}

export default VolunteerSubmission

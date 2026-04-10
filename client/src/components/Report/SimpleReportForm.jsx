import { useState } from 'react'

const SimpleReportForm = ({ onSubmit, onClose, selectedLocation }) => {
  const [formData, setFormData] = useState({
    severity: 'Medium',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const reportData = {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        severity: formData.severity,
        description: formData.description,
        status: 'Reported'
      }
      
      console.log('Submitting:', reportData)
      await onSubmit(reportData)
      onClose()
    } catch (error) {
      console.error('Submit failed:', error)
      alert('Submit failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h2>Report Garbage</h2>
        
        <div style={{marginBottom: '15px'}}>
          <strong>Location:</strong> {selectedLocation?.lat?.toFixed(4)}, {selectedLocation?.lng?.toFixed(4)}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '15px'}}>
            <label style={{display: 'block', marginBottom: '5px'}}>Severity:</label>
            <select 
              value={formData.severity}
              onChange={(e) => setFormData({...formData, severity: e.target.value})}
              style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div style={{marginBottom: '15px'}}>
            <label style={{display: 'block', marginBottom: '5px'}}>Description:</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the garbage issue..."
              required
              style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px'}}
            />
          </div>

          <div style={{display: 'flex', gap: '10px'}}>
            <button 
              type="button"
              onClick={onClose}
              style={{flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px', background: '#f5f5f5'}}
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              style={{flex: 1, padding: '10px', border: 'none', borderRadius: '4px', background: '#007bff', color: 'white'}}
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SimpleReportForm

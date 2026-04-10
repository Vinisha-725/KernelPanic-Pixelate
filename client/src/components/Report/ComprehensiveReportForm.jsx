import { useState } from 'react'

const ComprehensiveReportForm = ({ onSubmit, onClose, selectedLocation }) => {
  const [formData, setFormData] = useState({
    // Basic Info
    severity: 'Medium',
    description: '',
    photo_url: '',
    
    // Location Details
    landmark: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Complainant Details
    complainant_name: '',
    complainant_phone: '',
    complainant_email: '',
    complainant_address: '',
    
    // Garbage Details
    garbage_type: 'Household',
    estimated_quantity: 'Small',
    accessibility: 'Easy',
    nearby_landmark: '',
    
    // Urgency
    urgency_level: 'Normal',
    preferred_cleanup_time: '',
    
    // Volunteer Event
    organize_event: false,
    event_date: '',
    event_time: '',
    expected_volunteers: '',
    special_requirements: ''
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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // You could reverse geocode to get address details
          console.log('Current location:', position.coords)
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

    if (!selectedLocation) {
      setError('Please select a location on the map first')
      setLoading(false)
      return
    }

    // Validation
    if (!formData.description || !formData.city || !formData.state) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      const reportData = {
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        severity: formData.severity,
        description: formData.description,
        photo_url: formData.photo_url,
        landmark: formData.landmark,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        complainant_name: formData.complainant_name,
        complainant_phone: formData.complainant_phone,
        complainant_email: formData.complainant_email,
        complainant_address: formData.complainant_address,
        garbage_type: formData.garbage_type,
        estimated_quantity: formData.estimated_quantity,
        accessibility: formData.accessibility,
        nearby_landmark: formData.nearby_landmark,
        urgency_level: formData.urgency_level,
        preferred_cleanup_time: formData.preferred_cleanup_time,
        organize_event: formData.organize_event,
        event_date: formData.event_date,
        event_time: formData.event_time,
        expected_volunteers: formData.expected_volunteers,
        special_requirements: formData.special_requirements,
        status: formData.organize_event ? 'Volunteer Event Planned' : 'Reported',
        created_at: new Date().toISOString(),
        id: 'report_' + Date.now()
      }
      
      console.log('Submitting comprehensive report:', reportData)
      
      // Save to localStorage for Cases page
      const existingReports = JSON.parse(localStorage.getItem('testReports') || '[]')
      existingReports.unshift(reportData) // Add to beginning
      localStorage.setItem('testReports', JSON.stringify(existingReports))
      
      await onSubmit(reportData)
      
      // Reset form
      setFormData({
        severity: 'Medium',
        description: '',
        photo_url: '',
        landmark: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        complainant_name: '',
        complainant_phone: '',
        complainant_email: '',
        complainant_address: '',
        garbage_type: 'Household',
        estimated_quantity: 'Small',
        accessibility: 'Easy',
        nearby_landmark: '',
        urgency_level: 'Normal',
        preferred_cleanup_time: '',
        organize_event: false,
        event_date: '',
        event_time: '',
        expected_volunteers: '',
        special_requirements: ''
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
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2 style={{margin: 0, color: '#333'}}>Complete Garbage Report</h2>
          <button onClick={onClose} style={{background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer'}}>×</button>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Location Display */}
          <div style={{marginBottom: '20px', padding: '15px', background: '#f9fafb', borderRadius: '8px'}}>
            <strong>Selected Location:</strong> {selectedLocation?.lat?.toFixed(6)}, {selectedLocation?.lng?.toFixed(6)}
            <br />
            <small style={{color: '#6b7280'}}>Click on the map to change location</small>
          </div>

          {/* Photo Upload */}
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Photo of Garbage *</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{marginBottom: '10px'}} />
            {imagePreview && (
              <div style={{position: 'relative', display: 'inline-block'}}>
                <img src={imagePreview} alt="Preview" style={{maxWidth: '200px', maxHeight: '150px', borderRadius: '8px'}} />
                <button type="button" onClick={() => {setImagePreview(null); setFormData(prev => ({...prev, photo_url: ''}))}} 
                  style={{position: 'absolute', top: '5px', right: '5px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Basic Details */}
          <div style={{marginBottom: '20px'}}>
            <h3 style={{marginBottom: '15px', color: '#333'}}>Basic Details</h3>
            
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px'}}>Severity Level *</label>
              <select name="severity" value={formData.severity} onChange={handleChange} required style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}>
                <option value="Low">Low - Small litter, minimal impact</option>
                <option value="Medium">Medium - Regular garbage pile</option>
                <option value="High">High - Large dump, hazardous</option>
              </select>
            </div>

            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px'}}>Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required
                placeholder="Describe the garbage issue in detail..."
                style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px'}} />
            </div>
          </div>

          {/* Location Details */}
          <div style={{marginBottom: '20px'}}>
            <h3 style={{marginBottom: '15px', color: '#333'}}>Location Details</h3>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '5px'}}>City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required
                  style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '5px'}}>State *</label>
                <select name="state" value={formData.state} onChange={handleChange} required
                  style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}>
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
            </div>

            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px'}}>Pincode</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange}
                placeholder="e.g., 400001"
                style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} />
            </div>

            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px'}}>Landmark/Nearby Location</label>
              <input type="text" name="landmark" value={formData.landmark} onChange={handleChange}
                placeholder="e.g., Near Main Road, Behind School"
                style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} />
            </div>

            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px'}}>Full Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange}
                placeholder="Complete address of the location"
                style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '60px'}} />
            </div>
          </div>

          {/* Garbage Details */}
          <div style={{marginBottom: '20px'}}>
            <h3 style={{marginBottom: '15px', color: '#333'}}>Garbage Details</h3>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '5px'}}>Type of Garbage</label>
                <select name="garbage_type" value={formData.garbage_type} onChange={handleChange}
                  style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}>
                  <option value="Household">Household Waste</option>
                  <option value="Construction">Construction Debris</option>
                  <option value="Industrial">Industrial Waste</option>
                  <option value="Commercial">Commercial Waste</option>
                  <option value="Medical">Medical Waste</option>
                  <option value="E-waste">E-waste</option>
                  <option value="Plastic">Plastic Waste</option>
                  <option value="Mixed">Mixed Waste</option>
                </select>
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '5px'}}>Estimated Quantity</label>
                <select name="estimated_quantity" value={formData.estimated_quantity} onChange={handleChange}
                  style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}>
                  <option value="Small">Small (Bag-sized)</option>
                  <option value="Medium">Medium (Car-sized)</option>
                  <option value="Large">Large (Truck-sized)</option>
                  <option value="Huge">Huge (Multiple trucks)</option>
                </select>
              </div>
            </div>

            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px'}}>Accessibility for Cleanup</label>
              <select name="accessibility" value={formData.accessibility} onChange={handleChange}
                style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}>
                <option value="Easy">Easy - Vehicle can reach</option>
                <option value="Moderate">Moderate - Some walking required</option>
                <option value="Difficult">Difficult - Special equipment needed</option>
              </select>
            </div>
          </div>

          {/* Complainant Details */}
          <div style={{marginBottom: '20px'}}>
            <h3 style={{marginBottom: '15px', color: '#333'}}>Your Details (Optional)</h3>
            
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px'}}>Your Name</label>
              <input type="text" name="complainant_name" value={formData.complainant_name} onChange={handleChange}
                style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '5px'}}>Phone Number</label>
                <input type="tel" name="complainant_phone" value={formData.complainant_phone} onChange={handleChange}
                  placeholder="+91 9876543210"
                  style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '5px'}}>Email</label>
                <input type="email" name="complainant_email" value={formData.complainant_email} onChange={handleChange}
                  placeholder="your@email.com"
                  style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} />
              </div>
            </div>
          </div>

          {/* Volunteer Event */}
          <div style={{marginBottom: '20px'}}>
            <h3 style={{marginBottom: '15px', color: '#333'}}>Organize Cleanup Event</h3>
            
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                <input type="checkbox" name="organize_event" checked={formData.organize_event} onChange={handleChange}
                  style={{marginRight: '8px'}} />
                I want to organize a volunteer cleanup event
              </label>
            </div>

            {formData.organize_event && (
              <div style={{padding: '15px', background: '#f9fafb', borderRadius: '8px'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px'}}>
                  <div>
                    <label style={{display: 'block', marginBottom: '5px'}}>Event Date *</label>
                    <input type="date" name="event_date" value={formData.event_date} onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} />
                  </div>
                  <div>
                    <label style={{display: 'block', marginBottom: '5px'}}>Event Time *</label>
                    <input type="time" name="event_time" value={formData.event_time} onChange={handleChange}
                      style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} />
                  </div>
                </div>

                <div style={{marginBottom: '15px'}}>
                  <label style={{display: 'block', marginBottom: '5px'}}>Expected Volunteers</label>
                  <input type="number" name="expected_volunteers" value={formData.expected_volunteers} onChange={handleChange}
                    placeholder="e.g., 10"
                    min="1" max="100"
                    style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}} />
                </div>

                <div>
                  <label style={{display: 'block', marginBottom: '5px'}}>Special Requirements</label>
                  <textarea name="special_requirements" value={formData.special_requirements} onChange={handleChange}
                    placeholder="Any special equipment, permissions, or requirements needed"
                    style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '60px'}} />
                </div>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div style={{display: 'flex', gap: '10px', marginTop: '30px'}}>
            <button type="button" onClick={onClose}
              style={{flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '6px', background: '#f5f5f5', cursor: 'pointer'}}>
              Cancel
            </button>
            <button type="submit" disabled={loading}
              style={{flex: 2, padding: '12px', border: 'none', borderRadius: '6px', background: '#3b82f6', color: 'white', cursor: 'pointer'}}>
              {loading ? 'Submitting...' : 'Submit Complete Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ComprehensiveReportForm

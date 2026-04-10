import { useState } from 'react'

const ReportForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    category: '',
    imageUrl: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Submit report to backend
    console.log('Report submitted:', formData)
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          placeholder="Enter location or use map"
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
        >
          <option value="">Select category</option>
          <option value="plastic">Plastic Waste</option>
          <option value="organic">Organic Waste</option>
          <option value="electronic">Electronic Waste</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', minHeight: '100px' }}
          placeholder="Describe the garbage issue"
        />
      </div>
      
      <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
        Submit Report
      </button>
    </form>
  )
}

export default ReportForm

import { useState } from 'react';

function ReportForm() {
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    category: '',
    urgency: 'medium',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  return (
    <div className="card fade-in">
      <div className="card-header">
        <h3 className="card-title">📍 Report Garbage Issue</h3>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label" htmlFor="location">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-input"
                placeholder="Enter the exact location or address"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="category">
                Category *
              </label>
              <select
                id="category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="illegal-dumping">Illegal Dumping</option>
                <option value="overflowing-bin">Overflowing Bin</option>
                <option value="street-cleaning">Street Cleaning Required</option>
                <option value="debris-collection">Debris Collection</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="urgency">
                Urgency Level
              </label>
              <select
                id="urgency"
                name="urgency"
                className="form-select"
                value={formData.urgency}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="image">
                Upload Photo
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-input"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              placeholder="Provide detailed description of the garbage issue..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="card" style={{ backgroundColor: 'var(--background)', marginBottom: '1.5rem' }}>
            <div className="card-header">
              <h4 className="card-title">Contact Information (Optional)</h4>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label" htmlFor="contactName">
                    Name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    className="form-input"
                    placeholder="Your name"
                    value={formData.contactName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactPhone">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    className="form-input"
                    placeholder="Your phone number"
                    value={formData.contactPhone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactEmail">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    className="form-input"
                    placeholder="Your email address"
                    value={formData.contactEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn btn-primary">
              📤 Submit Report
            </button>
            <button type="button" className="btn btn-outline" onClick={() => setFormData({
              location: '',
              description: '',
              category: '',
              urgency: 'medium',
              contactName: '',
              contactPhone: '',
              contactEmail: '',
              image: null
            })}>
              🔄 Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportForm;
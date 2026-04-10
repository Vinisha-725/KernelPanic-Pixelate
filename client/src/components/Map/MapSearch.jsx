import { useState } from 'react'

const MapSearch = ({ onSearch, onLocateMe }) => {
  const [pincode, setPincode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!pincode.trim()) return

    setLoading(true)
    try {
      // Mock pincode to coordinates (you can replace with real API)
      const pincodeCoords = {
        '400001': { lat: 18.9647, lng: 72.8255, name: 'Mumbai' },
        '110001': { lat: 28.6139, lng: 77.2090, name: 'Delhi' },
        '560001': { lat: 12.9716, lng: 77.5946, name: 'Bangalore' },
        '600001': { lat: 13.0827, lng: 80.2707, name: 'Chennai' },
        '700001': { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
        '500001': { lat: 17.3850, lng: 78.4867, name: 'Hyderabad' },
        '380001': { lat: 23.0225, lng: 72.5714, name: 'Ahmedabad' },
        '411001': { lat: 18.5204, lng: 73.8567, name: 'Pune' },
        '302001': { lat: 26.9124, lng: 75.7873, name: 'Jaipur' },
        '800001': { lat: 25.5941, lng: 85.1376, name: 'Patna' }
      }

      const coords = pincodeCoords[pincode]
      if (coords) {
        onSearch(coords)
      } else {
        alert('Pincode not found. Try major city pincodes like 400001 (Mumbai), 110001 (Delhi), etc.')
      }
    } catch (error) {
      console.error('Search error:', error)
      alert('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="map-search">
      <form onSubmit={handleSearch}>
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Enter pincode (e.g., 400001)"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="pincode-input"
            maxLength={6}
          />
          <button 
            type="submit" 
            disabled={loading || !pincode.trim()}
            className="search-btn"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button 
            type="button" 
            onClick={onLocateMe}
            className="locate-btn"
            title="Use current location"
          >
            Use My Location
          </button>
        </div>
      </form>

      <div className="search-tips">
        <small>Try: 400001 (Mumbai) | 110001 (Delhi) | 560001 (Bangalore) | 600001 (Chennai)</small>
      </div>

      <style jsx>{`
        .map-search {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 1000;
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          min-width: 300px;
        }
        .search-input-group {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }
        .pincode-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 14px;
        }
        .pincode-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
        .search-btn, .locate-btn {
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          white-space: nowrap;
        }
        .search-btn {
          background: #3b82f6;
          color: white;
        }
        .search-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        .search-btn:hover:not(:disabled) {
          background: #2563eb;
        }
        .locate-btn {
          background: #10b981;
          color: white;
        }
        .locate-btn:hover {
          background: #059669;
        }
        .search-tips {
          color: #6b7280;
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}

export default MapSearch

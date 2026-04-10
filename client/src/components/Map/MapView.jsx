import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'

const MapView = ({ onMapClick, onClaim, onComplete }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markersRef = useRef([])
  const tempMarkerRef = useRef(null)

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize MapLibre GL JS
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [78.9629, 20.5937], // Center of India
      zoom: 5,
      attributionControl: false
    })

    // Add navigation control
    map.current.addControl(new maplibregl.NavigationControl())

    // Add scale control
    map.current.addControl(new maplibregl.ScaleControl({
      maxWidth: 80,
      unit: 'metric'
    }))

    // Handle map clicks
    map.current.on('click', (e) => {
      const coords = e.lngLat
      onMapClick(coords)
    })

    // Load and display reports
    fetchReports()

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports')
      const data = await response.json()
      
      if (data.success) {
        addMarkersToMap(data.data)
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
    }
  }

  const addMarkersToMap = (reports) => {
    if (!map.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    reports.forEach(report => {
      const el = document.createElement('div')
      el.className = `marker marker-${report.severity.toLowerCase()}`
      el.style.width = '16px'
      el.style.height = '16px'
      el.style.borderRadius = '50%'
      el.style.border = '2px solid white'
      el.style.cursor = 'pointer'
      el.title = `${report.severity} severity - ${report.status}`

      // Add status indicator
      const statusIndicator = document.createElement('div')
      statusIndicator.className = `status-indicator status-${report.status.toLowerCase().replace(' ', '-')}`
      el.appendChild(statusIndicator)

      const marker = new maplibregl.Marker(el)
        .setLngLat([report.longitude, report.latitude])
        .addTo(map.current)

      markersRef.current.push(marker)

      // Add popup with actions
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
        <div class="map-popup">
          <h3>${report.severity} Severity</h3>
          <p><strong>Status:</strong> ${report.status}</p>
          <p><strong>Description:</strong> ${report.description}</p>
          <p><strong>Location:</strong> ${report.latitude.toFixed(4)}, ${report.longitude.toFixed(4)}</p>
          ${report.volunteer_id ? `<p><strong>Volunteer:</strong> ${report.volunteer_id}</p>` : ''}
          <div class="popup-actions">
            ${report.status === 'Reported' ? `
              <button onclick="claimReport('${report.id}')" class="btn-claim">🤝 Claim This Spot</button>
            ` : ''}
            ${report.status === 'In Progress' ? `
              <button onclick="completeReport('${report.id}')" class="btn-complete">✅ Mark as Cleaned</button>
            ` : ''}
            ${report.status === 'Cleaned' ? '<span class="status-cleaned">✨ Cleaned</span>' : ''}
          </div>
        </div>
      `)

      marker.on('click', () => {
        popup.setLngLat([report.longitude, report.latitude]).addTo(map.current)
      })
    })

    // Add global functions for popup buttons
    window.claimReport = (reportId) => {
      onClaim(reportId)
      // Close all popups
      document.querySelectorAll('.maplibregl-popup').forEach(popup => popup.remove())
    }

    window.completeReport = (reportId) => {
      onComplete(reportId)
      // Close all popups
      document.querySelectorAll('.maplibregl-popup').forEach(popup => popup.remove())
    }
  }

  return (
    <>
      <div 
        ref={mapContainer} 
        className="map-container" 
        style={{ height: '80vh', width: '100%' }}
      />
      <style jsx>{`
        .map-container {
          border-radius: 8px;
          overflow: hidden;
        }
        .marker {
          transition: transform 0.2s;
          cursor: pointer;
        }
        .marker:hover {
          transform: scale(1.2);
        }
        .marker-low {
          background: #10b981;
        }
        .marker-medium {
          background: #f59e0b;
        }
        .marker-high {
          background: #ef4444;
        }
        .status-indicator {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid white;
        }
        .status-reported {
          background: #3b82f6;
        }
        .status-in-progress {
          background: #f59e0b;
        }
        .status-cleaned {
          background: #10b981;
        }
        .map-popup {
          font-family: Arial, sans-serif;
          max-width: 250px;
        }
        .map-popup h3 {
          margin: 0 0 8px 0;
          color: #333;
        }
        .map-popup p {
          margin: 0 0 4px 0;
          color: #666;
          font-size: 14px;
        }
        .popup-actions {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
        }
        .btn-claim, .btn-complete {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          margin-right: 6px;
        }
        .btn-claim {
          background: #3b82f6;
          color: white;
        }
        .btn-complete {
          background: #10b981;
          color: white;
        }
        .btn-claim:hover, .btn-complete:hover {
          opacity: 0.8;
        }
        .status-cleaned {
          color: #10b981;
          font-weight: bold;
        }
      `}</style>
    </>
  )
}

export default MapView
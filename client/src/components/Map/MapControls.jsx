import React from 'react'

const MapControls = ({ onAddReport, onRefresh }) => {
  return (
    <div className="map-controls">
      <button 
        onClick={onAddReport}
        className="btn btn-primary"
      >
        📍 Report New Spot
      </button>
      <button 
        onClick={onRefresh}
        className="btn btn-secondary"
      >
        🔄 Refresh Map
      </button>
      
      <div className="legend">
        <h4>Severity Legend</h4>
        <div className="legend-item">
          <div className="legend-color low"></div>
          <span>Low</span>
        </div>
        <div className="legend-item">
          <div className="legend-color medium"></div>
          <span>Medium</span>
        </div>
        <div className="legend-item">
          <div className="legend-color high"></div>
          <span>High</span>
        </div>
      </div>

      <style jsx>{`
        .map-controls {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 1000;
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          min-width: 200px;
        }
        .btn {
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 8px;
          width: 100%;
          font-size: 14px;
        }
        .btn-primary {
          background: #3b82f6;
          color: white;
        }
        .btn-secondary {
          background: #6b7280;
          color: white;
        }
        .btn:hover {
          opacity: 0.8;
        }
        .legend {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #e5e7eb;
        }
        .legend h4 {
          margin: 0 0 8px 0;
          font-size: 14px;
          font-weight: bold;
        }
        .legend-item {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
        }
        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 8px;
          border: 2px solid white;
        }
        .legend-color.low {
          background: #10b981;
        }
        .legend-color.medium {
          background: #f59e0b;
        }
        .legend-color.high {
          background: #ef4444;
        }
      `}</style>
    </div>
  )
}

export default MapControls

import React from 'react'

const ReportMarker = ({ report, onClaim, onComplete }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'High': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reported': return '#3b82f6'
      case 'In Progress': return '#f59e0b'
      case 'Cleaned': return '#10b981'
      default: return '#6b7280'
    }
  }

  return (
    <div className="report-marker">
      <div 
        className="marker-dot" 
        style={{ 
          backgroundColor: getSeverityColor(report.severity),
          border: `3px solid ${getStatusColor(report.status)}`
        }}
        title={`${report.severity} severity - ${report.status}`}
      />
      <div className="marker-info">
        <h4>{report.severity}</h4>
        <p>{report.description}</p>
        <div className="marker-actions">
          {report.status === 'Reported' && (
            <button 
              onClick={() => onClaim(report.id)}
              className="btn-claim"
            >
              Claim This Spot
            </button>
          )}
          {report.status === 'In Progress' && (
            <button 
              onClick={() => onComplete(report.id)}
              className="btn-complete"
            >
              Mark as Cleaned
            </button>
          )}
          {report.status === 'Cleaned' && (
            <span className="status-cleaned">✓ Cleaned</span>
          )}
        </div>
      </div>
      <style jsx>{`
        .report-marker {
          position: relative;
          display: inline-block;
          margin: 10px;
          max-width: 200px;
        }
        .marker-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .marker-dot:hover {
          transform: scale(1.2);
        }
        .marker-info {
          display: inline-block;
          vertical-align: middle;
        }
        .marker-info h4 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: bold;
        }
        .marker-info p {
          margin: 0 0 8px 0;
          font-size: 12px;
          color: #666;
        }
        .marker-actions {
          margin-top: 8px;
        }
        .btn-claim, .btn-complete {
          padding: 4px 8px;
          border: none;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
          margin-right: 4px;
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
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}

export default ReportMarker

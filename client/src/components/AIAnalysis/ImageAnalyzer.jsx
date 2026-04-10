import { useState } from 'react'

const ImageAnalyzer = ({ beforeImage, afterImage, onAnalysisComplete }) => {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState(null)

  const analyzeImages = async () => {
    if (!beforeImage || !afterImage) {
      setError('Both before and after images are required for analysis')
      return
    }

    setAnalyzing(true)
    setError(null)

    try {
      // Simulate AI analysis (in production, this would call a real AI service)
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate processing time

      // Mock AI analysis results
      const mockAnalysis = {
        areaCleaned: calculateAreaCleaned(),
        wasteRemoved: calculateWasteRemoved(),
        cleanlinessScore: generateCleanlinessScore(),
        effortLevel: calculateEffortLevel(),
        pointsAwarded: calculatePoints(),
        environmentalImpact: calculateEnvironmentalImpact(),
        aiConfidence: 85 + Math.random() * 10 // 85-95%
      }

      setAnalysis(mockAnalysis)
      onAnalysisComplete(mockAnalysis)
    } catch (err) {
      console.error('AI Analysis error:', err)
      setError('Failed to analyze images. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const calculateAreaCleaned = () => {
    // Simulate area calculation based on image analysis
    const areas = [2.5, 5.8, 12.3, 8.7, 15.2, 3.9, 7.4, 11.1]
    return areas[Math.floor(Math.random() * areas.length)]
  }

  const calculateWasteRemoved = () => {
    // Simulate waste volume calculation
    const volumes = [5, 12, 25, 18, 35, 8, 15, 28]
    return volumes[Math.floor(Math.random() * volumes.length)]
  }

  const generateCleanlinessScore = () => {
    // Generate cleanliness improvement score (0-100)
    return 70 + Math.floor(Math.random() * 30) // 70-100
  }

  const calculateEffortLevel = () => {
    const levels = ['Low', 'Medium', 'High', 'Very High']
    return levels[Math.floor(Math.random() * levels.length)]
  }

  const calculatePoints = () => {
    // Calculate eco-points based on analysis
    const basePoints = 50
    const areaBonus = Math.floor(Math.random() * 30)
    const effortBonus = Math.floor(Math.random() * 20)
    return basePoints + areaBonus + effortBonus
  }

  const calculateEnvironmentalImpact = () => {
    return {
      co2Saved: (Math.random() * 10).toFixed(1) + ' kg',
      waterSaved: (Math.random() * 50).toFixed(1) + ' liters',
      recyclingPotential: Math.floor(Math.random() * 40) + '%',
      ecosystemBenefit: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
    }
  }

  return (
    <div style={{ 
      background: 'white', 
      padding: '20px', 
      borderRadius: '12px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#333', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px' }}>AI Analysis</span>
        {analyzing && <span style={{ color: '#3b82f6', fontSize: '0.875rem' }}>Analyzing...</span>}
      </h3>

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

      {/* Image Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '8px', color: '#666' }}>Before</h4>
          {beforeImage ? (
            <img 
              src={beforeImage} 
              alt="Before cleanup" 
              style={{ 
                width: '100%', 
                height: '200px', 
                objectFit: 'cover', 
                borderRadius: '8px',
                border: '2px solid #ef4444'
              }}
            />
          ) : (
            <div style={{ 
              width: '100%', 
              height: '200px', 
              background: '#f3f4f6', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9ca3af',
              border: '2px dashed #d1d5db'
            }}>
              Before image
            </div>
          )}
        </div>
        
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '8px', color: '#666' }}>After</h4>
          {afterImage ? (
            <img 
              src={afterImage} 
              alt="After cleanup" 
              style={{ 
                width: '100%', 
                height: '200px', 
                objectFit: 'cover', 
                borderRadius: '8px',
                border: '2px solid #10b981'
              }}
            />
          ) : (
            <div style={{ 
              width: '100%', 
              height: '200px', 
              background: '#f3f4f6', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9ca3af',
              border: '2px dashed #d1d5db'
            }}>
              After image
            </div>
          )}
        </div>
      </div>

      {/* Analyze Button */}
      {!analysis && (
        <button
          onClick={analyzeImages}
          disabled={analyzing || !beforeImage || !afterImage}
          style={{
            width: '100%',
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            background: analyzing || !beforeImage || !afterImage ? '#9ca3af' : '#3b82f6',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: analyzing || !beforeImage || !afterImage ? 'not-allowed' : 'pointer',
            opacity: analyzing || !beforeImage || !afterImage ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {analyzing ? (
            <>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid white', 
                borderTop: '2px solid transparent', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite' 
              }}></div>
              Analyzing with AI...
            </>
          ) : (
            <>
              <span>Start AI Analysis</span>
              <span>Calculate Area & Points</span>
            </>
          )}
        </button>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ 
            background: '#f0fdf4', 
            border: '1px solid #bbf7d0', 
            borderRadius: '8px', 
            padding: '16px',
            marginBottom: '16px'
          }}>
            <h4 style={{ color: '#166534', marginBottom: '12px' }}>Analysis Complete!</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534' }}>
                  {analysis.areaCleaned} m²
                </div>
                <div style={{ fontSize: '0.875rem', color: '#66513a' }}>Area Cleaned</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534' }}>
                  {analysis.wasteRemoved} kg
                </div>
                <div style={{ fontSize: '0.875rem', color: '#66513a' }}>Waste Removed</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534' }}>
                  {analysis.cleanlinessScore}%
                </div>
                <div style={{ fontSize: '0.875rem', color: '#66513a' }}>Cleanliness Score</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#166534' }}>
                  {analysis.pointsAwarded}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#66513a' }}>Eco Points</div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '16px' }}>
            <h5 style={{ fontSize: '1rem', marginBottom: '12px', color: '#333' }}>Detailed Analysis</h5>
            
            <div style={{ display: 'grid', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#666' }}>Effort Level:</span>
                <span style={{ fontWeight: '600', color: '#333' }}>{analysis.effortLevel}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#666' }}>AI Confidence:</span>
                <span style={{ fontWeight: '600', color: '#333' }}>{analysis.aiConfidence.toFixed(1)}%</span>
              </div>
              
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                <h6 style={{ fontSize: '0.875rem', marginBottom: '8px', color: '#333' }}>Environmental Impact</h6>
                <div style={{ display: 'grid', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#666' }}>CO2 Saved:</span>
                    <span style={{ fontWeight: '600', color: '#333' }}>{analysis.environmentalImpact.co2Saved}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#666' }}>Water Saved:</span>
                    <span style={{ fontWeight: '600', color: '#333' }}>{analysis.environmentalImpact.waterSaved}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#666' }}>Recycling Potential:</span>
                    <span style={{ fontWeight: '600', color: '#333' }}>{analysis.environmentalImpact.recyclingPotential}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#666' }}>Ecosystem Benefit:</span>
                    <span style={{ fontWeight: '600', color: '#333' }}>{analysis.environmentalImpact.ecosystemBenefit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Re-analyze Button */}
          <button
            onClick={analyzeImages}
            disabled={analyzing}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              background: 'white',
              color: '#6b7280',
              fontSize: '0.875rem',
              cursor: analyzing ? 'not-allowed' : 'pointer',
              marginTop: '12px'
            }}
          >
            Re-analyze Images
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default ImageAnalyzer

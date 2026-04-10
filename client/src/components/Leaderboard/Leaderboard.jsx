import { useState, useEffect } from 'react'

const Leaderboard = ({ timeframe = 'all' }) => {
  const [volunteers, setVolunteers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe)
  const [selectedView, setSelectedView] = useState('points') // 'points', 'area', 'cleanup'

  useEffect(() => {
    fetchLeaderboardData()
  }, [selectedTimeframe])

  const fetchLeaderboardData = async () => {
    setLoading(true)
    try {
      // Get volunteer data from localStorage
      const storedVolunteers = JSON.parse(localStorage.getItem('volunteerSubmissions') || '[]')
      
      // Process and rank volunteers
      const processedData = processVolunteerData(storedVolunteers)
      setVolunteers(processedData)
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const processVolunteerData = (submissions) => {
    // Group by volunteer name and aggregate data
    const volunteerMap = new Map()

    submissions.forEach(submission => {
      const name = submission.volunteerName
      const existing = volunteerMap.get(name) || {
        name: name,
        email: submission.volunteerEmail,
        phone: submission.volunteerPhone,
        totalPoints: 0,
        totalArea: 0,
        totalWaste: 0,
        cleanupCount: 0,
        lastActivity: submission.submittedAt,
        achievements: [],
        bestCleanup: null,
        submissions: []
      }

      // Add submission data
      if (submission.analysis) {
        existing.totalPoints += submission.analysis.pointsAwarded || 0
        existing.totalArea += submission.analysis.areaCleaned || 0
        existing.totalWaste += submission.analysis.wasteRemoved || 0
      }
      existing.cleanupCount += 1
      existing.lastActivity = new Date(Math.max(new Date(existing.lastActivity), new Date(submission.submittedAt)))
      existing.submissions.push(submission)

      // Track best cleanup
      if (submission.analysis && (!existing.bestCleanup || submission.analysis.pointsAwarded > existing.bestCleanup.pointsAwarded)) {
        existing.bestCleanup = {
          points: submission.analysis.pointsAwarded,
          area: submission.analysis.areaCleaned,
          location: submission.location,
          date: submission.cleanupDate
        }
      }

      volunteerMap.set(name, existing)
    })

    // Convert to array and sort
    const volunteersArray = Array.from(volunteerMap.values())
    
    // Sort based on selected view
    return volunteersArray.sort((a, b) => {
      switch (selectedView) {
        case 'points':
          return b.totalPoints - a.totalPoints
        case 'area':
          return b.totalArea - a.totalArea
        case 'cleanup':
          return b.cleanupCount - a.cleanupCount
        default:
          return b.totalPoints - a.totalPoints
      }
    })
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return '1st'
    if (rank === 2) return '2nd'
    if (rank === 3) return '3rd'
    return `${rank}th`
  }

  const getRankColor = (rank) => {
    if (rank === 1) return '#fbbf24' // Gold
    if (rank === 2) return '#9ca3af' // Silver
    if (rank === 3) return '#cd7f32' // Bronze
    return '#6b7280' // Gray
  }

  const getAchievements = (volunteer) => {
    const achievements = []
    
    if (volunteer.totalPoints >= 500) achievements.push({ icon: 'trophy', name: 'Eco Champion', color: '#fbbf24' })
    if (volunteer.totalArea >= 50) achievements.push({ icon: 'tree', name: 'Forest Guardian', color: '#10b981' })
    if (volunteer.cleanupCount >= 10) achievements.push({ icon: 'star', name: 'Dedicated Volunteer', color: '#3b82f6' })
    if (volunteer.totalWaste >= 100) achievements.push({ icon: 'recycle', name: 'Waste Warrior', color: '#8b5cf6' })
    
    return achievements
  }

  if (loading) {
    return (
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '12px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <div>Loading leaderboard...</div>
      </div>
    )
  }

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
        color: 'white', 
        padding: '24px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', margin: '0 0 8px 0' }}>Volunteer Leaderboard</h2>
        <p style={{ margin: 0, opacity: 0.9 }}>Celebrating our environmental heroes</p>
      </div>

      {/* Controls */}
      <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* View Selector */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setSelectedView('points')}
              style={{
                padding: '8px 16px',
                border: selectedView === 'points' ? 'none' : '1px solid #d1d5db',
                borderRadius: '6px',
                background: selectedView === 'points' ? '#3b82f6' : 'white',
                color: selectedView === 'points' ? 'white' : '#374151',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Eco Points
            </button>
            <button
              onClick={() => setSelectedView('area')}
              style={{
                padding: '8px 16px',
                border: selectedView === 'area' ? 'none' : '1px solid #d1d5db',
                borderRadius: '6px',
                background: selectedView === 'area' ? '#10b981' : 'white',
                color: selectedView === 'area' ? 'white' : '#374151',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Area Cleaned
            </button>
            <button
              onClick={() => setSelectedView('cleanup')}
              style={{
                padding: '8px 16px',
                border: selectedView === 'cleanup' ? 'none' : '1px solid #d1d5db',
                borderRadius: '6px',
                background: selectedView === 'cleanup' ? '#8b5cf6' : 'white',
                color: selectedView === 'cleanup' ? 'white' : '#374151',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Cleanups
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div style={{ padding: '20px' }}>
        {volunteers.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#6b7280' 
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>No volunteers yet</div>
            <div>Be the first to submit a cleanup report!</div>
          </div>
        ) : (
          <div>
            {/* Top 3 Volunteers */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {volunteers.slice(0, 3).map((volunteer, index) => (
                  <div
                    key={volunteer.name}
                    style={{
                      background: index === 0 ? '#fef3c7' : index === 1 ? '#f3f4f6' : '#fef9c3',
                      border: `2px solid ${getRankColor(index + 1)}`,
                      borderRadius: '12px',
                      padding: '20px',
                      textAlign: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Rank Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: getRankColor(index + 1),
                      color: 'white',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.875rem'
                    }}>
                      {index + 1}
                    </div>

                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
                      {index === 0 ? 'trophy' : index === 1 ? 'medal' : 'award'}
                    </div>
                    
                    <h3 style={{ fontSize: '1.125rem', margin: '0 0 8px 0', color: '#1f2937' }}>
                      {volunteer.name}
                    </h3>
                    
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '4px' }}>
                      {selectedView === 'points' && `${volunteer.totalPoints} pts`}
                      {selectedView === 'area' && `${volunteer.totalArea} m²`}
                      {selectedView === 'cleanup' && `${volunteer.cleanupCount} cleanups`}
                    </div>
                    
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {volunteer.cleanupCount} cleanups
                    </div>

                    {/* Achievements */}
                    <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                      {getAchievements(volunteer).slice(0, 2).map((achievement, i) => (
                        <div
                          key={i}
                          style={{
                            background: achievement.color,
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {achievement.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rest of the List */}
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '16px', color: '#1f2937' }}>All Volunteers</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {volunteers.map((volunteer, index) => (
                  <div
                    key={volunteer.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      border: index < 3 ? `2px solid ${getRankColor(index + 1)}` : '1px solid #e5e7eb'
                    }}
                  >
                    {/* Rank */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: getRankColor(index + 1),
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginRight: '16px'
                    }}>
                      {index + 1}
                    </div>

                    {/* Volunteer Info */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: '#1f2937' }}>
                        {volunteer.name}
                      </h4>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.875rem', color: '#6b7280' }}>
                        <span>{volunteer.cleanupCount} cleanups</span>
                        <span>{volunteer.totalArea} m²</span>
                        <span>{volunteer.totalWaste} kg</span>
                      </div>
                    </div>

                    {/* Score */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 'bold', 
                        color: '#3b82f6' 
                      }}>
                        {selectedView === 'points' && `${volunteer.totalPoints} pts`}
                        {selectedView === 'area' && `${volunteer.totalArea} m²`}
                        {selectedView === 'cleanup' && `${volunteer.cleanupCount}`}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {selectedView === 'points' && 'Total Points'}
                        {selectedView === 'area' && 'Total Area'}
                        {selectedView === 'cleanup' && 'Total Cleanups'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard

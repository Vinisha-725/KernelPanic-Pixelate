import { useState, useEffect } from 'react'
import Layout from '../components/Common/Layout'
import VolunteerSubmission from '../components/Volunteer/VolunteerSubmission'
import ImageAnalyzer from '../components/AIAnalysis/ImageAnalyzer'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import useAITranslation from '../hooks/useAITranslation'
import imageStorage from '../utils/imageStorage'

const Volunteer = () => {
  const { t, changeLanguage, language } = useAITranslation()
  const [activeTab, setActiveTab] = useState('submit') // 'submit', 'leaderboard', 'gallery'
  const [submissions, setSubmissions] = useState([])
  const [currentSubmission, setCurrentSubmission] = useState(null)
  const [showAnalysis, setShowAnalysis] = useState(false)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const storedSubmissions = JSON.parse(localStorage.getItem('volunteerSubmissions') || '[]')
      setSubmissions(storedSubmissions)
    } catch (error) {
      console.error('Error fetching submissions:', error)
    }
  }

  const handleSubmission = async (submissionData) => {
    try {
      console.log('Volunteer: Starting submission...', submissionData)
      
      // Save to localStorage (without images, just keys)
      try {
        const existingSubmissions = JSON.parse(localStorage.getItem('volunteerSubmissions') || '[]')
        console.log('Volunteer: Existing submissions:', existingSubmissions.length)
        
        // Create submission with image keys (no base64 data)
        const submissionWithKeys = {
          ...submissionData,
          beforeImage: submissionData.beforeImage, // Already a key
          afterImage: submissionData.afterImage,   // Already a key
          id: 'volunteer_' + Date.now(),
          status: 'pending_analysis',
          submittedAt: new Date().toISOString()
        }
        
        existingSubmissions.unshift(submissionWithKeys)
        
        // Keep only latest 50 submissions (no storage issues now)
        if (existingSubmissions.length > 50) {
          existingSubmissions.splice(50)
        }
        
        localStorage.setItem('volunteerSubmissions', JSON.stringify(existingSubmissions))
        console.log('Volunteer: Successfully saved to localStorage')
      } catch (storageError) {
        console.error('Volunteer: Storage error:', storageError)
        // Even localStorage can fail, so save minimal data
        const minimalSubmission = {
          id: 'volunteer_' + Date.now(),
          volunteerName: submissionData.volunteerName,
          location: submissionData.location,
          submittedAt: new Date().toISOString(),
          status: 'pending_analysis'
        }
        
        try {
          const existingSubmissions = JSON.parse(localStorage.getItem('volunteerSubmissions') || '[]')
          existingSubmissions.unshift(minimalSubmission)
          localStorage.setItem('volunteerSubmissions', JSON.stringify(existingSubmissions))
          console.log('Volunteer: Saved minimal submission')
        } catch (finalError) {
          console.error('Volunteer: Complete storage failure:', finalError)
          alert('Storage completely full. Please clear browser data and try again.')
          return
        }
      }
      
      setSubmissions(prev => {
        const updated = [submissionData, ...prev]
        console.log('Volunteer: Updated submissions state:', updated.length)
        return updated
      })
      setCurrentSubmission(submissionData)
      setShowAnalysis(true)
      
      // Use fallback message if translation not available
      const successMessage = t ? t('submissionSuccess') : 'Cleanup report submitted successfully! AI analysis will now calculate your eco points.'
      alert(successMessage)
      console.log('Volunteer: Submission successful!')
    } catch (error) {
      console.error('Volunteer: Error submitting cleanup:', error)
      const errorMessage = t ? t('submitFailed') : 'Failed to submit cleanup report. Please try again.'
      alert(errorMessage)
    }
  }

  const handleAnalysisComplete = (analysis) => {
    if (currentSubmission) {
      // Update submission with analysis results
      const updatedSubmission = {
        ...currentSubmission,
        analysis: analysis,
        status: 'completed',
        analyzedAt: new Date().toISOString()
      }
      
      const updatedSubmissions = submissions.map(sub => 
        sub.id === currentSubmission.id ? updatedSubmission : sub
      )
      
      localStorage.setItem('volunteerSubmissions', JSON.stringify(updatedSubmissions))
      setSubmissions(updatedSubmissions)
      
      alert(t('pointsEarned', { points: analysis.pointsAwarded, area: analysis.areaCleaned }))
    }
  }

  const getFilteredSubmissions = () => {
    return submissions.filter(sub => sub.status === 'completed' && sub.analysis)
  }

  // Load image from IndexedDB for display
  const loadImageFromStorage = async (imageKey) => {
    if (!imageKey) return null
    try {
      return await imageStorage.getImage(imageKey)
    } catch (error) {
      console.error('Error loading image:', error)
      return null
    }
  }

  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Language Toggle */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={() => changeLanguage('en')}
            style={{
              padding: '8px 16px',
              margin: '0 4px',
              border: language === 'en' ? '2px solid #3b82f6' : '1px solid #d1d5db',
              borderRadius: '6px',
              background: language === 'en' ? '#3b82f6' : 'white',
              color: language === 'en' ? 'white' : '#374151',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('hi')}
            style={{
              padding: '8px 16px',
              margin: '0 4px',
              border: language === 'hi' ? '2px solid #3b82f6' : '1px solid #d1d5db',
              borderRadius: '6px',
              background: language === 'hi' ? '#3b82f6' : 'white',
              color: language === 'hi' ? 'white' : '#374151',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            {language === 'hi' ? 'Hindi' : 'Hindi'}
          </button>
          <button
            onClick={() => changeLanguage('te')}
            style={{
              padding: '8px 16px',
              margin: '0 4px',
              border: language === 'te' ? '2px solid #3b82f6' : '1px solid #d1d5db',
              borderRadius: '6px',
              background: language === 'te' ? '#3b82f6' : 'white',
              color: language === 'te' ? 'white' : '#374151',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            {language === 'te' ? 'Telugu' : 'Telugu'}
          </button>
          <button
            onClick={() => changeLanguage('ta')}
            style={{
              padding: '8px 16px',
              margin: '0 4px',
              border: language === 'ta' ? '2px solid #3b82f6' : '1px solid #d1d5db',
              borderRadius: '6px',
              background: language === 'ta' ? '#3b82f6' : 'white',
              color: language === 'ta' ? 'white' : '#374151',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            {language === 'ta' ? 'Tamil' : 'Tamil'}
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '32px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <button
            onClick={() => setActiveTab('submit')}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderBottom: activeTab === 'submit' ? '2px solid #3b82f6' : '2px solid transparent',
              background: 'none',
              color: activeTab === 'submit' ? '#3b82f6' : '#6b7280',
              fontSize: '1rem',
              fontWeight: activeTab === 'submit' ? '600' : '400',
              cursor: 'pointer',
              marginBottom: '-1px'
            }}
          >
            {t('submitCleanup')}
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderBottom: activeTab === 'leaderboard' ? '2px solid #3b82f6' : '2px solid transparent',
              background: 'none',
              color: activeTab === 'leaderboard' ? '#3b82f6' : '#6b7280',
              fontSize: '1rem',
              fontWeight: activeTab === 'leaderboard' ? '600' : '400',
              cursor: 'pointer',
              marginBottom: '-1px'
            }}
          >
            {t('leaderboard')}
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderBottom: activeTab === 'gallery' ? '2px solid #3b82f6' : '2px solid transparent',
              background: 'none',
              color: activeTab === 'gallery' ? '#3b82f6' : '#6b7280',
              fontSize: '1rem',
              fontWeight: activeTab === 'gallery' ? '600' : '400',
              cursor: 'pointer',
                  marginBottom: '-1px'
            }}
          >
            {t('successGallery')}
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'submit' && (
            <div>
              <VolunteerSubmission onSubmit={handleSubmission} />
              
              {/* AI Analysis Section */}
              {showAnalysis && currentSubmission && (
                <div style={{ marginTop: '32px' }}>
                  <ImageAnalyzer
                    beforeImage={currentSubmission.beforeImage}
                    afterImage={currentSubmission.afterImage}
                    onAnalysisComplete={handleAnalysisComplete}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <Leaderboard />
          )}

          {activeTab === 'gallery' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#1f2937', textAlign: 'center' }}>
                Before & After Gallery
              </h2>
              
              {getFilteredSubmissions().length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px', 
                  background: '#f9fafb',
                  borderRadius: '12px',
                  color: '#6b7280'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>No completed cleanups yet</div>
                  <div>Submit your first cleanup to see it featured here!</div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
                  {getFilteredSubmissions().map((submission) => (
                    <div
                      key={submission.id}
                      style={{
                        background: 'white',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      {/* Header */}
                      <div style={{ 
                        background: 'linear-gradient(135deg, #10b981, #059669)', 
                        color: 'white', 
                        padding: '16px'
                      }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.125rem' }}>
                          {submission.volunteerName}
                        </h3>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                          {submission.location} - {new Date(submission.cleanupDate).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Images */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
                        <div style={{ position: 'relative' }}>
                          <img 
                            src={submission.beforeImage} 
                            alt="Before cleanup" 
                            style={{ 
                              width: '100%', 
                              height: '150px', 
                              objectFit: 'cover'
                            }}
                          />
                          <div style={{
                            position: 'absolute',
                            top: '8px',
                            left: '8px',
                            background: '#ef4444',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}>
                            BEFORE
                          </div>
                        </div>
                        
                        <div style={{ position: 'relative' }}>
                          <img 
                            src={submission.afterImage} 
                            alt="After cleanup" 
                            style={{ 
                              width: '100%', 
                              height: '150px', 
                              objectFit: 'cover'
                            }}
                          />
                          <div style={{
                            position: 'absolute',
                            top: '8px',
                            left: '8px',
                            background: '#10b981',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}>
                            AFTER
                          </div>
                        </div>
                      </div>

                      {/* Results */}
                      <div style={{ padding: '16px' }}>
                        {submission.analysis && (
                          <div style={{ 
                            background: '#f0fdf4', 
                            border: '1px solid #bbf7d0', 
                            borderRadius: '8px', 
                            padding: '12px',
                            marginBottom: '12px'
                          }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
                              <div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#166534' }}>
                                  {submission.analysis.pointsAwarded}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#66513a' }}>Points</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#166534' }}>
                                  {submission.analysis.areaCleaned} m²
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#66513a' }}>Area</div>
                              </div>
                              <div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#166534' }}>
                                  {submission.analysis.cleanlinessScore}%
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#66513a' }}>Score</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {submission.description && (
                          <p style={{ 
                            margin: '0', 
                            color: '#6b7280', 
                            fontSize: '0.875rem',
                            lineHeight: '1.4'
                          }}>
                            {submission.description.length > 100 ? 
                              submission.description.substring(0, 100) + '...' : 
                              submission.description
                            }
                          </p>
                        )}

                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginTop: '12px',
                          fontSize: '0.75rem',
                          color: '#9ca3af'
                        }}>
                          <span>{submission.wasteType || 'Mixed waste'}</span>
                          <span>{submission.volunteerCount} volunteer(s)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Volunteer

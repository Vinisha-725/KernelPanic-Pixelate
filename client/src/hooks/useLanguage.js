import { useState, useEffect } from 'react'

const translations = {
  en: {
    // Volunteer Form
    volunteerCleanupReport: "Volunteer Cleanup Report",
    volunteerInformation: "Volunteer Information",
    cleanupDetails: "Cleanup Details",
    photos: "Photos",
    submitCleanupReport: "Submit Cleanup Report",
    submitting: "Submitting...",
    
    // Volunteer Info
    name: "Name",
    phone: "Phone",
    email: "Email",
    namePlaceholder: "Your name",
    phonePlaceholder: "+91 9876543210",
    emailPlaceholder: "your.email@example.com",
    
    // Cleanup Details
    location: "Location",
    date: "Date",
    time: "Time",
    areaSize: "Area Size",
    wasteType: "Waste Type",
    volunteersCount: "Volunteers Count",
    description: "Description",
    locationPlaceholder: "e.g., Bandra West, Mumbai",
    descriptionPlaceholder: "Describe the cleanup activity, challenges faced, etc.",
    
    // Area Sizes
    selectSize: "Select size",
    small: "Small (1-5 sq m)",
    medium: "Medium (5-20 sq m)",
    large: "Large (20-50 sq m)",
    xlarge: "Extra Large (50+ sq m)",
    
    // Waste Types
    selectType: "Select type",
    plastic: "Plastic",
    organic: "Organic",
    mixed: "Mixed Waste",
    construction: "Construction",
    electronic: "E-Waste",
    
    // Photos
    beforePhoto: "Before Photo",
    afterPhoto: "After Photo",
    beforeImage: "Before image",
    afterImage: "After image",
    
    // Validation
    requiredFields: "Please fill in all required fields and upload both images",
    imageSizeError: "Image size should be less than 5MB",
    submitFailed: "Failed to submit cleanup report",
    
    // Success Messages
    submissionSuccess: "Cleanup report submitted successfully! AI analysis will now calculate your eco points.",
    pointsEarned: "Great work! You earned {points} eco points for cleaning {area} m²!",
    analysisComplete: "Analysis Complete!",
    startAIAnalysis: "Start AI Analysis",
    analyzingWithAI: "Analyzing with AI...",
    calculateAreaPoints: "Calculate Area & Points",
    
    // Volunteer Page
    volunteerHub: "Volunteer Hub",
    joinCommunity: "Join our community of environmental heroes and make a difference",
    submitCleanup: "Submit Cleanup",
    leaderboard: "Leaderboard",
    successGallery: "Success Gallery",
    noCompletedCleanups: "No completed cleanups yet",
    submitFirstCleanup: "Submit your first cleanup to see it featured here!",
    
    // Leaderboard
    celebratingHeroes: "Celebrating our environmental heroes",
    viewBy: "View by",
    ecoPoints: "Eco Points",
    areaCleaned: "Area Cleaned",
    cleanups: "Cleanups",
    noVolunteersYet: "No volunteers yet",
    beFirstToSubmit: "Be the first to submit a cleanup report!",
    allVolunteers: "All Volunteers",
    
    // AI Analysis
    aiAnalysis: "AI Analysis",
    analyzing: "Analyzing...",
    analysisComplete: "Analysis Complete!",
    areaCleaned: "Area Cleaned",
    wasteRemoved: "Waste Removed",
    cleanlinessScore: "Cleanliness Score",
    ecoPoints: "Eco Points",
    detailedAnalysis: "Detailed Analysis",
    environmentalImpact: "Environmental Impact",
    co2Saved: "CO2 Saved",
    waterSaved: "Water Saved",
    recyclingPotential: "Recycling Potential",
    ecosystemBenefit: "Ecosystem Benefit",
    reanalyzeImages: "Re-analyze Images",
    clickToViewFullSize: "Click image to view full size",
    noPhotoUploaded: "No photo uploaded for this report",
    
    // Navigation
    home: "Home",
    cases: "Cases",
    volunteer: "Volunteer",
    dashboard: "Dashboard"
  },

  hi: {
    // Volunteer Form
    volunteerCleanupReport: "Volunteer Cleanup Report - HINDI",
    volunteerInformation: "Volunteer Information - HINDI",
    cleanupDetails: "Cleanup Details - HINDI",
    photos: "Photos - HINDI",
    submitCleanupReport: "Submit Cleanup Report - HINDI",
    submitting: "Submitting - HINDI",
    
    // Volunteer Info
    name: "Name - HINDI",
    phone: "Phone - HINDI",
    email: "Email - HINDI",
    namePlaceholder: "Your name",
    phonePlaceholder: "+91 9876543210",
    emailPlaceholder: "your.email@example.com",
    
    // Cleanup Details
    location: "Location",
    date: "Date",
    time: "Time",
    areaSize: "Area Size",
    wasteType: "Waste Type",
    volunteersCount: "Volunteers Count",
    description: "Description",
    locationPlaceholder: "e.g., Bandra West, Mumbai",
    descriptionPlaceholder: "Describe the cleanup activity, challenges faced, etc.",
    
    // Area Sizes
    selectSize: "Select size",
    small: "Small (1-5 sq m)",
    medium: "Medium (5-20 sq m)",
    large: "Large (20-50 sq m)",
    xlarge: "Extra Large (50+ sq m)",
    
    // Waste Types
    selectType: "Select type",
    plastic: "Plastic",
    organic: "Organic",
    mixed: "Mixed Waste",
    construction: "Construction",
    electronic: "E-Waste",
    
    // Photos
    beforePhoto: "Before Photo",
    afterPhoto: "After Photo",
    beforeImage: "Before image",
    afterImage: "After image",
    
    // Validation
    requiredFields: "Please fill in all required fields and upload both images",
    imageSizeError: "Image size should be less than 5MB",
    submitFailed: "Failed to submit cleanup report",
    
    // Success Messages
    submissionSuccess: "Cleanup report submitted successfully! AI analysis will now calculate your eco points.",
    pointsEarned: "Great work! You earned {points} eco points for cleaning {area} m²!",
    analysisComplete: "Analysis Complete!",
    startAIAnalysis: "Start AI Analysis",
    analyzingWithAI: "Analyzing with AI...",
    calculateAreaPoints: "Calculate Area & Points",
    
    // Volunteer Page
    volunteerHub: "Volunteer Hub",
    joinCommunity: "Join our community of environmental heroes and make a difference",
    submitCleanup: "Submit Cleanup",
    leaderboard: "Leaderboard",
    successGallery: "Success Gallery",
    noCompletedCleanups: "No completed cleanups yet",
    submitFirstCleanup: "Submit your first cleanup to see it featured here!",
    
    // Leaderboard
    celebratingHeroes: "Celebrating our environmental heroes",
    viewBy: "View by",
    ecoPoints: "Eco Points",
    areaCleaned: "Area Cleaned",
    cleanups: "Cleanups",
    noVolunteersYet: "No volunteers yet",
    beFirstToSubmit: "Be the first to submit a cleanup report!",
    allVolunteers: "All Volunteers",
    
    // AI Analysis
    aiAnalysis: "AI Analysis",
    analyzing: "Analyzing...",
    analysisComplete: "Analysis Complete!",
    areaCleaned: "Area Cleaned",
    wasteRemoved: "Waste Removed",
    cleanlinessScore: "Cleanliness Score",
    ecoPoints: "Eco Points",
    detailedAnalysis: "Detailed Analysis",
    environmentalImpact: "Environmental Impact",
    co2Saved: "CO2 Saved",
    waterSaved: "Water Saved",
    recyclingPotential: "Recycling Potential",
    ecosystemBenefit: "Ecosystem Benefit",
    reanalyzeImages: "Re-analyze Images",
    clickToViewFullSize: "Click image to view full size",
    noPhotoUploaded: "No photo uploaded for this report",
    
    // Navigation
    home: "Home - HINDI",
    cases: "Cases - HINDI",
    volunteer: "Volunteer - HINDI",
    dashboard: "Dashboard - HINDI"
  },

  ta: {
    // Volunteer Form
    volunteerCleanupReport: "Volunteer Cleanup Report",
    volunteerInformation: "Volunteer Information",
    cleanupDetails: "Cleanup Details",
    photos: "Photos",
    submitCleanupReport: "Submit Cleanup Report",
    submitting: "Submitting...",
    
    // Volunteer Info
    name: "Name",
    phone: "Phone",
    email: "Email",
    namePlaceholder: "Your name",
    phonePlaceholder: "+91 9876543210",
    emailPlaceholder: "your.email@example.com",
    
    // Cleanup Details
    location: "Location",
    date: "Date",
    time: "Time",
    areaSize: "Area Size",
    wasteType: "Waste Type",
    volunteersCount: "Volunteers Count",
    description: "Description",
    locationPlaceholder: "e.g., Bandra West, Mumbai",
    descriptionPlaceholder: "Describe the cleanup activity, challenges faced, etc.",
    
    // Area Sizes
    selectSize: "Select size",
    small: "Small (1-5 sq m)",
    medium: "Medium (5-20 sq m)",
    large: "Large (20-50 sq m)",
    xlarge: "Extra Large (50+ sq m)",
    
    // Waste Types
    selectType: "Select type",
    plastic: "Plastic",
    organic: "Organic",
    mixed: "Mixed Waste",
    construction: "Construction",
    electronic: "E-Waste",
    
    // Photos
    beforePhoto: "Before Photo",
    afterPhoto: "After Photo",
    beforeImage: "Before image",
    afterImage: "After image",
    
    // Validation
    requiredFields: "Please fill in all required fields and upload both images",
    imageSizeError: "Image size should be less than 5MB",
    submitFailed: "Failed to submit cleanup report",
    
    // Success Messages
    submissionSuccess: "Cleanup report submitted successfully! AI analysis will now calculate your eco points.",
    pointsEarned: "Great work! You earned {points} eco points for cleaning {area} m²!",
    analysisComplete: "Analysis Complete!",
    startAIAnalysis: "Start AI Analysis",
    analyzingWithAI: "Analyzing with AI...",
    calculateAreaPoints: "Calculate Area & Points",
    
    // Volunteer Page
    volunteerHub: "Volunteer Hub",
    joinCommunity: "Join our community of environmental heroes and make a difference",
    submitCleanup: "Submit Cleanup",
    leaderboard: "Leaderboard",
    successGallery: "Success Gallery",
    noCompletedCleanups: "No completed cleanups yet",
    submitFirstCleanup: "Submit your first cleanup to see it featured here!",
    
    // Leaderboard
    celebratingHeroes: "Celebrating our environmental heroes",
    viewBy: "View by",
    ecoPoints: "Eco Points",
    areaCleaned: "Area Cleaned",
    cleanups: "Cleanups",
    noVolunteersYet: "No volunteers yet",
    beFirstToSubmit: "Be the first to submit a cleanup report!",
    allVolunteers: "All Volunteers",
    
    // AI Analysis
    aiAnalysis: "AI Analysis",
    analyzing: "Analyzing...",
    analysisComplete: "Analysis Complete!",
    areaCleaned: "Area Cleaned",
    wasteRemoved: "Waste Removed",
    cleanlinessScore: "Cleanliness Score",
    ecoPoints: "Eco Points",
    detailedAnalysis: "Detailed Analysis",
    environmentalImpact: "Environmental Impact",
    co2Saved: "CO2 Saved",
    waterSaved: "Water Saved",
    recyclingPotential: "Recycling Potential",
    ecosystemBenefit: "Ecosystem Benefit",
    reanalyzeImages: "Re-analyze Images",
    clickToViewFullSize: "Click image to view full size",
    noPhotoUploaded: "No photo uploaded for this report",
    
    // Navigation
    home: "Home",
    cases: "Cases",
    volunteer: "Volunteer",
    dashboard: "Dashboard"
  },

  te: {
    // Volunteer Form
    volunteerCleanupReport: "Volunteer Cleanup Report",
    volunteerInformation: "Volunteer Information",
    cleanupDetails: "Cleanup Details",
    photos: "Photos",
    submitCleanupReport: "Submit Cleanup Report",
    submitting: "Submitting...",
    
    // Volunteer Info
    name: "Name",
    phone: "Phone",
    email: "Email",
    namePlaceholder: "Your name",
    phonePlaceholder: "+91 9876543210",
    emailPlaceholder: "your.email@example.com",
    
    // Cleanup Details
    location: "Location",
    date: "Date",
    time: "Time",
    areaSize: "Area Size",
    wasteType: "Waste Type",
    volunteersCount: "Volunteers Count",
    description: "Description",
    locationPlaceholder: "e.g., Bandra West, Mumbai",
    descriptionPlaceholder: "Describe the cleanup activity, challenges faced, etc.",
    
    // Area Sizes
    selectSize: "Select size",
    small: "Small (1-5 sq m)",
    medium: "Medium (5-20 sq m)",
    large: "Large (20-50 sq m)",
    xlarge: "Extra Large (50+ sq m)",
    
    // Waste Types
    selectType: "Select type",
    plastic: "Plastic",
    organic: "Organic",
    mixed: "Mixed Waste",
    construction: "Construction",
    electronic: "E-Waste",
    
    // Photos
    beforePhoto: "Before Photo",
    afterPhoto: "After Photo",
    beforeImage: "Before image",
    afterImage: "After image",
    
    // Validation
    requiredFields: "Please fill in all required fields and upload both images",
    imageSizeError: "Image size should be less than 5MB",
    submitFailed: "Failed to submit cleanup report",
    
    // Success Messages
    submissionSuccess: "Cleanup report submitted successfully! AI analysis will now calculate your eco points.",
    pointsEarned: "Great work! You earned {points} eco points for cleaning {area} m²!",
    analysisComplete: "Analysis Complete!",
    startAIAnalysis: "Start AI Analysis",
    analyzingWithAI: "Analyzing with AI...",
    calculateAreaPoints: "Calculate Area & Points",
    
    // Volunteer Page
    volunteerHub: "Volunteer Hub",
    joinCommunity: "Join our community of environmental heroes and make a difference",
    submitCleanup: "Submit Cleanup",
    leaderboard: "Leaderboard",
    successGallery: "Success Gallery",
    noCompletedCleanups: "No completed cleanups yet",
    submitFirstCleanup: "Submit your first cleanup to see it featured here!",
    
    // Leaderboard
    celebratingHeroes: "Celebrating our environmental heroes",
    viewBy: "View by",
    ecoPoints: "Eco Points",
    areaCleaned: "Area Cleaned",
    cleanups: "Cleanups",
    noVolunteersYet: "No volunteers yet",
    beFirstToSubmit: "Be the first to submit a cleanup report!",
    allVolunteers: "All Volunteers",
    
    // AI Analysis
    aiAnalysis: "AI Analysis",
    analyzing: "Analyzing...",
    analysisComplete: "Analysis Complete!",
    areaCleaned: "Area Cleaned",
    wasteRemoved: "Waste Removed",
    cleanlinessScore: "Cleanliness Score",
    ecoPoints: "Eco Points",
    detailedAnalysis: "Detailed Analysis",
    environmentalImpact: "Environmental Impact",
    co2Saved: "CO2 Saved",
    waterSaved: "Water Saved",
    recyclingPotential: "Recycling Potential",
    ecosystemBenefit: "Ecosystem Benefit",
    reanalyzeImages: "Re-analyze Images",
    clickToViewFullSize: "Click image to view full size",
    noPhotoUploaded: "No photo uploaded for this report",
    
    // Navigation
    home: "Home",
    cases: "Cases",
    volunteer: "Volunteer",
    dashboard: "Dashboard"
  }
}

const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('preferredLanguage')
    return saved || 'en'
  })

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language)
  }, [language])

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key
  }

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
  }

  const getLanguageName = (code) => {
    const names = {
      en: 'English',
      hi: 'Hindi',
      ta: 'Tamil',
      te: 'Telugu'
    }
    return names[code] || code
  }

  return {
    language,
    t,
    changeLanguage,
    getLanguageName,
    availableLanguages: [
      { code: 'en', name: 'English' },
      { code: 'hi', name: 'Hindi' },
      { code: 'ta', name: 'Tamil' },
      { code: 'te', name: 'Telugu' }
    ]
  }
}

export default useLanguage

import { useState, useEffect } from 'react'

const translations = {
  en: {
    volunteerCleanupReport: "Volunteer Cleanup Report",
    volunteerInformation: "Volunteer Information",
    name: "Name",
    phone: "Phone",
    email: "Email",
    cleanupDetails: "Cleanup Details",
    location: "Location",
    date: "Date",
    time: "Time",
    areaSize: "Area Size",
    wasteType: "Waste Type",
    volunteersCount: "Volunteers Count",
    description: "Description",
    photos: "Photos",
    beforePhoto: "Before Photo",
    afterPhoto: "After Photo",
    submitCleanupReport: "Submit Cleanup Report",
    home: "Home",
    cases: "Cases",
    volunteer: "Volunteer",
    dashboard: "Dashboard",
    volunteerHub: "Volunteer Hub",
    submitCleanup: "Submit Cleanup",
    leaderboard: "Leaderboard",
    successGallery: "Success Gallery",
    aiAnalysis: "AI Analysis",
    analyzing: "Analyzing...",
    analysisComplete: "Analysis Complete!"
  },
  hi: {
    volunteerCleanupReport: "स्वयंसेवक सफाई रिपोर्ट",
    volunteerInformation: "स्वयंसेवक जानकारी",
    name: "नाम",
    phone: "फ़ोन",
    email: "ईमेल",
    cleanupDetails: "सफाई का विवरण",
    location: "स्थान",
    date: "तारीख",
    time: "समय",
    areaSize: "क्षेत्र का आकार",
    wasteType: "कचरे का प्रकार",
    volunteersCount: "स्वयंसेवकों की संख्या",
    description: "विवरण",
    photos: "तस्वीरें",
    beforePhoto: "पहले की तस्वीर",
    afterPhoto: "बाद की तस्वीर",
    submitCleanupReport: "सफाई रिपोर्ट जमा करें",
    home: "होम",
    cases: "मामले",
    volunteer: "स्वयंसेवक",
    dashboard: "डैशबोर्ड",
    volunteerHub: "स्वयंसेवक केंद्र",
    submitCleanup: "सफाई जमा करें",
    leaderboard: "लीडरबोर्ड",
    successGallery: "सफलता गैलरी",
    aiAnalysis: "एआई विश्लेषण",
    analyzing: "विश्लेषण हो रहा है...",
    analysisComplete: "विश्लेषण पूरा हुआ!"
  },
  ta: {
    volunteerCleanupReport: "தன்னார்வலர் துப்புரவு அறிக்கை",
    volunteerInformation: "தன்னார்வலர் தகவல்",
    name: "பெயர்",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல்",
    cleanupDetails: "துப்புரவு விவரங்கள்",
    location: "இடம்",
    date: "தேதி",
    time: "நேரம்",
    areaSize: "பரப்பளவு",
    wasteType: "கழிவு வகை",
    volunteersCount: "தன்னார்வலர்களின் எண்ணிக்கை",
    description: "விளக்கம்",
    photos: "புகைப்படங்கள்",
    beforePhoto: "முன்பு எடுத்த புகைப்படம்",
    afterPhoto: "பின்பு எடுத்த புகைப்படம்",
    submitCleanupReport: "துப்புரவு அறிக்கையை சமர்ப்பிக்கவும்",
    home: "முகப்பு",
    cases: "வழக்குகள்",
    volunteer: "தன்னார்வலர்",
    dashboard: "டாஷ்போர்டு",
    volunteerHub: "தன்னார்வலர் மையம்",
    submitCleanup: "துப்புரவை சமர்ப்பிக்கவும்",
    leaderboard: "முன்னணி வரிசை",
    successGallery: "வெற்றி தொகுப்பு",
    aiAnalysis: "AI பகுப்பாய்வு",
    analyzing: "பகுப்பாய்வு செய்யப்படுகிறது...",
    analysisComplete: "பகுப்பாய்வு முடிந்தது!"
  },
  te: {
    volunteerCleanupReport: "స్వచ్ఛంద శుభ్రత నివేదిక",
    volunteerInformation: "స్వచ్ఛంద సేవకుల సమాచారం",
    name: "పేరు",
    phone: "ఫోన్",
    email: "ఈమెయిల్",
    cleanupDetails: "శుభ్రత వివరాలు",
    location: "స్థలం",
    date: "తేదీ",
    time: "సమయం",
    areaSize: "ప్రాంతం పరిమాణం",
    wasteType: "వ్యర్థాల రకం",
    volunteersCount: "స్వచ్ఛంద సేవకుల సంఖ్య",
    description: "వివరణ",
    photos: "ఫోటోలు",
    beforePhoto: "ముందు ఫోటో",
    afterPhoto: "తర్వాత ఫోటో",
    submitCleanupReport: "శుభ్రత నివేదికను సమర్పించండి",
    home: "హోమ్",
    cases: "కేసులు",
    volunteer: "స్వచ్ఛంద సేవకుడు",
    dashboard: "డ్యాష్‌బోర్డ్",
    volunteerHub: "స్వచ్ఛంద కేంద్రం",
    submitCleanup: "శుభ్రతను సమర్పించండి",
    leaderboard: "లీడర్‌బోర్డ్",
    successGallery: "సక్సెస్ గ్యాలరీ",
    aiAnalysis: "AI విశ్లేషణ",
    analyzing: "విశ్లేషిస్తోంది...",
    analysisComplete: "విశ్లేషణ పూర్తయింది!"
  }
}

const useAITranslation = () => {
  const [language, setLanguage] = useState(() => {
    // Basic SSR check for localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferredLanguage')
      return saved || 'en'
    }
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language)
  }, [language])

  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key
  }

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
  }

  const getLanguageName = (code) => {
    const names = {
      en: 'English',
      hi: 'हिन्दी', // Using native scripts for the selector is better UX
      ta: 'தமிழ்',
      te: 'తెలుగు'
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
      { code: 'hi', name: 'हिन्दी' },
      { code: 'ta', name: 'தமிழ்' },
      { code: 'te', name: 'తెలుగు' }
    ]
  }
}

export default useAITranslation

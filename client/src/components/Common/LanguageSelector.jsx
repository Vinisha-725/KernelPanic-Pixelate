import useLanguage from '../../hooks/useLanguage'

const LanguageSelector = () => {
  const { language, changeLanguage, getLanguageName, availableLanguages } = useLanguage()

  return (
    <div style={{ 
      position: 'relative',
      zIndex: 1000
    }}>
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        style={{
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          background: 'white',
          fontSize: '0.875rem',
          cursor: 'pointer',
          minWidth: '120px'
        }}
      >
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector

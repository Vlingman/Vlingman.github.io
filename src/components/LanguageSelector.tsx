import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: 'en' | 'sv') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const currentLang = i18n.language;

  return (
    <div className="flex items-center gap-1">
      {/* English Flag (Half British/Half American) */}
      <button
        onClick={() => changeLanguage('en')}
        className={`relative w-8 h-6 rounded overflow-hidden border-2 transition-all duration-200 ${
          currentLang === 'en' 
            ? 'border-primary shadow-md scale-110' 
            : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
        }`}
        aria-label="Switch to English"
        title="English"
      >
        {/* Combined US/UK Flag */}
        <svg viewBox="0 0 32 24" className="w-full h-full">
          <defs>
            <clipPath id="leftHalf">
              <rect x="0" y="0" width="16" height="24" />
            </clipPath>
            <clipPath id="rightHalf">
              <rect x="16" y="0" width="16" height="24" />
            </clipPath>
          </defs>
          
          {/* US Flag - Left Half */}
          <g clipPath="url(#leftHalf)">
            {/* Red and white stripes */}
            <rect width="32" height="24" fill="#B22234" />
            <rect y="1.85" width="32" height="1.85" fill="#fff" />
            <rect y="5.54" width="32" height="1.85" fill="#fff" />
            <rect y="9.23" width="32" height="1.85" fill="#fff" />
            <rect y="12.92" width="32" height="1.85" fill="#fff" />
            <rect y="16.62" width="32" height="1.85" fill="#fff" />
            <rect y="20.31" width="32" height="1.85" fill="#fff" />
            {/* Blue canton */}
            <rect width="12.8" height="12.92" fill="#3C3B6E" />
            {/* Stars (simplified) */}
            <g fill="#fff">
              <circle cx="2" cy="2" r="0.6" />
              <circle cx="4.5" cy="2" r="0.6" />
              <circle cx="7" cy="2" r="0.6" />
              <circle cx="9.5" cy="2" r="0.6" />
              <circle cx="12" cy="2" r="0.6" />
              <circle cx="3.25" cy="4" r="0.6" />
              <circle cx="5.75" cy="4" r="0.6" />
              <circle cx="8.25" cy="4" r="0.6" />
              <circle cx="10.75" cy="4" r="0.6" />
              <circle cx="2" cy="6" r="0.6" />
              <circle cx="4.5" cy="6" r="0.6" />
              <circle cx="7" cy="6" r="0.6" />
              <circle cx="9.5" cy="6" r="0.6" />
              <circle cx="12" cy="6" r="0.6" />
              <circle cx="3.25" cy="8" r="0.6" />
              <circle cx="5.75" cy="8" r="0.6" />
              <circle cx="8.25" cy="8" r="0.6" />
              <circle cx="10.75" cy="8" r="0.6" />
              <circle cx="2" cy="10" r="0.6" />
              <circle cx="4.5" cy="10" r="0.6" />
              <circle cx="7" cy="10" r="0.6" />
              <circle cx="9.5" cy="10" r="0.6" />
              <circle cx="12" cy="10" r="0.6" />
            </g>
          </g>
          
          {/* UK Flag - Right Half */}
          <g clipPath="url(#rightHalf)">
            {/* Blue background */}
            <rect width="32" height="24" fill="#012169" />
            {/* White diagonals */}
            <path d="M0,0 L32,24 M32,0 L0,24" stroke="#fff" strokeWidth="4" />
            {/* Red diagonals */}
            <path d="M0,0 L32,24" stroke="#C8102E" strokeWidth="2" />
            <path d="M32,0 L0,24" stroke="#C8102E" strokeWidth="2" />
            {/* White cross */}
            <path d="M16,0 V24 M0,12 H32" stroke="#fff" strokeWidth="6" />
            {/* Red cross */}
            <path d="M16,0 V24 M0,12 H32" stroke="#C8102E" strokeWidth="3" />
          </g>
          
          {/* Divider line */}
          <line x1="16" y1="0" x2="16" y2="24" stroke="#000" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </button>

      {/* Swedish Flag */}
      <button
        onClick={() => changeLanguage('sv')}
        className={`relative w-8 h-6 rounded overflow-hidden border-2 transition-all duration-200 ${
          currentLang === 'sv' 
            ? 'border-primary shadow-md scale-110' 
            : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
        }`}
        aria-label="Byt till svenska"
        title="Svenska"
      >
        <svg viewBox="0 0 32 24" className="w-full h-full">
          {/* Blue background */}
          <rect width="32" height="24" fill="#006AA7" />
          {/* Yellow cross */}
          <rect x="10" y="0" width="4" height="24" fill="#FECC00" />
          <rect x="0" y="10" width="32" height="4" fill="#FECC00" />
        </svg>
      </button>
    </div>
  );
};

export default LanguageSelector;

import { useState, useEffect } from 'react';

export type SupportedLanguage = 'en' | 'pt' | 'fr';

interface LanguageHook {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  showLanguagePopup: boolean;
  hideLanguagePopup: () => void;
}

export function useLanguage(): LanguageHook {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  useEffect(() => {
    // Check if user has already selected a language
    const savedLanguage = localStorage.getItem('invelar-language') as SupportedLanguage;
    
    if (savedLanguage && ['en', 'pt', 'fr'].includes(savedLanguage)) {
      // User has already selected a language, don't show popup
      setCurrentLanguage(savedLanguage);
      setShowLanguagePopup(false);
    } else {
      // User hasn't selected a language yet, show popup
      setShowLanguagePopup(true);
    }
  }, []);

  const setLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    localStorage.setItem('invelar-language', language);
    setShowLanguagePopup(false);
  };

  const hideLanguagePopup = () => {
    setShowLanguagePopup(false);
  };

  return {
    currentLanguage,
    setLanguage,
    showLanguagePopup,
    hideLanguagePopup
  };
}
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
  const [showLanguagePopup, setShowLanguagePopup] = useState(true); // Always show on load

  useEffect(() => {
    // Get saved language from localStorage if it exists
    const savedLanguage = localStorage.getItem('invelar-language') as SupportedLanguage;
    if (savedLanguage && ['en', 'pt', 'fr'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
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
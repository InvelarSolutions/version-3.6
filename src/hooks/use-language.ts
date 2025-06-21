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
      // User has previously selected a language
      setCurrentLanguage(savedLanguage);
      setShowLanguagePopup(false);
    } else {
      // First time visitor - show language popup
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
    // If no language was selected, default to English
    if (!localStorage.getItem('invelar-language')) {
      setLanguage('en');
    }
  };

  return {
    currentLanguage,
    setLanguage,
    showLanguagePopup,
    hideLanguagePopup
  };
}
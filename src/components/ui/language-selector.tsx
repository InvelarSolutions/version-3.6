import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguageContext } from '@/contexts/LanguageContext';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷'
  }
];

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguageContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (languageCode: string) => {
    setLanguage(languageCode as 'en' | 'pt' | 'fr');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="border-gray-600 text-black hover:bg-gray-800 hover:text-white transition-all duration-300 min-w-[100px]"
      >
        <Globe className="h-4 w-4 mr-2" />
        <span className="text-sm">{currentLang.flag}</span>
        <ChevronDown className="h-3 w-3 ml-1" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-48 mt-1 bg-[#2a2a2a] border border-gray-600 rounded-md shadow-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-white hover:bg-[#1a1a1a] transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <span className="text-base">{language.flag}</span>
                <span className="text-left">{language.nativeName}</span>
              </div>
              {currentLanguage === language.code && (
                <Check className="h-4 w-4 text-white" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
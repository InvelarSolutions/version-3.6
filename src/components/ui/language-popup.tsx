"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Check, X } from 'lucide-react';

interface LanguagePopupProps {
  isOpen: boolean;
  onLanguageSelect: (language: string) => void;
  onClose: () => void;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    description: 'Continue in English'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    description: 'Continuar em Português'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    description: 'Continuer en Français'
  }
];

export function LanguagePopup({ isOpen, onLanguageSelect, onClose }: LanguagePopupProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setIsAnimating(true);
    
    // Add a small delay for visual feedback before closing
    setTimeout(() => {
      onLanguageSelect(languageCode);
    }, 300);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-[#1a1a1a] border-b border-gray-700 shadow-lg animate-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Card className="bg-[#2a2a2a] border-gray-600 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Choose Your Language</h3>
                  <p className="text-gray-400 text-sm">Select your preferred language to continue</p>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Language Options - Horizontal Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {languages.map((language, index) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  disabled={isAnimating}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-300 group text-left
                    hover:border-white hover:bg-[#1a1a1a] hover:shadow-lg hover:scale-[1.02]
                    focus:outline-none focus:border-white focus:bg-[#1a1a1a]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${selectedLanguage === language.code 
                      ? 'border-green-400 bg-green-400/10 shadow-lg scale-[1.02]' 
                      : 'border-gray-600 bg-[#1a1a1a]'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{language.flag}</span>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-white transition-colors">
                          {language.nativeName}
                        </h4>
                        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                          {language.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Selection Indicator */}
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
                      ${selectedLanguage === language.code 
                        ? 'border-green-400 bg-green-400' 
                        : 'border-gray-500 group-hover:border-gray-300'
                      }
                    `}>
                      {selectedLanguage === language.code && (
                        <Check className="h-3 w-3 text-white animate-in zoom-in-50 duration-200" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-4 pt-4 border-t border-gray-600">
              <p className="text-center text-xs text-gray-500">
                You can change your language preference at any time in settings
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
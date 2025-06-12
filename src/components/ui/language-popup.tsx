"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Check } from 'lucide-react';

interface LanguagePopupProps {
  isOpen: boolean;
  onLanguageSelect: (language: string) => void;
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

export function LanguagePopup({ isOpen, onLanguageSelect }: LanguagePopupProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)'
        }}
      />
      
      {/* Popup Container */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-in fade-in-0 zoom-in-95 duration-500">
        <Card className="bg-[#1a1a1a] border-gray-700 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1f1f1f] p-8 text-center border-b border-gray-700">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Globe className="h-8 w-8 text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Choose Your Language</h2>
            <p className="text-gray-400 text-sm">Select your preferred language to continue</p>
          </div>

          {/* Language Options */}
          <CardContent className="p-6 space-y-3">
            {languages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                disabled={isAnimating}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-300 group
                  hover:border-white hover:bg-[#2a2a2a] hover:shadow-lg hover:scale-[1.02]
                  focus:outline-none focus:border-white focus:bg-[#2a2a2a]
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
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{language.flag}</span>
                    <div className="text-left">
                      <h3 className="text-white font-semibold text-lg group-hover:text-white transition-colors">
                        {language.nativeName}
                      </h3>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                        {language.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Selection Indicator */}
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
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
          </CardContent>

          {/* Footer */}
          <div className="bg-[#0f0f0f] p-4 border-t border-gray-700">
            <p className="text-center text-xs text-gray-500">
              You can change your language preference at any time in settings
            </p>
          </div>
        </Card>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating orbs for visual appeal */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-green-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}
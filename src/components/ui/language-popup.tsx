"use client";

import { useState, useRef, useEffect } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling by setting body styles
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
      
      // Store scroll position for restoration
      document.body.setAttribute('data-scroll-y', scrollY.toString());
    } else {
      // Restore scrolling when popup closes
      const scrollY = document.body.getAttribute('data-scroll-y');
      
      // Reset body styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10));
        document.body.removeAttribute('data-scroll-y');
      }
    }

    // Cleanup function to ensure styles are reset if component unmounts
    return () => {
      if (isOpen) {
        const scrollY = document.body.getAttribute('data-scroll-y');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY, 10));
          document.body.removeAttribute('data-scroll-y');
        }
      }
    };
  }, [isOpen]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setIsAnimating(true);
    
    // Add a small delay for visual feedback before closing
    setTimeout(() => {
      onLanguageSelect(languageCode);
    }, 300);
  };

  // Always render the popup when isOpen is true, with explicit visibility
  if (!isOpen) return null;

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      {/* Popup Container - Centered in viewport */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-md"
        style={{
          animation: 'fadeInScale 0.5s ease-out forwards',
          transform: 'scale(0.9)',
          opacity: '0'
        }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-modal-title"
      >
        <Card className="bg-[#1a1a1a] border-gray-700 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1f1f1f] p-8 text-center border-b border-gray-700">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Globe className="h-8 w-8 text-black" />
            </div>
            <h2 id="language-modal-title" className="text-2xl font-bold text-white mb-2">
              Choose Your Language
            </h2>
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
                  focus:outline-none focus:border-white focus:bg-[#2a2a2a] focus:ring-2 focus:ring-white/20
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${selectedLanguage === language.code 
                    ? 'border-green-400 bg-green-400/10 shadow-lg scale-[1.02]' 
                    : 'border-gray-600 bg-[#1a1a1a]'
                  }
                `}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                aria-label={`Select ${language.nativeName}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl" role="img" aria-label={`${language.name} flag`}>
                      {language.flag}
                    </span>
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
                      <Check className="h-3 w-3 text-white" style={{ animation: 'zoomIn 0.2s ease-out' }} />
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

      {/* Add CSS animations inline */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
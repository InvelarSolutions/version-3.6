import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Settings, 
  ArrowRight, 
  Star, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  MessageCircle,
  Globe,
  PhoneCall,
  Send,
  Shield,
  Zap,
  Target,
  Users,
  Award,
  Lightbulb,
  BarChart3,
  Copy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedChatbot } from '@/components/ui/enhanced-chatbot';
import { LanguagePopup } from '@/components/ui/language-popup';
import { useLanguageContext } from '@/contexts/LanguageContext';

// Custom hook for intersection observer with scroll-based fade
const useScrollFadeAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollFade, setScrollFade] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate fade based on element position relative to viewport
        let fadeValue = 1;
        
        // Fade out when element is moving out of view at the top
        if (elementTop < 0) {
          const fadeStart = -elementHeight * 0.2; // Start fading when 20% is out of view
          const fadeEnd = -elementHeight * 0.8; // Complete fade when 80% is out of view
          
          if (elementTop > fadeStart) {
            fadeValue = 1;
          } else if (elementTop < fadeEnd) {
            fadeValue = 0.1; // Minimum opacity
          } else {
            const progress = (elementTop - fadeStart) / (fadeEnd - fadeStart);
            fadeValue = Math.max(0.1, progress);
          }
        }
        
        // Fade in when element is entering from bottom
        if (elementTop > windowHeight) {
          const fadeStart = windowHeight + elementHeight * 0.2;
          const fadeEnd = windowHeight - elementHeight * 0.2;
          
          if (elementTop < fadeStart && elementTop > fadeEnd) {
            const progress = (fadeStart - elementTop) / (fadeStart - fadeEnd);
            fadeValue = Math.min(1, Math.max(0.1, progress));
          } else if (elementTop >= fadeStart) {
            fadeValue = 0.1;
          }
        }
        
        setScrollFade(fadeValue);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return [ref, isVisible, scrollFade] as const;
};

// Simple intersection observer for basic fade-in animations
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

export default function HomePage() {
  const { t, showLanguagePopup, setLanguage, currentLanguage } = useLanguageContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEmailBubble, setShowEmailBubble] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showPhoneBubble, setShowPhoneBubble] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isVoiceflowChatOpen, setIsVoiceflowChatOpen] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState({ width: 1920, height: 1080 }); // Default server-safe values
  
  const emailBubbleRef = useRef<HTMLDivElement>(null);
  const mailButtonRef = useRef<HTMLButtonElement>(null);
  const phoneBubbleRef = useRef<HTMLDivElement>(null);
  const phoneButtonRef = useRef<HTMLButtonElement>(null);
  const voiceflowWidget = useRef<any>(null);
  const voiceflowContainer = useRef<HTMLDivElement>(null);
  const voiceflowScriptLoaded = useRef<boolean>(false);

  // Set screen dimensions after component mounts on client side
  useEffect(() => {
    const updateScreenDimensions = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateScreenDimensions(); // Initial calculation
    window.addEventListener('resize', updateScreenDimensions);
    
    return () => window.removeEventListener('resize', updateScreenDimensions);
  }, []);

  // Initialize Voiceflow chat widget based on language
  useEffect(() => {
    // Only initialize if language popup is not showing (user has selected a language)
    if (showLanguagePopup) return;

    // Create a separate container for Voiceflow outside of React's control
    const voiceflowDiv = document.createElement('div');
    voiceflowDiv.id = 'voiceflow-chat-root';
    voiceflowDiv.style.cssText = `
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      z-index: 50;
      width: 400px;
      height: 600px;
      max-width: calc(100vw - 2rem);
      max-height: calc(100vh - 2rem);
      transition: all 0.3s ease-in-out;
      opacity: 0;
      transform: translateY(1rem);
      pointer-events: none;
    `;
    
    document.body.appendChild(voiceflowDiv);
    voiceflowContainer.current = voiceflowDiv;

    // Load Voiceflow script if not already loaded
    if (!voiceflowScriptLoaded.current) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = function() {
        voiceflowScriptLoaded.current = true;
        loadVoiceflowWidget();
      };
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      document.head.appendChild(script);
    } else {
      // Script already loaded, just load the widget
      loadVoiceflowWidget();
    }

    function loadVoiceflowWidget() {
      if (window.voiceflow && voiceflowDiv) {
        try {
          // Determine which project ID to use based on language
          let projectID;
          let voiceUrl = "https://runtime-api.voiceflow.com";
          let generalUrl = 'https://general-runtime.voiceflow.com';
          
          switch (currentLanguage) {
            case 'pt':
              projectID = '684b0132b587d28b5753321d'; // Portuguese chatbot
              break;
            case 'fr':
              projectID = '684d80d82d4ddb7e92582ee4'; // French chatbot
              voiceUrl = "https://runtime-api.voiceflow.com/"; // French uses trailing slash
              generalUrl = 'https://general-runtime.voiceflow.com/'; // French uses trailing slash
              break;
            default:
              projectID = '6846c5cea6a8e2a7db8c1327'; // English chatbot (default)
              break;
          }

          console.log(`Loading Voiceflow chatbot for language: ${currentLanguage}, Project ID: ${projectID}`);

          voiceflowWidget.current = window.voiceflow.chat.load({
            verify: { projectID },
            url: generalUrl,
            versionID: 'production',
            voice: {
              url: voiceUrl
            },
            render: {
              mode: 'embedded',
              target: voiceflowDiv
            }
          });
        } catch (error) {
          console.error('Error loading Voiceflow widget:', error);
        }
      }
    }

    return () => {
      // Cleanup container on unmount or language change
      if (voiceflowContainer.current && document.body.contains(voiceflowContainer.current)) {
        document.body.removeChild(voiceflowContainer.current);
      }
    };
  }, [currentLanguage, showLanguagePopup]); // Re-run when language changes or popup closes

  // Control Voiceflow chat visibility
  useEffect(() => {
    if (voiceflowContainer.current) {
      if (isVoiceflowChatOpen) {
        voiceflowContainer.current.style.opacity = '1';
        voiceflowContainer.current.style.transform = 'translateY(0)';
        voiceflowContainer.current.style.pointerEvents = 'auto';
      } else {
        voiceflowContainer.current.style.opacity = '0';
        voiceflowContainer.current.style.transform = 'translateY(1rem)';
        voiceflowContainer.current.style.pointerEvents = 'none';
      }
    }
  }, [isVoiceflowChatOpen]);

  // Handle clicking outside email bubble
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEmailBubble &&
        emailBubbleRef.current &&
        mailButtonRef.current &&
        !emailBubbleRef.current.contains(event.target as Node) &&
        !mailButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmailBubble(false);
        setEmailCopied(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmailBubble]);

  // Handle clicking outside phone bubble
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showPhoneBubble &&
        phoneBubbleRef.current &&
        phoneButtonRef.current &&
        !phoneBubbleRef.current.contains(event.target as Node) &&
        !phoneButtonRef.current.contains(event.target as Node)
      ) {
        setShowPhoneBubble(false);
        setPhoneCopied(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPhoneBubble]);

  // Add fade animations to specified sections
  const [aboutRef, aboutVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [powerRef, powerVisible, powerScrollFade] = useScrollFadeAnimation();
  const [testimonialsRef, testimonialsVisible, testimonialsScrollFade] = useScrollFadeAnimation();
  const [ctaRef, ctaVisible, ctaScrollFade] = useScrollFadeAnimation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleChatClick = () => {
    // Always use Voiceflow chatbots for all languages
    setIsVoiceflowChatOpen(!isVoiceflowChatOpen);
  };

  const handleVoiceflowChatClick = () => {
    setIsVoiceflowChatOpen(!isVoiceflowChatOpen);
  };

  const handleMailClick = () => {
    setShowEmailBubble(!showEmailBubble);
    setEmailCopied(false);
    // Close phone bubble if open
    setShowPhoneBubble(false);
    setPhoneCopied(false);
  };

  const handlePhoneClick = () => {
    setShowPhoneBubble(!showPhoneBubble);
    setPhoneCopied(false);
    // Close email bubble if open
    setShowEmailBubble(false);
    setEmailCopied(false);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('invelarsolutions@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText('+352 691 100 088');
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy phone:', err);
    }
  };

  const handleLanguageSelect = (language: string) => {
    setLanguage(language as 'en' | 'pt' | 'fr');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Language Selection Popup */}
      <LanguagePopup 
        isOpen={showLanguagePopup} 
        onLanguageSelect={handleLanguageSelect}
      />

      {/* Global Ring Pattern - Behind everything but over backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {/* Calculate maximum ring size needed to fill screen */}
        {Array.from({ length: 30 }, (_, i) => {
          const size = 120 + (i * 100); // Start at 120px, increase by 100px each ring
          const maxScreenDimension = Math.max(screenDimensions.width, screenDimensions.height);
          
          // Only render rings that are needed to fill the screen
          if (size > maxScreenDimension * 1.8) return null;
          
          const baseOpacity = Math.max(0.03, 0.25 - (i * 0.008)); // Reduced base opacity
          
          // Calculate fade based on distance from center and scroll position
          const heroHeight = screenDimensions.height * 0.8;
          const aboutSectionStart = heroHeight;
          const aboutSectionHeight = screenDimensions.height * 1.2; // Approximate about section height
          
          // Get current scroll position
          const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
          
          // Calculate ring position relative to viewport - MOVED LOWER
          const ringCenterY = (screenDimensions.height * 0.4) - scrollY; // Changed from 0.35 to 0.4 (moved down)
          const ringRadius = size / 2;
          
          // Fade calculation for rings extending into about section
          let fadeMultiplier = 1;
          
          // If ring extends into about section area
          if (ringCenterY + ringRadius > aboutSectionStart) {
            const extensionIntoAbout = (ringCenterY + ringRadius) - aboutSectionStart;
            const maxExtension = aboutSectionHeight * 0.6; // Allow rings to extend 60% into about section
            
            if (extensionIntoAbout > maxExtension) {
              fadeMultiplier = 0.05; // Very faded but still visible
            } else {
              // Gradual fade as rings extend into about section
              fadeMultiplier = 1 - (extensionIntoAbout / maxExtension) * 0.8;
            }
          }
          
          const finalOpacity = baseOpacity * fadeMultiplier;
          
          return (
            <div
              key={i}
              className="absolute rounded-full border border-gray-600"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderColor: `rgba(107, 114, 128, ${finalOpacity})`,
                left: '50%',
                top: '40%', // Changed from 35% to 40% (moved down)
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
        
        {/* Additional ultra-large rings to ensure full screen coverage */}
        {Array.from({ length: 20 }, (_, i) => {
          const size = 3000 + (i * 300); // Very large outer rings
          const maxScreenDimension = Math.max(screenDimensions.width, screenDimensions.height);
          
          // Only render if needed for screen coverage
          if (size > maxScreenDimension * 2.5) return null;
          
          const baseOpacity = Math.max(0.01, 0.08 - (i * 0.004)); // Very subtle outer rings
          
          // Similar fade calculation for ultra-large rings
          const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
          const ringCenterY = (screenDimensions.height * 0.4) - scrollY; // Changed from 0.35 to 0.4
          const heroHeight = screenDimensions.height * 0.8;
          const aboutSectionStart = heroHeight;
          const aboutSectionHeight = screenDimensions.height * 1.2;
          
          let fadeMultiplier = 1;
          const ringRadius = size / 2;
          
          if (ringCenterY + ringRadius > aboutSectionStart) {
            const extensionIntoAbout = (ringCenterY + ringRadius) - aboutSectionStart;
            const maxExtension = aboutSectionHeight * 0.8; // Allow more extension for ultra-large rings
            
            if (extensionIntoAbout > maxExtension) {
              fadeMultiplier = 0.02;
            } else {
              fadeMultiplier = 1 - (extensionIntoAbout / maxExtension) * 0.9;
            }
          }
          
          const finalOpacity = baseOpacity * fadeMultiplier;
          
          return (
            <div
              key={`ultra-${i}`}
              className="absolute rounded-full border border-gray-600"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderColor: `rgba(107, 114, 128, ${finalOpacity})`,
                left: '50%',
                top: '40%', // Changed from 35% to 40% (moved down)
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </div>

      {/* Glass Morphism Header Background */}
      <div className="header-background"></div>

      {/* Fixed Logo */}
      <div className="logo">
        <img
          src="/Invelar Logo.png"
          alt={t('alt.logo')}
          className="h-16 w-auto"
        />
      </div>

      {/* Fixed Navigation Buttons */}
      <div className="nav-buttons">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            {t('nav.about')}
          </button>
          <button 
            onClick={() => scrollToSection('services')}
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            {t('nav.services')}
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            {t('nav.testimonials')}
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            {t('nav.contact')}
          </button>
          <Button 
            id="chat-button"
            onClick={handleChatClick}
            variant="outline"
            size="sm"
            className="border-gray-600 text-black hover:bg-gray-800 hover:text-white transition-all duration-300 p-2"
            title={t('nav.aiChat')}
          >
            <MessageCircle className="h-4 w-4 text-black" />
          </Button>
          <Link to="/contact">
            <Button className="bg-white text-black hover:bg-gray-100 font-semibold transition-all duration-300 transform hover:scale-105">
              {t('nav.getStarted')}
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden transition-transform duration-300 hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation with Glass Effect */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 mobile-menu-glass rounded-lg p-4 animate-in slide-in-from-top duration-300 min-w-[200px]">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
              >
                {t('nav.services')}
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
              >
                {t('nav.testimonials')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
              >
                {t('nav.contact')}
              </button>
              <Button 
                onClick={handleChatClick}
                variant="outline"
                size="sm"
                className="border-gray-600 text-black hover:bg-gray-800 hover:text-white transition-all duration-300 w-fit"
              >
                <MessageCircle className="h-4 w-4 mr-2 text-black" />
                {t('nav.aiChat')}
              </Button>
              <Link to="/contact">
                <Button className="bg-white text-black hover:bg-gray-100 font-semibold w-fit transition-all duration-300 transform hover:scale-105">
                  {t('nav.getStarted')}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Hero Section - Adjusted padding to account for fixed header */}
      <section className="relative px-4 pt-32 pb-32 overflow-hidden min-h-screen">
        {/* Background Gradient - Behind rings */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#151515] z-0" />

        {/* Content - In front of rings - MOVED EVEN HIGHER */}
        <div className="relative max-w-6xl mx-auto text-center z-20 flex flex-col justify-center min-h-[calc(100vh-20rem)]">
          <div className="mb-6">
            <img
              src="/Invelar Logo.png"
              alt={t('alt.logo')}
              className="mx-auto h-32 md:h-48 w-auto"
            />
          </div>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            {t('hero.tagline')}
          </p>
          <Link to="/contact">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {t('hero.getStarted')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Invelar - WITH FADE ANIMATIONS */}
      <section id="about" className="py-32 px-4 bg-[#151515] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={aboutRef}
            className={`transition-all duration-1000 ease-out ${
              aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Main About Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">{t('about.title')}</h2>
            </div>

            {/* Mission & Vision Grid */}
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
              <Card className="bg-[#2a2a2a] border-gray-700 hover:border-gray-500 transition-all duration-500 group">
                <CardContent className="p-10">
                  <div className="flex items-center mb-6">
                    <Target className="h-12 w-12 text-blue-400 mr-4" />
                    <h3 className="text-2xl font-bold text-blue-400">{t('about.mission.title')}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {t('about.mission.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#2a2a2a] border-gray-700 hover:border-gray-500 transition-all duration-500 group">
                <CardContent className="p-10">
                  <div className="flex items-center mb-6">
                    <Lightbulb className="h-12 w-12 text-yellow-400 mr-4" />
                    <h3 className="text-2xl font-bold text-yellow-400">{t('about.vision.title')}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {t('about.vision.description')}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* What Sets Us Apart */}
            <div className="mb-20">
              <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('about.whatSetsUsApart.title')}</h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Zap,
                    title: t('about.whatSetsUsApart.feature1.title'),
                    description: t('about.whatSetsUsApart.feature1.description'),
                    color: "text-yellow-400"
                  },
                  {
                    icon: Shield,
                    title: t('about.whatSetsUsApart.feature2.title'),
                    description: t('about.whatSetsUsApart.feature2.description'),
                    color: "text-green-400"
                  },
                  {
                    icon: BarChart3,
                    title: t('about.whatSetsUsApart.feature3.title'),
                    description: t('about.whatSetsUsApart.feature3.description'),
                    color: "text-blue-400"
                  }
                ].map((feature, index) => (
                  <Card key={index} className="bg-[#2a2a2a] border-gray-700 hover:border-gray-500 transition-all duration-500 group transform hover:scale-105">
                    <CardContent className="p-8 text-center">
                      <feature.icon className={`h-16 w-16 ${feature.color} mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`} />
                      <h4 className={`text-xl font-bold mb-4 ${feature.color}`}>{feature.title}</h4>
                      <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Why Choose Invelar */}
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-12">{t('about.whyChoose.title')}</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {[
                  {
                    icon: Award,
                    title: t('about.whyChoose.feature1.title'),
                    description: t('about.whyChoose.feature1.description'),
                    color: "text-yellow-400"
                  },
                  {
                    icon: Users,
                    title: t('about.whyChoose.feature2.title'),
                    description: t('about.whyChoose.feature2.description'),
                    color: "text-blue-400"
                  },
                  {
                    icon: Zap,
                    title: t('about.whyChoose.feature3.title'),
                    description: t('about.whyChoose.feature3.description'),
                    color: "text-yellow-400"
                  },
                  {
                    icon: Shield,
                    title: t('about.whyChoose.feature4.title'),
                    description: t('about.whyChoose.feature4.description'),
                    color: "text-green-400"
                  }
                ].map((reason, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-[#2a2a2a] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:shadow-lg hover:scale-110">
                      <reason.icon className={`h-10 w-10 ${reason.color}`} />
                    </div>
                    <h4 className={`font-bold mb-2 ${reason.color}`}>{reason.title}</h4>
                    <p className="text-gray-400 text-sm">{reason.description}</p>
                  </div>
                ))}
              </div>

              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  {t('about.whyChoose.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Power of Automation - WITH DARKER BACKGROUND AND FADE ANIMATIONS */}
      <section className="py-20 px-4 relative">
        {/* Darker background that covers rings */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] z-10" />
        
        <div className="max-w-6xl mx-auto relative z-20">
          <div 
            ref={powerRef}
            className="transition-all duration-1000 ease-out"
            style={{ 
              opacity: powerVisible ? powerScrollFade : 0,
              transform: `translateY(${powerVisible ? 0 : 48}px) scale(${0.95 + (powerScrollFade * 0.05)})`
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('power.title')}</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: DollarSign,
                  value: t('power.stat1.value'),
                  label: t('power.stat1.label'),
                  color: "text-green-400"
                },
                {
                  icon: Clock,
                  value: t('power.stat2.value'),
                  label: t('power.stat2.label'),
                  color: "text-blue-400"
                },
                {
                  icon: TrendingUp,
                  value: t('power.stat3.value'),
                  label: t('power.stat3.label'),
                  color: "text-purple-400"
                }
              ].map((stat, index) => (
                <div key={index} className="text-center transition-all duration-700 ease-out transform hover:scale-105">
                  <div className="bg-[#2a2a2a] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:shadow-lg">
                    <stat.icon className={`h-10 w-10 ${stat.color}`} />
                  </div>
                  <h3 className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                {t('power.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services - WITH FADE ANIMATIONS */}
      <section id="services" className="py-20 px-4 bg-[#151515] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={servicesRef}
            className={`transition-all duration-1000 ease-out ${
              servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">{t('services.title')}</h2>
            <p className="text-lg text-gray-400 text-center mb-16 max-w-3xl mx-auto">
              {t('services.subtitle')}
            </p>
            
            {/* Core Services Grid - Removed Workflow Automation and AI Agents */}
            <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 mb-16">
              {[
                {
                  icon: MessageCircle,
                  title: t('services.chatbot.title'),
                  description: t('services.chatbot.description'),
                  features: [
                    t('services.chatbot.feature1'),
                    t('services.chatbot.feature2'),
                    t('services.chatbot.feature3'),
                    t('services.chatbot.feature4')
                  ],
                  color: "text-green-400",
                  link: "/services/chatbot"
                },
                {
                  icon: Globe,
                  title: t('services.website.title'),
                  description: t('services.website.description'),
                  features: [
                    t('services.website.feature1'),
                    t('services.website.feature2'),
                    t('services.website.feature3'),
                    t('services.website.feature4')
                  ],
                  color: "text-cyan-400",
                  link: "/services/website"
                },
                {
                  icon: Send,
                  title: t('services.email.title'),
                  description: t('services.email.description'),
                  features: [
                    t('services.email.feature1'),
                    t('services.email.feature2'),
                    t('services.email.feature3'),
                    t('services.email.feature4')
                  ],
                  color: "text-orange-400",
                  link: "/services/email"
                },
                {
                  icon: PhoneCall,
                  title: t('services.calling.title'),
                  description: t('services.calling.description'),
                  features: [
                    t('services.calling.feature1'),
                    t('services.calling.feature2'),
                    t('services.calling.feature3'),
                    t('services.calling.feature4')
                  ],
                  color: "text-pink-400",
                  link: "/services/calling"
                }
              ].map((service, index) => (
                <Link key={index} to={service.link} target="_blank" rel="noopener noreferrer">
                  <Card className="bg-[#2a2a2a] border-gray-700 hover:border-gray-500 transition-all duration-500 group transform hover:scale-105 hover:shadow-xl cursor-pointer h-full">
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="mb-6">
                        <service.icon className={`h-12 w-12 ${service.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <h3 className={`text-xl font-bold mb-4 ${service.color}`}>{service.title}</h3>
                      <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                        {service.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 bg-white rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto pt-4 border-t border-gray-600">
                        <p className="text-xs text-gray-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                          Click here for more information
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Custom Integrations Section - Non-clickable */}
            <div className="bg-[#2a2a2a] rounded-2xl p-8 md:p-12 border border-gray-700">
              <div className="text-center mb-8">
                <Settings className="h-16 w-16 mx-auto text-white mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{t('services.custom.title')}</h3>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  {t('services.custom.description')}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h4 className="font-semibold mb-3 text-white">{t('services.custom.feature1.title')}</h4>
                  <p className="text-gray-400 text-sm">{t('services.custom.feature1.description')}</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-3 text-white">{t('services.custom.feature2.title')}</h4>
                  <p className="text-gray-400 text-sm">{t('services.custom.feature2.description')}</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-3 text-white">{t('services.custom.feature3.title')}</h4>
                  <p className="text-gray-400 text-sm">{t('services.custom.feature3.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - WITH BACKGROUND AND FADE ANIMATIONS */}
      <section id="testimonials" className="py-20 px-4 relative">
        {/* Background that covers rings */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#151515] z-10" />
        
        <div className="max-w-6xl mx-auto relative z-20">
          <div 
            ref={testimonialsRef}
            className="transition-all duration-1000 ease-out"
            style={{ 
              opacity: testimonialsVisible ? testimonialsScrollFade : 0,
              transform: `translateY(${testimonialsVisible ? 0 : 48}px) scale(${0.95 + (testimonialsScrollFade * 0.05)})`
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('testimonials.title')}</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  text: t('testimonials.testimonial1'),
                  author: t('testimonials.author1')
                },
                {
                  text: t('testimonials.testimonial2'),
                  author: t('testimonials.author2')
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-[#2a2a2a] border-gray-700 transition-all duration-700 ease-out transform hover:scale-105 hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t border-gray-600 pt-4">
                      <p className="font-semibold text-white">{testimonial.author}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - WITH FADE ANIMATIONS */}
      <section id="contact" className="py-20 px-4 bg-[#151515] relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={ctaRef}
            className="transition-all duration-1000 ease-out"
            style={{ 
              opacity: ctaVisible ? ctaScrollFade : 0,
              transform: `translateY(${ctaVisible ? 0 : 48}px) scale(${0.95 + (ctaScrollFade * 0.05)})`
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('cta.title')}</h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              {t('cta.subtitle')}
            </p>
            
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                {t('cta.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - WITH BACKGROUND */}
      <footer className="py-12 px-4 border-t border-gray-800 relative">
        {/* Background that covers rings */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#151515] z-10" />
        
        <div className="max-w-6xl mx-auto relative z-20">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <img
                  src="/Invelar Logo.png"
                  alt={t('alt.logo')}
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-gray-400 mb-4">
                {t('footer.tagline')}
              </p>
              <div className="flex space-x-4 relative">
                {/* Mail Button with Email Bubble */}
                <div className="relative">
                  <button
                    ref={mailButtonRef}
                    onClick={handleMailClick}
                    className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                  
                  {/* Email Bubble */}
                  {showEmailBubble && (
                    <div
                      ref={emailBubbleRef}
                      className="absolute bottom-8 left-0 bg-[#2a2a2a] border border-gray-600 rounded-lg p-4 shadow-lg z-50 min-w-[280px] animate-in fade-in-0 zoom-in-95 duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold text-sm">Contact Email</h4>
                        <button
                          onClick={handleCopyEmail}
                          className="text-gray-400 hover:text-white transition-colors duration-200"
                          title="Copy email"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-300 text-sm font-mono">invelarsolutions@gmail.com</p>
                      </div>
                      {emailCopied && (
                        <p className="text-green-400 text-xs mt-2 animate-in fade-in-0 duration-200">
                          ✓ Email copied to clipboard
                        </p>
                      )}
                      {/* Arrow pointing down to the mail icon */}
                      <div className="absolute -bottom-1 left-2 w-2 h-2 bg-[#2a2a2a] border-r border-b border-gray-600 transform rotate-45"></div>
                    </div>
                  )}
                </div>
                
                {/* Phone Button with Phone Bubble */}
                <div className="relative">
                  <button
                    ref={phoneButtonRef}
                    onClick={handlePhoneClick}
                    className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                  
                  {/* Phone Bubble */}
                  {showPhoneBubble && (
                    <div
                      ref={phoneBubbleRef}
                      className="absolute bottom-8 left-0 bg-[#2a2a2a] border border-gray-600 rounded-lg p-4 shadow-lg z-50 min-w-[280px] animate-in fade-in-0 zoom-in-95 duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold text-sm">Phone Number</h4>
                        <button
                          onClick={handleCopyPhone}
                          className="text-gray-400 hover:text-white transition-colors duration-200"
                          title="Copy phone number"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-300 text-sm font-mono">+352 691 100 088</p>
                      </div>
                      {phoneCopied && (
                        <p className="text-green-400 text-xs mt-2 animate-in fade-in-0 duration-200">
                          ✓ Phone number copied to clipboard
                        </p>
                      )}
                      {/* Arrow pointing down to the phone icon */}
                      <div className="absolute -bottom-1 left-2 w-2 h-2 bg-[#2a2a2a] border-r border-b border-gray-600 transform rotate-45"></div>
                    </div>
                  )}
                </div>
                
                <MapPin className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors duration-300">{t('nav.about')}</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors duration-300">{t('nav.services')}</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors duration-300">{t('nav.contact')}</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">{t('footer.privacyPolicy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">{t('footer.termsOfService')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">{t('footer.cookiePolicy')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
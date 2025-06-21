import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NavigationLink } from '@/components/ui/navigation-link';
import { ArrowLeft, Globe, CheckCircle, Smartphone, Search, BarChart3, Zap, Shield, Users, TrendingUp } from 'lucide-react';
import { useLanguageContext } from '@/contexts/LanguageContext';

export default function WebsiteServicePage() {
  const { t } = useLanguageContext();

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Glass Morphism Header Background */}
      <div className="header-background"></div>

      {/* Fixed Logo */}
      <div className="logo">
        <NavigationLink to="/" className="flex items-center">
          <img
            src="/Invelar Logo.png"
            alt={t('alt.logo')}
            className="h-16 w-auto"
          />
        </NavigationLink>
      </div>

      {/* Fixed Navigation Button */}
      <div className="nav-buttons">
        <NavigationLink to="/">
          <Button 
            variant="outline" 
            className="border-gray-600 text-black hover:bg-gray-800 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </NavigationLink>
      </div>

      {/* Main Content */}
      <main className="py-20 px-4 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="bg-[#2a2a2a] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
              <Globe className="h-12 w-12 text-cyan-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400">Website Creation & Optimization</h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Build high-converting, AI-powered websites that adapt to user behavior and optimize themselves for maximum engagement and business growth.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-green-400">300% Higher Conversions</h3>
                <p className="text-gray-300">AI-optimized layouts and content that automatically improve conversion rates.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <Smartphone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-blue-400">Mobile-First Design</h3>
                <p className="text-gray-300">Responsive designs that look perfect on all devices and screen sizes.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-purple-400">SEO Optimized</h3>
                <p className="text-gray-300">Built-in SEO optimization to rank higher in search results from day one.</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Website Solutions</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Advanced Features</h3>
                <div className="space-y-4">
                  {[
                    'AI-powered content optimization and personalization',
                    'Advanced analytics and user behavior tracking',
                    'Automated A/B testing for continuous improvement',
                    'Lightning-fast loading speeds with CDN integration',
                    'Enterprise-grade security and SSL certificates',
                    'Seamless CRM and marketing tool integrations'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Business Impact</h3>
                <div className="space-y-4">
                  {[
                    'Increase lead generation by up to 400%',
                    'Reduce bounce rates with engaging user experiences',
                    'Improve search engine rankings and visibility',
                    'Automate customer acquisition processes',
                    'Scale your online presence globally',
                    'Generate revenue 24/7 with optimized funnels'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Website Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Website Solutions We Create</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Corporate Websites',
                  description: 'Professional business websites that establish credibility and generate leads.',
                  icon: Shield
                },
                {
                  title: 'E-commerce Platforms',
                  description: 'High-converting online stores with AI-powered product recommendations.',
                  icon: TrendingUp
                },
                {
                  title: 'Landing Pages',
                  description: 'Conversion-optimized pages for marketing campaigns and lead generation.',
                  icon: Zap
                },
                {
                  title: 'SaaS Platforms',
                  description: 'Scalable web applications with user dashboards and subscription management.',
                  icon: BarChart3
                },
                {
                  title: 'Portfolio Sites',
                  description: 'Stunning showcases for creative professionals and agencies.',
                  icon: Globe
                },
                {
                  title: 'Membership Sites',
                  description: 'Exclusive content platforms with user authentication and payment processing.',
                  icon: Users
                }
              ].map((type, index) => (
                <Card key={index} className="bg-[#2a2a2a] border-gray-700 hover:border-gray-500 transition-all duration-300">
                  <CardContent className="p-6">
                    <type.icon className="h-10 w-10 text-cyan-400 mb-4" />
                    <h3 className="text-lg font-bold mb-3 text-cyan-400">{type.title}</h3>
                    <p className="text-gray-300 text-sm">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Development Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Development Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '1',
                  title: 'Strategy & Planning',
                  description: 'Define goals, target audience, and create a comprehensive project roadmap.'
                },
                {
                  step: '2',
                  title: 'Design & Prototyping',
                  description: 'Create stunning designs and interactive prototypes for your approval.'
                },
                {
                  step: '3',
                  title: 'Development & Integration',
                  description: 'Build your website with cutting-edge technology and seamless integrations.'
                },
                {
                  step: '4',
                  title: 'Launch & Optimization',
                  description: 'Deploy your website and continuously optimize for better performance.'
                }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="bg-cyan-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold">{phase.step}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-cyan-400">{phase.title}</h3>
                  <p className="text-gray-300 text-sm">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Cutting-Edge Technology</h2>
            <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">Frontend Technologies</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• React & Next.js for dynamic interfaces</li>
                    <li>• TypeScript for robust development</li>
                    <li>• Tailwind CSS for modern styling</li>
                    <li>• Progressive Web App capabilities</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">Backend & Infrastructure</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Cloud-native architecture</li>
                    <li>• API-first development approach</li>
                    <li>• Scalable database solutions</li>
                    <li>• CDN and caching optimization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">AI & Analytics</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Machine learning personalization</li>
                    <li>• Advanced user behavior tracking</li>
                    <li>• Automated content optimization</li>
                    <li>• Real-time performance monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-[#2a2a2a] rounded-2xl p-12 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Dream Website?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your online presence with a website that not only looks amazing but drives real business results.
            </p>
            <NavigationLink to="/contact">
              <Button 
                size="lg" 
                className="bg-cyan-400 text-black hover:bg-cyan-300 text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project
              </Button>
            </NavigationLink>
          </div>
        </div>
      </main>
    </div>
  );
}
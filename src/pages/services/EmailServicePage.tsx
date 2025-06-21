import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Send, CheckCircle, TrendingUp, Users, Clock, Target, BarChart3, Zap, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';

export default function EmailServicePage() {
  const { t } = useLanguageContext();

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Glass Morphism Header Background */}
      <div className="header-background"></div>

      {/* Fixed Logo */}
      <div className="logo">
        <Link to="/" className="flex items-center">
          <img
            src="/Invelar Logo.png"
            alt={t('alt.logo')}
            className="h-16 w-auto"
          />
        </Link>
      </div>

      {/* Fixed Navigation Button */}
      <div className="nav-buttons">
        <Link to="/">
          <Button 
            variant="outline" 
            className="border-gray-600 text-black hover:bg-gray-800 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <main className="py-20 px-4 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="bg-[#2a2a2a] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
              <Send className="h-12 w-12 text-orange-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-orange-400">Automated Email Systems</h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Create intelligent email campaigns that personalize content, optimize send times, and nurture leads automatically with AI-driven precision.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-green-400">60% Higher Conversions</h3>
                <p className="text-gray-300">AI-optimized email content and timing that dramatically improves conversion rates.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-blue-400">Perfect Timing</h3>
                <p className="text-gray-300">Send emails at the optimal time for each individual recipient automatically.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-purple-400">Personalization at Scale</h3>
                <p className="text-gray-300">Deliver personalized content to thousands of subscribers simultaneously.</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Advanced Email Automation Features</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-orange-400">Smart Automation</h3>
                <div className="space-y-4">
                  {[
                    'Behavioral trigger-based email sequences',
                    'AI-powered subject line optimization',
                    'Dynamic content personalization',
                    'Automated A/B testing and optimization',
                    'Smart send time optimization',
                    'Advanced segmentation and targeting'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-orange-400">Business Results</h3>
                <div className="space-y-4">
                  {[
                    'Increase email open rates by 40%+',
                    'Boost click-through rates by 60%+',
                    'Reduce unsubscribe rates significantly',
                    'Automate lead nurturing processes',
                    'Improve customer lifetime value',
                    'Scale email marketing without additional staff'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Email Campaign Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Email Campaign Solutions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Welcome Series',
                  description: 'Onboard new subscribers with engaging, educational email sequences.',
                  icon: Mail
                },
                {
                  title: 'Lead Nurturing',
                  description: 'Convert prospects into customers with targeted, value-driven content.',
                  icon: Target
                },
                {
                  title: 'Abandoned Cart Recovery',
                  description: 'Recover lost sales with personalized cart abandonment campaigns.',
                  icon: TrendingUp
                },
                {
                  title: 'Customer Retention',
                  description: 'Keep customers engaged with loyalty programs and exclusive offers.',
                  icon: Users
                },
                {
                  title: 'Re-engagement Campaigns',
                  description: 'Win back inactive subscribers with compelling comeback offers.',
                  icon: Zap
                },
                {
                  title: 'Product Launches',
                  description: 'Build excitement and drive sales for new product releases.',
                  icon: BarChart3
                }
              ].map((campaign, index) => (
                <Card key={index} className="bg-[#2a2a2a] border-gray-700 hover:border-gray-500 transition-all duration-300">
                  <CardContent className="p-6">
                    <campaign.icon className="h-10 w-10 text-orange-400 mb-4" />
                    <h3 className="text-lg font-bold mb-3 text-orange-400">{campaign.title}</h3>
                    <p className="text-gray-300 text-sm">{campaign.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Implementation Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Implementation Process</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '1',
                  title: 'Strategy Development',
                  description: 'Analyze your audience and create a comprehensive email marketing strategy.'
                },
                {
                  step: '2',
                  title: 'Setup & Integration',
                  description: 'Configure email platforms and integrate with your existing systems.'
                },
                {
                  step: '3',
                  title: 'Campaign Creation',
                  description: 'Design and build automated email sequences with AI optimization.'
                },
                {
                  step: '4',
                  title: 'Launch & Optimize',
                  description: 'Deploy campaigns and continuously optimize based on performance data.'
                }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="bg-orange-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold">{phase.step}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-orange-400">{phase.title}</h3>
                  <p className="text-gray-300 text-sm">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Proven Results</h2>
            <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">40%</div>
                  <div className="text-gray-300">Higher Open Rates</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">60%</div>
                  <div className="text-gray-300">Increased Conversions</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">75%</div>
                  <div className="text-gray-300">Time Savings</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">300%</div>
                  <div className="text-gray-300">ROI Improvement</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-[#2a2a2a] rounded-2xl p-12 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6">Ready to Supercharge Your Email Marketing?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your email campaigns with AI-powered automation that delivers results while you focus on growing your business.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-orange-400 text-black hover:bg-orange-300 text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Launch Your Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, PhoneCall, CheckCircle, Users, Clock, TrendingUp, Mic, Calendar, Target, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '@/contexts/LanguageContext';

export default function CallingServicePage() {
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
              <PhoneCall className="h-12 w-12 text-pink-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pink-400">AI Calling Systems</h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Deploy AI-powered calling systems for lead qualification, appointment setting, and customer follow-ups with human-like conversation quality at unlimited scale.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-blue-400">Unlimited Capacity</h3>
                <p className="text-gray-300">Handle thousands of calls simultaneously without hiring additional staff.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-green-400">24/7 Availability</h3>
                <p className="text-gray-300">Never miss a lead with round-the-clock automated calling capabilities.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-purple-400">Higher Conversion</h3>
                <p className="text-gray-300">Consistent, optimized conversations that convert more prospects into customers.</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Advanced AI Calling Features</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-pink-400">Intelligent Capabilities</h3>
                <div className="space-y-4">
                  {[
                    'Natural voice synthesis indistinguishable from humans',
                    'Real-time conversation adaptation and responses',
                    'Multi-language support for global outreach',
                    'Sentiment analysis and emotional intelligence',
                    'CRM integration and automatic data synchronization',
                    'Custom scripts and conversation flows'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-pink-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-pink-400">Business Impact</h3>
                <div className="space-y-4">
                  {[
                    'Reduce calling costs by up to 80%',
                    'Increase lead qualification efficiency by 500%',
                    'Improve appointment booking rates significantly',
                    'Eliminate human error and inconsistency',
                    'Scale outreach efforts without limits',
                    'Generate detailed call analytics and insights'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-pink-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Perfect Applications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Lead Qualification',
                  description: 'Automatically qualify prospects and route hot leads to your sales team.',
                  icon: Target
                },
                {
                  title: 'Appointment Setting',
                  description: 'Schedule meetings, consultations, and demos with qualified prospects.',
                  icon: Calendar
                },
                {
                  title: 'Customer Follow-ups',
                  description: 'Maintain relationships with automated check-ins and satisfaction surveys.',
                  icon: Users
                },
                {
                  title: 'Market Research',
                  description: 'Conduct surveys and gather market insights at scale.',
                  icon: BarChart3
                },
                {
                  title: 'Event Promotion',
                  description: 'Promote webinars, events, and product launches to your audience.',
                  icon: Mic
                },
                {
                  title: 'Debt Collection',
                  description: 'Handle payment reminders and collection calls professionally.',
                  icon: PhoneCall
                }
              ].map((useCase, index) => (
                <Card key={index} className="bg-[#2a2a2a] border-gray-700 hover:border-gray-500 transition-all duration-300">
                  <CardContent className="p-6">
                    <useCase.icon className="h-10 w-10 text-pink-400 mb-4" />
                    <h3 className="text-lg font-bold mb-3 text-pink-400">{useCase.title}</h3>
                    <p className="text-gray-300 text-sm">{useCase.description}</p>
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
                  title: 'Script Development',
                  description: 'Create optimized conversation scripts tailored to your specific goals.'
                },
                {
                  step: '2',
                  title: 'Voice Training',
                  description: 'Train AI voice models to match your brand tone and personality.'
                },
                {
                  step: '3',
                  title: 'System Integration',
                  description: 'Connect with your CRM, calendar, and other business systems.'
                },
                {
                  step: '4',
                  title: 'Launch & Monitor',
                  description: 'Deploy your AI calling system and monitor performance metrics.'
                }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="bg-pink-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold">{phase.step}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-pink-400">{phase.title}</h3>
                  <p className="text-gray-300 text-sm">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Advanced Technology</h2>
            <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-pink-400">Voice Technology</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Neural voice synthesis</li>
                    <li>• Real-time speech processing</li>
                    <li>• Emotion detection and response</li>
                    <li>• Multi-accent voice options</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-pink-400">AI Intelligence</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Natural language understanding</li>
                    <li>• Context-aware responses</li>
                    <li>• Learning from interactions</li>
                    <li>• Predictive conversation flows</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-pink-400">Integration & Analytics</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• CRM synchronization</li>
                    <li>• Real-time call monitoring</li>
                    <li>• Detailed performance analytics</li>
                    <li>• Compliance and recording</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Proven Performance</h2>
            <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-gray-700">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-pink-400 mb-2">80%</div>
                  <div className="text-gray-300">Cost Reduction</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-pink-400 mb-2">500%</div>
                  <div className="text-gray-300">Efficiency Increase</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
                  <div className="text-gray-300">Availability</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-pink-400 mb-2">95%</div>
                  <div className="text-gray-300">Accuracy Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-[#2a2a2a] rounded-2xl p-12 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6">Ready to Scale Your Calling Operations?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your outreach with AI calling systems that work around the clock to qualify leads and grow your business.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-pink-400 text-black hover:bg-pink-300 text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Deploy Your AI Callers
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
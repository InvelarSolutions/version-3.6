import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NavigationLink } from '@/components/ui/navigation-link';
import { ArrowLeft, MessageCircle, CheckCircle, Users, Clock, TrendingUp, Globe, Zap, Shield } from 'lucide-react';
import { useLanguageContext } from '@/contexts/LanguageContext';

export default function ChatbotServicePage() {
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
              <MessageCircle className="h-12 w-12 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-400">AI Chatbot Implementation</h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Revolutionize your customer service with intelligent chatbots that understand context, handle complex queries, and provide personalized responses 24/7.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-blue-400">90% Faster Response</h3>
                <p className="text-gray-300">Instant responses to customer queries, eliminating wait times and improving satisfaction.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-purple-400">24/7 Availability</h3>
                <p className="text-gray-300">Never miss a customer inquiry with round-the-clock automated support.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#2a2a2a] border-gray-700">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4 text-green-400">Lead Qualification</h3>
                <p className="text-gray-300">Automatically qualify and route leads to the right team members.</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Features</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-green-400">Advanced Capabilities</h3>
                <div className="space-y-4">
                  {[
                    'Natural Language Processing for human-like conversations',
                    'Multi-language support for global customer base',
                    'Context-aware responses that remember conversation history',
                    'Integration with CRM and customer databases',
                    'Sentiment analysis for escalation management',
                    'Custom training on your specific business knowledge'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-green-400">Business Benefits</h3>
                <div className="space-y-4">
                  {[
                    'Reduce customer service costs by up to 70%',
                    'Handle unlimited simultaneous conversations',
                    'Improve customer satisfaction scores',
                    'Generate qualified leads automatically',
                    'Provide consistent brand messaging',
                    'Scale support without hiring additional staff'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'E-commerce Support',
                  description: 'Handle order inquiries, product recommendations, and return processes automatically.',
                  icon: Globe
                },
                {
                  title: 'Lead Generation',
                  description: 'Qualify prospects, schedule demos, and capture contact information 24/7.',
                  icon: Users
                },
                {
                  title: 'Customer Onboarding',
                  description: 'Guide new customers through setup processes and answer common questions.',
                  icon: Zap
                },
                {
                  title: 'Technical Support',
                  description: 'Provide instant troubleshooting and escalate complex issues to human agents.',
                  icon: Shield
                },
                {
                  title: 'Appointment Booking',
                  description: 'Schedule meetings, consultations, and service appointments automatically.',
                  icon: Clock
                },
                {
                  title: 'FAQ Automation',
                  description: 'Answer frequently asked questions instantly with accurate, up-to-date information.',
                  icon: MessageCircle
                }
              ].map((useCase, index) => (
                <Card key={index} className="bg-[#2a2a2a] border-gray-700 hover:border-gray-500 transition-all duration-300">
                  <CardContent className="p-6">
                    <useCase.icon className="h-10 w-10 text-green-400 mb-4" />
                    <h3 className="text-lg font-bold mb-3 text-green-400">{useCase.title}</h3>
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
                  title: 'Discovery & Planning',
                  description: 'We analyze your customer interactions and define chatbot objectives.'
                },
                {
                  step: '2',
                  title: 'Design & Development',
                  description: 'Create conversation flows and train the AI on your specific business knowledge.'
                },
                {
                  step: '3',
                  title: 'Integration & Testing',
                  description: 'Seamlessly integrate with your existing systems and thoroughly test all scenarios.'
                },
                {
                  step: '4',
                  title: 'Launch & Optimization',
                  description: 'Deploy your chatbot and continuously optimize based on real user interactions.'
                }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="bg-green-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <span className="text-black font-bold">{phase.step}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-green-400">{phase.title}</h3>
                  <p className="text-gray-300 text-sm">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-[#2a2a2a] rounded-2xl p-12 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Customer Service?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses already using AI chatbots to provide exceptional customer experiences while reducing costs.
            </p>
            <NavigationLink to="/contact">
              <Button 
                size="lg" 
                className="bg-green-400 text-black hover:bg-green-300 text-lg px-8 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get Started Today
              </Button>
            </NavigationLink>
          </div>
        </div>
      </main>
    </div>
  );
}
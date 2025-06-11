import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  BarChart3, 
  Target, 
  Zap, 
  DollarSign, 
  TrendingUp,
  Users,
  Play,
  Plus,
  Settings,
  Bell,
  Search,
  Filter,
  Calendar,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowRight,
  Menu,
  X,
  Wand2,
  Brain,
  Mail,
  Shield,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

// Import UI components
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import HeroWave from './components/HeroWave';
import FloatingPaths from './components/FloatingPaths';

// Import AI components
import AIAdCopyGenerator from './components/AIAdCopyGenerator';
import AIAudienceTargeting from './components/AIAudienceTargeting';
import AIPerformanceForecast from './components/AIPerformanceForecast';
import AICampaignInsights from './components/AICampaignInsights';

interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: 'active' | 'paused' | 'draft';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'campaigns' | 'create-campaign' | 'analytics' | 'ai-tools'>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Sale 2024',
      platform: 'Google Ads',
      status: 'active',
      budget: 5000,
      spent: 3250,
      impressions: 125000,
      clicks: 3750,
      conversions: 187,
      ctr: 3.0,
      cpc: 0.87,
      roas: 4.2
    },
    {
      id: '2',
      name: 'Brand Awareness Campaign',
      platform: 'Facebook',
      status: 'active',
      budget: 2500,
      spent: 1890,
      impressions: 89000,
      clicks: 2134,
      conversions: 89,
      ctr: 2.4,
      cpc: 0.89,
      roas: 3.1
    },
    {
      id: '3',
      name: 'Product Launch',
      platform: 'Instagram',
      status: 'paused',
      budget: 3000,
      spent: 850,
      impressions: 45000,
      clicks: 1350,
      conversions: 45,
      ctr: 3.0,
      cpc: 0.63,
      roas: 2.8
    }
  ]);

  const features: Feature[] = [
    {
      icon: <Zap className="w-6 h-6 text-white" />,
      title: "AI-Powered Optimization",
      description: "Automatically optimize your ad campaigns using advanced machine learning algorithms for maximum ROI.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Multi-Platform Management",
      description: "Manage campaigns across Google Ads, Facebook, Instagram, and more from a single dashboard.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      title: "Advanced Analytics",
      description: "Get detailed insights and performance metrics to make data-driven advertising decisions.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Audience Targeting",
      description: "Reach the right customers with precision targeting based on demographics, interests, and behavior.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      title: "Budget Protection",
      description: "Smart budget management prevents overspending while maximizing your advertising impact.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "Quick Campaign Launch",
      description: "Launch professional ad campaigns in minutes with our intuitive campaign builder.",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Inc",
      content: "AdStronaut increased our conversion rate by 300% while reducing our ad spend by 40%. It's a game-changer!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Small Business Owner",
      company: "Local Cafe Chain",
      content: "As a small business, AdStronaut made professional advertising accessible and affordable for us.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "E-commerce Manager",
      company: "Fashion Forward",
      content: "The AI optimization features have transformed how we approach digital advertising. Highly recommended!",
      rating: 5
    }
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "$29",
      period: "month",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 3 ad campaigns",
        "Basic analytics dashboard",
        "Email support",
        "Google Ads integration",
        "Monthly performance reports"
      ]
    },
    {
      name: "Professional",
      price: "$79",
      period: "month",
      description: "Ideal for growing businesses",
      features: [
        "Unlimited ad campaigns",
        "Advanced analytics & insights",
        "Priority support",
        "All platform integrations",
        "AI-powered optimization",
        "Custom audience targeting",
        "Weekly performance reports"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "month",
      description: "For large businesses and agencies",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "White-label solutions",
        "Advanced API access",
        "Daily performance reports",
        "24/7 phone support"
      ]
    }
  ];

  const FeatureCard: React.FC<Feature> = ({ icon, title, description, gradient = "from-blue-500 to-purple-600" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className={`absolute -inset-0.5 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 bg-gradient-to-r ${gradient}`}></div>
      <Card className="relative overflow-hidden border-gray-200/50 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 h-full">
        <CardContent className="p-6 flex flex-col items-start">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${gradient} mb-4`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );

  const TestimonialCard: React.FC<Testimonial> = ({ name, role, company, content, rating }) => (
    <Card className="bg-white/50 backdrop-blur-sm border-gray-200/50">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <p className="text-gray-900 mb-4">"{content}"</p>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{role} at {company}</p>
        </div>
      </CardContent>
    </Card>
  );

  const PricingCard: React.FC<PricingTier> = ({ name, price, period, description, features, popular = false }) => (
    <Card className={`relative ${popular ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200/50'} bg-white/50 backdrop-blur-sm`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
          Most Popular
        </Badge>
      )}
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600">/{period}</span>
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
              <span className="text-gray-900">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className={`w-full ${popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}>
          Get Started
        </Button>
      </CardContent>
    </Card>
  );

  const Navigation = () => (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">AdStronaut</span>
          </div>

          {currentView !== 'landing' && (
            <>
              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`text-gray-600 hover:text-gray-900 transition-colors ${
                    currentView === 'dashboard' ? 'text-blue-600' : ''
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('campaigns')}
                  className={`text-gray-600 hover:text-gray-900 transition-colors ${
                    currentView === 'campaigns' ? 'text-blue-600' : ''
                  }`}
                >
                  Campaigns
                </button>
                <button
                  onClick={() => setCurrentView('ai-tools')}
                  className={`text-gray-600 hover:text-gray-900 transition-colors ${
                    currentView === 'ai-tools' ? 'text-blue-600' : ''
                  }`}
                >
                  AI Tools
                </button>
                <button
                  onClick={() => setCurrentView('analytics')}
                  className={`text-gray-600 hover:text-gray-900 transition-colors ${
                    currentView === 'analytics' ? 'text-blue-600' : ''
                  }`}
                >
                  Analytics
                </button>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button size="sm">
                  Get Started
                </Button>
              </div>
              
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </>
          )}
          
          {currentView === 'landing' && (
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              <Button variant="outline" size="sm" onClick={() => setCurrentView('dashboard')}>
                Sign In
              </Button>
              <Button size="sm" onClick={() => setCurrentView('dashboard')}>
                Get Started
              </Button>
            </div>
          )}

          {currentView === 'landing' && (
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50">
            <div className="px-4 py-4 space-y-4">
              {currentView === 'landing' ? (
                <>
                  <a href="#features" className="block text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                  <a href="#pricing" className="block text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                  <a href="#about" className="block text-gray-600 hover:text-gray-900 transition-colors">About</a>
                  <a href="#contact" className="block text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
                  <div className="flex flex-col space-y-2 pt-4">
                    <Button variant="outline" size="sm" onClick={() => setCurrentView('dashboard')}>
                      Sign In
                    </Button>
                    <Button size="sm" onClick={() => setCurrentView('dashboard')}>
                      Get Started
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {setCurrentView('dashboard'); setMobileMenuOpen(false);}}
                    className="block text-gray-600 hover:text-gray-900 transition-colors w-full text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {setCurrentView('campaigns'); setMobileMenuOpen(false);}}
                    className="block text-gray-600 hover:text-gray-900 transition-colors w-full text-left"
                  >
                    Campaigns
                  </button>
                  <button
                    onClick={() => {setCurrentView('ai-tools'); setMobileMenuOpen(false);}}
                    className="block text-gray-600 hover:text-gray-900 transition-colors w-full text-left"
                  >
                    AI Tools
                  </button>
                  <button
                    onClick={() => {setCurrentView('analytics'); setMobileMenuOpen(false);}}
                    className="block text-gray-600 hover:text-gray-900 transition-colors w-full text-left"
                  >
                    Analytics
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const LandingPage = () => (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroWave />
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-blue-500/20 text-blue-600 border-blue-500/30">
              🚀 AI-Powered Advertising Platform
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Launch Your Ads
              <br />
              Into Orbit
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AdStronaut helps small and medium businesses create, manage, and optimize 
              advertising campaigns across multiple platforms with AI-powered precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-gray-200/50 rounded-full px-6 py-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <Input
                  placeholder="Enter your email"
                  className="border-0 bg-transparent focus:ring-0 text-gray-900 placeholder:text-gray-500"
                />
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Modern Advertising</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, manage, and optimize successful advertising campaigns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Active Users" },
              { number: "$50M+", label: "Ad Spend Managed" },
              { number: "300%", label: "Average ROI Increase" },
              { number: "99.9%", label: "Uptime Guarantee" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of businesses that trust AdStronaut
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-r from-purple-500/10 to-blue-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <PricingCard {...tier} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Launch Your
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Success?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses already using AdStronaut to grow their revenue
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600" onClick={() => setCurrentView('dashboard')}>
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-200/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AdStronaut</span>
              </div>
              <p className="text-gray-600">
                AI-powered advertising platform for modern businesses.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">API</a></li>
                <li><a href="#" className="hover:text-gray-900">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900">Status</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200/50 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 AdStronaut. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Campaign Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your advertising performance across all platforms</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spend</p>
                <p className="text-3xl font-bold text-gray-900">$5,990</p>
                <p className="text-sm text-green-600 mt-1">+12% vs last month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Impressions</p>
                <p className="text-3xl font-bold text-gray-900">259K</p>
                <p className="text-sm text-green-600 mt-1">+8% vs last month</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clicks</p>
                <p className="text-3xl font-bold text-gray-900">7,234</p>
                <p className="text-sm text-green-600 mt-1">+15% vs last month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ROAS</p>
                <p className="text-3xl font-bold text-gray-900">3.8x</p>
                <p className="text-sm text-green-600 mt-1">+5% vs last month</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Active Campaigns</h2>
            <Button 
              onClick={() => setCurrentView('create-campaign')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROAS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.slice(0, 3).map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{campaign.platform}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${campaign.budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${campaign.spent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.roas}x
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Campaign Insights */}
        <AICampaignInsights />
      </div>
    </div>
  );

  const AIToolsView = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="w-8 h-8 text-purple-600 mr-3" />
            AI-Powered Tools
          </h1>
          <p className="text-gray-600 mt-2">Leverage artificial intelligence to optimize your advertising campaigns</p>
        </div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <AIAdCopyGenerator />
          <AIAudienceTargeting />
          <AIPerformanceForecast />
          <div className="xl:col-span-2">
            <AICampaignInsights />
          </div>
        </div>

        {/* AI Features Overview */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Powered by Advanced AI Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Copy Generation</h3>
              <p className="text-sm text-gray-600">AI creates compelling ad copy tailored to your audience</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Intelligent Targeting</h3>
              <p className="text-sm text-gray-600">Discover optimal audience segments with AI analysis</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Performance Prediction</h3>
              <p className="text-sm text-gray-600">Forecast campaign results before you spend</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Insights</h3>
              <p className="text-sm text-gray-600">Get actionable recommendations from AI analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CampaignsView = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
            <p className="text-gray-600 mt-2">Manage all your advertising campaigns</p>
          </div>
          <Button 
            onClick={() => setCurrentView('create-campaign')}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Campaign
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Platforms</option>
                <option>Google Ads</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>LinkedIn</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Paused</option>
                <option>Draft</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Platform:</span>
                    <span className="font-medium">{campaign.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Budget:</span>
                    <span className="font-medium">${campaign.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spent:</span>
                    <span className="font-medium">${campaign.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROAS:</span>
                    <span className="font-medium text-green-600">{campaign.roas}x</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Budget Usage</span>
                    <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="default" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CreateCampaign = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
          <p className="text-gray-600 mt-2">Set up your advertising campaign with AI-powered recommendations</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter campaign name..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select platform...</option>
                    <option>Google Ads</option>
                    <option>Facebook Ads</option>
                    <option>Instagram Ads</option>
                    <option>LinkedIn Ads</option>
                    <option>Twitter Ads</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Objective</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select objective...</option>
                    <option>Brand Awareness</option>
                    <option>Website Traffic</option>
                    <option>Lead Generation</option>
                    <option>Sales Conversion</option>
                    <option>App Downloads</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Daily Budget</label>
                  <div className="relative">
                    <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Duration</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select duration...</option>
                    <option>1 Week</option>
                    <option>2 Weeks</option>
                    <option>1 Month</option>
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>Continuous</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your target audience (age, interests, location, etc.)..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Creative</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="space-y-2">
                    <div className="text-gray-400">
                      <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="text-blue-600 hover:underline cursor-pointer">Upload images or videos</span> or drag and drop
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">AI Suggestions</h3>
                    <ul className="text-blue-700 text-sm mt-2 space-y-1">
                      <li>• Consider targeting ages 25-45 for better conversion rates</li>
                      <li>• Recommended budget: $50-75/day for optimal reach</li>
                      <li>• Best performing time: Weekdays 9AM-5PM</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-6">
                <Button
                  type="button"
                  onClick={() => setCurrentView('campaigns')}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Create Campaign
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-2">Detailed insights into your campaign performance</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Export Report
            </Button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <p>Performance Chart</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Target className="w-6 h-6 mx-auto mb-2" />
                <p>Traffic Sources Chart</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Campaign Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPC</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROAS</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.platform}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.impressions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.ctr}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${campaign.cpc}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.conversions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        campaign.roas >= 3 ? 'text-green-600' : 
                        campaign.roas >= 2 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {campaign.roas}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'campaigns':
        return <CampaignsView />;
      case 'create-campaign':
        return <CreateCampaign />;
      case 'analytics':
        return <Analytics />;
      case 'ai-tools':
        return <AIToolsView />;
      default:
        return <LandingPage />;
    }
  };

  return renderCurrentView();
}

export default App;
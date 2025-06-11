import React, { useState } from 'react';
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
  Image,
  Video
} from 'lucide-react';
import { motion } from 'framer-motion';

// Import components
import UserProfileSetup from './components/UserProfileSetup';
import SMBDashboard from './components/SMBDashboard';
import AIAdCopyGenerator from './components/AIAdCopyGenerator';
import AIAudienceTargeting from './components/AIAudienceTargeting';
import AIPerformanceForecast from './components/AIPerformanceForecast';
import AICampaignInsights from './components/AICampaignInsights';
import AIImageGenerator from './components/AIImageGenerator';
import AIVideoGenerator from './components/AIVideoGenerator';
import CampaignFilters from './components/Campaigns/CampaignFilters';
import BulkActions from './components/Campaigns/BulkActions';
import HeroWave from './components/HeroWave';
import FloatingPaths from './components/FloatingPaths';
import useAI from './hooks/useAI';

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
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'profile-setup' | 'dashboard' | 'campaigns' | 'create-campaign' | 'analytics' | 'ai-tools'>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userProfileComplete, setUserProfileComplete] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [campaignFilters, setCampaignFilters] = useState({
    searchTerm: '',
    platform: '',
    status: '',
    dateRange: 'all'
  });

  const { generateAdCopy, generateAudienceTargeting, generatePerformanceForecast } = useAI();

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
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Optimization",
      description: "Our advanced AI algorithms continuously optimize your campaigns for maximum ROI and performance."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Multi-Platform Management",
      description: "Manage campaigns across Google Ads, Facebook, Instagram, LinkedIn, and more from one dashboard."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-Time Analytics",
      description: "Get instant insights into campaign performance with comprehensive analytics and reporting."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Budget Optimization",
      description: "Smart budget allocation and spending recommendations to maximize your advertising ROI."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Audience Targeting",
      description: "Advanced audience segmentation and targeting options to reach your ideal customers."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Performance Tracking",
      description: "Track key metrics and KPIs with detailed performance dashboards and custom reports."
    }
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: [
        "Up to 3 campaigns",
        "2 platform integrations",
        "Basic analytics",
        "Email support",
        "Campaign templates"
      ]
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      popular: true,
      features: [
        "Up to 15 campaigns",
        "All platform integrations",
        "Advanced analytics",
        "Priority support",
        "AI optimization",
        "Custom reporting",
        "A/B testing"
      ]
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      features: [
        "Unlimited campaigns",
        "All platform integrations",
        "Advanced AI features",
        "Dedicated support",
        "White-label options",
        "API access",
        "Custom integrations"
      ]
    }
  ];

  const handleUserProfileComplete = (profileData: any) => {
    setUserProfile(profileData);
    setUserProfileComplete(true);
    setCurrentView('dashboard');
  };

  const handleStartTrial = () => {
    if (userProfileComplete) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('profile-setup');
    }
  };

  const handleBulkAction = (action: string, campaignIds: string[]) => {
    console.log(`Performing ${action} on campaigns:`, campaignIds);
    // Implement bulk actions logic here
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(campaignFilters.searchTerm.toLowerCase());
    const matchesPlatform = !campaignFilters.platform || campaign.platform === campaignFilters.platform;
    const matchesStatus = !campaignFilters.status || campaign.status === campaignFilters.status;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const Navigation = () => (
    <nav className="bg-gray-900 shadow-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Rocket className="w-8 h-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">AdStronaut</span>
            </div>
          </div>
          
          {currentView !== 'landing' && currentView !== 'profile-setup' && (
            <>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'dashboard' 
                        ? 'bg-blue-900 text-blue-300' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setCurrentView('campaigns')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'campaigns' 
                        ? 'bg-blue-900 text-blue-300' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    Campaigns
                  </button>
                  <button
                    onClick={() => setCurrentView('ai-tools')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'ai-tools' 
                        ? 'bg-blue-900 text-blue-300' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    AI Tools
                  </button>
                  <button
                    onClick={() => setCurrentView('analytics')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'analytics' 
                        ? 'bg-blue-900 text-blue-300' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    Analytics
                  </button>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-300">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-300">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {userProfile?.companyName?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </>
          )}
          
          {currentView === 'landing' && (
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleStartTrial}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </button>
              <button 
                onClick={handleStartTrial}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
        
        {mobileMenuOpen && currentView !== 'landing' && currentView !== 'profile-setup' && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-800">
              <button
                onClick={() => {setCurrentView('dashboard'); setMobileMenuOpen(false);}}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 w-full text-left transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => {setCurrentView('campaigns'); setMobileMenuOpen(false);}}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 w-full text-left transition-colors"
              >
                Campaigns
              </button>
              <button
                onClick={() => {setCurrentView('ai-tools'); setMobileMenuOpen(false);}}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 w-full text-left transition-colors"
              >
                AI Tools
              </button>
              <button
                onClick={() => {setCurrentView('analytics'); setMobileMenuOpen(false);}}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 w-full text-left transition-colors"
              >
                Analytics
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const LandingPage = () => (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <HeroWave />
        <FloatingPaths position={0.5} />
      </div>
      
      {/* Hero Section */}
      <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Launch Your Ads Into
              <span className="text-blue-400 block">The Stratosphere</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              AdStronaut is your AI-powered advertising campaign assistant designed specifically for small and medium-sized businesses. Create, manage, and optimize your campaigns across multiple platforms with ease.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartTrial}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5 inline mr-2" />
                Start Free Trial
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Powerful features designed to maximize your advertising ROI
            </p>
          </motion.div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group hover:scale-105 transition-transform duration-200"
              >
                <div className="bg-blue-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-800/50 transition-colors">
                  <div className="text-blue-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-blue-600/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-16">
              Trusted by Growing Businesses
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "10,000+", label: "Active Users" },
              { value: "$50M+", label: "Ad Spend Managed" },
              { value: "150%", label: "Average ROI Increase" },
              { value: "99.9%", label: "Uptime Guaranteed" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-blue-200 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Choose the plan that's right for your business
            </p>
          </motion.div>
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden border ${tier.popular ? 'border-blue-500 transform scale-105' : 'border-gray-700'}`}
              >
                {tier.popular && (
                  <div className="bg-blue-600 text-white text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="px-6 py-8">
                  <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-400 ml-1">{tier.period}</span>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={handleStartTrial}
                    className={`mt-8 w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                      tier.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-900">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold text-white">
            Ready to Launch Your Success?
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Join thousands of businesses already using AdStronaut to grow their revenue
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartTrial}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <Rocket className="w-8 h-8 text-blue-400" />
            <span className="ml-2 text-xl font-bold">AdStronaut</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 AdStronaut. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  const AIToolsView = () => (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Brain className="w-8 h-8 text-purple-400 mr-3" />
            AI-Powered Tools
          </h1>
          <p className="text-gray-400 mt-2">Leverage artificial intelligence to optimize your advertising campaigns</p>
        </motion.div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <AIAdCopyGenerator />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <AIAudienceTargeting />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <AIPerformanceForecast />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <AIImageGenerator />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <AIVideoGenerator />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="xl:col-span-2">
            <AICampaignInsights />
          </motion.div>
        </div>

        {/* AI Features Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-8 border border-purple-500/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Powered by Advanced AI Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Wand2, title: "Smart Copy Generation", desc: "AI creates compelling ad copy tailored to your audience", color: "purple" },
              { icon: Target, title: "Intelligent Targeting", desc: "Discover optimal audience segments with AI analysis", color: "blue" },
              { icon: TrendingUp, title: "Performance Prediction", desc: "Forecast campaign results before you spend", color: "green" },
              { icon: Image, title: "Image Generation", desc: "Create stunning visuals with AI-powered tools", color: "pink" },
              { icon: Video, title: "Video Creation", desc: "Generate engaging video content automatically", color: "red" }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`bg-${feature.color}-900/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const CampaignsView = () => (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Campaigns</h1>
            <p className="text-gray-400 mt-2">Manage all your advertising campaigns</p>
          </div>
          <button 
            onClick={() => setCurrentView('create-campaign')}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Campaign
          </button>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <CampaignFilters
            searchTerm={campaignFilters.searchTerm}
            onSearchChange={(term) => setCampaignFilters({ ...campaignFilters, searchTerm: term })}
            selectedPlatform={campaignFilters.platform}
            onPlatformChange={(platform) => setCampaignFilters({ ...campaignFilters, platform })}
            selectedStatus={campaignFilters.status}
            onStatusChange={(status) => setCampaignFilters({ ...campaignFilters, status })}
            dateRange={campaignFilters.dateRange}
            onDateRangeChange={(range) => setCampaignFilters({ ...campaignFilters, dateRange: range })}
            onExport={() => console.log('Export campaigns')}
          />
        </motion.div>

        {/* Bulk Actions */}
        <BulkActions
          selectedCampaigns={selectedCampaigns}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedCampaigns([])}
        />

        {/* Campaigns Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredCampaigns.map((campaign, index) => (
            <motion.div 
              key={campaign.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCampaigns.includes(campaign.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCampaigns([...selectedCampaigns, campaign.id]);
                        } else {
                          setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaign.id));
                        }
                      }}
                      className="mr-3 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    campaign.status === 'active' ? 'bg-green-900 text-green-300' :
                    campaign.status === 'paused' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex justify-between">
                    <span>Platform:</span>
                    <span className="font-medium text-white">{campaign.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Budget:</span>
                    <span className="font-medium text-white">${campaign.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spent:</span>
                    <span className="font-medium text-white">${campaign.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROAS:</span>
                    <span className="font-medium text-green-400">{campaign.roas}x</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Budget Usage</span>
                    <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                    <Trash2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );

  const CreateCampaign = () => {
    const [campaignData, setCampaignData] = useState({
      name: '',
      platform: '',
      objective: '',
      budget: '',
      duration: '',
      targetAudience: ''
    });

    const [aiSuggestions, setAiSuggestions] = useState<any>(null);

    const handleAISuggestion = async (field: string) => {
      try {
        switch (field) {
          case 'name':
            // Generate campaign name suggestions
            const nameResult = await generateAdCopy({
              productService: campaignData.name || 'product',
              targetAudience: campaignData.targetAudience || 'general audience',
              campaignObjective: campaignData.objective || 'Brand Awareness',
              platform: campaignData.platform || 'Google Ads'
            });
            setAiSuggestions({ type: 'name', data: nameResult.headlines });
            break;
          case 'audience':
            // Generate audience suggestions
            const audienceResult = await generateAudienceTargeting({
              productService: campaignData.name || 'product',
              campaignObjective: campaignData.objective || 'Brand Awareness',
              businessType: userProfile?.businessType || 'B2C'
            });
            setAiSuggestions({ type: 'audience', data: audienceResult });
            break;
          case 'budget':
            // Generate budget recommendations
            const forecastResult = await generatePerformanceForecast({
              campaignType: campaignData.objective || 'Brand Awareness',
              budget: parseInt(campaignData.budget) || 1000,
              duration: parseInt(campaignData.duration) || 30,
              targetAudience: campaignData.targetAudience || 'general audience',
              platform: campaignData.platform || 'Google Ads'
            });
            setAiSuggestions({ type: 'budget', data: forecastResult });
            break;
        }
      } catch (error) {
        console.error('AI suggestion error:', error);
      }
    };

    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white">Create New Campaign</h1>
            <p className="text-gray-400 mt-2">Set up your advertising campaign with AI-powered recommendations</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg border border-gray-700"
          >
            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">Campaign Name</label>
                    <button
                      type="button"
                      onClick={() => handleAISuggestion('name')}
                      className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                    >
                      <Wand2 className="w-4 h-4 mr-1" />
                      AI Suggest
                    </button>
                  </div>
                  <input
                    type="text"
                    value={campaignData.name}
                    onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter campaign name..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
                    <select 
                      value={campaignData.platform}
                      onChange={(e) => setCampaignData({ ...campaignData, platform: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select platform...</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Facebook Ads">Facebook Ads</option>
                      <option value="Instagram Ads">Instagram Ads</option>
                      <option value="LinkedIn Ads">LinkedIn Ads</option>
                      <option value="Twitter Ads">Twitter Ads</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Objective</label>
                    <select 
                      value={campaignData.objective}
                      onChange={(e) => setCampaignData({ ...campaignData, objective: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select objective...</option>
                      <option value="Brand Awareness">Brand Awareness</option>
                      <option value="Website Traffic">Website Traffic</option>
                      <option value="Lead Generation">Lead Generation</option>
                      <option value="Sales Conversion">Sales Conversion</option>
                      <option value="App Downloads">App Downloads</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-300">Daily Budget</label>
                      <button
                        type="button"
                        onClick={() => handleAISuggestion('budget')}
                        className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                      >
                        <Wand2 className="w-4 h-4 mr-1" />
                        AI Recommend
                      </button>
                    </div>
                    <div className="relative">
                      <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        value={campaignData.budget}
                        onChange={(e) => setCampaignData({ ...campaignData, budget: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Duration</label>
                    <select 
                      value={campaignData.duration}
                      onChange={(e) => setCampaignData({ ...campaignData, duration: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select duration...</option>
                      <option value="7">1 Week</option>
                      <option value="14">2 Weeks</option>
                      <option value="30">1 Month</option>
                      <option value="90">3 Months</option>
                      <option value="180">6 Months</option>
                      <option value="365">Continuous</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">Target Audience</label>
                    <button
                      type="button"
                      onClick={() => handleAISuggestion('audience')}
                      className="text-purple-400 hover:text-purple-300 text-sm flex items-center"
                    >
                      <Wand2 className="w-4 h-4 mr-1" />
                      AI Refine
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={campaignData.targetAudience}
                    onChange={(e) => setCampaignData({ ...campaignData, targetAudience: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your target audience (age, interests, location, etc.)..."
                  ></textarea>
                </div>

                {/* AI Suggestions Display */}
                {aiSuggestions && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-purple-900/20 border border-purple-700 rounded-lg p-4"
                  >
                    <div className="flex items-start">
                      <div className="bg-purple-900 p-2 rounded-full mr-3">
                        <Zap className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-purple-300 mb-2">AI Suggestions</h3>
                        {aiSuggestions.type === 'name' && (
                          <div className="space-y-2">
                            {aiSuggestions.data.slice(0, 3).map((suggestion: string, index: number) => (
                              <button
                                key={index}
                                onClick={() => setCampaignData({ ...campaignData, name: suggestion })}
                                className="block w-full text-left text-purple-200 hover:text-white p-2 rounded hover:bg-purple-800/50 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                        {aiSuggestions.type === 'audience' && (
                          <div className="text-purple-200">
                            <p className="mb-2">Recommended audience: {aiSuggestions.data.demographics?.ageRange}, {aiSuggestions.data.demographics?.gender}</p>
                            <div className="flex flex-wrap gap-2">
                              {aiSuggestions.data.interests?.slice(0, 5).map((interest: string, index: number) => (
                                <span key={index} className="bg-purple-800/50 px-2 py-1 rounded text-sm">
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {aiSuggestions.type === 'budget' && (
                          <div className="text-purple-200">
                            <p>Recommended daily budget: ${Math.round(aiSuggestions.data.estimatedCPC * aiSuggestions.data.estimatedClicks / 30)}</p>
                            <p className="text-sm mt-1">Expected ROAS: {aiSuggestions.data.estimatedROAS}x</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentView('campaigns')}
                    className="flex-1 border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Create Campaign
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  const Analytics = () => (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics</h1>
            <p className="text-gray-400 mt-2">Detailed insights into your campaign performance</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <select className="px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Export Report
            </button>
          </div>
        </motion.div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Campaign Performance</h3>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <p>Performance Chart</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Target className="w-6 h-6 mx-auto mb-2" />
                <p>Traffic Sources Chart</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-lg border border-gray-700"
        >
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Campaign Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Campaign</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Impressions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Clicks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">CTR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">CPC</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Conversions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ROAS</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-white">{campaign.name}</div>
                        <div className="text-sm text-gray-400">{campaign.platform}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {campaign.impressions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {campaign.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {campaign.ctr}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      ${campaign.cpc}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {campaign.conversions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        campaign.roas >= 3 ? 'text-green-400' : 
                        campaign.roas >= 2 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {campaign.roas}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'profile-setup':
        return <UserProfileSetup onComplete={handleUserProfileComplete} />;
      case 'dashboard':
        return userProfileComplete ? (
          <SMBDashboard 
            userProfile={userProfile}
            onCreateCampaign={() => setCurrentView('create-campaign')}
            onViewCampaigns={() => setCurrentView('campaigns')}
            onViewAITools={() => setCurrentView('ai-tools')}
          />
        ) : (
          <UserProfileSetup onComplete={handleUserProfileComplete} />
        );
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
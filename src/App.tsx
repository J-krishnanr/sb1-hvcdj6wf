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
  Brain
} from 'lucide-react';

// Import components
import AIAdCopyGenerator from './components/AIAdCopyGenerator';
import AIAudienceTargeting from './components/AIAudienceTargeting';
import AIPerformanceForecast from './components/AIPerformanceForecast';
import AICampaignInsights from './components/AICampaignInsights';
import MetricsCard from './components/Dashboard/MetricsCard';
import CampaignHealthIndicator from './components/Dashboard/CampaignHealthIndicator';
import PerformanceChart from './components/Dashboard/PerformanceChart';
import BulkActions from './components/Campaigns/BulkActions';
import CampaignFilters from './components/Campaigns/CampaignFilters';
import StepIndicator from './components/CampaignWizard/StepIndicator';
import CampaignPreview from './components/CampaignWizard/CampaignPreview';
import ExportModal from './components/Analytics/ExportModal';
import CrossPlatformComparison from './components/Analytics/CrossPlatformComparison';

interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: 'active' | 'paused' | 'draft' | 'completed';
  health: 'excellent' | 'good' | 'warning' | 'critical';
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
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'campaigns' | 'create-campaign' | 'analytics' | 'ai-tools'>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dateRange, setDateRange] = useState('last30days');
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentWizardStep, setCurrentWizardStep] = useState(1);
  
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Sale 2024',
      platform: 'Google Ads',
      status: 'active',
      health: 'excellent',
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
      health: 'good',
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
      health: 'warning',
      budget: 3000,
      spent: 850,
      impressions: 45000,
      clicks: 1350,
      conversions: 45,
      ctr: 3.0,
      cpc: 0.63,
      roas: 2.8
    },
    {
      id: '4',
      name: 'LinkedIn B2B Campaign',
      platform: 'LinkedIn',
      status: 'active',
      health: 'good',
      budget: 4000,
      spent: 2100,
      impressions: 32000,
      clicks: 960,
      conversions: 48,
      ctr: 3.0,
      cpc: 2.19,
      roas: 3.5
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

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = !selectedPlatform || campaign.platform === selectedPlatform;
    const matchesStatus = !selectedStatus || campaign.status === selectedStatus;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  // Calculate metrics
  const totalSpend = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const averageROAS = campaigns.reduce((sum, campaign) => sum + campaign.roas, 0) / campaigns.length;

  // Cross-platform data for analytics
  const crossPlatformData = [
    { platform: 'Google Ads', spend: 3250, impressions: 125000, clicks: 3750, conversions: 187, roas: 4.2, ctr: 3.0, cpc: 0.87 },
    { platform: 'Facebook', spend: 1890, impressions: 89000, clicks: 2134, conversions: 89, roas: 3.1, ctr: 2.4, cpc: 0.89 },
    { platform: 'Instagram', spend: 850, impressions: 45000, clicks: 1350, conversions: 45, roas: 2.8, ctr: 3.0, cpc: 0.63 },
    { platform: 'LinkedIn', spend: 2100, impressions: 32000, clicks: 960, conversions: 48, roas: 3.5, ctr: 3.0, cpc: 2.19 }
  ];

  const handleBulkAction = (action: string, campaignIds: string[]) => {
    console.log(`Performing ${action} on campaigns:`, campaignIds);
    // Implement bulk actions logic here
  };

  const handleExport = (options: any) => {
    console.log('Exporting with options:', options);
    // Implement export logic here
  };

  const wizardSteps = ['Basic Info', 'Budget & Timeline', 'Audience', 'Creative', 'Review'];

  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Rocket className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AdStronaut</span>
            </div>
          </div>
          
          {currentView !== 'landing' && (
            <>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentView === 'dashboard' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setCurrentView('campaigns')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentView === 'campaigns' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Campaigns
                  </button>
                  <button
                    onClick={() => setCurrentView('ai-tools')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentView === 'ai-tools' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    AI Tools
                  </button>
                  <button
                    onClick={() => setCurrentView('analytics')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentView === 'analytics' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Analytics
                  </button>
                </div>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
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
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
        
        {mobileMenuOpen && currentView !== 'landing' && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <button
                onClick={() => {setCurrentView('dashboard'); setMobileMenuOpen(false);}}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Dashboard
              </button>
              <button
                onClick={() => {setCurrentView('campaigns'); setMobileMenuOpen(false);}}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Campaigns
              </button>
              <button
                onClick={() => {setCurrentView('ai-tools'); setMobileMenuOpen(false);}}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                AI Tools
              </button>
              <button
                onClick={() => {setCurrentView('analytics'); setMobileMenuOpen(false);}}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-full text-left"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Launch Your Ads Into
              <span className="text-blue-600 block">The Stratosphere</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              AdStronaut is your AI-powered advertising campaign assistant designed specifically for small and medium-sized businesses. Create, manage, and optimize your campaigns across multiple platforms with ease.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5 inline mr-2" />
                Start Free Trial
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Powerful features designed to maximize your advertising ROI
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-200">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-16">
              Trusted by Growing Businesses
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">10,000+</div>
              <div className="text-blue-200 mt-2">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">$50M+</div>
              <div className="text-blue-200 mt-2">Ad Spend Managed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">150%</div>
              <div className="text-blue-200 mt-2">Average ROI Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">99.9%</div>
              <div className="text-blue-200 mt-2">Uptime Guaranteed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that's right for your business
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-lg overflow-hidden ${tier.popular ? 'ring-2 ring-blue-600 transform scale-105' : ''}`}>
                {tier.popular && (
                  <div className="bg-blue-600 text-white text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="px-6 py-8">
                  <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-500 ml-1">{tier.period}</span>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setCurrentView('dashboard')}
                    className={`mt-8 w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                      tier.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Launch Your Success?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Join thousands of businesses already using AdStronaut to grow their revenue
          </p>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
          <MetricsCard
            title="Total Spend"
            value={`$${totalSpend.toLocaleString()}`}
            change="+12% vs last month"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-blue-100"
          />
          <MetricsCard
            title="Impressions"
            value={`${Math.round(totalImpressions / 1000)}K`}
            change="+8% vs last month"
            changeType="positive"
            icon={Eye}
            iconColor="bg-purple-100"
          />
          <MetricsCard
            title="Clicks"
            value={totalClicks.toLocaleString()}
            change="+15% vs last month"
            changeType="positive"
            icon={Target}
            iconColor="bg-green-100"
          />
          <MetricsCard
            title="ROAS"
            value={`${averageROAS.toFixed(1)}x`}
            change="+5% vs last month"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-yellow-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <PerformanceChart title="Campaign Performance Overview" />
          </div>
          
          {/* Campaign Health */}
          <div>
            <CampaignHealthIndicator campaigns={campaigns} />
          </div>
        </div>

        {/* Recent Campaigns */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Active Campaigns</h2>
            <button 
              onClick={() => setCurrentView('create-campaign')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </button>
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
          <button 
            onClick={() => setCurrentView('create-campaign')}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Campaign
          </button>
        </div>

        {/* Bulk Actions */}
        <BulkActions
          selectedCampaigns={selectedCampaigns}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedCampaigns([])}
        />

        {/* Filters */}
        <CampaignFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onExport={() => setShowExportModal(true)}
        />

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
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
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  </div>
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
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Export Modal */}
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
        />
      </div>
    </div>
  );

  const CreateCampaign = () => {
    const [campaignData, setCampaignData] = useState({
      name: '',
      platform: '',
      objective: '',
      budget: 0,
      duration: 0,
      targetAudience: '',
      adCreative: []
    });

    const validationErrors: string[] = [];
    if (!campaignData.name) validationErrors.push('Campaign name is required');
    if (!campaignData.platform) validationErrors.push('Platform selection is required');
    if (!campaignData.objective) validationErrors.push('Campaign objective is required');
    if (campaignData.budget <= 0) validationErrors.push('Budget must be greater than 0');

    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
            <p className="text-gray-600 mt-2">Set up your advertising campaign with AI-powered recommendations</p>
          </div>

          <StepIndicator
            currentStep={currentWizardStep}
            totalSteps={wizardSteps.length}
            steps={wizardSteps}
          />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              {currentWizardStep === 5 ? (
                <CampaignPreview
                  campaignData={campaignData}
                  onEdit={setCurrentWizardStep}
                  validationErrors={validationErrors}
                />
              ) : (
                <form className="space-y-6">
                  {currentWizardStep === 1 && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                        <input
                          type="text"
                          value={campaignData.name}
                          onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter campaign name..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                          <select 
                            value={campaignData.platform}
                            onChange={(e) => setCampaignData({ ...campaignData, platform: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                          <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Objective</label>
                          <select 
                            value={campaignData.objective}
                            onChange={(e) => setCampaignData({ ...campaignData, objective: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    </>
                  )}

                  {currentWizardStep === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Daily Budget</label>
                        <div className="relative">
                          <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            value={campaignData.budget}
                            onChange={(e) => setCampaignData({ ...campaignData, budget: parseInt(e.target.value) || 0 })}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Duration (days)</label>
                        <input
                          type="number"
                          value={campaignData.duration}
                          onChange={(e) => setCampaignData({ ...campaignData, duration: parseInt(e.target.value) || 0 })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="30"
                        />
                      </div>
                    </div>
                  )}

                  {currentWizardStep === 3 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                      <textarea
                        rows={4}
                        value={campaignData.targetAudience}
                        onChange={(e) => setCampaignData({ ...campaignData, targetAudience: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe your target audience (age, interests, location, etc.)..."
                      />
                    </div>
                  )}

                  {currentWizardStep === 4 && (
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
                  )}
                </form>
              )}

              <div className="flex space-x-4 pt-6 mt-6 border-t border-gray-200">
                {currentWizardStep > 1 && (
                  <button
                    onClick={() => setCurrentWizardStep(currentWizardStep - 1)}
                    className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                {currentWizardStep < wizardSteps.length ? (
                  <button
                    onClick={() => setCurrentWizardStep(currentWizardStep + 1)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    disabled={validationErrors.length > 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Launch Campaign
                  </button>
                )}
                
                <button
                  onClick={() => setCurrentView('campaigns')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="last30days">Last 30 days</option>
              <option value="last7days">Last 7 days</option>
              <option value="last90days">Last 90 days</option>
              <option value="custom">Custom range</option>
            </select>
            <button 
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Export Report
            </button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <PerformanceChart title="Campaign Performance Trends" timeframe={dateRange} />
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

        {/* Cross-Platform Comparison */}
        <div className="mb-8">
          <CrossPlatformComparison data={crossPlatformData} />
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

        {/* Export Modal */}
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
        />
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
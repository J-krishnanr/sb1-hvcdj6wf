import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Plus, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Eye,
  Settings,
  Lightbulb,
  Play,
  Pause
} from 'lucide-react';
import { motion } from 'framer-motion';
import AICampaignInsights from './AICampaignInsights';

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
  health: 'excellent' | 'good' | 'warning' | 'critical';
}

interface SMBDashboardProps {
  userProfile: any;
  onCreateCampaign: () => void;
  onViewCampaigns: () => void;
  onViewAITools: () => void;
}

const SMBDashboard: React.FC<SMBDashboardProps> = ({ 
  userProfile, 
  onCreateCampaign, 
  onViewCampaigns,
  onViewAITools 
}) => {
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
      roas: 4.2,
      health: 'excellent'
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
      roas: 3.1,
      health: 'good'
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
      roas: 2.8,
      health: 'warning'
    }
  ]);

  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgROAS = campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length : 0;

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'good':
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent':
        return 'border-green-500 bg-green-900/20';
      case 'good':
        return 'border-blue-500 bg-blue-900/20';
      case 'warning':
        return 'border-yellow-500 bg-yellow-900/20';
      case 'critical':
        return 'border-red-500 bg-red-900/20';
      default:
        return 'border-gray-500 bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userProfile?.companyName || 'there'}! 🚀
          </h1>
          <p className="text-gray-400">
            Here's how your campaigns are performing today
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <button
            onClick={onCreateCampaign}
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
          >
            <Plus className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Create Campaign</div>
              <div className="text-sm opacity-90">Launch your next ad</div>
            </div>
          </button>

          <button
            onClick={onViewAITools}
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
          >
            <Zap className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">AI Tools</div>
              <div className="text-sm opacity-90">Optimize with AI</div>
            </div>
          </button>

          <button
            onClick={onViewCampaigns}
            className="bg-gray-700 hover:bg-gray-600 text-white p-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
          >
            <Eye className="w-6 h-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">View All</div>
              <div className="text-sm opacity-90">Manage campaigns</div>
            </div>
          </button>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Spend</p>
                <p className="text-3xl font-bold text-white">${totalSpent.toLocaleString()}</p>
                <p className="text-sm text-green-400 mt-1">+12% vs last month</p>
              </div>
              <div className="bg-blue-900 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Campaigns</p>
                <p className="text-3xl font-bold text-white">{activeCampaigns.length}</p>
                <p className="text-sm text-blue-400 mt-1">Running now</p>
              </div>
              <div className="bg-purple-900 p-3 rounded-full">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Conversions</p>
                <p className="text-3xl font-bold text-white">{totalConversions}</p>
                <p className="text-sm text-green-400 mt-1">+15% vs last month</p>
              </div>
              <div className="bg-green-900 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg ROAS</p>
                <p className="text-3xl font-bold text-white">{avgROAS.toFixed(1)}x</p>
                <p className="text-sm text-green-400 mt-1">+5% vs last month</p>
              </div>
              <div className="bg-yellow-900 p-3 rounded-full">
                <BarChart3 className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Campaign Health Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Campaign Health</h3>
              <button
                onClick={onViewCampaigns}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {campaigns.slice(0, 3).map((campaign) => (
                <div
                  key={campaign.id}
                  className={`p-4 rounded-lg border ${getHealthColor(campaign.health)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getHealthIcon(campaign.health)}
                      <div>
                        <p className="font-medium text-white">{campaign.name}</p>
                        <p className="text-sm text-gray-400">
                          {campaign.platform} • ROAS: {campaign.roas}x
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {campaign.status === 'active' ? (
                        <button className="p-1 text-green-400 hover:text-green-300">
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="p-1 text-blue-400 hover:text-blue-300">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1 text-gray-400 hover:text-gray-300">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          >
            <div className="flex items-center mb-6">
              <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
                <p className="text-blue-200 text-sm">
                  🎯 Consider increasing your Google Ads budget by 20% - it's showing the highest ROAS
                </p>
              </div>
              <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
                <p className="text-green-200 text-sm">
                  📱 Mobile traffic is converting 35% better - optimize for mobile-first design
                </p>
              </div>
              <div className="bg-purple-900/20 border border-purple-700 p-4 rounded-lg">
                <p className="text-purple-200 text-sm">
                  🕒 Your ads perform best between 2-4 PM - consider dayparting optimization
                </p>
              </div>
            </div>
            <button
              onClick={onViewAITools}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Explore AI Tools
            </button>
          </motion.div>
        </div>

        {/* AI Campaign Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AICampaignInsights />
        </motion.div>
      </div>
    </div>
  );
};

export default SMBDashboard;
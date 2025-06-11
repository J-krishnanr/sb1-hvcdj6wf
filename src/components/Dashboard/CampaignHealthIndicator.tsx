import React from 'react';
import { AlertTriangle, CheckCircle, Clock, TrendingDown } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  health: 'excellent' | 'good' | 'warning' | 'critical';
  roas: number;
  budget: number;
  spent: number;
}

interface CampaignHealthIndicatorProps {
  campaigns: Campaign[];
}

const CampaignHealthIndicator: React.FC<CampaignHealthIndicatorProps> = ({ campaigns }) => {
  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'good':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'critical':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent':
        return 'bg-green-50 border-green-200';
      case 'good':
        return 'bg-blue-50 border-blue-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const activeCampaigns = campaigns.filter(c => c.status === 'active');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Health</h3>
      <div className="space-y-3">
        {activeCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className={`p-3 rounded-lg border ${getHealthColor(campaign.health)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getHealthIcon(campaign.health)}
                <div>
                  <p className="font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-sm text-gray-600">
                    ROAS: {campaign.roas}x | Budget: ${campaign.budget.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {Math.round((campaign.spent / campaign.budget) * 100)}%
                </p>
                <p className="text-xs text-gray-500">Budget Used</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignHealthIndicator;
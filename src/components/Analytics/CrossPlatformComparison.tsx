import React from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

interface PlatformData {
  platform: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
  ctr: number;
  cpc: number;
}

interface CrossPlatformComparisonProps {
  data: PlatformData[];
}

const CrossPlatformComparison: React.FC<CrossPlatformComparisonProps> = ({ data }) => {
  const totalSpend = data.reduce((sum, platform) => sum + platform.spend, 0);
  const totalConversions = data.reduce((sum, platform) => sum + platform.conversions, 0);

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      'Google Ads': 'bg-blue-500',
      'Facebook': 'bg-blue-600',
      'Instagram': 'bg-pink-500',
      'LinkedIn': 'bg-blue-700',
      'Twitter': 'bg-blue-400',
      'TikTok': 'bg-black'
    };
    return colors[platform] || 'bg-gray-500';
  };

  const getChangeIcon = (value: number, benchmark: number) => {
    if (value > benchmark) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (value < benchmark) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Cross-Platform Performance</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Platform</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Spend</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Impressions</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Clicks</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Conversions</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">CTR</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">CPC</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((platform, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${getPlatformColor(platform.platform)} mr-3`} />
                    <span className="font-medium text-gray-900">{platform.platform}</span>
                  </div>
                </td>
                <td className="text-right py-3 px-4 text-gray-900">
                  ${platform.spend.toLocaleString()}
                </td>
                <td className="text-right py-3 px-4 text-gray-900">
                  {platform.impressions.toLocaleString()}
                </td>
                <td className="text-right py-3 px-4 text-gray-900">
                  {platform.clicks.toLocaleString()}
                </td>
                <td className="text-right py-3 px-4 text-gray-900">
                  {platform.conversions}
                </td>
                <td className="text-right py-3 px-4">
                  <div className="flex items-center justify-end">
                    <span className="text-gray-900">{platform.ctr}%</span>
                    {getChangeIcon(platform.ctr, 2.5)}
                  </div>
                </td>
                <td className="text-right py-3 px-4">
                  <div className="flex items-center justify-end">
                    <span className="text-gray-900">${platform.cpc}</span>
                    {getChangeIcon(1 / platform.cpc, 1 / 0.85)}
                  </div>
                </td>
                <td className="text-right py-3 px-4">
                  <div className="flex items-center justify-end">
                    <span className={`font-medium ${
                      platform.roas >= 3 ? 'text-green-600' : 
                      platform.roas >= 2 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {platform.roas}x
                    </span>
                    {getChangeIcon(platform.roas, 3)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">${totalSpend.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Spend</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{totalConversions}</div>
          <div className="text-sm text-gray-600">Total Conversions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{data.length}</div>
          <div className="text-sm text-gray-600">Active Platforms</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {totalSpend > 0 ? (totalConversions * 100 / totalSpend).toFixed(1) : '0'}x
          </div>
          <div className="text-sm text-gray-600">Avg ROAS</div>
        </div>
      </div>
    </div>
  );
};

export default CrossPlatformComparison;
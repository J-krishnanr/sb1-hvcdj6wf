import React, { useState } from 'react';
import { TrendingUp, BarChart3, RefreshCw, DollarSign } from 'lucide-react';
import useAI from '../hooks/useAI';

interface AIPerformanceForecastProps {
  onForecastGenerated?: (forecast: any) => void;
}

const AIPerformanceForecast: React.FC<AIPerformanceForecastProps> = ({ onForecastGenerated }) => {
  const [formData, setFormData] = useState({
    campaignType: 'Search Campaign',
    budget: 1000,
    duration: 30,
    targetAudience: '',
    platform: 'Google Ads'
  });
  
  const [forecast, setForecast] = useState<{
    estimatedImpressions: number;
    estimatedClicks: number;
    estimatedConversions: number;
    estimatedCTR: number;
    estimatedCPC: number;
    estimatedROAS: number;
    budgetRecommendations: string[];
    optimizationTips: string[];
  } | null>(null);

  const { generatePerformanceForecast, isLoading, error } = useAI();

  const handleGenerate = async () => {
    if (!formData.targetAudience) {
      alert('Please fill in the target audience field');
      return;
    }

    try {
      const result = await generatePerformanceForecast(formData);
      setForecast(result);
      onForecastGenerated?.(result);
    } catch (err) {
      console.error('Failed to generate performance forecast:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <div className="bg-green-100 p-2 rounded-full mr-3">
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Performance Forecast</h3>
          <p className="text-sm text-gray-600">Predict campaign performance with AI insights</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Type
            </label>
            <select
              value={formData.campaignType}
              onChange={(e) => setFormData({ ...formData, campaignType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option>Search Campaign</option>
              <option>Display Campaign</option>
              <option>Video Campaign</option>
              <option>Shopping Campaign</option>
              <option>Social Media Campaign</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform
            </label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option>Google Ads</option>
              <option>Facebook Ads</option>
              <option>Instagram Ads</option>
              <option>LinkedIn Ads</option>
              <option>Twitter Ads</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Budget ($)
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                min="100"
                step="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (days)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="1"
              max="365"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Audience Description
          </label>
          <textarea
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={3}
            placeholder="Describe your target audience..."
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Forecasting...
          </>
        ) : (
          <>
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Forecast
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {forecast && (
        <div className="mt-6 space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Performance Predictions</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {forecast.estimatedImpressions.toLocaleString()}
                </div>
                <div className="text-sm text-blue-800">Impressions</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">
                  {forecast.estimatedClicks.toLocaleString()}
                </div>
                <div className="text-sm text-green-800">Clicks</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {forecast.estimatedConversions}
                </div>
                <div className="text-sm text-purple-800">Conversions</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {forecast.estimatedCTR}%
                </div>
                <div className="text-sm text-yellow-800">CTR</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">
                  ${forecast.estimatedCPC}
                </div>
                <div className="text-sm text-red-800">CPC</div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {forecast.estimatedROAS}x
                </div>
                <div className="text-sm text-indigo-800">ROAS</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Budget Recommendations</h4>
            <div className="space-y-2">
              {forecast.budgetRecommendations.map((recommendation, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                  <p className="text-blue-800 text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Optimization Tips</h4>
            <div className="space-y-2">
              {forecast.optimizationTips.map((tip, index) => (
                <div key={index} className="bg-green-50 border border-green-200 p-3 rounded-lg">
                  <p className="text-green-800 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPerformanceForecast;
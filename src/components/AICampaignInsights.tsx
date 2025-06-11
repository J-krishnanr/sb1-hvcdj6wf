import React, { useState, useEffect } from 'react';
import { Brain, RefreshCw, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import useAI from '../hooks/useAI';

interface AICampaignInsightsProps {
  campaignData?: any;
  timeframe?: string;
}

const AICampaignInsights: React.FC<AICampaignInsightsProps> = ({ 
  campaignData, 
  timeframe = 'Last 30 days' 
}) => {
  const [insights, setInsights] = useState<{
    summary: string;
    keyFindings: string[];
    recommendations: string[];
    alerts: string[];
  } | null>(null);

  const { generateCampaignInsights, isLoading, error } = useAI();

  // Sample campaign data if none provided
  const sampleCampaignData = {
    campaigns: [
      {
        name: 'Summer Sale 2024',
        platform: 'Google Ads',
        impressions: 125000,
        clicks: 3750,
        conversions: 187,
        spend: 3250,
        ctr: 3.0,
        cpc: 0.87,
        roas: 4.2
      },
      {
        name: 'Brand Awareness',
        platform: 'Facebook',
        impressions: 89000,
        clicks: 2134,
        conversions: 89,
        spend: 1890,
        ctr: 2.4,
        cpc: 0.89,
        roas: 3.1
      }
    ],
    totalSpend: 5140,
    totalImpressions: 214000,
    totalClicks: 5884,
    totalConversions: 276,
    averageCTR: 2.75,
    averageCPC: 0.87,
    averageROAS: 3.65
  };

  const handleGenerateInsights = async () => {
    try {
      const dataToAnalyze = campaignData || sampleCampaignData;
      const result = await generateCampaignInsights({
        campaignData: dataToAnalyze,
        timeframe
      });
      setInsights(result);
    } catch (err) {
      console.error('Failed to generate campaign insights:', err);
    }
  };

  useEffect(() => {
    // Auto-generate insights on component mount
    handleGenerateInsights();
  }, [campaignData, timeframe]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-indigo-900 p-2 rounded-full mr-3">
            <Brain className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Campaign Insights</h3>
            <p className="text-sm text-gray-400">Intelligent analysis of your campaign performance</p>
          </div>
        </div>
        <button
          onClick={handleGenerateInsights}
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Insights
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {insights && (
        <div className="space-y-6">
          {/* Summary */}
          <div>
            <h4 className="font-semibold text-white mb-3">Performance Summary</h4>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-200">{insights.summary}</p>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <h4 className="font-semibold text-white mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
              Key Findings
            </h4>
            <div className="space-y-2">
              {insights.keyFindings.map((finding, index) => (
                <div key={index} className="bg-blue-900/20 border border-blue-700 p-3 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-200 text-sm">{finding}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="font-semibold text-white mb-3">Recommendations</h4>
            <div className="space-y-2">
              {insights.recommendations.map((recommendation, index) => (
                <div key={index} className="bg-green-900/20 border border-green-700 p-3 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-green-200 text-sm">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          {insights.alerts.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-yellow-400" />
                Alerts & Concerns
              </h4>
              <div className="space-y-2">
                {insights.alerts.map((alert, index) => (
                  <div key={index} className="bg-yellow-900/20 border border-yellow-700 p-3 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-yellow-200 text-sm">{alert}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!insights && !isLoading && !error && (
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Click "Refresh Insights" to generate AI-powered campaign analysis</p>
        </div>
      )}
    </div>
  );
};

export default AICampaignInsights;
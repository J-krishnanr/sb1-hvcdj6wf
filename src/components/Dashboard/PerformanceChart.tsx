import React from 'react';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

interface PerformanceChartProps {
  title: string;
  data?: any[];
  timeframe?: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  title, 
  data = [], 
  timeframe = 'Last 30 days' 
}) => {
  // Mock data for demonstration
  const mockData = [
    { date: '2024-01-01', impressions: 12000, clicks: 360, conversions: 18 },
    { date: '2024-01-02', impressions: 15000, clicks: 450, conversions: 22 },
    { date: '2024-01-03', impressions: 18000, clicks: 540, conversions: 27 },
    { date: '2024-01-04', impressions: 14000, clicks: 420, conversions: 21 },
    { date: '2024-01-05', impressions: 16000, clicks: 480, conversions: 24 },
    { date: '2024-01-06', impressions: 20000, clicks: 600, conversions: 30 },
    { date: '2024-01-07', impressions: 22000, clicks: 660, conversions: 33 }
  ];

  const chartData = data.length > 0 ? data : mockData;
  const maxImpressions = Math.max(...chartData.map(d => d.impressions));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-1" />
          {timeframe}
        </div>
      </div>

      <div className="h-64 flex items-end space-x-2">
        {chartData.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-100 rounded-t relative" style={{ height: '200px' }}>
              <div
                className="bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                style={{
                  height: `${(item.impressions / maxImpressions) * 100}%`,
                  width: '100%',
                  position: 'absolute',
                  bottom: 0
                }}
                title={`${item.impressions.toLocaleString()} impressions`}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {chartData.reduce((sum, item) => sum + item.impressions, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Impressions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {chartData.reduce((sum, item) => sum + item.clicks, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Clicks</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {chartData.reduce((sum, item) => sum + item.conversions, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Conversions</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
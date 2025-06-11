import React, { useState } from 'react';
import { Users, Target, RefreshCw, Lightbulb } from 'lucide-react';
import useAI from '../hooks/useAI';

interface AIAudienceTargetingProps {
  onAudienceGenerated?: (audience: any) => void;
}

const AIAudienceTargeting: React.FC<AIAudienceTargetingProps> = ({ onAudienceGenerated }) => {
  const [formData, setFormData] = useState({
    productService: '',
    campaignObjective: 'Brand Awareness',
    businessType: 'B2C',
    currentAudience: ''
  });
  
  const [generatedAudience, setGeneratedAudience] = useState<{
    demographics: any;
    interests: string[];
    behaviors: string[];
    suggestions: string[];
  } | null>(null);

  const { generateAudienceTargeting, isLoading, error } = useAI();

  const handleGenerate = async () => {
    if (!formData.productService) {
      alert('Please fill in the product/service field');
      return;
    }

    try {
      const result = await generateAudienceTargeting(formData);
      setGeneratedAudience(result);
      onAudienceGenerated?.(result);
    } catch (err) {
      console.error('Failed to generate audience targeting:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <Target className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Audience Targeting</h3>
          <p className="text-sm text-gray-600">Get intelligent audience recommendations</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product/Service Description
          </label>
          <textarea
            value={formData.productService}
            onChange={(e) => setFormData({ ...formData, productService: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Describe your product or service..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Objective
            </label>
            <select
              value={formData.campaignObjective}
              onChange={(e) => setFormData({ ...formData, campaignObjective: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Brand Awareness</option>
              <option>Website Traffic</option>
              <option>Lead Generation</option>
              <option>Sales Conversion</option>
              <option>App Downloads</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>B2C</option>
              <option>B2B</option>
              <option>E-commerce</option>
              <option>SaaS</option>
              <option>Local Business</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Audience (Optional)
          </label>
          <input
            type="text"
            value={formData.currentAudience}
            onChange={(e) => setFormData({ ...formData, currentAudience: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your current audience if any..."
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Users className="w-4 h-4 mr-2" />
            Generate Audience Targeting
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {generatedAudience && (
        <div className="mt-6 space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Demographics</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Age Range:</span>
                  <span className="ml-2">{generatedAudience.demographics.ageRange}</span>
                </div>
                <div>
                  <span className="font-medium">Gender:</span>
                  <span className="ml-2">{generatedAudience.demographics.gender}</span>
                </div>
                <div>
                  <span className="font-medium">Income Level:</span>
                  <span className="ml-2">{generatedAudience.demographics.incomeLevel}</span>
                </div>
                <div>
                  <span className="font-medium">Education:</span>
                  <span className="ml-2">{generatedAudience.demographics.education}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Interests</h4>
            <div className="flex flex-wrap gap-2">
              {generatedAudience.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Behaviors</h4>
            <div className="flex flex-wrap gap-2">
              {generatedAudience.behaviors.map((behavior, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {behavior}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
              Strategic Suggestions
            </h4>
            <div className="space-y-2">
              {generatedAudience.suggestions.map((suggestion, index) => (
                <div key={index} className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <p className="text-yellow-800 text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAudienceTargeting;
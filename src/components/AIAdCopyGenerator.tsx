import React, { useState } from 'react';
import { Wand2, Copy, RefreshCw, Sparkles } from 'lucide-react';
import useAI from '../hooks/useAI';

interface AIAdCopyGeneratorProps {
  onAdCopyGenerated?: (adCopy: any) => void;
}

const AIAdCopyGenerator: React.FC<AIAdCopyGeneratorProps> = ({ onAdCopyGenerated }) => {
  const [formData, setFormData] = useState({
    productService: '',
    targetAudience: '',
    campaignObjective: 'Brand Awareness',
    platform: 'Google Ads',
    tone: 'Professional and engaging'
  });
  
  const [generatedCopy, setGeneratedCopy] = useState<{
    headlines: string[];
    descriptions: string[];
    callsToAction: string[];
  } | null>(null);

  const { generateAdCopy, isLoading, error } = useAI();

  const handleGenerate = async () => {
    if (!formData.productService || !formData.targetAudience) {
      alert('Please fill in product/service and target audience fields');
      return;
    }

    try {
      const result = await generateAdCopy(formData);
      setGeneratedCopy(result);
      onAdCopyGenerated?.(result);
    } catch (err) {
      console.error('Failed to generate ad copy:', err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <div className="bg-purple-100 p-2 rounded-full mr-3">
          <Wand2 className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Ad Copy Generator</h3>
          <p className="text-sm text-gray-600">Generate compelling ad copy with AI assistance</p>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            rows={3}
            placeholder="Describe your product or service..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience
            </label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g., Small business owners, 25-45"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Objective
            </label>
            <select
              value={formData.campaignObjective}
              onChange={(e) => setFormData({ ...formData, campaignObjective: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option>Brand Awareness</option>
              <option>Website Traffic</option>
              <option>Lead Generation</option>
              <option>Sales Conversion</option>
              <option>App Downloads</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform
            </label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option>Google Ads</option>
              <option>Facebook Ads</option>
              <option>Instagram Ads</option>
              <option>LinkedIn Ads</option>
              <option>Twitter Ads</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tone
            </label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option>Professional and engaging</option>
              <option>Casual and friendly</option>
              <option>Urgent and compelling</option>
              <option>Luxury and premium</option>
              <option>Fun and playful</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Ad Copy
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {generatedCopy && (
        <div className="mt-6 space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Headlines</h4>
            <div className="space-y-2">
              {generatedCopy.headlines.map((headline, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm">{headline}</span>
                  <button
                    onClick={() => copyToClipboard(headline)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Descriptions</h4>
            <div className="space-y-2">
              {generatedCopy.descriptions.map((description, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm">{description}</span>
                  <button
                    onClick={() => copyToClipboard(description)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Call-to-Actions</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {generatedCopy.callsToAction.map((cta, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                  <span className="text-sm">{cta}</span>
                  <button
                    onClick={() => copyToClipboard(cta)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAdCopyGenerator;
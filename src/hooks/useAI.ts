import { useState, useCallback } from 'react';
import AIService from '../services/aiService';

// This would typically come from environment variables or user settings
// For production, you should use environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyABUKhkf1CWHNxvhjjOrTMaaoDzQwowz54';

const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiService] = useState(() => new AIService(GEMINI_API_KEY));

  const generateAdCopy = useCallback(async (request: {
    productService: string;
    targetAudience: string;
    campaignObjective: string;
    platform: string;
    tone?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Generating ad copy with request:', request);
      const result = await aiService.generateAdCopy(request);
      console.log('Ad copy generated successfully:', result);
      return result;
    } catch (err) {
      console.error('Error generating ad copy:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate ad copy';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const generateAudienceTargeting = useCallback(async (request: {
    productService: string;
    campaignObjective: string;
    businessType: string;
    currentAudience?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Generating audience targeting with request:', request);
      const result = await aiService.generateAudienceTargeting(request);
      console.log('Audience targeting generated successfully:', result);
      return result;
    } catch (err) {
      console.error('Error generating audience targeting:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate audience targeting';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const generatePerformanceForecast = useCallback(async (request: {
    campaignType: string;
    budget: number;
    duration: number;
    targetAudience: string;
    platform: string;
    historicalData?: any;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Generating performance forecast with request:', request);
      const result = await aiService.generatePerformanceForecast(request);
      console.log('Performance forecast generated successfully:', result);
      return result;
    } catch (err) {
      console.error('Error generating performance forecast:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate performance forecast';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const generateCampaignInsights = useCallback(async (request: {
    campaignData: any;
    timeframe: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Generating campaign insights with request:', request);
      const result = await aiService.generateCampaignInsights(request);
      console.log('Campaign insights generated successfully:', result);
      return result;
    } catch (err) {
      console.error('Error generating campaign insights:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate campaign insights';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  const testConnection = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Testing AI connection...');
      const result = await aiService.generateAdCopy({
        productService: 'Test product',
        targetAudience: 'Test audience',
        campaignObjective: 'Brand Awareness',
        platform: 'Google Ads',
        tone: 'Professional'
      });
      console.log('AI connection test successful:', result);
      return { success: true, message: 'AI service is working correctly!' };
    } catch (err) {
      console.error('AI connection test failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'AI connection test failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  return {
    generateAdCopy,
    generateAudienceTargeting,
    generatePerformanceForecast,
    generateCampaignInsights,
    testConnection,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};

export default useAI;
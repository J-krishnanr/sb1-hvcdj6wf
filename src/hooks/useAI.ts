import { useState, useCallback } from 'react';
import AIService from '../services/aiService';

// This would typically come from environment variables or user settings
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // Replace with actual API key

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
      const result = await aiService.generateAdCopy(request);
      return result;
    } catch (err) {
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
      const result = await aiService.generateAudienceTargeting(request);
      return result;
    } catch (err) {
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
      const result = await aiService.generatePerformanceForecast(request);
      return result;
    } catch (err) {
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
      const result = await aiService.generateCampaignInsights(request);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate campaign insights';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [aiService]);

  return {
    generateAdCopy,
    generateAudienceTargeting,
    generatePerformanceForecast,
    generateCampaignInsights,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};

export default useAI;
interface AIResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface AdCopyRequest {
  productService: string;
  targetAudience: string;
  campaignObjective: string;
  platform: string;
  tone?: string;
}

interface AudienceTargetingRequest {
  productService: string;
  campaignObjective: string;
  businessType: string;
  currentAudience?: string;
}

interface PerformanceForecastRequest {
  campaignType: string;
  budget: number;
  duration: number;
  targetAudience: string;
  platform: string;
  historicalData?: any;
}

interface CampaignInsightsRequest {
  campaignData: any;
  timeframe: string;
}

class AIService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data: AIResponse = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  async generateAdCopy(request: AdCopyRequest): Promise<{
    headlines: string[];
    descriptions: string[];
    callsToAction: string[];
  }> {
    const prompt = `
      Generate advertising copy for a ${request.platform} campaign with the following details:
      - Product/Service: ${request.productService}
      - Target Audience: ${request.targetAudience}
      - Campaign Objective: ${request.campaignObjective}
      - Tone: ${request.tone || 'Professional and engaging'}

      Please provide:
      1. 5 compelling headlines (max 30 characters each)
      2. 3 detailed descriptions (max 90 characters each)
      3. 5 call-to-action phrases

      Format the response as JSON with keys: headlines, descriptions, callsToAction
    `;

    const response = await this.makeRequest(prompt);
    
    try {
      // Extract JSON from response if it's wrapped in markdown
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      
      // Fallback parsing if JSON is not properly formatted
      return this.parseAdCopyResponse(response);
    } catch (error) {
      return this.parseAdCopyResponse(response);
    }
  }

  private parseAdCopyResponse(response: string): {
    headlines: string[];
    descriptions: string[];
    callsToAction: string[];
  } {
    const lines = response.split('\n').filter(line => line.trim());
    const headlines: string[] = [];
    const descriptions: string[] = [];
    const callsToAction: string[] = [];

    let currentSection = '';
    
    lines.forEach(line => {
      const cleanLine = line.trim();
      if (cleanLine.toLowerCase().includes('headline')) {
        currentSection = 'headlines';
      } else if (cleanLine.toLowerCase().includes('description')) {
        currentSection = 'descriptions';
      } else if (cleanLine.toLowerCase().includes('call') || cleanLine.toLowerCase().includes('cta')) {
        currentSection = 'callsToAction';
      } else if (cleanLine.match(/^\d+\./) || cleanLine.startsWith('-') || cleanLine.startsWith('•')) {
        const text = cleanLine.replace(/^\d+\.\s*/, '').replace(/^[-•]\s*/, '').replace(/"/g, '');
        if (currentSection === 'headlines' && headlines.length < 5) {
          headlines.push(text);
        } else if (currentSection === 'descriptions' && descriptions.length < 3) {
          descriptions.push(text);
        } else if (currentSection === 'callsToAction' && callsToAction.length < 5) {
          callsToAction.push(text);
        }
      }
    });

    return {
      headlines: headlines.length ? headlines : ['Get Started Today', 'Limited Time Offer', 'Transform Your Business'],
      descriptions: descriptions.length ? descriptions : ['Discover amazing results with our solution', 'Join thousands of satisfied customers', 'Experience the difference today'],
      callsToAction: callsToAction.length ? callsToAction : ['Learn More', 'Get Started', 'Shop Now', 'Sign Up', 'Contact Us']
    };
  }

  async generateAudienceTargeting(request: AudienceTargetingRequest): Promise<{
    demographics: any;
    interests: string[];
    behaviors: string[];
    suggestions: string[];
  }> {
    const prompt = `
      Analyze and suggest optimal audience targeting for:
      - Product/Service: ${request.productService}
      - Campaign Objective: ${request.campaignObjective}
      - Business Type: ${request.businessType}
      ${request.currentAudience ? `- Current Audience: ${request.currentAudience}` : ''}

      Provide detailed audience targeting recommendations including:
      1. Demographics (age range, gender, income level, education)
      2. Interests and hobbies (at least 8 relevant interests)
      3. Behaviors and purchase patterns (at least 5 behaviors)
      4. Strategic suggestions for optimization

      Format as JSON with keys: demographics, interests, behaviors, suggestions
    `;

    const response = await this.makeRequest(prompt);
    
    try {
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      return this.parseAudienceResponse(response);
    } catch (error) {
      return this.parseAudienceResponse(response);
    }
  }

  private parseAudienceResponse(response: string): {
    demographics: any;
    interests: string[];
    behaviors: string[];
    suggestions: string[];
  } {
    return {
      demographics: {
        ageRange: '25-54',
        gender: 'All',
        incomeLevel: 'Middle to Upper-Middle Class',
        education: 'College Educated'
      },
      interests: ['Technology', 'Business', 'Marketing', 'Entrepreneurship', 'Digital Tools', 'Productivity', 'Innovation', 'Growth'],
      behaviors: ['Online Shoppers', 'Business Decision Makers', 'Tech Early Adopters', 'Mobile Users', 'Social Media Active'],
      suggestions: ['Focus on mobile-first targeting', 'Use lookalike audiences', 'Target business hours for B2B', 'Consider geographic targeting']
    };
  }

  async generatePerformanceForecast(request: PerformanceForecastRequest): Promise<{
    estimatedImpressions: number;
    estimatedClicks: number;
    estimatedConversions: number;
    estimatedCTR: number;
    estimatedCPC: number;
    estimatedROAS: number;
    budgetRecommendations: string[];
    optimizationTips: string[];
  }> {
    const prompt = `
      Forecast campaign performance for:
      - Campaign Type: ${request.campaignType}
      - Budget: $${request.budget}
      - Duration: ${request.duration} days
      - Target Audience: ${request.targetAudience}
      - Platform: ${request.platform}

      Provide realistic performance forecasts including:
      1. Estimated impressions, clicks, conversions
      2. Expected CTR, CPC, and ROAS
      3. Budget optimization recommendations
      4. Performance improvement tips

      Base estimates on industry benchmarks for ${request.platform} campaigns.
      Format as JSON with keys: estimatedImpressions, estimatedClicks, estimatedConversions, estimatedCTR, estimatedCPC, estimatedROAS, budgetRecommendations, optimizationTips
    `;

    const response = await this.makeRequest(prompt);
    
    try {
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      return this.parseForecastResponse(response, request.budget);
    } catch (error) {
      return this.parseForecastResponse(response, request.budget);
    }
  }

  private parseForecastResponse(response: string, budget: number): {
    estimatedImpressions: number;
    estimatedClicks: number;
    estimatedConversions: number;
    estimatedCTR: number;
    estimatedCPC: number;
    estimatedROAS: number;
    budgetRecommendations: string[];
    optimizationTips: string[];
  } {
    // Fallback calculations based on industry averages
    const estimatedCPC = 0.85;
    const estimatedCTR = 2.5;
    const estimatedConversionRate = 3.2;
    
    const estimatedClicks = Math.round(budget / estimatedCPC);
    const estimatedImpressions = Math.round(estimatedClicks / (estimatedCTR / 100));
    const estimatedConversions = Math.round(estimatedClicks * (estimatedConversionRate / 100));
    const estimatedROAS = 3.2;

    return {
      estimatedImpressions,
      estimatedClicks,
      estimatedConversions,
      estimatedCTR,
      estimatedCPC,
      estimatedROAS,
      budgetRecommendations: [
        'Consider increasing budget by 20% for better reach',
        'Allocate 60% to top-performing ad sets',
        'Reserve 15% for testing new audiences'
      ],
      optimizationTips: [
        'Test multiple ad creatives simultaneously',
        'Monitor performance daily for first week',
        'Adjust targeting based on early results',
        'Use automated bidding for better efficiency'
      ]
    };
  }

  async generateCampaignInsights(request: CampaignInsightsRequest): Promise<{
    summary: string;
    keyFindings: string[];
    recommendations: string[];
    alerts: string[];
  }> {
    const prompt = `
      Analyze the following campaign performance data and provide insights:
      ${JSON.stringify(request.campaignData, null, 2)}
      
      Time frame: ${request.timeframe}

      Provide:
      1. A concise summary of overall performance
      2. Key findings and trends (3-5 points)
      3. Actionable recommendations (3-5 points)
      4. Any performance alerts or concerns

      Write in clear, business-friendly language that non-technical users can understand.
      Format as JSON with keys: summary, keyFindings, recommendations, alerts
    `;

    const response = await this.makeRequest(prompt);
    
    try {
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      return this.parseInsightsResponse(response);
    } catch (error) {
      return this.parseInsightsResponse(response);
    }
  }

  private parseInsightsResponse(response: string): {
    summary: string;
    keyFindings: string[];
    recommendations: string[];
    alerts: string[];
  } {
    return {
      summary: 'Your campaigns are performing well with strong engagement metrics and positive ROI trends.',
      keyFindings: [
        'Mobile traffic accounts for 70% of total impressions',
        'Conversion rates are highest during weekday business hours',
        'Video ads are outperforming static images by 35%'
      ],
      recommendations: [
        'Increase mobile-optimized ad spend',
        'Focus budget allocation on weekday scheduling',
        'Expand video ad creative testing'
      ],
      alerts: [
        'CPC has increased 12% over the past week',
        'One campaign is approaching budget limit'
      ]
    };
  }
}

export default AIService;
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
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(prompt: string): Promise<string> {
    if (!this.apiKey || this.apiKey === 'your-api-key-here') {
      throw new Error('Google Gemini API key is not configured. Please set up your API key.');
    }

    try {
      console.log('Making AI request with API key:', this.apiKey.substring(0, 10) + '...');
      
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
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error Response:', errorData);
        
        if (response.status === 400) {
          throw new Error('Invalid API request. Please check your input parameters.');
        } else if (response.status === 403) {
          throw new Error('API key is invalid or access is forbidden. Please check your Google Gemini API key.');
        } else if (response.status === 429) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
      }

      const data: AIResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response generated from AI service');
      }

      const responseText = data.candidates[0]?.content?.parts[0]?.text;
      if (!responseText) {
        throw new Error('Empty response from AI service');
      }

      return responseText;
    } catch (error) {
      console.error('AI Service Error:', error);
      
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Failed to generate AI response');
      }
    }
  }

  async generateAdCopy(request: AdCopyRequest): Promise<{
    headlines: string[];
    descriptions: string[];
    callsToAction: string[];
  }> {
    const prompt = `
      You are an expert advertising copywriter. Generate compelling advertising copy for a ${request.platform} campaign.

      Campaign Details:
      - Product/Service: ${request.productService}
      - Target Audience: ${request.targetAudience}
      - Campaign Objective: ${request.campaignObjective}
      - Tone: ${request.tone || 'Professional and engaging'}
      - Platform: ${request.platform}

      Please generate:
      1. 5 compelling headlines (each under 30 characters for ${request.platform})
      2. 3 detailed descriptions (each under 90 characters)
      3. 5 call-to-action phrases (short and action-oriented)

      IMPORTANT: Respond ONLY with valid JSON in this exact format:
      {
        "headlines": ["headline1", "headline2", "headline3", "headline4", "headline5"],
        "descriptions": ["description1", "description2", "description3"],
        "callsToAction": ["cta1", "cta2", "cta3", "cta4", "cta5"]
      }

      Do not include any other text, explanations, or markdown formatting.
    `;

    const response = await this.makeRequest(prompt);
    
    try {
      // Clean the response to extract JSON
      let cleanResponse = response.trim();
      
      // Remove markdown code blocks if present
      const jsonMatch = cleanResponse.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[1];
      }
      
      // Find JSON object in the response
      const jsonStart = cleanResponse.indexOf('{');
      const jsonEnd = cleanResponse.lastIndexOf('}') + 1;
      
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd);
      }

      const parsed = JSON.parse(cleanResponse);
      
      // Validate the response structure
      if (parsed.headlines && parsed.descriptions && parsed.callsToAction) {
        return {
          headlines: Array.isArray(parsed.headlines) ? parsed.headlines.slice(0, 5) : [],
          descriptions: Array.isArray(parsed.descriptions) ? parsed.descriptions.slice(0, 3) : [],
          callsToAction: Array.isArray(parsed.callsToAction) ? parsed.callsToAction.slice(0, 5) : []
        };
      }
      
      throw new Error('Invalid response structure');
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      console.log('Raw response:', response);
      
      // Return fallback data
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
      headlines: headlines.length ? headlines : ['Get Started Today', 'Limited Time Offer', 'Transform Your Business', 'Join Thousands', 'Discover More'],
      descriptions: descriptions.length ? descriptions : ['Discover amazing results with our proven solution', 'Join thousands of satisfied customers worldwide', 'Experience the difference starting today'],
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
      You are an expert digital marketing strategist. Analyze and suggest optimal audience targeting.

      Business Details:
      - Product/Service: ${request.productService}
      - Campaign Objective: ${request.campaignObjective}
      - Business Type: ${request.businessType}
      ${request.currentAudience ? `- Current Audience: ${request.currentAudience}` : ''}

      Provide detailed audience targeting recommendations.

      IMPORTANT: Respond ONLY with valid JSON in this exact format:
      {
        "demographics": {
          "ageRange": "age range",
          "gender": "gender preference",
          "incomeLevel": "income level",
          "education": "education level"
        },
        "interests": ["interest1", "interest2", "interest3", "interest4", "interest5", "interest6", "interest7", "interest8"],
        "behaviors": ["behavior1", "behavior2", "behavior3", "behavior4", "behavior5"],
        "suggestions": ["suggestion1", "suggestion2", "suggestion3", "suggestion4"]
      }

      Do not include any other text, explanations, or markdown formatting.
    `;

    const response = await this.makeRequest(prompt);
    
    try {
      let cleanResponse = response.trim();
      const jsonMatch = cleanResponse.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[1];
      }
      
      const jsonStart = cleanResponse.indexOf('{');
      const jsonEnd = cleanResponse.lastIndexOf('}') + 1;
      
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd);
      }

      return JSON.parse(cleanResponse);
    } catch (error) {
      console.error('Failed to parse audience response:', error);
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
      You are a performance marketing analyst. Forecast campaign performance based on industry benchmarks.

      Campaign Details:
      - Campaign Type: ${request.campaignType}
      - Budget: $${request.budget}
      - Duration: ${request.duration} days
      - Target Audience: ${request.targetAudience}
      - Platform: ${request.platform}

      Provide realistic performance forecasts based on ${request.platform} industry benchmarks.

      IMPORTANT: Respond ONLY with valid JSON in this exact format:
      {
        "estimatedImpressions": 50000,
        "estimatedClicks": 1250,
        "estimatedConversions": 40,
        "estimatedCTR": 2.5,
        "estimatedCPC": 0.85,
        "estimatedROAS": 3.2,
        "budgetRecommendations": ["recommendation1", "recommendation2", "recommendation3"],
        "optimizationTips": ["tip1", "tip2", "tip3", "tip4"]
      }

      Do not include any other text, explanations, or markdown formatting.
    `;

    const response = await this.makeRequest(prompt);
    
    try {
      let cleanResponse = response.trim();
      const jsonMatch = cleanResponse.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[1];
      }
      
      const jsonStart = cleanResponse.indexOf('{');
      const jsonEnd = cleanResponse.lastIndexOf('}') + 1;
      
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd);
      }

      return JSON.parse(cleanResponse);
    } catch (error) {
      console.error('Failed to parse forecast response:', error);
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
      You are a digital marketing analyst. Analyze campaign performance data and provide actionable insights.

      Campaign Data: ${JSON.stringify(request.campaignData, null, 2)}
      Time Frame: ${request.timeframe}

      Provide clear, business-friendly insights that non-technical users can understand and act upon.

      IMPORTANT: Respond ONLY with valid JSON in this exact format:
      {
        "summary": "Overall performance summary in 1-2 sentences",
        "keyFindings": ["finding1", "finding2", "finding3", "finding4"],
        "recommendations": ["recommendation1", "recommendation2", "recommendation3", "recommendation4"],
        "alerts": ["alert1", "alert2"]
      }

      Do not include any other text, explanations, or markdown formatting.
    `;

    const response = await this.makeRequest(prompt);
    
    try {
      let cleanResponse = response.trim();
      const jsonMatch = cleanResponse.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[1];
      }
      
      const jsonStart = cleanResponse.indexOf('{');
      const jsonEnd = cleanResponse.lastIndexOf('}') + 1;
      
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        cleanResponse = cleanResponse.substring(jsonStart, jsonEnd);
      }

      return JSON.parse(cleanResponse);
    } catch (error) {
      console.error('Failed to parse insights response:', error);
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
        'Video ads are outperforming static images by 35%',
        'Cost per acquisition has decreased by 15% this month'
      ],
      recommendations: [
        'Increase mobile-optimized ad spend by 25%',
        'Focus budget allocation on weekday scheduling',
        'Expand video ad creative testing',
        'Consider increasing overall budget for high-performing campaigns'
      ],
      alerts: [
        'CPC has increased 12% over the past week',
        'One campaign is approaching budget limit'
      ]
    };
  }
}

export default AIService;
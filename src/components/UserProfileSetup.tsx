import React, { useState } from 'react';
import { Building2, Target, Palette, Save, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserProfileData {
  companyName: string;
  industry: string;
  businessType: string;
  targetAudience: string;
  designIdeology: string;
  monthlyBudget: string;
  primaryGoals: string[];
  experience: string;
}

interface UserProfileSetupProps {
  onComplete: (profileData: UserProfileData) => void;
}

const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<UserProfileData>({
    companyName: '',
    industry: '',
    businessType: 'B2C',
    targetAudience: '',
    designIdeology: '',
    monthlyBudget: '',
    primaryGoals: [],
    experience: 'beginner'
  });

  const totalSteps = 3;

  const handleGoalToggle = (goal: string) => {
    setProfileData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter(g => g !== goal)
        : [...prev.primaryGoals, goal]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(profileData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return profileData.companyName && profileData.industry && profileData.businessType;
      case 2:
        return profileData.targetAudience && profileData.monthlyBudget;
      case 3:
        return profileData.primaryGoals.length > 0 && profileData.experience;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-8"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to AdStronaut!</h1>
          <p className="text-gray-400">Let's set up your profile to provide personalized AI recommendations</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Company Information */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6">
              <Building2 className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Company Information</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={profileData.companyName}
                onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Industry *
              </label>
              <select
                value={profileData.industry}
                onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your industry</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="education">Education</option>
                <option value="real-estate">Real Estate</option>
                <option value="food-beverage">Food & Beverage</option>
                <option value="automotive">Automotive</option>
                <option value="travel">Travel & Tourism</option>
                <option value="fitness">Fitness & Wellness</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Business Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['B2C', 'B2B', 'E-commerce', 'SaaS'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setProfileData({ ...profileData, businessType: type })}
                    className={`p-3 rounded-lg border transition-colors ${
                      profileData.businessType === type
                        ? 'border-blue-500 bg-blue-900/50 text-blue-300'
                        : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Target Audience & Budget */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6">
              <Target className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Target Audience & Budget</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Audience Description *
              </label>
              <textarea
                value={profileData.targetAudience}
                onChange={(e) => setProfileData({ ...profileData, targetAudience: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Describe your ideal customers (age, interests, demographics, etc.)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Monthly Advertising Budget *
              </label>
              <select
                value={profileData.monthlyBudget}
                onChange={(e) => setProfileData({ ...profileData, monthlyBudget: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select your budget range</option>
                <option value="under-500">Under $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2500">$1,000 - $2,500</option>
                <option value="2500-5000">$2,500 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="over-10000">Over $10,000</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Design Ideology (Optional)
              </label>
              <textarea
                value={profileData.designIdeology}
                onChange={(e) => setProfileData({ ...profileData, designIdeology: e.target.value })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Describe your brand's visual style, tone, and messaging preferences"
              />
            </div>
          </motion.div>
        )}

        {/* Step 3: Goals & Experience */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center mb-6">
              <Palette className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Goals & Experience</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Primary Goals (Select all that apply) *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Brand Awareness',
                  'Lead Generation',
                  'Sales Conversion',
                  'Website Traffic',
                  'App Downloads',
                  'Customer Retention'
                ].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleGoalToggle(goal)}
                    className={`p-3 rounded-lg border text-sm transition-colors ${
                      profileData.primaryGoals.includes(goal)
                        ? 'border-blue-500 bg-blue-900/50 text-blue-300'
                        : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Advertising Experience *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'beginner', label: 'Beginner - New to digital advertising' },
                  { value: 'intermediate', label: 'Intermediate - Some experience with ads' },
                  { value: 'advanced', label: 'Advanced - Experienced with multiple platforms' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setProfileData({ ...profileData, experience: option.value })}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      profileData.experience === option.value
                        ? 'border-blue-500 bg-blue-900/50 text-blue-300'
                        : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors flex items-center disabled:cursor-not-allowed"
          >
            {currentStep === totalSteps ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Complete Setup
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfileSetup;
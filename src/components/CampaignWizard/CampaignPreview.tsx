import React from 'react';
import { Eye, Edit, CheckCircle, AlertTriangle } from 'lucide-react';

interface CampaignData {
  name: string;
  platform: string;
  objective: string;
  budget: number;
  duration: number;
  targetAudience: string;
  adCreative?: File[];
}

interface CampaignPreviewProps {
  campaignData: CampaignData;
  onEdit: (step: number) => void;
  validationErrors: string[];
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({
  campaignData,
  onEdit,
  validationErrors
}) => {
  const hasErrors = validationErrors.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Eye className="w-6 h-6 text-blue-600 mr-3" />
        <h3 className="text-xl font-semibold text-gray-900">Campaign Preview</h3>
      </div>

      {hasErrors && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <h4 className="font-medium text-red-900">Please fix the following issues:</h4>
          </div>
          <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">Basic Information</h4>
            <button
              onClick={() => onEdit(1)}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Campaign Name:</span>
              <span className="font-medium">{campaignData.name || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform:</span>
              <span className="font-medium">{campaignData.platform || 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Objective:</span>
              <span className="font-medium">{campaignData.objective || 'Not selected'}</span>
            </div>
          </div>
        </div>

        {/* Budget & Timeline */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">Budget & Timeline</h4>
            <button
              onClick={() => onEdit(2)}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Daily Budget:</span>
              <span className="font-medium">
                {campaignData.budget ? `$${campaignData.budget}` : 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">
                {campaignData.duration ? `${campaignData.duration} days` : 'Not set'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Budget:</span>
              <span className="font-medium">
                {campaignData.budget && campaignData.duration 
                  ? `$${campaignData.budget * campaignData.duration}` 
                  : 'Not calculated'}
              </span>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">Target Audience</h4>
            <button
              onClick={() => onEdit(3)}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
          </div>
          <div className="text-sm">
            <p className="text-gray-600">
              {campaignData.targetAudience || 'No audience description provided'}
            </p>
          </div>
        </div>

        {/* Ad Creative */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900">Ad Creative</h4>
            <button
              onClick={() => onEdit(4)}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
          </div>
          <div className="text-sm">
            <p className="text-gray-600">
              {campaignData.adCreative && campaignData.adCreative.length > 0
                ? `${campaignData.adCreative.length} file(s) uploaded`
                : 'No creative assets uploaded'}
            </p>
          </div>
        </div>
      </div>

      {/* Validation Status */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center">
          {hasErrors ? (
            <>
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 font-medium">Campaign has validation errors</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700 font-medium">Campaign is ready to launch</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignPreview;
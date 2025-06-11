import React, { useState } from 'react';
import { CheckSquare, Play, Pause, Trash2, Edit, Copy } from 'lucide-react';

interface BulkActionsProps {
  selectedCampaigns: string[];
  onBulkAction: (action: string, campaignIds: string[]) => void;
  onClearSelection: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCampaigns,
  onBulkAction,
  onClearSelection
}) => {
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const handleAction = (action: string) => {
    if (action === 'delete') {
      setShowConfirm('delete');
    } else {
      onBulkAction(action, selectedCampaigns);
      onClearSelection();
    }
  };

  const confirmDelete = () => {
    onBulkAction('delete', selectedCampaigns);
    setShowConfirm(null);
    onClearSelection();
  };

  if (selectedCampaigns.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CheckSquare className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-900 font-medium">
            {selectedCampaigns.length} campaign{selectedCampaigns.length > 1 ? 's' : ''} selected
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleAction('activate')}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
          >
            <Play className="w-4 h-4 mr-1" />
            Activate
          </button>
          <button
            onClick={() => handleAction('pause')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
          >
            <Pause className="w-4 h-4 mr-1" />
            Pause
          </button>
          <button
            onClick={() => handleAction('duplicate')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
          >
            <Copy className="w-4 h-4 mr-1" />
            Duplicate
          </button>
          <button
            onClick={() => handleAction('edit')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </button>
          <button
            onClick={() => handleAction('delete')}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </button>
          <button
            onClick={onClearSelection}
            className="text-gray-600 hover:text-gray-800 px-3 py-1 text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      {showConfirm === 'delete' && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800 text-sm mb-3">
            Are you sure you want to delete {selectedCampaigns.length} campaign{selectedCampaigns.length > 1 ? 's' : ''}? 
            This action cannot be undone.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
            >
              Delete
            </button>
            <button
              onClick={() => setShowConfirm(null)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;
import React, { useState } from 'react';
import { X, Download, Calendar, FileText, Table, BarChart } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
}

interface ExportOptions {
  format: 'csv' | 'xlsx' | 'pdf';
  dateRange: string;
  metrics: string[];
  campaigns: string[];
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onExport }) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'csv',
    dateRange: 'last30days',
    metrics: ['impressions', 'clicks', 'conversions', 'spend', 'roas'],
    campaigns: []
  });

  const handleExport = () => {
    onExport(exportOptions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Export Report</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setExportOptions({ ...exportOptions, format: 'csv' })}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  exportOptions.format === 'csv'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Table className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs">CSV</div>
              </button>
              <button
                onClick={() => setExportOptions({ ...exportOptions, format: 'xlsx' })}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  exportOptions.format === 'xlsx'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs">Excel</div>
              </button>
              <button
                onClick={() => setExportOptions({ ...exportOptions, format: 'pdf' })}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  exportOptions.format === 'pdf'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <BarChart className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs">PDF</div>
              </button>
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={exportOptions.dateRange}
              onChange={(e) => setExportOptions({ ...exportOptions, dateRange: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last90days">Last 90 days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Metrics Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Include Metrics
            </label>
            <div className="space-y-2">
              {[
                { key: 'impressions', label: 'Impressions' },
                { key: 'clicks', label: 'Clicks' },
                { key: 'conversions', label: 'Conversions' },
                { key: 'spend', label: 'Spend' },
                { key: 'roas', label: 'ROAS' },
                { key: 'ctr', label: 'CTR' },
                { key: 'cpc', label: 'CPC' }
              ].map((metric) => (
                <label key={metric.key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exportOptions.metrics.includes(metric.key)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setExportOptions({
                          ...exportOptions,
                          metrics: [...exportOptions.metrics, metric.key]
                        });
                      } else {
                        setExportOptions({
                          ...exportOptions,
                          metrics: exportOptions.metrics.filter(m => m !== metric.key)
                        });
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{metric.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
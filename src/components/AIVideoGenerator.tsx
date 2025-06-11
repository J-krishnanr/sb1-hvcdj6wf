import React, { useState } from 'react';
import { Video, Wand2, Download, RefreshCw, Sparkles, Play } from 'lucide-react';

interface AIVideoGeneratorProps {
  onVideoGenerated?: (videoData: any) => void;
}

const AIVideoGenerator: React.FC<AIVideoGeneratorProps> = ({ onVideoGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('15');
  const [style, setStyle] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideos, setGeneratedVideos] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a description for your video');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call - replace with actual video generation service
    setTimeout(() => {
      const mockVideos = [
        {
          id: 1,
          title: 'Professional Business Video',
          thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: '15s',
          url: '#'
        },
        {
          id: 2,
          title: 'Modern Marketing Video',
          thumbnail: 'https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg?auto=compress&cs=tinysrgb&w=400',
          duration: '15s',
          url: '#'
        }
      ];
      
      setGeneratedVideos(mockVideos);
      setIsGenerating(false);
      onVideoGenerated?.(mockVideos);
    }, 5000);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
      <div className="flex items-center mb-6">
        <div className="bg-red-900 p-2 rounded-full mr-3">
          <Video className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">AI Video Generator</h3>
          <p className="text-sm text-gray-400">Create engaging video content for your campaigns</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Video Description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            rows={3}
            placeholder="Describe the video you want to create (e.g., 'A product showcase video with smooth transitions and modern music')"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="15">15 seconds</option>
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="120">2 minutes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="energetic">Energetic</option>
              <option value="minimalist">Minimalist</option>
              <option value="cinematic">Cinematic</option>
              <option value="animated">Animated</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Video Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Product Demo', 'Testimonial', 'Explainer', 'Social Media'].map((type) => (
              <button
                key={type}
                className="p-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 text-sm transition-colors"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Generating Video...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Video
          </>
        )}
      </button>

      {/* Generated Videos */}
      {generatedVideos.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-white mb-4">Generated Videos</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedVideos.map((video) => (
              <div key={video.id} className="bg-gray-700 rounded-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h5 className="font-medium text-white mb-2">{video.title}</h5>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                      Preview
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-3 rounded text-sm transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder when no videos */}
      {generatedVideos.length === 0 && !isGenerating && (
        <div className="mt-6 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
          <Video className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Generated videos will appear here</p>
        </div>
      )}

      {/* Note about external API */}
      <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
        <p className="text-yellow-200 text-sm">
          <Wand2 className="w-4 h-4 inline mr-1" />
          Note: This is a demo. Actual implementation requires integration with video generation APIs like RunwayML, Synthesia, or similar services.
        </p>
      </div>
    </div>
  );
};

export default AIVideoGenerator;
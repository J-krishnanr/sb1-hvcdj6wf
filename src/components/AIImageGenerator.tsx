import React, { useState } from 'react';
import { Image, Wand2, Download, RefreshCw, Sparkles } from 'lucide-react';

interface AIImageGeneratorProps {
  onImageGenerated?: (imageData: any) => void;
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState('1024x1024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a description for your image');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call - replace with actual image generation service
    setTimeout(() => {
      const mockImages = [
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1024',
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1024',
        'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=1024'
      ];
      
      setGeneratedImages(mockImages);
      setIsGenerating(false);
      onImageGenerated?.(mockImages);
    }, 3000);
  };

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
      <div className="flex items-center mb-6">
        <div className="bg-pink-900 p-2 rounded-full mr-3">
          <Image className="w-5 h-5 text-pink-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">AI Image Generator</h3>
          <p className="text-sm text-gray-400">Create stunning visuals for your ads</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Image Description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            rows={3}
            placeholder="Describe the image you want to generate (e.g., 'A modern office space with people working on laptops, bright and professional')"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="realistic">Realistic</option>
              <option value="artistic">Artistic</option>
              <option value="cartoon">Cartoon</option>
              <option value="minimalist">Minimalist</option>
              <option value="vintage">Vintage</option>
              <option value="futuristic">Futuristic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Size
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="1024x1024">Square (1024x1024)</option>
              <option value="1024x768">Landscape (1024x768)</option>
              <option value="768x1024">Portrait (768x1024)</option>
              <option value="1920x1080">Widescreen (1920x1080)</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Generating Images...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Images
          </>
        )}
      </button>

      {/* Generated Images */}
      {generatedImages.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-white mb-4">Generated Images</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {generatedImages.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt={`Generated ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => downloadImage(imageUrl, index)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder when no images */}
      {generatedImages.length === 0 && !isGenerating && (
        <div className="mt-6 text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
          <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Generated images will appear here</p>
        </div>
      )}

      {/* Note about external API */}
      <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
        <p className="text-yellow-200 text-sm">
          <Wand2 className="w-4 h-4 inline mr-1" />
          Note: This is a demo. Actual implementation requires integration with image generation APIs like DALL-E, Midjourney, or Stable Diffusion.
        </p>
      </div>
    </div>
  );
};

export default AIImageGenerator;
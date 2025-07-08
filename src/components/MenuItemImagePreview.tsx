import React from 'react';
import { getImageForItem, suggestImagesForItem, addImageMapping } from '../utils/imageAssignment';

interface ImagePreviewProps {
  itemId: string;
  itemName: string;
  category: string;
  currentImage?: string;
  onImageChange?: (newImage: string) => void;
}

/**
 * Component for previewing and managing menu item images
 * Shows the automatically assigned image and provides suggestions
 */
export const MenuItemImagePreview: React.FC<ImagePreviewProps> = ({
  itemId,
  itemName,
  category,
  currentImage,
  onImageChange
}) => {
  const autoAssignedImage = getImageForItem(itemId, itemName, category);
  const suggestions = suggestImagesForItem(itemName, category);
  const displayImage = currentImage || autoAssignedImage;

  const handleImageChange = (newImage: string) => {
    // Update the mapping
    addImageMapping(itemId, newImage);
    
    // Notify parent component
    if (onImageChange) {
      onImageChange(newImage);
    }
  };

  return (
    <div className="menu-item-image-preview p-4 border rounded-lg">
      {/* Current Image Display */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Current Image:</h4>
        <div className="w-32 h-32 border rounded-lg overflow-hidden bg-gray-100">
          <img 
            src={displayImage} 
            alt={itemName}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              (e.target as HTMLImageElement).src = '/assets/images/menu-item-placeholder.jpg';
            }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Path: {displayImage}
        </p>
      </div>

      {/* Image Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Suggested Images:</h4>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.slice(0, 4).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(suggestion)}
                className="w-16 h-16 border rounded overflow-hidden bg-gray-100 hover:border-blue-500"
              >
                <img 
                  src={suggestion} 
                  alt={`Suggestion ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/menu-item-placeholder.jpg';
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Manual Image URL Input */}
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Image URL:</h4>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter image path..."
            className="flex-1 px-3 py-1 border rounded text-sm"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                if (input.value.trim()) {
                  handleImageChange(input.value.trim());
                  input.value = '';
                }
              }
            }}
          />
          <button
            onClick={(e) => {
              const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
              if (input.value.trim()) {
                handleImageChange(input.value.trim());
                input.value = '';
              }
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemImagePreview;

// Image assignment utility for menu items
// Automatically assigns appropriate images based on item names and categories

export interface ImageMapping {
  [key: string]: string;
}

// Image mappings for different product categories
const imageDatabase: ImageMapping = {
  // Soft Drinks
  'pepsi': '/assets/images/pepsi-can.jpg',
  'pepsi-diet': '/assets/images/pepsi-diet-can.jpg',
  'miranda': '/assets/images/miranda-orange.jpg',
  '7up': '/assets/images/7up-can.jpg',
  '7up-diet': '/assets/images/7up-diet-can.jpg',
  'water': '/assets/images/water-bottle.jpg',
  
  // Hot Beverages
  'coffee': '/assets/images/hot-coffee-cup.jpg',
  'nescafe': '/assets/images/nescafe-instant.jpg',
  'tea': '/assets/images/black-tea-cup.jpg',
  
  // Cold Beverages
  'ice-tea': '/assets/images/iced-tea-glass.jpg',
  'ice-coffee': '/assets/images/iced-coffee-glass.jpg',
  
  // Premium Drinks
  'xxl': '/assets/images/xxl-energy-drink.jpg',
  'almaza': '/assets/images/almaza-beer-bottle.jpg',
  'almaza-light': '/assets/images/almaza-light-beer.jpg',
  'maccaw': '/assets/images/maccaw-tropical-drink.jpg',
  'extra-ras': '/assets/images/extra-ras-beverage.jpg',
  'rakwe-ahwe': '/assets/images/arabic-coffee-set.jpg',
  'termos': '/assets/images/thermos-hot-drink.jpg',
  'jazar': '/assets/images/carrot-juice-glass.jpg',
  
  // Shisha
  'shisha': '/assets/images/premium-shisha-setup.jpg',
  
  // Snacks
  'nuts': '/assets/images/mixed-nuts-bowl.jpg'
};

// Fallback images for categories when specific item not found
const categoryFallbacks: ImageMapping = {
  'soft-drinks': '/assets/images/soft-drink-generic.jpg',
  'hot-beverages': '/assets/images/hot-beverage-generic.jpg',
  'cold-beverages': '/assets/images/cold-beverage-generic.jpg',
  'premium-drinks': '/assets/images/premium-drink-generic.jpg',
  'shisha': '/assets/images/shisha-generic.jpg',
  'snacks': '/assets/images/snacks-generic.jpg'
};

/**
 * Get the appropriate image for a menu item
 * @param itemId - The unique identifier of the menu item
 * @param itemName - The name of the menu item
 * @param category - The category the item belongs to
 * @returns The image path for the item
 */
export function getImageForItem(itemId: string, itemName: string, category: string): string {
  // First, try to find exact match by item ID
  if (imageDatabase[itemId]) {
    return imageDatabase[itemId];
  }
  
  // Try to find by normalized name (lowercase, no spaces)
  const normalizedName = itemName.toLowerCase().replace(/\s+/g, '-');
  if (imageDatabase[normalizedName]) {
    return imageDatabase[normalizedName];
  }
  
  // Try to find by category fallback
  if (categoryFallbacks[category]) {
    return categoryFallbacks[category];
  }
  
  // Ultimate fallback
  return '/assets/images/menu-item-placeholder.jpg';
}

/**
 * Get image suggestions for a new item
 * @param itemName - The name of the item
 * @param category - The category of the item
 * @returns Array of suggested image paths
 */
export function suggestImagesForItem(itemName: string, category: string): string[] {
  const suggestions: string[] = [];
  const normalizedName = itemName.toLowerCase();
  
  // Search for partial matches in the database
  Object.keys(imageDatabase).forEach(key => {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      suggestions.push(imageDatabase[key]);
    }
  });
  
  // Add category fallback if no matches found
  if (suggestions.length === 0 && categoryFallbacks[category]) {
    suggestions.push(categoryFallbacks[category]);
  }
  
  return suggestions;
}

/**
 * Add a new image mapping
 * @param itemId - The item identifier
 * @param imagePath - The path to the image
 */
export function addImageMapping(itemId: string, imagePath: string): void {
  imageDatabase[itemId] = imagePath;
}

/**
 * Get all available images for a category
 * @param category - The category to get images for
 * @returns Array of image paths for the category
 */
export function getImagesForCategory(category: string): string[] {
  return Object.keys(imageDatabase)
    .filter(key => {
      // You could implement more sophisticated category detection here
      return imageDatabase[key].includes(category) || 
             (categoryFallbacks[category] && imageDatabase[key] === categoryFallbacks[category]);
    })
    .map(key => imageDatabase[key]);
}

// Export the mappings for external use if needed
export { imageDatabase, categoryFallbacks };

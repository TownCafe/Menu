import React, { useState } from 'react';
import { X, Plus, Minus, Clock, Flame, Leaf, Star, ChefHat, AlertTriangle } from 'lucide-react';
import { MenuItem, CustomerCustomizations } from '../types';

interface ItemModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  onAddToCart: (item: MenuItem, quantity: number, customizations: CustomerCustomizations) => void;
}

const ItemModal: React.FC<ItemModalProps> = ({
  item,
  isOpen,
  onClose,
  language,
  theme,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState({
    spiceLevel: '',
    size: '',
    extras: [] as string[],
    notes: ''
  });

  if (!isOpen) return null;

  const handleAddToCart = () => {
    onAddToCart(item, quantity, customizations);
    onClose();
    setQuantity(1);
    setCustomizations({ spiceLevel: '', size: '', extras: [], notes: '' });
  };

  const getSpiceLevelColor = (level?: string) => {
    switch (level) {
      case 'mild': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hot': return 'text-orange-500';
      case 'very-hot': return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-50 md:p-4">
      <div className={`${theme === 'light' ? 'bg-white' : 'bg-slate-900'} rounded-t-3xl md:rounded-2xl w-full md:max-w-2xl md:w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto border-t border-l border-r md:border ${theme === 'light' ? 'border-slate-200' : 'border-slate-700'} shadow-2xl`}>
        {/* Header */}
        <div className="relative">
          {/* Mobile drag indicator */}
          <div className="md:hidden absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-slate-300 rounded-full z-10"></div>
          
          <img 
            src={item.image} 
            alt={language === 'ar' ? item.nameAr : item.name}
            className="w-full h-48 md:h-64 object-cover rounded-t-3xl md:rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-600 p-3 md:p-2 rounded-full transition-colors shadow-lg z-10"
          >
            <X size={20} />
          </button>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {item.isPopular && (
              <span className="bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                <Star size={12} />
                {language === 'ar' ? 'الأكثر طلباً' : 'Popular'}
              </span>
            )}
            {item.isChefRecommended && (
              <span className="bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                <ChefHat size={12} />
                {language === 'ar' ? 'اختيار الشيف' : 'Chef\'s Choice'}
              </span>
            )}
          </div>
        </div>

        <div className="p-4 md:p-6">
          {/* Title and Price */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 mr-3">
              <h2 className={`text-xl md:text-2xl font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                {language === 'ar' ? item.nameAr : item.name}
              </h2>
              <div className="flex items-center gap-3 text-sm flex-wrap">
                {item.preparationTime && (
                  <span className="flex items-center gap-1 text-amber-600">
                    <Clock size={14} />
                    {item.preparationTime} {language === 'ar' ? 'د' : 'min'}
                  </span>
                )}
                {item.calories && (
                  <span className={theme === 'light' ? 'text-slate-600' : 'text-slate-300'}>
                    {item.calories} {language === 'ar' ? 'سعرة' : 'cal'}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-2xl md:text-3xl font-bold text-amber-600">
                {item.price.toLocaleString()}
              </span>
              <div className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                {language === 'ar' ? 'ل.ل' : 'LBP'}
              </div>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <p className={`mb-6 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              {language === 'ar' ? item.descriptionAr : item.description}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {item.spiceLevel && (
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-700'} ${getSpiceLevelColor(item.spiceLevel)}`}>
                <Flame size={14} />
                {language === 'ar' ? 
                  { 'mild': 'خفيف', 'medium': 'متوسط', 'hot': 'حار', 'very-hot': 'حار جداً' }[item.spiceLevel] :
                  item.spiceLevel.charAt(0).toUpperCase() + item.spiceLevel.slice(1)
                }
              </span>
            )}
            
            {item.isVegetarian && (
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/30 text-green-400'}`}>
                <Leaf size={14} />
                {language === 'ar' ? 'نباتي' : 'Vegetarian'}
              </span>
            )}
          </div>

          {/* Ingredients */}
          {item.ingredients && (
            <div className="mb-6">
              <h3 className={`font-semibold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                {language === 'ar' ? 'المكونات:' : 'Ingredients:'}
              </h3>
              <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                {language === 'ar' ? item.ingredientsAr?.join('، ') : item.ingredients.join(', ')}
              </p>
            </div>
          )}

          {/* Allergens */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="mb-6">
              <h3 className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                <AlertTriangle size={16} className="text-orange-500" />
                {language === 'ar' ? 'مسببات الحساسية:' : 'Allergens:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.allergens.map((allergen, index) => (
                  <span key={index} className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-sm">
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nutritional Info */}
          {item.nutritionalInfo && (
            <div className="mb-6">
              <h3 className={`font-semibold mb-3 ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                {language === 'ar' ? 'القيم الغذائية:' : 'Nutritional Information:'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`text-center p-3 rounded-lg ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-800'}`}>
                  <div className="font-semibold text-amber-600">{item.nutritionalInfo.protein}g</div>
                  <div className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {language === 'ar' ? 'بروتين' : 'Protein'}
                  </div>
                </div>
                <div className={`text-center p-3 rounded-lg ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-800'}`}>
                  <div className="font-semibold text-amber-600">{item.nutritionalInfo.carbs}g</div>
                  <div className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {language === 'ar' ? 'كربوهيدرات' : 'Carbs'}
                  </div>
                </div>
                <div className={`text-center p-3 rounded-lg ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-800'}`}>
                  <div className="font-semibold text-amber-600">{item.nutritionalInfo.fat}g</div>
                  <div className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {language === 'ar' ? 'دهون' : 'Fat'}
                  </div>
                </div>
                <div className={`text-center p-3 rounded-lg ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-800'}`}>
                  <div className="font-semibold text-amber-600">{item.nutritionalInfo.fiber}g</div>
                  <div className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                    {language === 'ar' ? 'ألياف' : 'Fiber'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customizations */}
          {item.customizations && (
            <div className="mb-6 space-y-4">
              <h3 className={`font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                {language === 'ar' ? 'خيارات التخصيص:' : 'Customizations:'}
              </h3>
              
              {/* Spice Level */}
              {item.customizations.spiceLevel && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                    {language === 'ar' ? 'مستوى الحرارة:' : 'Spice Level:'}
                  </label>
                  <div className="flex gap-2">
                    {['mild', 'medium', 'hot', 'very-hot'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setCustomizations(prev => ({ ...prev, spiceLevel: level }))}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          customizations.spiceLevel === level
                            ? 'bg-amber-500 text-white'
                            : `${theme === 'light' ? 'bg-stone-100 text-stone-600 hover:bg-amber-50' : 'bg-stone-700 text-stone-300 hover:bg-amber-900/20'}`
                        }`}
                      >
                        {language === 'ar' ? 
                          { 'mild': 'خفيف', 'medium': 'متوسط', 'hot': 'حار', 'very-hot': 'حار جداً' }[level] :
                          level.charAt(0).toUpperCase() + level.slice(1)
                        }
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Options */}
              {item.customizations.size && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                    {language === 'ar' ? 'الحجم:' : 'Size:'}
                  </label>
                  <div className="flex gap-2">
                    {item.customizations.size.map((size) => (
                      <button
                        key={size}
                        onClick={() => setCustomizations(prev => ({ ...prev, size }))}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          customizations.size === size
                            ? 'bg-amber-500 text-white'
                            : `${theme === 'light' ? 'bg-stone-100 text-stone-600 hover:bg-amber-50' : 'bg-stone-700 text-stone-300 hover:bg-amber-900/20'}`
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Notes */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                  {language === 'ar' ? 'ملاحظات خاصة:' : 'Special Notes:'}
                </label>
                <textarea
                  value={customizations.notes}
                  onChange={(e) => setCustomizations(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder={language === 'ar' ? 'أي طلبات خاصة...' : 'Any special requests...'}
                  className={`w-full p-3 rounded-lg border transition-colors ${
                    theme === 'light' 
                      ? 'bg-white border-slate-200 text-slate-700 placeholder-slate-400 focus:border-amber-500' 
                      : 'bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-500 focus:border-amber-400'
                  }`}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="sticky bottom-0 bg-white dark:bg-slate-900 pt-4 border-t border-slate-200 dark:border-slate-700 -mx-4 md:-mx-6 px-4 md:px-6 pb-4 md:pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`font-medium text-sm md:text-base ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                  {language === 'ar' ? 'الكمية:' : 'Quantity:'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`p-3 md:p-2 rounded-xl md:rounded-lg transition-colors ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
                  >
                    <Minus size={16} />
                  </button>
                  <span className={`w-12 text-center font-semibold text-lg md:text-base ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`p-3 md:p-2 rounded-xl md:rounded-lg transition-colors ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full btn-primary px-6 py-4 md:py-3 rounded-xl md:rounded-lg font-medium flex items-center justify-center gap-2 text-lg md:text-base shadow-lg"
            >
              <Plus size={18} />
              {language === 'ar' ? `إضافة ${(item.price * quantity).toLocaleString()} ل.ل` : `Add ${(item.price * quantity).toLocaleString()} LBP`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
import React, { useState } from 'react';
import { Plus, Clock, Flame, Leaf, Star, ChefHat, Info } from 'lucide-react';
import { MenuItem, CustomerCustomizations } from '../types';
import ItemModal from './ItemModal';

interface MenuItemCardProps {
  item: MenuItem;
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  onAddToCart: (item: MenuItem, quantity: number, customizations: CustomerCustomizations) => void;
  onOpenModal?: (item: MenuItem) => void;
  animationDelay: number;
  isMobile?: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  language,
  theme,
  onAddToCart,
  onOpenModal,
  animationDelay,
  isMobile = false
}) => {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getSpiceLevelColor = (level?: string) => {
    switch (level) {
      case 'mild': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hot': return 'text-orange-500';
      case 'very-hot': return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  const getSpiceLevelText = (level?: string) => {
    if (!level) return '';
    const levels = {
      'mild': { en: 'Mild', ar: 'خفيف' },
      'medium': { en: 'Medium', ar: 'متوسط' },
      'hot': { en: 'Hot', ar: 'حار' },
      'very-hot': { en: 'Very Hot', ar: 'حار جداً' }
    };
    return language === 'ar' ? levels[level as keyof typeof levels]?.ar : levels[level as keyof typeof levels]?.en;
  };

  return (
    <>
      <div 
        className={`menu-item ${theme === 'light' ? 'bg-white shadow-lg' : 'bg-stone-800 shadow-xl'} rounded-2xl overflow-hidden border ${theme === 'light' ? 'border-amber-200/50' : 'border-amber-700/30'} group cursor-pointer hover:shadow-2xl transition-all duration-300 ${isMobile ? 'active:scale-95 mx-2' : ''} card-hover`}
        style={{ animationDelay: `${animationDelay}s` }}
        onClick={() => onOpenModal ? onOpenModal(item) : setShowModal(true)}
      >
        {/* Image Container */}
        <div className={`relative ${isMobile ? 'h-40' : 'h-48'} overflow-hidden`}>
          {!imageLoaded && (
            <div className={`absolute inset-0 ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-700'} animate-pulse`} />
          )}
          <img 
            src={item.image} 
            alt={language === 'ar' ? item.nameAr : item.name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {item.isPopular && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Star size={12} />
                {language === 'ar' ? 'الأكثر طلباً' : 'Popular'}
              </span>
            )}
            {item.isChefRecommended && (
              <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <ChefHat size={12} />
                {language === 'ar' ? 'اختيار الشيف' : 'Chef\'s Choice'}
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item, 1, {});
            }}
            className={`absolute bottom-3 right-3 btn-primary ${isMobile ? 'p-3' : 'p-2'} rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg`}
          >
            <Plus size={isMobile ? 18 : 16} />
          </button>
        </div>

        {/* Content */}
        <div className={isMobile ? 'p-4' : 'p-6'}>
          {/* Title and Price */}
          <div className={`flex justify-between items-start ${isMobile ? 'mb-2' : 'mb-3'}`}>
            <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'} ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'} leading-tight`}>
              {language === 'ar' ? item.nameAr : item.name}
            </h3>
            <div className="text-right">
              <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-amber-600`}>
                {item.price.toLocaleString()}
              </span>
              <span className={`${isMobile ? 'text-xs' : 'text-sm'} ml-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                {language === 'ar' ? 'ل.ل' : 'LBP'}
              </span>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} ${isMobile ? 'mb-3' : 'mb-4'} line-clamp-2 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              {language === 'ar' ? item.descriptionAr : item.description}
            </p>
          )}

          {/* Tags and Info */}
          <div className={`flex flex-wrap items-center gap-2 ${isMobile ? 'mb-3' : 'mb-4'}`}>
            {item.preparationTime && (
              <span className={`flex items-center gap-1 ${isMobile ? 'text-xs px-2 py-1' : 'text-xs px-2 py-1'} rounded-full ${theme === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-700 text-slate-300'}`}>
                <Clock size={12} />
                {item.preparationTime} {language === 'ar' ? 'دقيقة' : 'min'}
              </span>
            )}
            
            {item.spiceLevel && (
              <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-700'} ${getSpiceLevelColor(item.spiceLevel)}`}>
                <Flame size={12} />
                {getSpiceLevelText(item.spiceLevel)}
              </span>
            )}
            
            {item.isVegetarian && (
              <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${theme === 'light' ? 'bg-green-100 text-green-600' : 'bg-green-900/30 text-green-400'}`}>
                <Leaf size={12} />
                {language === 'ar' ? 'نباتي' : 'Veg'}
              </span>
            )}

            {item.calories && (
              <span className={`text-xs px-2 py-1 rounded-full ${theme === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-700 text-slate-300'}`}>
                {item.calories} {language === 'ar' ? 'سعرة' : 'cal'}
              </span>
            )}
          </div>

          {/* More Info Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className={`flex items-center gap-2 ${isMobile ? 'text-xs' : 'text-sm'} font-medium transition-colors ${
              theme === 'light' ? 'text-amber-600 hover:text-amber-700' : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            <Info size={isMobile ? 12 : 14} />
            {language === 'ar' ? 'المزيد من التفاصيل' : 'More Details'}
          </button>
        </div>
      </div>

      {/* Item Modal */}
      <ItemModal
        item={item}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        language={language}
        theme={theme}
        onAddToCart={onAddToCart}
      />
    </>
  );
};

export default MenuItemCard;
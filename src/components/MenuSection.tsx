import React from 'react';
import MenuItemCard from './MenuItemCard';
import { MenuCategory, MenuItem, CustomerCustomizations } from '../types';

interface MenuSectionProps {
  category: MenuCategory;
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  onAddToCart: (item: MenuItem, quantity: number, customizations: CustomerCustomizations) => void;
  onOpenModal?: (item: MenuItem) => void;
  animationDelay: number;
  isMobile?: boolean;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  category,
  language,
  theme,
  onAddToCart,
  onOpenModal,
  animationDelay,
  isMobile = false
}) => {
  const Icon = category.icon;

  return (
    <section 
      id={category.id}
      className="animate-slideInUp"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Section Header */}
      <div className={`text-center ${isMobile ? 'mb-6 px-4' : 'mb-12'}`}>
        <div className={`flex items-center justify-center gap-4 ${isMobile ? 'mb-3' : 'mb-4'}`}>
          <div className={`${isMobile ? 'text-2xl' : 'text-4xl'} text-amber-600`}>
            <Icon size={isMobile ? 28 : 40} />
          </div>
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold gradient-text`}>
            {language === 'ar' ? category.titleAr : category.title}
          </h2>
        </div>
        {category.description && (
          <p className={`${isMobile ? 'text-base' : 'text-lg'} max-w-2xl mx-auto ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
            {language === 'ar' ? category.descriptionAr : category.description}
          </p>
        )}
        <div className={`${isMobile ? 'w-16 h-0.5' : 'w-24 h-1'} bg-gradient-to-r from-amber-500 to-red-500 mx-auto mt-4 rounded-full`}></div>
      </div>

      {/* Menu Items Grid */}
      <div className={`grid gap-6 ${isMobile ? 'px-4 grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {category.items.map((item, index) => (
          <MenuItemCard
            key={item.id}
            item={item}
            language={language}
            theme={theme}
            onAddToCart={onAddToCart}
            onOpenModal={onOpenModal}
            animationDelay={index * 0.1}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

interface MobileHeaderProps {
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  cartItemsCount: number;
  onOpenCart: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  language,
  theme,
  onToggleLanguage,
  onToggleTheme,
  cartItemsCount,
  onOpenCart
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass dark:glass-dark border-b border-amber-200 dark:border-amber-500/30">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Town Café Logo */}
          <div className="w-8 h-8 flex-shrink-0">
            <img 
              src="/Menu/town-cafe-logo.svg" 
              alt="Town Café Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to JPG if SVG fails
                (e.target as HTMLImageElement).src = "/Menu/town-cafe-logo.jpg";
              }}
            />
          </div>
          
          {/* Brand Text */}
          <div className="text-xl font-bold">
            <span className="gradient-text">
              {language === 'ar' ? 'تاون كافيه' : 'Town Café'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <div className="cart-button">
            <button
              onClick={onOpenCart}
              className="glass dark:glass-dark rounded-full px-4 py-3 transition-all duration-300 shadow-lg hover:bg-amber-50/50 dark:hover:bg-amber-900/20 flex items-center justify-center"
            >
              <div className="cart-icon-container">
                <ShoppingCart size={18} className="text-amber-600" />
                {/* Badge positioned relative to the icon itself */}
                {cartItemsCount > 0 && (
                  <div className="cart-badge-icon">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </div>
                )}
              </div>
            </button>
          </div>

          {/* Theme Toggle - Hidden */}
          <div className="hidden">
            <ThemeToggle theme={theme} language={language} onToggle={onToggleTheme} />
          </div>

          {/* Language Toggle */}
          <LanguageToggle language={language} onToggle={onToggleLanguage} />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
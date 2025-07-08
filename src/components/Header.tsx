import React, { useState } from 'react';
import { Menu, X, ShoppingCart, MapPin, Clock } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  activeSection: string;
  cartItemsCount: number;
}

const Header: React.FC<HeaderProps> = ({
  language,
  theme,
  onToggleLanguage,
  onToggleTheme,
  activeSection,
  cartItemsCount
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuSections = [
    { id: 'shisha', name: 'Shisha', nameAr: 'الشيشة' },
    { id: 'soft-drinks', name: 'Soft Drinks', nameAr: 'المشروبات الغازية' },
    { id: 'hot-beverages', name: 'Hot Drinks', nameAr: 'المشروبات الساخنة' },
    { id: 'cold-beverages', name: 'Cold Drinks', nameAr: 'المشروبات الباردة' },
    { id: 'premium-drinks', name: 'Premium', nameAr: 'المشروبات المميزة' },
    { id: 'snacks', name: 'Snacks', nameAr: 'الوجبات الخفيفة' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass dark:glass-dark border-b border-amber-200/50 dark:border-amber-400/30 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">
              <span className="gradient-text">
                {language === 'ar' ? 'تاون كافيه' : 'Town Café'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                    : `${theme === 'light' ? 'text-stone-700 hover:text-amber-600' : 'text-stone-200 hover:text-amber-400'} hover:bg-amber-50 dark:hover:bg-amber-900/20`
                }`}
              >
                {language === 'ar' ? section.nameAr : section.name}
              </button>
            ))}
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-amber-600" />
              <span className={theme === 'light' ? 'text-stone-600' : 'text-stone-300'}>
                {language === 'ar' ? '6م - 2ص' : '6PM - 2AM'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <ThemeToggle theme={theme} language={language} onToggle={onToggleTheme} />
            <LanguageToggle language={language} onToggle={onToggleLanguage} />
            
            {/* Cart Button */}
            <div className="cart-button">
              <button className="glass dark:glass-dark rounded-full px-4 py-3 transition-all duration-300 shadow-lg hover:bg-amber-50/50 dark:hover:bg-amber-900/20 flex items-center justify-center hover:scale-105">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-200 dark:border-amber-500/30">
            <nav className="space-y-2">
              {menuSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-amber-500 text-white'
                      : `${theme === 'light' ? 'text-slate-700 hover:bg-amber-50' : 'text-slate-200 hover:bg-amber-900/20'}`
                  }`}
                >
                  {language === 'ar' ? section.nameAr : section.name}
                </button>
              ))}
            </nav>
            
            {/* Mobile Contact Info */}
            <div className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-500/30 space-y-2">
              <div className="flex items-center space-x-3 px-4">
                <Clock size={16} className="text-amber-600" />
                <span className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {language === 'ar' ? 'يومياً 6 مساءً - 2 صباحاً' : 'Daily 6 PM - 2 AM'}
                </span>
              </div>
              <div className="flex items-center space-x-3 px-4">
                <MapPin size={16} className="text-amber-600" />
                <span className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {language === 'ar' ? 'الرياض، حي الملز' : 'Riyadh, Al Malaz'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
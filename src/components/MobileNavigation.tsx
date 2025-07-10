import React from 'react';
import { Cigarette, Coffee, CupSoda, Utensils, GlassWater, Pizza, Popcorn, Wine } from 'lucide-react';

interface MobileNavigationProps {
  activeSection: string;
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  onSectionChange: (section: string) => void;
  onShowFoodSection?: (show: boolean) => void; // NEW PROP
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeSection,
  language,
  theme,
  onSectionChange,
  onShowFoodSection // NEW PROP
}) => {
  const sections = [
    { id: 'shisha', name: 'Shisha', nameAr: 'الشيشة', icon: Cigarette },
    { id: 'soft-drinks', name: 'Soft Drinks', nameAr: 'الغازية', icon: CupSoda },
    { id: 'hot-beverages', name: 'Hot', nameAr: 'الساخنة', icon: Coffee },
    { id: 'cold-beverages', name: 'Cold', nameAr: 'الباردة', icon: Wine },
    // { id: 'premium-drinks', name: 'Premium', nameAr: 'المميزة', icon: Wine },
    { id: 'snacks', name: 'Snacks', nameAr: 'المقبلات', icon: Popcorn },
    { id: 'food', name: 'food', nameAr: 'food', icon: Utensils }
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'food') {
      if (onShowFoodSection) onShowFoodSection(true);
      return;
    }
    if (onShowFoodSection) onShowFoodSection(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64; // Mobile header height
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    onSectionChange(sectionId);

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 ${theme === 'light' ? 'bg-white/95 backdrop-blur-lg' : 'bg-slate-900/95 backdrop-blur-lg'} border-t ${theme === 'light' ? 'border-slate-200' : 'border-slate-700'} shadow-2xl safe-area-bottom`}>
      <div className="flex items-center justify-around px-2 py-3">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 min-w-0 flex-1 ${
                isActive
                  ? `${theme === 'light' ? 'bg-amber-100 text-amber-700' : 'bg-amber-900/50 text-amber-400'} scale-105 shadow-lg`
                  : `${theme === 'light' ? 'text-stone-600 hover:text-amber-600 hover:bg-amber-50' : 'text-stone-400 hover:text-amber-400 hover:bg-amber-900/20'}`
              }`}
            >
              <Icon size={20} className={`${isActive ? 'scale-110' : ''} transition-transform duration-300`} />
              <span className={`text-xs font-medium truncate w-full text-center ${isActive ? 'font-semibold' : ''}`}>
                {language === 'ar' ? section.nameAr : section.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
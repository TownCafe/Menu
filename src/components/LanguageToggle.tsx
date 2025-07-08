import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: 'ar' | 'en';
  onToggle: () => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 glass dark:glass-dark rounded-full px-4 py-3 hover:bg-amber-50/50 dark:hover:bg-amber-900/20 transition-all duration-300 shadow-lg hover:scale-105"
    >
      <Globe size={18} className="text-amber-600" />
      <span className="text-sm font-medium text-stone-700 dark:text-stone-200 hidden sm:inline">
        {language === 'ar' ? 'EN' : 'عربي'}
      </span>
    </button>
  );
};

export default LanguageToggle;
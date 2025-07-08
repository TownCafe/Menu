import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, language, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 glass dark:glass-dark rounded-full px-4 py-3 transition-all duration-300 shadow-lg hover:bg-amber-50/50 dark:hover:bg-amber-900/20 hover:scale-105"
    >
      {theme === 'light' ? 
        <Moon size={18} className="text-stone-600" /> : 
        <Sun size={18} className="text-amber-500" />
      }
      <span className="text-sm font-medium text-stone-700 dark:text-stone-200 hidden sm:inline">
        {theme === 'light' ? (language === 'ar' ? 'داكن' : 'Dark') : (language === 'ar' ? 'فاتح' : 'Light')}
      </span>
    </button>
  );
};

export default ThemeToggle;
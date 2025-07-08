import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  language,
  theme
}) => {
  return (
    <div className="relative max-w-md mx-auto mb-4">
      <div className="relative">
        <Search 
          size={20} 
          className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`} 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={language === 'ar' ? 'ابحث في القائمة...' : 'Search menu...'}
          className={`w-full ${language === 'ar' ? 'pr-10 pl-10' : 'pl-10 pr-10'} py-3 rounded-xl border transition-all duration-300 ${
            theme === 'light' 
              ? 'bg-white border-slate-200 text-slate-700 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200' 
              : 'bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
          }`}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className={`absolute ${language === 'ar' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-slate-400 hover:text-slate-600' : 'text-slate-500 hover:text-slate-300'} transition-colors`}
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
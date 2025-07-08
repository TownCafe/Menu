import React from 'react';
import { Search, X } from 'lucide-react';

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
}

const MobileSearch: React.FC<MobileSearchProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  language,
  theme
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className={`absolute inset-x-0 top-0 ${theme === 'light' ? 'bg-white' : 'bg-slate-900'} rounded-b-2xl shadow-2xl`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
            {language === 'ar' ? 'البحث في القائمة' : 'Search Menu'}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-slate-800'}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 space-y-4">
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
              className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-4 rounded-xl border-2 transition-all duration-300 text-lg ${
                theme === 'light' 
                  ? 'bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400 focus:border-indigo-500 focus:bg-white' 
                  : 'bg-slate-800 border-slate-600 text-slate-200 placeholder-slate-500 focus:border-indigo-400 focus:bg-slate-700'
              }`}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              autoFocus
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
          
          {/* Search Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Search size={18} />
              {language === 'ar' ? 'بحث' : 'Search'}
            </button>
            <button
              onClick={() => {
                onSearchChange('');
                onClose();
              }}
              className={`px-6 py-3 rounded-xl border-2 font-medium transition-colors ${
                theme === 'light'
                  ? 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  : 'border-slate-600 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearch;
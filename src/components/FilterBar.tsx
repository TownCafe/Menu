import React from 'react';
import { Filter, Leaf, Flame, Star, ChefHat } from 'lucide-react';

interface FilterBarProps {
  activeFilters: string[];
  onFiltersChange: (filters: string[]) => void;
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
}

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilters,
  onFiltersChange,
  language,
  theme
}) => {
  const filters = [
    { id: 'popular', name: 'Popular', nameAr: 'الأكثر طلباً', icon: Star },
    { id: 'chef-recommended', name: 'Chef\'s Choice', nameAr: 'اختيار الشيف', icon: ChefHat },
    { id: 'vegetarian', name: 'Vegetarian', nameAr: 'نباتي', icon: Leaf },
    { id: 'spicy', name: 'Spicy', nameAr: 'حار', icon: Flame },
  ];

  const toggleFilter = (filterId: string) => {
    if (activeFilters.includes(filterId)) {
      onFiltersChange(activeFilters.filter(id => id !== filterId));
    } else {
      onFiltersChange([...activeFilters, filterId]);
    }
  };

  const clearAllFilters = () => {
    onFiltersChange([]);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <Filter size={18} className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'} />
        <span className={`text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
          {language === 'ar' ? 'تصفية:' : 'Filter:'}
        </span>
      </div>
      
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilters.includes(filter.id);
        
        return (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'bg-amber-500 text-white shadow-lg'
                : `${theme === 'light' ? 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300' : 'bg-slate-800 text-slate-300 border border-slate-600 hover:border-indigo-400'} hover:shadow-md`
            }`}
          >
            <Icon size={16} />
            {language === 'ar' ? filter.nameAr : filter.name}
          </button>
        );
      })}
      
      {activeFilters.length > 0 && (
        <button
          onClick={clearAllFilters}
          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
            theme === 'light' 
              ? 'text-slate-500 hover:text-slate-700 hover:bg-slate-100' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
          }`}
        >
          {language === 'ar' ? 'مسح الكل' : 'Clear All'}
        </button>
      )}
    </div>
  );
};

export default FilterBar;
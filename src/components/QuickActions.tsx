import React from 'react';
import { Search } from 'lucide-react';

interface QuickActionsProps {
  language: 'ar' | 'en';
  onOpenSearch: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  language,
  onOpenSearch
}) => {
  return (
    <div className={`fixed ${language === 'ar' ? 'left-4' : 'right-4'} bottom-24 flex flex-col gap-3 z-40`}>
      {/* Quick Search */}
      <button
        onClick={onOpenSearch}
        className="glass dark:glass-dark rounded-full px-4 py-3 neon-button transition-all duration-300 shadow-lg hover:bg-white/20 dark:hover:bg-slate-800/20 flex items-center justify-center"
      >
        <Search size={18} className="text-slate-600 dark:text-slate-300" />
      </button>
    </div>
  );
};

export default QuickActions;
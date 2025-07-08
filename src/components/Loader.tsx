import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onLoadComplete: () => void;
  theme: 'light' | 'dark';
}

const Loader: React.FC<LoaderProps> = ({ onLoadComplete, theme }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const loadingMessages = [
    {  en: 'Setting the mood...' , ar: 'تحضير الأجواء...' },
    {  en: 'Preparing the menu...' , ar: 'إعداد القائمة...'},
    {  en: 'Setting up tables...' , ar: 'تجهيز الطاولات...' },
    {  en: 'Welcome to Town Café...' , ar: 'مرحبًا بكم في تاون كافيه...' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 3; // Faster for demo
        
        // Change message based on progress
        if (newProgress >= 25 && newProgress < 50) setCurrentMessage(1);
        else if (newProgress >= 50 && newProgress < 75) setCurrentMessage(2);
        else if (newProgress >= 75) setCurrentMessage(3);
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onLoadComplete, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 30); // Faster interval for demo

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-1000 min-h-screen" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
      
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating coffee/shisha particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        
        {/* Gradient overlays for depth */}
        <div className={`absolute inset-0 ${
          theme === 'light' 
            ? 'bg-gradient-radial from-transparent via-amber-100/30 to-orange-200/20' 
            : 'bg-gradient-radial from-transparent via-amber-900/10 to-slate-900/40'
        }`}></div>
      </div>

      {/* Main Content */}
      <div className="text-center relative z-10 px-6 max-w-md mx-auto">
        
        {/* Hero Image with Enhanced Styling */}
        <div className="mb-8 relative">
          <div className="cafe-hero-container group">
            <div className="relative overflow-hidden rounded-full w-48 h-48 mx-auto shadow-2xl">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-full p-1">
                <div className={`w-full h-full rounded-full overflow-hidden ${
                  theme === 'light' ? 'bg-white' : 'bg-slate-800'
                }`}>
                  <img 
                    src="/Menu/town-cafe-logo.jpg"
                    alt="Town Café Ambiance"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
              </div>
              
              {/* Pulsing glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-100 opacity-10 animate-pulse scale-110 blur-xl"></div>
            </div>
            
            {/* Logo overlay - small Town Café logo */}
            <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-slate-800/90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg backdrop-blur-sm">
              <span className="text-xs font-bold gradient-text">TC</span>
            </div>
          </div>
        </div>

        {/* Enhanced Typography with Clear Hierarchy */}
        <div className="mb-8 space-y-2">
        
          {/* Secondary Brand Name - English */}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
            <span className="gradient-text">TOWN CAFÉ</span>
          </h2>
            {/* Primary Brand Name - Arabic leads */}
          <h1 className="text-4xl md:text-5xl font-bold arabic-text leading-tight">
            <span className="gradient-text">تاون كافيه</span>
          </h1>
          
          {/* Tagline with cultural elements */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-500"></div>
            <span className="text-amber-600 text-lg">☾</span>
            <div className="w-8 h-0.5 bg-gradient-to-r from-amber-500 to-transparent"></div>
          </div>
        </div>

        {/* Refined Descriptions */}
        <div className="mb-8 space-y-3">
          <p className={`text-base font-medium  ${
            theme === 'light' ? 'text-slate-700' : 'text-slate-200'
          }`}>
            Modern café for shisha and premium drinks lovers
          </p>
          <p className={`text-sm arabic-text${
            theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            كافيه عصري لعشاق الشيشة والمشروبات الفاخرة
          </p>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mb-6">
          <div className={`w-80 h-2 rounded-full mx-auto mb-3 overflow-hidden shadow-inner ${
            theme === 'light' ? 'bg-slate-200/60' : 'bg-slate-700/60'
          }`}>
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-300 ease-out rounded-full relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          
          {/* Dynamic Loading Messages */}
          <div className="space-y-1">
            <p className={`text-sm font-medium transition-all duration-500 ${
              theme === 'light' ? 'text-slate-700' : 'text-slate-200'
            }`}>
              {loadingMessages[currentMessage].en}
            </p>
            <p className={`text-xs transition-all duration-500 ${
              theme === 'light' ? 'text-slate-500' : 'text-slate-400'
            }`}>
              <span className="arabic-text">{loadingMessages[currentMessage].ar}</span>
            </p>
            <p className="text-xs text-amber-600 font-semibold mt-2">
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        {/* Cultural decorative elements */}
        <div className="absolute top-16 left-8 opacity-20">
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-float"></div>
        </div>
        <div className="absolute top-32 right-12 opacity-20">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="absolute bottom-20 left-16 opacity-20">
          <div className="w-4 h-4 bg-red-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
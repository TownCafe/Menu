import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Header from './components/Header';
import MobileHeader from './components/MobileHeader';
import MenuSection from './components/MenuSection';
import Cart from './components/Cart';
import MobileCart from './components/MobileCart';
import MobileSearch from './components/MobileSearch';
import MobileNavigation from './components/MobileNavigation';
import QuickActions from './components/QuickActions';
import ItemModal from './components/ItemModal';
import { menuData } from './data/menuData';
import { CartItem, MenuItem, CustomerCustomizations } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(true); // Keep loader for demo
  const [language, setLanguage] = useState<'ar' | 'en'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('soft-drinks');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showFoodSection, setShowFoodSection] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addToCart = (item: MenuItem, quantity: number = 1, customizations: CustomerCustomizations = {}) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => 
        cartItem.id === item.id && 
        JSON.stringify(cartItem.customizations || {}) === JSON.stringify(customizations || {})
      );
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id && 
          JSON.stringify(cartItem.customizations || {}) === JSON.stringify(customizations || {})
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      
      return [...prev, { 
        id: item.id,
        name: item.name,
        nameAr: item.nameAr,
        price: item.price,
        description: item.description,
        descriptionAr: item.descriptionAr,
        image: item.image,
        category: item.category,
        quantity, 
        customizations 
      }];
    });

    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const removeFromCart = (itemId: string, customizations?: CustomerCustomizations) => {
    setCart(prev => prev.filter(item => 
      !(item.id === itemId && JSON.stringify(item.customizations || {}) === JSON.stringify(customizations || {}))
    ));
  };

  const updateCartQuantity = (itemId: string, quantity: number, customizations?: CustomerCustomizations) => {
    if (quantity <= 0) {
      removeFromCart(itemId, customizations);
      return;
    }
    
    setCart(prev => prev.map(item =>
      item.id === itemId && JSON.stringify(item.customizations || {}) === JSON.stringify(customizations || {})
        ? { ...item, quantity }
        : item
    ));
  };

  const openItemModal = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const closeItemModal = () => {
    setSelectedItem(null);
  };

  const handleAddToCartFromModal = (item: MenuItem, quantity: number, customizations: CustomerCustomizations) => {
    addToCart(item, quantity, customizations);
    closeItemModal();
  };

  const filteredMenuData = menuData.map(category => ({
    ...category,
    items: category.items.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameAr.includes(searchQuery) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.descriptionAr && item.descriptionAr.includes(searchQuery));
      
      return matchesSearch;
    })
  })).filter(category => category.items.length > 0);

  // Auto dark mode based on time - DISABLED
  // useEffect(() => {
  //   const hour = new Date().getHours();
  //   if (hour >= 19 || hour <= 6) {
  //     setTheme('dark');
  //   }
  // }, []);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = menuData.map(category => category.id);
      const scrollPosition = window.scrollY + 200;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pull to refresh
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY === 0 && startY > 0) {
        currentY = e.touches[0].clientY;
        pullDistance = currentY - startY;
        
        if (pullDistance > 100) {
          // Trigger refresh
          window.location.reload();
        }
      }
    };

    const handleTouchEnd = () => {
      startY = 0;
      currentY = 0;
      pullDistance = 0;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Food court menu links and logos
  const foodMenuLinks = [
    { name: 'Mr Kaak', logo: '/Menu/assets/images/mk.jpeg', url: 'https://pdflink.to/3cebbb37/?fbclid=PAQ0xDSwLbbMBleHRuA2FlbQIxMQABpyBTMjAMM_Dbf22ppaUK1HB0DG2739Litb1Iuk4-0-a7fGvAgSvAkkPl8Dly_aem_nSl7cx1Ub6BhklLPBE7SjQ' },
    // { name: 'Pasta Cup', logo: '/Menu/assets/images/pastac.jpeg', url: 'https://pdflink.to/3cebbb37/?fbclid=PAQ0xDSwLbbMBleHRuA2FlbQIxMQABpyBTMjAMM_Dbf22ppaUK1HB0DG2739Litb1Iuk4-0-a7fGvAgSvAkkPl8Dly_aem_nSl7cx1Ub6BhklLPBE7SjQ' },
    // { name: 'Juice It Up', logo: '/Menu/assets/images/ju.jpeg', url: '/Menu/assets/images/jumenu.jpeg' },
    // { name: '3al Osoul', logo: '/Menu/assets/images/ao.jpeg', url: 'https://linktr.ee/3alosoul?fbclid=PAQ0xDSwLbbVpleHRuA2FlbQIxMQABpygO9yE7rHhyIuO3hwXrz-HkR5HLiZORODr54uH3wu9NW_bMOW586WTSZrsi_aem_fZqv7dSnY-oxKPq-5QvM2A' },
    // { name: 'Tinaz Pizza', logo: '/Menu/assets/images/tpz.jpeg', url: 'https://menu.omegasoftware.ca/tinazpizza?fbclid=PAQ0xDSwLcVeRleHRuA2FlbQIxMQABp-zV86rW11YNEBOQB1vY8WbvhQ3md3p7jfOjZcJtpPzXoK4vtW4h6Wd0y86U_aem_cnq6j0A8n41YGm67fCDKNg' }
  ];

  // When food section is shown, set activeSection to 'food' for navigation highlight and scroll to top
  useEffect(() => {
    if (showFoodSection) {
      setActiveSection('food');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showFoodSection]);

  if (isLoading) {
    return <Loader onLoadComplete={handleLoadComplete} theme={theme} />;
  }

  return (
    <div className={`min-h-screen transition-all duration-500 pb-20 ${theme === 'dark' ? 'dark' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className={`min-h-screen ${
        theme === 'light' 
          ? 'bg-light-primary' 
          : 'bg-dark-primary'
      }`}>
        {/* Enhanced background with ambient particles */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="shisha-steam shisha-steam-1"></div>
          <div className="shisha-steam shisha-steam-2"></div>
        </div>

        {/* Floating decorative elements */}
        <div className="floating-elements">
          <div className="particle particle-3" style={{left: '10%', animationDelay: '0s'}}></div>
          <div className="particle particle-4" style={{left: '20%', animationDelay: '3s'}}></div>
          <div className="particle particle-5" style={{left: '80%', animationDelay: '6s'}}></div>
          <div className="floating-steam" style={{left: '60%', animationDelay: '2s'}}></div>
          <div className="floating-steam" style={{left: '30%', animationDelay: '4s'}}></div>
        </div>
{/* Conditional Header */}
      {isMobile ? (
        <MobileHeader 
          language={language}
          theme={theme}
          onToggleLanguage={toggleLanguage}
          onToggleTheme={toggleTheme}
          cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
        />
      ) : (
        <Header 
          language={language}
          theme={theme}
          onToggleLanguage={toggleLanguage}
          onToggleTheme={toggleTheme}
          activeSection={activeSection}
          cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
      )}
        {/* Hero Section */}
      <section className={`text-center ${isMobile ? 'px-4 pt-24 pb-8' : 'pt-32 mb-16 animate-fadeIn'} relative z-10`}>
        <div className={isMobile ? 'max-w-sm mx-auto' : 'max-w-4xl mx-auto'}>
          {/* Town Café Logo in Hero */}
          {!isMobile && (
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4">
                <img 
                  src="/Menu/town-cafe-logo.svg" 
                  alt="Town Café Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
          <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl md:text-7xl'} font-bold mb-6 arabic-text`}>
            <span className="gradient-text">
              {language === 'ar' ? 'تاون كافيه' : 'Welcome to Town Café'}
            </span>
          </h1> 
          
           <div className="flex items-center justify-center space-x-3 mb-4">
            <div className={`${isMobile ? 'w-12' : 'w-16'} h-0.5 bg-gradient-to-r from-transparent to-amber-600`}></div>
            <span className="text-amber-700 text-lg">☕</span>
            <span className="text-orange-600 text-sm">Daily: 6 PM - 2 AM</span>
            <span className="text-amber-700 text-lg">☕</span>
            <div className={`${isMobile ? 'w-12' : 'w-16'} h-0.5 bg-gradient-to-r from-amber-600 to-transparent`}></div>
          </div> 
        </div>
      </section>

      {/* Food Court Section (shows only when food tab is selected) */}
      {isMobile && showFoodSection && (
        <section className="px-4 pt-0 pb-8 relative z-20">
          <div className="max-w-md mx-auto bg-gradient-to-br from-orange-50/90 via-white/90 to-amber-100/90 dark:from-slate-900/90 dark:via-slate-800/90 dark:to-slate-900/90 rounded-3xl shadow-2xl border-2 border-orange-300/60 p-8 mb-8 flex flex-col items-center">
            <h2 className="text-2xl font-extrabold mb-8 text-orange-700 text-center tracking-wide drop-shadow-lg">Food Court Menus</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              {foodMenuLinks.map(link => (
                <li key={link.name} className="flex flex-col items-center bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg border border-orange-100/40 p-4 hover:scale-105 transition-transform duration-300 cursor-pointer group">
                  <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-orange-200 shadow-xl group-hover:border-orange-400 transition-all duration-300 bg-gradient-to-tr from-orange-100 to-amber-200 dark:from-slate-700 dark:to-slate-900">
                    <img src={link.logo} alt={link.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-amber-800 dark:text-amber-300 text-lg font-bold text-center block mb-1 drop-shadow">
                    {link.name}
                  </span>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-500 dark:text-orange-200 opacity-80 underline underline-offset-4 hover:text-orange-600 transition-colors duration-200 mt-1">
                    View Menu
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className={`${isMobile ? '' : 'container mx-auto px-4 py-8'} relative z-10`}>
        {/* Menu Sections */}
        {!showFoodSection && (
          <div className={isMobile ? 'space-y-8' : 'space-y-16'}>
            {filteredMenuData.map((category, index) => (
              <MenuSection
                key={category.id}
                category={category}
                language={language}
                theme={theme}
                onAddToCart={addToCart}
                onOpenModal={openItemModal}
                animationDelay={index * 0.1}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
        {/* Contact Section */}
        <section className={`${isMobile ? 'mt-12 px-4' : 'mt-20'} animate-fadeIn`}>
          <div className={`glass dark:glass-dark rounded-2xl ${isMobile ? 'p-6' : 'p-8'} ${isMobile ? '' : 'max-w-2xl mx-auto'} border border-amber-200/50 dark:border-amber-500/30 shadow-xl`}>
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-4 text-center`}>
              <span className="gradient-text">
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </span>
            </h3>
            {isMobile ? (
              <div className="space-y-4">
                <a 
                  href="tel:+96170264131"
                  className="flex items-center justify-center gap-3 btn-primary py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>📞</span>
                  <span>+961 70 264 131</span>
                </a>
                <div className="text-center">
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {language === 'ar' ? 'يومياً 6 مساءً - 2 صباحاً' : 'Daily 6 PM - 2 AM'}
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {language === 'ar' 
                      ? 'مول الدكوانة - مار روكز، لبنان'  
                      : 'The Mall Dekwaneh-Mar Roukoz, Lebanon'
                    }
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">
                    {language === 'ar' ? 'الهاتف' : 'Phone'}
                  </h4>
                  <p className="text-amber-600 dark:text-amber-400 font-medium">+961 70 264 131</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">
                    {language === 'ar' ? 'ساعات العمل' : 'Hours'}
                  </h4>
                  <p className="text-amber-700 dark:text-amber-300">
                    {language === 'ar' ? 'يومياً 6 مساءً - 2 صباحاً' : 'Daily 6 PM - 2 AM'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">
                    {language === 'ar' ? 'العنوان' : 'Location'}
                  </h4>
                  <p className="text-amber-600 dark:text-amber-400">
                    {language === 'ar' 
                      ? 'مول الدكوانة - مار روكز، لبنان' 
                      : 'The Mall Dekwaneh-Mar Roukoz, Lebanon'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Mobile-only components */}
      {isMobile && (
        <>
          {/* Mobile Navigation */}
          <MobileNavigation
            activeSection={activeSection}
            language={language}
            theme={theme}
            onSectionChange={setActiveSection}
            onShowFoodSection={setShowFoodSection}
          />

          {/* Mobile Cart */}
          <MobileCart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cart}
            language={language}
            theme={theme}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
          />
        </>
      )}

      {/* Quick Actions - Available on both mobile and desktop */}
      <QuickActions
        language={language}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Search Modal - Available on both mobile and desktop */}
      <MobileSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        language={language}
        theme={theme}
      />

      {/* Desktop Cart */}
      {!isMobile && (
        <Cart
          items={cart}
          language={language}
          theme={theme}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
        />
      )}

      {/* Item Modal */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={true}
          onClose={closeItemModal}
          language={language}
          theme={theme}
          onAddToCart={handleAddToCartFromModal}
        />
      )}
      </div>
    </div>
  );
}

export default App;
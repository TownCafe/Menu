import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, MessageCircle, Phone } from 'lucide-react';
import { CartItem, CustomerCustomizations } from '../types';

interface CartProps {
  items: CartItem[];
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  onUpdateQuantity: (itemId: string, quantity: number, customizations?: CustomerCustomizations) => void;
  onRemoveItem: (itemId: string, customizations?: CustomerCustomizations) => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  language,
  theme,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleWhatsAppOrder = () => {
    const orderDetails = items.map(item => 
      `${language === 'ar' ? item.nameAr : item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} ${language === 'ar' ? 'ل.ل' : 'LBP'}`
    ).join('\n');
    
    const message = encodeURIComponent(
      `${language === 'ar' ? 'طلب جديد من تاون كافيه' : 'New order from Town Café'}\n\n${orderDetails}\n\n${language === 'ar' ? 'المجموع:' : 'Total:'} ${totalPrice.toLocaleString()} ${language === 'ar' ? 'ل.ل' : 'LBP'}`
    );
    
    window.open(`https://wa.me/+96170264131?text=${message}`, '_blank');
  };

  const handleCallWaiter = () => {
    alert(language === 'ar' ? 'سيتم استدعاء النادل قريباً' : 'Waiter will be called shortly');
  };

  if (totalItems === 0) return null;

  return (
    <>
      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-40"
      >
        <div className="relative">
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {totalItems}
          </span>
        </div>
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Cart Panel */}
          <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} top-0 h-full w-full max-w-md ${theme === 'light' ? 'bg-white' : 'bg-slate-900'} shadow-2xl transform transition-transform duration-300`}>
            {/* Header */}
            <div className={`p-6 border-b ${theme === 'light' ? 'border-slate-200' : 'border-slate-700'}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                  {language === 'ar' ? 'سلة التسوق' : 'Your Order'}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-slate-800 text-slate-400'}`}
                >
                  <X size={20} />
                </button>
              </div>
              <p className={`text-sm mt-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                {totalItems} {language === 'ar' ? 'عنصر' : 'items'}
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className={`p-4 rounded-lg border ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-slate-700 bg-slate-800'}`}>
                  <div className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={language === 'ar' ? item.nameAr : item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className={`font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                        {language === 'ar' ? item.nameAr : item.name}
                      </h3>
                      
                      {/* Customizations */}
                      {item.customizations && (
                        <div className={`text-xs mt-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                          {item.customizations.spiceLevel && (
                            <span>{language === 'ar' ? 'حرارة:' : 'Spice:'} {item.customizations.spiceLevel}</span>
                          )}
                          {item.customizations.size && (
                            <span className="ml-2">{language === 'ar' ? 'حجم:' : 'Size:'} {item.customizations.size}</span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.customizations)}
                            className={`p-1 rounded transition-colors ${theme === 'light' ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-slate-700 text-slate-400'}`}
                          >
                            <Minus size={14} />
                          </button>
                          <span className={`w-8 text-center text-sm font-medium ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.customizations)}
                            className={`p-1 rounded transition-colors ${theme === 'light' ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-slate-700 text-slate-400'}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-amber-600">
                            {(item.price * item.quantity).toLocaleString()} {language === 'ar' ? 'ل.ل' : 'LBP'}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id, item.customizations)}
                            className="p-1 text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className={`p-6 border-t ${theme === 'light' ? 'border-slate-200' : 'border-slate-700'}`}>
              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className={`text-lg font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                  {language === 'ar' ? 'المجموع:' : 'Total:'}
                </span>
                <span className="text-2xl font-bold text-amber-600">
                  {totalPrice.toLocaleString()} {language === 'ar' ? 'ل.ل' : 'LBP'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  {language === 'ar' ? 'طلب عبر واتساب' : 'Order via WhatsApp'}
                </button>
                
                <button
                  onClick={handleCallWaiter}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  {language === 'ar' ? 'استدعاء النادل' : 'Call Waiter'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
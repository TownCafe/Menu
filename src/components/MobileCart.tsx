import React from 'react';
import { X, Plus, Minus, Trash2, MessageCircle, Phone, ShoppingBag } from 'lucide-react';
import { CartItem, CustomerCustomizations } from '../types';

interface MobileCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  onUpdateQuantity: (itemId: string, quantity: number, customizations?: CustomerCustomizations) => void;
  onRemoveItem: (itemId: string, customizations?: CustomerCustomizations) => void;
}

const MobileCart: React.FC<MobileCartProps> = ({
  isOpen,
  onClose,
  items,
  language,
  theme,
  onUpdateQuantity,
  onRemoveItem
}) => {
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
    window.open('tel:+96170264131', '_self');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className={`absolute inset-x-0 bottom-0 ${theme === 'light' ? 'bg-white' : 'bg-slate-900'} rounded-t-2xl shadow-2xl max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className={`p-4 border-b ${theme === 'light' ? 'border-slate-200' : 'border-slate-700'} flex-shrink-0`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag size={24} className="text-amber-500" />
              <div>
                <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                  {language === 'ar' ? 'سلة التسوق' : 'Your Order'}
                </h2>
                <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  {totalItems} {language === 'ar' ? 'عنصر' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-slate-800'}`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <ShoppingBag size={48} className={`mx-auto mb-4 ${theme === 'light' ? 'text-slate-300' : 'text-slate-600'}`} />
              <p className={`text-lg font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                {language === 'ar' ? 'السلة فارغة' : 'Cart is empty'}
              </p>
              <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>
                {language === 'ar' ? 'أضف بعض العناصر للبدء' : 'Add some items to get started'}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${index}`} className={`p-4 rounded-xl border ${theme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-slate-700 bg-slate-800'}`}>
                  <div className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={language === 'ar' ? item.nameAr : item.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold truncate ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
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
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.customizations)}
                            className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-slate-700 text-slate-400'}`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className={`w-12 text-center font-medium ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.customizations)}
                            className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-slate-700 text-slate-400'}`}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-amber-600">
                            {(item.price * item.quantity).toLocaleString()} {language === 'ar' ? 'ل.ل' : 'LBP'}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id, item.customizations)}
                            className="p-2 text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className={`p-4 border-t ${theme === 'light' ? 'border-slate-200' : 'border-slate-700'} flex-shrink-0`}>
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
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  {language === 'ar' ? 'طلب عبر واتساب' : 'Order via WhatsApp'}
                </button>
                
                <button
                  onClick={handleCallWaiter}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  {language === 'ar' ? 'اتصال مباشر' : 'Call Now'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileCart;
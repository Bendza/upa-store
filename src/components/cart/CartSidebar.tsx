import { Link } from 'react-router-dom';
import useCartStore, { CartItem } from '../../stores/cartStore';
import CartItemComponent from './CartItem';

interface CartSidebarProps {
  onClose: () => void;
}

const CartSidebar = ({ onClose }: CartSidebarProps) => {
  const { items, isLoading, error } = useCartStore();
  
  const total = items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);

  const EmptyCart = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <svg 
        className="w-16 h-16 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Vaša korpa je prazna
      </h3>
      <p className="text-gray-500 mb-4">
        Dodajte proizvode u korpu da biste započeli kupovinu
      </p>
      <button 
        onClick={onClose}
        className="bg-[#B39B8E] text-white px-6 py-2 rounded hover:bg-[#A38B7E] transition-colors"
      >
        Pogledaj proizvode
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">
              Korpa ({items.length})
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Zatvori</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B39B8E]" />
              </div>
            ) : error ? (
              <div className="p-4 text-red-500 text-center">
                {error}
              </div>
            ) : items.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="p-4 space-y-4">
                {items.map(item => (
                  <CartItemComponent key={`${item.id}-${item.size}`} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-900">Ukupno</span>
                <span className="text-lg font-medium text-gray-900">
                  {total.toLocaleString()} RSD
                </span>
              </div>
              
              <div className="space-y-2">
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="flex justify-center items-center w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#B39B8E] hover:bg-[#A38B7E]"
                >
                  Nastavi ka plaćanju
                </Link>
                
                <button
                  onClick={onClose}
                  className="flex justify-center items-center w-full px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Nastavi kupovinu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar; 
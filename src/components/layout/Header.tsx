import { Link } from 'react-router-dom';
import useCartStore, { CartItem } from '../../stores/cartStore';
import CartSidebar from '../cart/CartSidebar';

const Header = () => {
  const { items, toggleCart, isOpen } = useCartStore();
  
  const cartCount = items.reduce((total: number, item: CartItem) => total + item.quantity, 0);

  const CartIcon = () => (
    <button onClick={toggleCart} className="p-2 relative">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {cartCount}
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Top Bar */}
      <div className="w-full bg-[#B39B8E] text-white py-2 px-4">
        <div className="container mx-auto">
          <span>Pišite nam: info@upa.rs</span>
        </div>
      </div>
      
      {/* Main Header */}
      <header className="container mx-auto py-4 flex justify-between items-center px-4">
        <div className="w-1/3">
          <Link to="/">
            <img src='/assets/logo.png' alt="UPA" className='h-24'/>
          </Link>
        </div>
        
        <nav className="w-1/3 flex justify-center">
          <NavigationMenu />
        </nav>
        
        <div className="w-1/3 flex justify-end items-center space-x-4">
          <CartIcon />
        </div>
      </header>

      {/* Cart Sidebar */}
      {isOpen && (
        <CartSidebar onClose={() => toggleCart()} />
      )}
    </>
  );
};

const NavigationMenu = () => {
  const menuItems = [
    { title: 'Naslovna', href: '/' },
    { title: 'Muška obuća', href: '/kolekcije/muska-obuca' },
    { title: 'Ženska obuća', href: '/kolekcije/zenska-obuca' },
    { title: 'Kontakt', href: '/kontakt' }
  ];
  
  return (
    <nav className="hidden md:block">
      <ul className="flex space-x-6">
        {menuItems.map(item => (
          <li key={item.href}>
            <Link 
              to={item.href}
              className="text-gray-800 hover:text-[#B39B8E] transition-colors text-sm"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header; 
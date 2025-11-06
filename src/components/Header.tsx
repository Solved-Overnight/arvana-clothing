import { useState, useEffect, MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onCartClick: () => void;
  onWishlistClick: () => void;
  onProfileClick: () => void;
}

export default function Header({ onCartClick, onWishlistClick, onProfileClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  const { state: wishlistState } = useWishlist();
  useAuth();
  const location = useLocation();

  // Track scroll to change header background when user scrolls down
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      // consider scrolled when user has moved more than 10px
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // run once to set initial state
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'Collections', id: 'collections' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const scrollTo = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (location.pathname !== '/') {
      // navigate to home first, then scroll after a short delay so DOM is ready
      navigate('/');
      setTimeout(scrollTo, 120);
    } else {
      scrollTo();
    }
  };

  const handleRouteNavigate = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    navigate(href);
    // ensure we land at the top of the destination page
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 120);
  };

  return (
    <header
      className="sticky top-0 z-[150]"
      style={{ backgroundColor: scrolled ? '#fff2e2' : '#ffffff', transition: 'background-color 180ms ease' }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 transition-all duration-300 group-hover:scale-105 tracking-[0.22em]">
                ARV<span className="text-orange-500">ANA</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation (links) */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navigation.map((item) => (
              item.href ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleRouteNavigate(e as unknown as MouseEvent, item.href!)}
                  className={`relative text-gray-800 hover:text-orange-500 transition-all duration-300 font-medium text-base py-2 group`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 w-0 group-hover:w-full`}></span>
                </a>
              ) : (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e as unknown as MouseEvent, item.id!)}
                  className={`relative text-gray-800 hover:text-orange-500 transition-all duration-300 font-medium text-base py-2 group`}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                >
                  {item.name}
                  {/* Hover underline effect */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 w-0 group-hover:w-full`}></span>
                </a>
              )
            ))}
          </nav>

          {/* Action buttons: aligned right */}
          <div className="hidden md:flex items-center space-x-3 ml-auto">
            {/* Sign In Button with Icon + Text */}
            {/* Cart Icon (first) */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-800 hover:text-orange-500 transition-all duration-300 rounded-lg hover:bg-orange-50 group"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {state.itemCount}
                </span>
              )}
            </button>

            {/* Wishlist Icon (second) */}
            <button
              onClick={onWishlistClick}
              className="relative p-2 text-gray-800 hover:text-red-500 transition-all duration-300 rounded-lg hover:bg-red-50 group"
              aria-label="Open wishlist"
            >
              <Heart className="h-5 w-5 group-hover:scale-110 group-hover:fill-red-500 transition-all duration-300" />
              {wishlistState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {wishlistState.items.length}
                </span>
              )}
            </button>

            {/* Sign In Button (third) */}
            <button
              onClick={onProfileClick}
              className="hidden md:flex items-center gap-2 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600 transition-all duration-300 text-base group"
            >
              <User className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Sign in
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-300"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 transform transition-all duration-300 ease-out animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                item.href ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      handleRouteNavigate(e as unknown as MouseEvent, item.href!);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left text-gray-700 hover:text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-lg transition-all duration-300 font-medium`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <a
                    key={item.name}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      handleNavClick(e as unknown as MouseEvent, item.id!);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left text-gray-700 hover:text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-lg transition-all duration-300 font-medium`}
                  >
                    {item.name}
                  </a>
                )
              ))}
              
              {/* Mobile Cart */}
              <button
                onClick={() => {
                  onCartClick();
                  setIsMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-orange-500 hover:bg-orange-50 px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Cart {state.itemCount > 0 && `(${state.itemCount})`}
              </button>
              
              {/* Mobile Wishlist */}
              <button
                onClick={() => {
                  onWishlistClick();
                  setIsMenuOpen(false);
                }}
                className="text-left text-gray-700 hover:text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
              >
                <Heart className="h-5 w-5" />
                Wishlist {wishlistState.items.length > 0 && `(${wishlistState.items.length})`}
              </button>
              
              {/* Mobile Profile / Sign In */}
              <button
                onClick={() => {
                  onProfileClick();
                  setIsMenuOpen(false);
                }}
                className="text-left border border-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600 transition-all duration-300 flex items-center gap-2"
              >
                <User className="h-5 w-5" />
                Sign in
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

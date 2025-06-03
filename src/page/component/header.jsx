import { Search, ShoppingCart, Menu, User, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const nullval = '';

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      const isValid = token && tokenExpiration && Date.now() < parseInt(tokenExpiration);
      setIsAuthenticated(isValid);
    };

    checkAuth();
    
    // Check auth status when localStorage changes (for real-time updates)
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <header className="bg-green-700 text-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="hover:text-green-200">
              <span className="text-2xl font-bold">PHSAR Farm</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-green-200">Home</Link>
            <Link to={`/product/${nullval}`} className="hover:text-green-200">Explore</Link>
            <Link to="/stores" className="hover:text-green-200">Stores</Link>
            <Link to="/about" className="hover:text-green-200">About</Link>
            <Link to="/contact" className="hover:text-green-200">Contact</Link>
          </nav>
          
          {/* Desktop Search and Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center bg-green-800 rounded-full px-3 py-1">
              <input className="bg-transparent outline-none placeholder-green-200 text-sm w-32" placeholder="Search..." />
              <Search size={18} className="text-green-200" />
            </div>
            <Link to="/cart" className="p-1 rounded-full hover:bg-green-600">
              <ShoppingCart size={22} />
            </Link>
            
            {/* Conditional Auth Button */}
            {isAuthenticated ? (
              <Link to="/logout" className="p-1 rounded-full hover:bg-green-600" title="Sign Out">
                <LogOut size={22} />
              </Link>
            ) : (
              <Link to="/login" className="p-1 rounded-full hover:bg-green-600" title="Sign In">
                <User size={22} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-green-600 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-green-600">
            <div className="flex items-center bg-green-800 rounded-lg px-3 py-2 mb-4">
              <input className="bg-transparent outline-none placeholder-green-200 text-sm w-full" placeholder="Search..." />
              <Search size={18} className="text-green-200 ml-2" />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="hover:bg-green-600 px-3 py-2 rounded-lg">Home</Link>
              <Link to={`/product/${nullval}`} className="hover:bg-green-600 px-3 py-2 rounded-lg">Explore</Link>
              <Link to="/stores" className="hover:bg-green-600 px-3 py-2 rounded-lg">Stores</Link>
              <Link to="/about" className="hover:bg-green-600 px-3 py-2 rounded-lg">About</Link>
              <Link to="/contact" className="hover:bg-green-600 px-3 py-2 rounded-lg">Contact</Link>
            </nav>
            <div className="flex items-center space-x-4 mt-4 px-3">
              <Link to="/cart" className="flex items-center space-x-2 hover:bg-green-600 px-3 py-2 rounded-lg">
                <ShoppingCart size={20} />
                <span>Cart</span>
              </Link>
              
              {/* Conditional Auth Button for Mobile */}
              {isAuthenticated ? (
                <Link to="/logout" className="flex items-center space-x-2 hover:bg-green-600 px-3 py-2 rounded-lg">
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </Link>
              ) : (
                <Link to="/login" className="flex items-center space-x-2 hover:bg-green-600 px-3 py-2 rounded-lg">
                  <User size={20} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
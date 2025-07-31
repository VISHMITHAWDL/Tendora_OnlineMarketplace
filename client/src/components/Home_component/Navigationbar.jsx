import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { countCartItems } from '../../store/features/Cart';

const Navigationbar = () => {



  const cartLength = useSelector(countCartItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const productLinks = [
    { to: '/kidssection', label: 'Kid Fashion' },
    { to: '/menfashion', label: 'Men Fashion' },
    { to: '/womenfashion', label: 'Women Fashion' },
    { to: '/special-deals', label: 'Special Deals' },
  ];
  const navigate = useNavigate();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropdownOpen]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
    }
  };

  const navLinkStyles = ({ isActive }) => 
    `hover:text-[#DA0037] transition duration-300 relative group ${
      isActive ? 'text-[#DA0037] font-semibold' : ''
    }`;

  const dropdownItemStyles = ({ isActive }) =>
    `block px-4 py-2 text-sm hover:bg-[#171717] hover:text-[#DA0037] transition duration-300 ${
      isActive ? 'bg-[#171717] text-[#DA0037] font-medium' : 'text-[#EDEDED]'
    }`;

  return (
    <nav className="bg-[#171717] text-[#EDEDED] px-6 py-4 shadow-md border-b border-[#444444]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold tracking-wide">
            <span className="text-[#DA0037]">Ten</span>dora
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 text-sm font-medium">
              <li>
                <NavLink to="/" className={navLinkStyles}>
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DA0037] transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
              
              <li className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="hover:text-[#DA0037] transition duration-300 flex items-center space-x-1 relative group"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Products</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DA0037] transition-all duration-300 group-hover:w-full"></span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#444444] rounded-md shadow-lg border border-[#444444] z-50">
                    <div className="py-2">
                      {productLinks.map((link) => (
                        <NavLink 
                          key={link.to}
                          to={link.to} 
                          className={dropdownItemStyles}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </li>
              
              <li>
                <NavLink to="/about" className={navLinkStyles}>
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DA0037] transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
              
              <li>
                <NavLink to="/contact" className={navLinkStyles}>
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DA0037] transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
            </ul>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-[#444444] text-[#EDEDED] placeholder-gray-400 px-4 py-2 pl-10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition duration-300 w-64"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 rounded-full hover:bg-[#444444] hover:text-[#DA0037] transition duration-300"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </button>
              
              <button 
                onClick={() => navigate('/cart')}
                className="p-2 rounded-full hover:bg-[#444444] hover:text-[#DA0037] transition duration-300 relative"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />

                {cartLength > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#DA0037] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartLength}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => navigate('/account')}
                className="p-2 rounded-full hover:bg-[#444444] hover:text-[#DA0037] transition duration-300"
                aria-label="User Account"
              >
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button className="hidden md:block bg-[#DA0037] hover:bg-[#444444] text-white px-6 py-2 rounded-full transition duration-300 font-medium">
            Login
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-[#444444] transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 border-t border-[#444444] pt-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full bg-[#444444] text-[#EDEDED] placeholder-gray-400 px-4 py-2 pl-10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#DA0037] transition duration-300"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              {/* Mobile Navigation Links */}
              <ul className="space-y-2">
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      `block py-2 hover:text-[#DA0037] transition duration-300 ${
                        isActive ? 'text-[#DA0037] font-semibold' : ''
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                
                <li>
                  <button
                    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                    className="w-full text-left py-2 hover:text-[#DA0037] transition duration-300 flex items-center justify-between"
                    aria-expanded={isMobileProductsOpen}
                  >
                    <span>Products</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isMobileProductsOpen && (
                    <div className="ml-4 mt-2 space-y-1">
                      {productLinks.map((link) => (
                        <NavLink
                          key={link.to}
                          to={link.to}
                          className={({ isActive }) =>
                            `block py-1 text-sm hover:text-[#DA0037] transition duration-300 ${
                              isActive ? 'text-[#DA0037] font-medium' : ''
                            }`
                          }
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileProductsOpen(false);
                          }}
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </li>
                
                <li>
                  <NavLink 
                    to="/about" 
                    className={({ isActive }) => 
                      `block py-2 hover:text-[#DA0037] transition duration-300 ${
                        isActive ? 'text-[#DA0037] font-semibold' : ''
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </NavLink>
                </li>
                
                <li>
                  <NavLink 
                    to="/contact" 
                    className={({ isActive }) => 
                      `block py-2 hover:text-[#DA0037] transition duration-300 ${
                        isActive ? 'text-[#DA0037] font-semibold' : ''
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>

              {/* Mobile Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#444444]">
                <div className="flex items-center space-x-4">
                  <button 
                    className="p-2 rounded-full hover:bg-[#444444] hover:text-[#DA0037] transition duration-300"
                    aria-label="Wishlist"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  
                  <button 
                    className="p-2 rounded-full hover:bg-[#444444] hover:text-[#DA0037] transition duration-300 relative"
                    aria-label="Shopping Cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartLength > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#DA0037] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {cartLength}
                      </span>
                    )}
                  </button>
                  
                  <button 
                    className="p-2 rounded-full hover:bg-[#444444] hover:text-[#DA0037] transition duration-300"
                    aria-label="User Account"
                  >
                    <User className="h-5 w-5" />
                  </button>
                </div>
                
                <button className="bg-[#DA0037] hover:bg-[#444444] text-white px-6 py-2 rounded-full transition duration-300 font-medium">
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigationbar;
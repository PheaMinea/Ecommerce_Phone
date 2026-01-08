// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { cartCount } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { 
      label: "Products", 
      dropdown: [
        { path: "/products", label: "All Products" },
        { path: "/products/flagship", label: "Flagship Phones" },
        { path: "/products/mid-range", label: "Mid-Range" },
        { path: "/products/budget", label: "Budget Friendly" },
        { path: "/products/accessories", label: "Accessories" },
      ]
    },
    { path: "/services", label: "Services" },
    { path: "/deals", label: "Deals" },
    { path: "/about", label: "About" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 text-center text-sm font-medium">
        🎉 Free shipping on orders over $499 • 30-day returns guaranteed
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-lg" 
          : "bg-transparent"
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-white text-xl font-bold">P</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PhoneHub
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Tech Perfected</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                      >
                        {item.label}
                        <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                          isProductsOpen ? "rotate-180" : ""
                        }`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top ${
                        isProductsOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                      }`}>
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.path}
                            className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                            onClick={() => setIsProductsOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-4 py-2 font-medium transition-all duration-200 rounded-lg ${
                        location.pathname === item.path
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* User Account */}
              <Link
                to="/account"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-gray-600" />
              </Link>

              {/* Cart with Counter */}
              <Link
                to="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Buy Now Button */}
              <Link
                to="/products"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transform transition-all duration-200"
              >
                Shop Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className={`absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
            {/* Menu Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">P</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      PhoneHub
                    </h2>
                    <p className="text-xs text-gray-500">Tech Perfected</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search phones..."
                  className="w-full px-4 py-3 pl-10 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              {navItems.map((item) => (
                <div key={item.label} className="mb-2">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          isProductsOpen ? "rotate-180" : ""
                        }`} />
                      </button>
                      
                      {/* Mobile Dropdown */}
                      <div className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${
                        isProductsOpen ? "max-h-96" : "max-h-0"
                      }`}>
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            to={dropdownItem.path}
                            className="block px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                        location.pathname === item.path
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-white">
              <div className="flex items-center space-x-4 mb-4">
                <Link
                  to="/account"
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Account</span>
                </Link>
                
                <Link
                  to="/cart"
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
              
              <Link
                to="/products"
                className="w-full block text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop All Products
              </Link>
            </div>
          </div>
        </div>

        {/* Fullscreen Search Modal */}
        <div className={`fixed inset-0 z-50 transition-all duration-300 ${
          isSearchOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          
          {/* Search Container */}
          <div className={`absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-all duration-300 ${
            isSearchOpen ? "translate-y-0" : "-translate-y-full"
          }`}>
            <div className="container mx-auto px-4 py-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Search Products
                </h2>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative max-w-3xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for smartphones, brands, accessories..."
                  className="w-full px-6 py-4 pl-14 text-lg bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500"
                  autoFocus
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                
                {/* Popular Searches */}
                <div className="mt-6">
                  <p className="text-gray-500 text-sm mb-3">Popular Searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {['iPhone 15', 'Samsung S24', 'Wireless Earbuds', 'Phone Cases', 'Screen Protectors', 'Chargers'].map((term) => (
                      <button
                        key={term}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors duration-200"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
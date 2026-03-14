import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { Search, ShoppingBag, User, Menu, X, Smartphone } from "lucide-react";

const Navbar = () => {
  const { cartCount } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/deals", label: "Deals" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-blue-600 text-white py-2 text-center text-sm">
        <div className="container mx-auto px-4">
          <span className="font-medium">S26 Series Pre-Orders Now Open</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-md" 
          : "bg-white"
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Core<span className="text-blue-600">Hub</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link 
                  key={item.label}
                  to={item.path}
                  className={`font-medium transition-colors ${
                    location.pathname === item.path 
                      ? "text-blue-600" 
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <Link 
                to="/cart" 
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs font-bold text-white rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link 
                to="/account" 
                className="hidden sm:block p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              <button 
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={() => setIsMenuOpen(false)} 
        />
        <div className="fixed right-0 top-0 bottom-0 w-64 bg-white shadow-xl p-6 transform transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Smartphone className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CoreHub</span>
            </Link>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.label}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium ${
                  location.pathname === item.path 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <Link 
              to="/account" 
              className="block py-3 text-center text-gray-700 hover:text-blue-600 border-t border-gray-100 pt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <div className={`fixed inset-0 z-[110] ${isSearchOpen ? "block" : "hidden"}`}>
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={() => setIsSearchOpen(false)} 
        />
        <div className="fixed inset-0 flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search products..." 
                className="w-full bg-white rounded-lg py-4 px-6 text-gray-900 text-lg shadow-xl outline-none border border-gray-200"
                autoFocus={isSearchOpen}
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {['iPhone', 'Samsung', 'Accessories', 'Tablets'].map(tag => (
                <button 
                  key={tag} 
                  className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
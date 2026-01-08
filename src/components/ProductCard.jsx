// src/components/ProductCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { 
  ShoppingCart, 
  Heart, 
  Zap, 
  Shield, 
  Star, 
  ChevronRight,
  Battery,
  Camera,
  Cpu,
  Smartphone
} from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Check if product is in cart
  useEffect(() => {
    const inCart = cartItems.some(item => item.id === product.id);
    setIsInCart(inCart);
  }, [cartItems, product.id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    // Add visual feedback
    setIsInCart(true);
    setTimeout(() => setIsInCart(false), 2000);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const quickSpecs = [
    { icon: <Cpu className="w-3 h-3" />, label: product.specs?.processor },
    { icon: <Battery className="w-3 h-3" />, label: product.specs?.battery },
    { icon: <Camera className="w-3 h-3" />, label: product.specs?.camera?.split('+')[0] },
  ];

  const rating = 4.5;
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(99, 102, 241, 0.15) 0%, 
            rgba(168, 85, 247, 0.1) 30%, 
            transparent 70%)`,
        }}
      />

      {/* Card Container */}
      <div className="relative">
        {/* 3D Card Effect */}
        <div 
          className={`
            relative overflow-hidden rounded-2xl h-full
            transition-all duration-500 transform
            ${isHovered ? 'scale-[1.02] shadow-2xl' : 'shadow-lg'}
            bg-gradient-to-br from-white via-gray-50 to-white
            border border-gray-200/80
            backdrop-blur-sm
          `}
          style={{
            transform: isHovered 
              ? `perspective(1000px) rotateX(${(mousePosition.y - 150) / 25}deg) rotateY(${(mousePosition.x - 150) / 25}deg)`
              : 'perspective(1000px) rotateX(0) rotateY(0)',
          }}
        >
          {/* Gradient Border */}
          <div className={`absolute inset-0 rounded-2xl p-[1.5px] ${
            isHovered ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500`}>
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
          </div>

          {/* Content */}
          <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl h-full">
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 to-gray-200">
              {/* Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {discount && (
                  <div className="animate-bounce-subtle">
                    <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                      -{discount}%
                    </div>
                  </div>
                )}
                {product.category === 'flagship' && (
                  <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                    FLAGSHIP
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleLike}
                className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  isLiked 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-white/90 text-gray-700 hover:bg-white'
                }`}
                title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>

              {/* Product Image */}
              <div className="relative w-full h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full  transition-transform duration-700 ${
                    isHovered ? 'scale-110' : '//'
                  }`}
                  loading="lazy"
                />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
              </div>

              {/* Quick Actions */}
              <div className={`absolute bottom-4 left-0 right-0 px-4 transition-all duration-500 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform ${
                      isInCart
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-110'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{isInCart ? 'Added!' : 'Add to Cart'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-6">
              {/* Brand & Category */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {product.brand}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{rating}</span>
                </div>
              </div>

              {/* Product Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {quickSpecs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 rounded-lg px-2 py-1">
                    {spec.icon}
                    <span className="truncate">{spec.label}</span>
                  </div>
                ))}
              </div>

              {/* Price Section */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </div>
                  )}
                </div>

                {/* Storage */}
                <div className="text-sm font-medium px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full">
                  {product.specs?.storage}
                </div>
              </div>

              {/* Colors & View Button */}
              <div className="flex items-center justify-between">
                {/* Colors */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: getColorCode(color) }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-bold">
                          +{product.colors.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* View Details Button */}
                <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Additional Features Badge */}
            <div className="px-6 pb-6">
              <div className="flex flex-wrap gap-2">
                {product.brand === 'Apple' && (
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Zap className="w-3 h-3" />
                    <span>Fast Charging</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Shield className="w-3 h-3" />
                  <span>2Y Warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          {isHovered && (
            <>
              <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-sm" />
            </>
          )}
        </div>

        {/* Purchase Animation */}
        {isInCart && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="animate-bounce-in">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

// 🎨 Enhanced Color Helper with more colors
const getColorCode = (colorName) => {
  const colorMap = {
    // Standard Colors
    'Black': '#000000',
    'White': '#FFFFFF',
    'Gray': '#9CA3AF',
    'Silver': '#C0C0C0',
    'Gold': '#FFD700',
    'Rose Gold': '#B76E79',
    'Blue': '#3B82F6',
    'Green': '#10B981',
    'Red': '#EF4444',
    'Purple': '#8B5CF6',
    'Pink': '#EC4899',
    'Yellow': '#F59E0B',
    'Cyan': '#06B6D4',
    
    // Apple Colors
    'Natural Titanium': '#71717A',
    'Blue Titanium': '#60A5FA',
    'White Titanium': '#F3F4F6',
    'Black Titanium': '#1F2937',
    
    // Samsung Colors
    'Phantom Black': '#111827',
    'Phantom White': '#F9FAFB',
    'Phantom Silver': '#D1D5DB',
    'Green': '#34D399',
    'Lavender': '#A78BFA',
    'Graphite': '#4B5563',
    'Cream': '#FDE68A',
    
    // Google Colors
    'Obsidian': '#1F2937',
    'Porcelain': '#F3F4F6',
    'Bay': '#3B82F6',
    'Hazel': '#D97706',
    
    // OnePlus Colors
    'Emerald Forest': '#10B981',
    'Volcanic Black': '#111827',
    
    // Xiaomi Colors
    'Midnight Black': '#000000',
    'Ocean Blue': '#2563EB',
    'Mint Green': '#34D399',
    
    // Nothing Colors
    'White': '#FFFFFF',
    'Dark Gray': '#374151',
    
    // Generic/Descriptive Colors
    'Midnight': '#1E293B',
    'Starlight': '#F8FAFC',
    'Sierra Blue': '#60A5FA',
    'Alpine Green': '#065F46',
    'Deep Purple': '#7C3AED',
    'Space Black': '#000000',
    'Space Gray': '#6B7280',
    'Pacific Blue': '#1D4ED8',
    'Product Red': '#DC2626',
    'Sunset Gold': '#F59E0B',
    'Forest Green': '#166534',
    'Sky Blue': '#0EA5E9',
    'Blush Gold': '#F9A8D4',
    'Mystic Bronze': '#92400E',
    'Mystic Black': '#111827',
    'Mystic White': '#F9FAFB',
    'Aura Glow': '#8B5CF6',
    'Aura Blue': '#3B82F6',
    'Aura Pink': '#EC4899',
    'Aura Red': '#EF4444',
  };
  
  return colorMap[colorName] || 
         colorMap[colorName.toLowerCase().replace(/ /g, '')] || 
         '#6B7280';
};

export default ProductCard;
// src/components/FeaturedProducts.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  Smartphone, 
  DollarSign, 
  Headphones,
  Zap,
  Filter,
  Star,
  Clock,
  Shield
} from 'lucide-react';

const FeaturedProducts = () => {
  const { products } = useShop();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);

  const filters = [
    { id: 'all', label: 'All Products', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'flagship', label: 'Flagship', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'mid-range', label: 'Mid-Range', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'budget', label: 'Budget', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'accessories', label: 'Accessories', icon: <Headphones className="w-4 h-4" /> },
  ];

  useEffect(() => {
    setIsAnimating(true);
    let filtered = products;
    
    if (activeFilter !== 'all') {
      filtered = products.filter(product => 
        product.category === activeFilter ||
        (activeFilter === 'accessories' && product.category === 'accessory')
      );
    }
    
    // Shuffle and take first 8
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setFeaturedProducts(shuffled.slice(0, 8));
    
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [activeFilter, products]);

  const categories = [
    {
      name: 'Flagship',
      description: 'Premium Performance',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-blue-600 to-cyan-500',
      count: products.filter(p => p.category === 'flagship').length,
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
    },
    {
      name: 'Mid-Range',
      description: 'Best Value',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'from-emerald-600 to-teal-500',
      count: products.filter(p => p.category === 'mid-range').length,
      gradient: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20'
    },
    {
      name: 'Budget',
      description: 'Affordable Excellence',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'from-violet-600 to-purple-500',
      count: products.filter(p => p.category === 'budget').length,
      gradient: 'bg-gradient-to-br from-violet-500/20 to-purple-500/20'
    },
    {
      name: 'Accessories',
      description: 'Complete Your Setup',
      icon: <Headphones className="w-8 h-8" />,
      color: 'from-amber-600 to-orange-500',
      count: 12, // Example count
      gradient: 'bg-gradient-to-br from-amber-500/20 to-orange-500/20'
    },
  ];

 

  return (
    <div className="relative overflow-hidden py-3 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-200 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Curated Collection
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Featured
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Masterpieces
            </span>
          </h2>
         
          {/* Quick Stats */}
          
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                group relative flex items-center gap-2 px-6 py-3 rounded-full
                transition-all duration-300 transform hover:scale-105
                ${activeFilter === filter.id 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }
              `}
            >
              <span className={`transition-transform duration-300 ${
                activeFilter === filter.id ? 'scale-110' : ''
              }`}>
                {filter.icon}
              </span>
              <span className="font-medium">{filter.label}</span>
              
              {/* Glow effect on active */}
              {activeFilter === filter.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-50 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Products Grid with Animation */}
        <div className={`
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16
          transition-opacity duration-500
          ${isAnimating ? 'opacity-50' : 'opacity-100'}
        `}>
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mb-20">
          <Link
            to="/products"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300" />
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
            
            {/* Content */}
            <span className="relative text-white font-bold text-lg">
              Explore All Products
            </span>
            <ArrowRight className="relative w-5 h-5 text-white transform group-hover:translate-x-2 transition-transform duration-300" />
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Categories Section */}
        <div className="relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <Filter className="w-6 h-6 text-blue-600" />
              <h3 className="text-3xl font-bold text-gray-900">
                Shop by Category
              </h3>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what you need with our carefully curated categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name.toLowerCase().replace(' ', '-')}`}
                className="group relative"
              >
                <div className={`
                  relative overflow-hidden rounded-2xl p-8 h-full
                  transform transition-all duration-500
                  hover:scale-[1.02] hover:shadow-2xl
                  border border-gray-200
                  ${category.gradient}
                  hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10
                `}>
                  {/* Floating Icon */}
                  <div className={`
                    absolute top-6 right-6 w-16 h-16 rounded-xl
                    bg-gradient-to-br ${category.color}
                    flex items-center justify-center
                    transform transition-all duration-500
                    group-hover:scale-110 group-hover:rotate-12
                  `}>
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-16">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-1">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {category.count} products
                      </span>
                      <div className="flex items-center gap-2 text-blue-600 font-semibold">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
                </div>

                {/* Glow Effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${category.color}
                  rounded-2xl blur-xl opacity-0 group-hover:opacity-20
                  transition-opacity duration-500 -z-10
                `} />
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Brands */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h4 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted by Leading Brands
            </h4>
            <p className="text-gray-600">
              Official partners with top smartphone manufacturers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Nothing'].map((brand, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="
                  bg-white rounded-xl p-6
                  flex items-center justify-center
                  border border-gray-200
                  transform transition-all duration-300
                  hover:scale-110 hover:shadow-xl hover:border-blue-200
                  hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50
                ">
                  <div className="text-3xl font-bold text-gray-800 opacity-80 group-hover:opacity-100">
                    {brand}
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="
                    absolute -top-2 -right-2 w-8 h-8
                    bg-gradient-to-br from-blue-500 to-purple-500
                    rounded-full flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transform translate-y-2 group-hover:translate-y-0
                    transition-all duration-300
                  ">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>
    </div>
  );
};

export default FeaturedProducts;
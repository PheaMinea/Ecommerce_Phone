import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ArrowRight, 
  Smartphone, 
  DollarSign, 
  Headphones
} from 'lucide-react';

const FeaturedProducts = () => {
  const { products } = useShop();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'flagship', label: 'Flagship' },
    { id: 'mid-range', label: 'Mid-Range' },
    { id: 'budget', label: 'Budget' },
  ];

  useEffect(() => {
    let filtered = products;
    
    if (activeFilter !== 'all') {
      filtered = products.filter(product => product.category === activeFilter);
    }
    
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setFeaturedProducts(shuffled.slice(0, 8));
  }, [activeFilter, products]);

  const categories = [
    {
      name: 'Flagship',
      description: 'Premium performance phones',
      icon: <TrendingUp className="w-5 h-5" />,
      count: products.filter(p => p.category === 'flagship').length,
    },
    {
      name: 'Mid-Range',
      description: 'Best value options',
      icon: <DollarSign className="w-5 h-5" />,
      count: products.filter(p => p.category === 'mid-range').length,
    },
    {
      name: 'Budget',
      description: 'Affordable smartphones',
      icon: <Smartphone className="w-5 h-5" />,
      count: products.filter(p => p.category === 'budget').length,
    },
    {
      name: 'Accessories',
      description: 'Cases, chargers, and more',
      icon: <Headphones className="w-5 h-5" />,
      count: 12,
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium smartphones and accessories
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-5 py-2 rounded-lg font-medium transition-colors
                ${activeFilter === filter.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mb-16">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Shop by Category
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    {category.icon}
                  </div>
                  <span className="text-sm text-gray-500">
                    {category.count} items
                  </span>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Top Brands
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Nothing'].map((brand, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 flex items-center justify-center hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <span className="font-semibold text-gray-800">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
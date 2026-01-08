// src/pages/Products.jsx
import React, { useState, useEffect, useRef } from "react";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Smartphone,
  Headphones,
  Zap,
  Shield,
  Star,
  Clock,
  Battery,
  X,
  Check,
  RefreshCw,
  Loader2
} from "lucide-react";

const Products = () => {
  const { products } = useShop();
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const productsPerPage = 12;
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  // Available filters
  const brands = [
    { id: "apple", name: "Apple", icon: "🍎", count: products.filter(p => p.brand === "Apple").length },
    { id: "samsung", name: "Samsung", icon: "📱", count: products.filter(p => p.brand === "Samsung").length },
    { id: "google", name: "Google", icon: "🔍", count: products.filter(p => p.brand === "Google").length },
    { id: "oneplus", name: "OnePlus", icon: "⚡", count: products.filter(p => p.brand === "OnePlus").length },
    { id: "xiaomi", name: "Xiaomi", icon: "📸", count: products.filter(p => p.brand === "Xiaomi").length },
    { id: "nothing", name: "Nothing", icon: "✨", count: products.filter(p => p.brand === "Nothing").length },
  ];

  const categories = [
    { id: "flagship", name: "Flagship", icon: <TrendingUp className="w-4 h-4" />, color: "from-blue-500 to-cyan-400" },
    { id: "mid-range", name: "Mid-Range", icon: <Smartphone className="w-4 h-4" />, color: "from-emerald-500 to-teal-400" },
    { id: "budget", name: "Budget", icon: <Zap className="w-4 h-4" />, color: "from-amber-500 to-orange-400" },
    { id: "accessories", name: "Accessories", icon: <Headphones className="w-4 h-4" />, color: "from-purple-500 to-pink-400" },
  ];

  const sortOptions = [
    { id: "featured", label: "Featured", icon: <Sparkles className="w-4 h-4" /> },
    { id: "price-low", label: "Price: Low to High", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "price-high", label: "Price: High to Low", icon: <TrendingUp className="w-4 h-4" style={{ transform: "rotate(180deg)" }} /> },
    { id: "rating", label: "Highest Rated", icon: <Star className="w-4 h-4" /> },
    { id: "newest", label: "Newest First", icon: <Clock className="w-4 h-4" /> },
    { id: "battery", label: "Best Battery", icon: <Battery className="w-4 h-4" /> },
  ];

  const features = [
    { id: "5g", label: "5G", icon: "📶" },
    { id: "wireless", label: "Wireless Charging", icon: "⚡" },
    { id: "water", label: "Water Resistant", icon: "💧" },
    { id: "camera", label: "Pro Camera", icon: "📷" },
    { id: "fast", label: "Fast Charging", icon: "⚡" },
    { id: "warranty", label: "Extended Warranty", icon: "🛡️" },
  ];

  // Filter products
  const filteredProducts = products
    .filter(product => {
      // Search query
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Price range
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Brands filter
      const matchesBrand = selectedBrands.length === 0 || 
        selectedBrands.includes(product.brand.toLowerCase());
      
      // Categories filter
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);
      
      return matchesSearch && matchesPrice && matchesBrand && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return 4.7 - 4.5; // Placeholder for actual ratings
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle brand selection
  const toggleBrand = (brandId) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(b => b !== brandId)
        : [...prev, brandId]
    );
    setCurrentPage(1);
  };

  // Handle category selection
  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
    setSearchQuery("");
    setSortBy("featured");
    setCurrentPage(1);
  };

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filter, sortBy, searchQuery, priceRange, selectedBrands, selectedCategories]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeFiltersCount = selectedBrands.length + selectedCategories.length + 
    (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-transparent to-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Premium Collection</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Your Perfect
              <span className="block bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent">
                Smartphone
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Explore our curated collection of premium smartphones from top brands. 
              Find the perfect device that matches your style and needs.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Total Products", value: products.length },
                { label: "Brands", value: brands.length },
                { label: "Avg. Rating", value: "4.8" },
                { label: "Same Day Shipping", value: "✓" },
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-12 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4 space-y-6 mt-20">
            {/* Filter Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" />
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="relative h-2">
                      <div 
                        className="absolute h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                        style={{
                          left: `${(priceRange[0] / 2000) * 100}%`,
                          right: `${100 - (priceRange[1] / 2000) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Brands</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <button
                      key={brand.id}
                      onClick={() => toggleBrand(brand.id)}
                      className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 ${
                        selectedBrands.includes(brand.id)
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          selectedBrands.includes(brand.id)
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {brand.icon}
                        </div>
                        <span className="font-medium text-gray-900">{brand.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{brand.count}</span>
                        {selectedBrands.includes(brand.id) && (
                          <Check className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`relative p-4 rounded-xl text-center transition-all duration-200 ${
                        selectedCategories.includes(category.id)
                          ? "ring-2 ring-blue-500 ring-offset-2"
                          : "hover:shadow-md"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-2`}>
                        <div className="text-white">
                          {category.icon}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 block">{category.name}</span>
                      {selectedCategories.includes(category.id) && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {features.map(feature => (
                    <button
                      key={feature.id}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors duration-200"
                    >
                      {feature.icon} {feature.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Promo Banner */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="mb-4">
                <Shield className="w-12 h-12 opacity-80" />
              </div>
              <h3 className="font-bold text-xl mb-2">Premium Warranty</h3>
              <p className="text-white/80 text-sm mb-4">
                Get 2 years of comprehensive warranty on all products
              </p>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg font-medium transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Controls Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl mt-20 shadow-lg border border-gray-200 p-3 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Results Count */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredProducts.length} Products
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {selectedBrands.length > 0 || selectedCategories.length > 0 ? (
                      <span>
                        Filtered by {selectedBrands.length} brand{selectedBrands.length !== 1 ? 's' : ''}, 
                        {' '}{selectedCategories.length} categor{selectedCategories.length !== 1 ? 'ies' : 'y'}
                      </span>
                    ) : (
                      "All premium smartphones"
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-colors duration-200 ${
                        viewMode === "grid"
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-colors duration-200 ${
                        viewMode === "list"
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative" ref={sortRef}>
                    <button
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-900">
                        {sortOptions.find(o => o.id === sortBy)?.label || "Sort by"}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                        isSortOpen ? "rotate-180" : ""
                      }`} />
                    </button>

                    {isSortOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                        {sortOptions.map(option => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id);
                              setIsSortOpen(false);
                            }}
                            className={`flex items-center gap-3 w-full p-4 text-left hover:bg-gray-50 transition-colors duration-200 ${
                              sortBy === option.id ? "bg-blue-50 text-blue-600" : "text-gray-700"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              sortBy === option.id 
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}>
                              {option.icon}
                            </div>
                            <span className="font-medium">{option.label}</span>
                            {sortBy === option.id && (
                              <Check className="w-4 h-4 ml-auto text-blue-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="w-5 h-5 bg-white text-blue-600 rounded-full text-xs flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mt-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for smartphones, brands, features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters */}
            {(selectedBrands.length > 0 || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 2000) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedBrands.map(brandId => {
                  const brand = brands.find(b => b.id === brandId);
                  return brand && (
                    <button
                      key={brandId}
                      onClick={() => toggleBrand(brandId)}
                      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium hover:from-blue-100 hover:to-purple-100 transition-all duration-200"
                    >
                      {brand.icon} {brand.name}
                      <X className="w-3 h-3" />
                    </button>
                  );
                })}
                {selectedCategories.map(categoryId => {
                  const category = categories.find(c => c.id === categoryId);
                  return category && (
                    <button
                      key={categoryId}
                      onClick={() => toggleCategory(categoryId)}
                      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-sm font-medium hover:from-emerald-100 hover:to-teal-100 transition-all duration-200"
                    >
                      {category.icon} {category.name}
                      <X className="w-3 h-3" />
                    </button>
                  );
                })}
                {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                  <button
                    onClick={() => setPriceRange([0, 2000])}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 rounded-full text-sm font-medium hover:from-amber-100 hover:to-orange-100 transition-all duration-200"
                  >
                    ${priceRange[0]} - ${priceRange[1]}
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Products Grid/List */}
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                    : "grid-cols-1"
                }`}>
                  {currentProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-gray-200">
                    <div className="text-gray-600 text-sm">
                      Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                          currentPage === 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        ← Previous
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              currentPage === pageNum
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <>
                          <span className="text-gray-400">...</span>
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              currentPage === totalPages
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                          currentPage === totalPages
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-4/5 bg-white shadow-2xl overflow-y-auto">
            {/* Mobile filter content would go here */}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="container mx-auto px-4 lg:px-8 mt-16 mb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
          
          <div className="relative z-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
              Our expert team is ready to help you find the perfect smartphone for your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                Chat with Expert
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
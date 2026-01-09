// src/components/Deals.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Clock,
  Tag,
  TrendingUp,
  Star,
  ShoppingBag,
  Eye,
  Heart,
  ShoppingCart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Crown,
  Percent,
  Award,
  Gift,
  Shield,
  Truck,
  Users,
  TrendingDown,
  Timer,
  Filter,
  Grid,
  List,
  CheckCircle,
  Sparkles,
  X,
  Package,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  Camera,
  Home,
  Music,
  BookOpen,
  Wrench,
  Plane,
  Car,
  Dumbbell,
  Coffee,
  ShoppingBasket
} from "lucide-react";

const Deals = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [timer, setTimer] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Deal categories
  const dealCategories = [
    { id: "all", label: "All Deals", icon: <Zap />, count: 128 },
    { id: "flash", label: "Flash Sales", icon: <Flame />, count: 24 },
    { id: "featured", label: "Featured", icon: <Crown />, count: 42 },
    { id: "ending", label: "Ending Soon", icon: <Clock />, count: 18 },
    { id: "exclusive", label: "Exclusive", icon: <Award />, count: 12 },
    { id: "bundles", label: "Bundles", icon: <Package />, count: 8 }
  ];

  // Filter options
  const filterOptions = [
    { id: "under50", label: "Under $50", icon: <Tag /> },
    { id: "discount70", label: "70%+ Off", icon: <Percent /> },
    { id: "freeShipping", label: "Free Shipping", icon: <Truck /> },
    { id: "topRated", label: "Top Rated", icon: <Star /> },
    { id: "bestSeller", label: "Best Seller", icon: <TrendingUp /> },
    { id: "newArrival", label: "New Arrival", icon: <Sparkles /> }
  ];

  // Product categories
  const productCategories = [
    { id: "electronics", label: "Electronics", icon: <Smartphone />, color: "from-blue-500 to-indigo-600" },
    { id: "computers", label: "Computers", icon: <Laptop />, color: "from-purple-500 to-pink-600" },
    { id: "audio", label: "Audio", icon: <Headphones />, color: "from-green-500 to-emerald-600" },
    { id: "wearables", label: "Wearables", icon: <Watch />, color: "from-orange-500 to-red-600" },
    { id: "gaming", label: "Gaming", icon: <Gamepad2 />, color: "from-yellow-500 to-amber-600" },
    { id: "home", label: "Home", icon: <Home />, color: "from-teal-500 to-cyan-600" },
    { id: "fashion", label: "Fashion", icon: <ShoppingBag />, color: "from-rose-500 to-pink-600" },
    { id: "sports", label: "Sports", icon: <Dumbbell />, color: "from-lime-500 to-green-600" }
  ];

  // Sample deals data
  const deals = [
    {
      id: 1,
      title: "iPhone 15 Pro Max",
      category: "electronics",
      originalPrice: 1299,
      price: 899,
      discount: 31,
      rating: 4.8,
      reviewCount: 1242,
      image: "https://i.pinimg.com/736x/cb/2a/d0/cb2ad0bbc24149758f88797d22b54ab7.jpg",
      tag: "FLASH SALE",
      tagColor: "bg-gradient-to-r from-red-500 to-orange-500",
      endTime: "12:45:30",
      unitsLeft: 15,
      isFeatured: true,
      isExclusive: false,
      freeShipping: true,
      warranty: "2 Years"
    },
    {
      id: 2,
      title: "MacBook Pro M3",
      category: "computers",
      originalPrice: 2499,
      price: 1999,
      discount: 20,
      rating: 4.9,
      reviewCount: 892,
      image: "https://i.pinimg.com/736x/67/73/29/677329a6828e967aed71eb2e67c90e6d.jpg",
      tag: "BEST DEAL",
      tagColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      endTime: "23:59:59",
      unitsLeft: 42,
      isFeatured: true,
      isExclusive: true,
      freeShipping: true,
      warranty: "3 Years"
    },
    {
      id: 3,
      title: "Sony WH-1000XM5",
      category: "audio",
      originalPrice: 399,
      price: 279,
      discount: 30,
      rating: 4.7,
      reviewCount: 1567,
      image: "https://i.pinimg.com/736x/99/ce/89/99ce899c53319acc801eed4f4251c882.jpg",
      tag: "HOT DEAL",
      tagColor: "bg-gradient-to-r from-orange-500 to-yellow-500",
      endTime: "06:30:00",
      unitsLeft: 8,
      isFeatured: false,
      isExclusive: false,
      freeShipping: true,
      warranty: "1 Year"
    },
    {
      id: 4,
      title: "Apple Watch Series 9",
      category: "wearables",
      originalPrice: 429,
      price: 349,
      discount: 19,
      rating: 4.6,
      reviewCount: 2314,
      image: "https://i.pinimg.com/736x/3a/18/03/3a1803082f17b91ad9e97dbea99eac7b.jpg",
      tag: "LIMITED",
      tagColor: "bg-gradient-to-r from-green-500 to-emerald-500",
      endTime: "18:20:15",
      unitsLeft: 23,
      isFeatured: true,
      isExclusive: true,
      freeShipping: false,
      warranty: "2 Years"
    },
    {
      id: 5,
      title: "PlayStation 5 Bundle",
      category: "gaming",
      originalPrice: 599,
      price: 449,
      discount: 25,
      rating: 4.8,
      reviewCount: 1843,
      image: "https://i.pinimg.com/1200x/12/f1/68/12f16804a9be281bc2a4c12006c71353.jpg",
      tag: "BUNDLE",
      tagColor: "bg-gradient-to-r from-indigo-500 to-blue-500",
      endTime: "14:15:00",
      unitsLeft: 5,
      isFeatured: false,
      isExclusive: true,
      freeShipping: true,
      warranty: "1 Year"
    },
    {
      id: 6,
      title: "Samsung 4K Smart TV",
      category: "electronics",
      originalPrice: 1299,
      price: 899,
      discount: 31,
      rating: 4.7,
      reviewCount: 892,
      image: "https://i.pinimg.com/736x/d9/de/1e/d9de1e370e0c0f57f49f07c751789aad.jpg",
      tag: "CLEARANCE",
      tagColor: "bg-gradient-to-r from-rose-500 to-pink-500",
      endTime: "09:45:00",
      unitsLeft: 12,
      isFeatured: true,
      isExclusive: false,
      freeShipping: true,
      warranty: "2 Years"
    },
    {
      id: 7,
      title: "Dyson Airwrap",
      category: "home",
      originalPrice: 599,
      price: 449,
      discount: 25,
      rating: 4.5,
      reviewCount: 2341,
      image: "https://i.pinimg.com/736x/9e/55/c4/9e55c43531bc16271f32b7bac22072c4.jpg",
      tag: "TRENDING",
      tagColor: "bg-gradient-to-r from-amber-500 to-orange-500",
      endTime: "21:30:00",
      unitsLeft: 31,
      isFeatured: false,
      isExclusive: true,
      freeShipping: true,
      warranty: "2 Years"
    },
    {
      id: 8,
      title: "Nike Air Max",
      category: "fashion",
      originalPrice: 159,
      price: 99,
      discount: 38,
      rating: 4.4,
      reviewCount: 1567,
      image: "https://i.pinimg.com/1200x/22/54/de/2254deaa478102c978d90d58f1784a95.jpg",
      tag: "FLASH SALE",
      tagColor: "bg-gradient-to-r from-red-500 to-orange-500",
      endTime: "03:20:45",
      unitsLeft: 7,
      isFeatured: true,
      isExclusive: false,
      freeShipping: true,
      warranty: "6 Months"
    }
  ];

  // Sort deals based on selected sort
  const sortedDeals = [...deals].sort((a, b) => {
    switch (sortBy) {
      case "discount":
        return b.discount - a.discount;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return b.rating * b.reviewCount - a.rating * a.reviewCount;
    }
  });

  // Filter deals based on active tab
  const filteredDeals = sortedDeals.filter(deal => {
    if (activeTab === "all") return true;
    if (activeTab === "flash") return deal.tag === "FLASH SALE";
    if (activeTab === "featured") return deal.isFeatured;
    if (activeTab === "ending") return parseInt(deal.endTime.split(':')[0]) < 6;
    if (activeTab === "exclusive") return deal.isExclusive;
    if (activeTab === "bundles") return deal.tag === "BUNDLE";
    return true;
  });

  // Handle filter selection
  const handleFilterSelect = (filterId) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-pulse">
              <Flame className="w-5 h-5" />
              <span className="font-bold">LIMITED TIME OFFERS</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Hot Deals &{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                Exclusive Offers
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don't miss out on incredible savings! Shop our curated selection of premium products at unbeatable prices.
            </p>

            {/* Global Timer */}
            <div className="inline-flex items-center gap-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl mb-8">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold">
                  {String(timer.hours).padStart(2, '0')}
                </div>
                <div className="text-sm text-white/80">Hours</div>
              </div>
              <div className="text-2xl text-white/60">:</div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold">
                  {String(timer.minutes).padStart(2, '0')}
                </div>
                <div className="text-sm text-white/80">Minutes</div>
              </div>
              <div className="text-2xl text-white/60">:</div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold">
                  {String(timer.seconds).padStart(2, '0')}
                </div>
                <div className="text-sm text-white/80">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {dealCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`group flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className={`${activeTab === category.id ? 'text-white' : 'text-gray-500'}`}>
                    {category.icon}
                  </span>
                  <span className="font-medium">{category.label}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-3 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="discount">Highest Discount</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <TrendingDown className="w-5 h-5 text-gray-500" />
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-white border border-gray-300 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  showFilters
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filters</span>
                {selectedFilters.length > 0 && (
                  <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                    {selectedFilters.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          {showFilters && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Filter by</h3>
                <button
                  onClick={() => setSelectedFilters([])}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {filterOptions.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterSelect(filter.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                      selectedFilters.includes(filter.id)
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    {filter.icon}
                    <span>{filter.label}</span>
                    {selectedFilters.includes(filter.id) && (
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {productCategories.map(category => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group"
              >
                <div className="relative p-4 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">{category.icon}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.label}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeTab === "all" ? "All Deals" : dealCategories.find(c => c.id === activeTab)?.label}
              <span className="text-gray-600 text-lg font-normal ml-2">
                ({filteredDeals.length} items)
              </span>
            </h2>
            <Link
              to="/products"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Products Grid */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDeals.map(deal => (
                <div
                  key={deal.id}
                  className="group relative bg-white rounded-3xl border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Deal Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`px-3 py-1.5 ${deal.tagColor} text-white text-xs font-bold rounded-full flex items-center gap-1`}>
                      {deal.tag.includes("SALE") && <Zap className="w-3 h-3" />}
                      {deal.tag}
                    </div>
                  </div>

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Discount Overlay */}
                    <div className="absolute top-0 right-0">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 transform rotate-45 translate-x-10 -translate-y-10">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 text-white font-bold">
                            -{deal.discount}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick View */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <button className="px-4 py-2 bg-white rounded-xl font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                          <Eye className="w-4 h-4 inline mr-2" />
                          Quick View
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category & Stock */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500 capitalize">
                        {deal.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-red-600">
                        <Clock className="w-3 h-3" />
                        <span>{deal.unitsLeft} left</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {deal.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(deal.rating)
                                ? "text-amber-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {deal.rating} ({deal.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-4">
                      <div className="text-2xl font-bold text-gray-900">
                        ${deal.price}
                      </div>
                      <div className="text-lg text-gray-400 line-through">
                        ${deal.originalPrice}
                      </div>
                      <div className="ml-auto text-sm font-bold text-green-600">
                        Save ${deal.originalPrice - deal.price}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Selling fast</span>
                        <span>{Math.floor((100 - deal.unitsLeft) / 100 * 100)}% sold</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.floor((100 - deal.unitsLeft) / 100 * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                      <div className="flex items-center gap-2 text-red-600">
                        <Timer className="w-4 h-4" />
                        <span className="text-sm font-medium">Ends in</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-700 font-mono">
                        <span className="px-2 py-1 bg-white rounded-lg">{deal.endTime.split(':')[0]}</span>
                        <span>:</span>
                        <span className="px-2 py-1 bg-white rounded-lg">{deal.endTime.split(':')[1]}</span>
                        <span>:</span>
                        <span className="px-2 py-1 bg-white rounded-lg">{deal.endTime.split(':')[2]}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="group/btn flex-1 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-300">
                        <div className="flex items-center justify-center gap-2">
                          <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                          <span>Add to Cart</span>
                        </div>
                      </button>
                      <button className="p-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors">
                        <div className="flex items-center justify-center">
                          <Eye className="w-5 h-5" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {filteredDeals.map(deal => (
                <div
                  key={deal.id}
                  className="group bg-white rounded-3xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:w-1/3 relative">
                      <div className="relative h-56 lg:h-full overflow-hidden">
                        <img
                          src={deal.image}
                          alt={deal.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        {/* Badge */}
                        <div className="absolute top-4 left-4">
                          <div className={`px-3 py-1.5 ${deal.tagColor} text-white text-xs font-bold rounded-full`}>
                            {deal.tag}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="lg:w-2/3 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        {/* Main Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm text-gray-500 capitalize">
                              {deal.category}
                            </span>
                            {deal.isExclusive && (
                              <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">
                                EXCLUSIVE
                              </span>
                            )}
                            {deal.freeShipping && (
                              <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full">
                                FREE SHIPPING
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {deal.title}
                          </h3>

                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(deal.rating)
                                      ? "text-amber-500 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600">
                                {deal.rating} ({deal.reviewCount} reviews)
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">
                            Premium quality with advanced features. Includes {deal.warranty} warranty and 24/7 support.
                          </p>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            {deal.warranty && (
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                <span>{deal.warranty} Warranty</span>
                              </div>
                            )}
                            {deal.freeShipping && (
                              <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                <span>Free Shipping</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="lg:w-64 space-y-4">
                          <div>
                            <div className="text-3xl font-bold text-gray-900 mb-1">
                              ${deal.price}
                            </div>
                            <div className="text-lg text-gray-400 line-through mb-2">
                              ${deal.originalPrice}
                            </div>
                            <div className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full text-sm font-bold inline-block">
                              Save ${deal.originalPrice - deal.price}
                            </div>
                          </div>

                          {/* Timer */}
                          <div className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-red-600 font-medium">Ends in</span>
                              <div className="flex items-center gap-1 text-red-700 font-mono">
                                <span className="px-2 py-1 bg-white rounded-lg">{deal.endTime.split(':')[0]}</span>
                                <span>:</span>
                                <span className="px-2 py-1 bg-white rounded-lg">{deal.endTime.split(':')[1]}</span>
                                <span>:</span>
                                <span className="px-2 py-1 bg-white rounded-lg">{deal.endTime.split(':')[2]}</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-2">
                            <button className="w-full p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300">
                              Add to Cart
                            </button>
                            <button className="w-full p-3 border-2 border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full mb-4">
                <Gift className="w-4 h-4" />
                <span className="font-medium">Exclusive Deals Newsletter</span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Early Access to Deals
              </h2>
              
              <p className="text-gray-600 mb-6">
                Subscribe to be the first to know about flash sales, exclusive offers, and special discounts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300">
                  Subscribe
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive deal alerts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
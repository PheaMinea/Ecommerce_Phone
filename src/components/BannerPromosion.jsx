// src/components/BannerPromosion.jsx
import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Tag, 
  Clock, 
  Zap, 
  Gift, 
  TrendingUp, 
  Star, 
  Shield, 
  Truck, 
  ChevronRight,
  X,
  ShoppingBag,
  Award,
  Percent,
  ShoppingCart,
  Calendar,
  Users,
  Trophy,
  ArrowRight,
  Music,
  Camera,
  Headphones,
  Smartphone,
  Laptop,
  Watch,
  CheckCircle,
  Flame,
  Crown
} from "lucide-react";
import { Link } from "react-router-dom";

const BannerPromosion = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-slide for carousel
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  // Banner data
  const banners = [
    {
      id: 1,
      title: "Black Friday Special",
      subtitle: "Up to 70% OFF",
      description: "All Electronics & Gadgets",
      icon: <Flame className="w-8 h-8" />,
      gradient: "from-red-500 via-orange-500 to-yellow-500",
      bgGradient: "from-red-50 via-orange-50 to-yellow-50",
      cta: "Shop Now",
      highlight: "Limited Time",
      badge: "🔥 HOT DEAL"
    },
    {
      id: 2,
      title: "Tech Week Sale",
      subtitle: "Premium Tech Up to 50% OFF",
      description: "Smartphones, Laptops & Accessories",
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      bgGradient: "from-blue-50 via-purple-50 to-pink-50",
      cta: "Explore Deals",
      highlight: "Exclusive",
      badge: "⚡ FLASH SALE"
    },
    {
      id: 3,
      title: "New Year Launch",
      subtitle: "Latest Tech Products",
      description: "Pre-order with 30% OFF",
      icon: <Sparkles className="w-8 h-8" />,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      bgGradient: "from-emerald-50 via-teal-50 to-cyan-50",
      cta: "Pre-order Now",
      highlight: "New Arrival",
      badge: "🎉 JUST LAUNCHED"
    }
  ];

  // Promo cards data
  const promoCards = [
    {
      id: 1,
      title: "Free Shipping",
      description: "On orders over $99",
      icon: <Truck className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      gradient: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      id: 2,
      title: "2-Year Warranty",
      description: "On all premium products",
      icon: <Shield className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
      gradient: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      id: 3,
      title: "Best Price",
      description: "Price match guarantee",
      icon: <Tag className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      gradient: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "Expert customer service",
      icon: <Headphones className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      gradient: "bg-gradient-to-br from-orange-400 to-orange-600"
    }
  ];

  // Product deals
  const productDeals = [
    {
      id: 1,
      category: "Smartphones",
      discount: "40% OFF",
      icon: <Smartphone />,
      items: "iPhone 15, Samsung S24",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      category: "Laptops",
      discount: "35% OFF",
      icon: <Laptop />,
      items: "MacBook Pro, Dell XPS",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      category: "Audio",
      discount: "50% OFF",
      icon: <Music />,
      items: "AirPods Pro, Sony WH-1000XM5",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 4,
      category: "Wearables",
      discount: "30% OFF",
      icon: <Watch />,
      items: "Apple Watch, Galaxy Watch",
      color: "from-orange-500 to-red-600"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden">
      {/* Main Promotional Banner - Option 1: Hero Banner */}
      <div className="relative mb-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 opacity-5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Main Banner */}
            <div className="relative min-h-[400px] flex items-center p-8 lg:p-12">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 right-8 animate-float">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-30"></div>
              </div>
              <div className="absolute bottom-8 left-8 animate-float-delayed">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-30"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-full shadow-lg animate-pulse">
                    <Flame className="w-4 h-4" />
                    <span>LIMITED TIME OFFER</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Mega
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {" "}Tech Sale
                    </span>
                    <br />
                    <span className="text-3xl lg:text-5xl">Up to 70% OFF</span>
                  </h1>

                  {/* Description */}
                  <p className="text-lg lg:text-xl text-gray-600">
                    Premium smartphones, laptops, audio gear & more. 
                    Don't miss out on the biggest tech deals of the season!
                  </p>

                  {/* Timer */}
                  <div className="inline-flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                    <Clock className="w-5 h-5 text-red-500" />
                    <div className="flex items-center gap-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                          {String(timeLeft.hours).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500">Hours</div>
                      </div>
                      <div className="text-red-400">:</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                          {String(timeLeft.minutes).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500">Minutes</div>
                      </div>
                      <div className="text-red-400">:</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                          {String(timeLeft.seconds).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500">Seconds</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/products"
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-blue-200 transition-all duration-300 hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Shop All Deals
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                    
                    <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-800 font-bold rounded-xl hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                      <span className="flex items-center gap-2">
                        <Gift className="w-5 h-5" />
                        View Offers
                      </span>
                    </button>
                  </div>
                </div>

                {/* Right Content - Product Display */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    {productDeals.map((deal) => (
                      <div
                        key={deal.id}
                        onMouseEnter={() => setHoveredCard(deal.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`relative p-6 rounded-2xl bg-gradient-to-br ${deal.color} text-white transition-all duration-500 transform ${
                          hoveredCard === deal.id ? 'scale-105 shadow-2xl' : 'shadow-lg'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            {deal.icon}
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold">{deal.discount}</div>
                            <div className="text-sm opacity-90">OFF</div>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{deal.category}</h3>
                        <p className="text-sm opacity-90">{deal.items}</p>
                        
                        {/* Hover Effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${deal.color} opacity-0 transition-opacity duration-500 ${
                          hoveredCard === deal.id ? 'opacity-20' : ''
                        }`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 z-20"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Option 2: Minimal Banner */}

      {/* Option 3: Carousel Banner */}
      <div className="mb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden h-78">
            {/* Slides */}
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-all duration-1000 transform ${
                  activeSlide === index
                    ? 'opacity-100 translate-x-0'
                    : index < activeSlide
                    ? '-translate-x-full opacity-0'
                    : 'translate-x-full opacity-0'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient}`}></div>
                
                <div className="relative h-full p-8 lg:p-12">
                  <div className="flex items-center justify-between h-full">
                    {/* Content */}
                    <div className="space-y-4 max-w-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                          {banner.icon}
                        </div>
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800">
                          {banner.badge}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        {banner.title}
                      </h2>
                      
                      <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r ${banner.gradient} bg-clip-text text-transparent">
                        {banner.subtitle}
                      </div>
                      
                      <p className="text-gray-600">
                        {banner.description}
                      </p>
                      
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300"
                      >
                        {banner.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    
                    {/* Decorative Element */}
                    <div className="hidden lg:block">
                      <div className="relative">
                        <div className={`w-48 h-48 bg-gradient-to-r ${banner.gradient} rounded-full blur-3xl opacity-30`}></div>
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? 'w-8 bg-white'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Promo Cards */}
      <div className="mb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {promoCards.map((card) => (
              <div
                key={card.id}
                className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${card.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <div className={card.color}>{card.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                </div>
                
                {/* Animated Background */}
                <div className={`absolute inset-0 ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default BannerPromosion;
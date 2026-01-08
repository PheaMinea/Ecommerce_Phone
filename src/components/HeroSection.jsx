// src/components/HeroSection.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Play, Shield, Truck, Clock, Award } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const slides = [
    {
      title: "Next-Gen Smartphones",
      subtitle: "Experience the Future",
      gradient: "from-blue-600 via-purple-600 to-pink-600",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tag: "New Flagship Models",
    },
    {
      title: "Pro Photography",
      subtitle: "Capture Every Moment",
      gradient: "from-emerald-500 via-cyan-600 to-blue-700",
      image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tag: "Advanced Camera Systems",
    },
    {
      title: "All-Day Power",
      subtitle: "Never Run Out of Battery",
      gradient: "from-amber-500 via-orange-600 to-red-600",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      tag: "Fast Charging Technology",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: <Truck className="w-5 h-5" />, value: "24-Hour", label: "Express Delivery" },
    { icon: <Shield className="w-5 h-5" />, value: "2-Year", label: "Premium Warranty" },
    { icon: <Clock className="w-5 h-5" />, value: "24/7", label: "Support" },
    { icon: <Award className="w-5 h-5" />, value: "1000+", label: "Happy Customers" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} transition-all duration-1000`} />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 2px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 pt-16 lg:pt-24 pb-20 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">🚀 Limited Time Offer</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                Discover Your
                <span className="block bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  Perfect Phone
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
                Cutting-edge smartphones from top brands. Exclusive deals, premium quality, 
                and revolutionary technology in one place.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="group relative overflow-hidden bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span className="relative z-10">Shop Latest Models</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white/30 rounded-xl text-white font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-blue-300 group-hover:text-cyan-300 transition-colors duration-300">
                      {stat.icon}
                    </div>
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Phone Showcase */}
          <div className="relative">
            {/* Main Phone Image */}
            <div className="relative z-20">
              <div className="relative group">
                <img
                  src={slides[currentSlide].image}
                  alt="Premium Smartphone"
                  className="w-full h-[500px] object-cover rounded-3xl shadow-2xl transform transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl shadow-2xl animate-float">
                  <div className="text-white">
                    <div className="text-sm font-medium mb-1">Special Offer</div>
                    <div className="text-2xl font-bold">Save $200</div>
                    <div className="text-sm opacity-90 mt-1">On select models</div>
                  </div>
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">🔥</span>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/20 rounded-3xl" />
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'w-8 bg-white' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 backdrop-blur-sm rounded-3xl rotate-12 animate-pulse" />
            <div className="absolute -bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full animate-pulse delay-500" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <span className="text-white/60 text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full h-20 text-gray-50" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Truck, Shield, Clock, Award } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Next-Gen Smartphones",
      description: "Experience the future of mobile technology",
      image: "https://i.pinimg.com/736x/8d/c7/3f/8dc73fc801d34067a10d3e5d86ac4c7c.jpg",
      cta: "Shop Now"
    },
    {
      title: "Pro Photography",
      description: "Capture every moment with advanced camera systems",
      image: "https://i.pinimg.com/1200x/10/0d/6b/100d6bee7165d9ea11d4821ad6598150.jpg",
      cta: "View Cameras"
    },
    {
      title: "All-Day Power",
      description: "Fast charging technology for uninterrupted use",
      image: "https://i.pinimg.com/1200x/ab/7a/4d/ab7a4d12e9234b71fd8d3216e5cf78af.jpg",
      cta: "Explore Features"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: <Truck className="w-5 h-5" />, value: "24-Hour", label: "Delivery" },
    { icon: <Shield className="w-5 h-5" />, value: "2-Year", label: "Warranty" },
    { icon: <Clock className="w-5 h-5" />, value: "24/7", label: "Support" },
    { icon: <Award className="w-5 h-5" />, value: "1000+", label: "Customers" }
  ];

  return (
    <div className="relative bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">✨ New Arrivals</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Your
                <span className="block text-blue-600">Perfect Phone</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                Cutting-edge smartphones from top brands with exclusive deals, 
                premium quality, and the latest technology.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                <span>Shop Latest Models</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow duration-300"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-blue-600">
                      {stat.icon}
                    </div>
                    <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-[400px] md:h-[500px] object-cover transition-opacity duration-500"
              />
              
              {/* Image Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-1">{slides[currentSlide].title}</h3>
                  <p className="text-gray-200 text-sm mb-3">{slides[currentSlide].description}</p>
                  <button className="text-sm font-medium text-white hover:text-blue-200 transition-colors">
                    {slides[currentSlide].cta} →
                  </button>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-8 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Featured Badge */}
            <div className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
              <div className="text-sm font-medium">Save $200</div>
              <div className="text-xs opacity-90">On select models</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full h-12 md:h-16 text-white" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0 0V46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
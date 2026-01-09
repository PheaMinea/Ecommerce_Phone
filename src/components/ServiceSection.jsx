// src/components/ServiceSection.jsx
import React, { useState } from 'react';
import { 
  Truck, 
  Shield, 
  RefreshCw, 
  Headphones, 
  Smartphone, 
  Wrench,
  Zap,
  Clock,
  Gift,
  BadgeCheck,
  Users,
  BatteryCharging
} from 'lucide-react';

const ServiceSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Lightning Fast Delivery",
      description: "Free express shipping on all orders over $499. Get your device in 24 hours or less.",
      features: ["24-hour delivery", "Free shipping", "Real-time tracking"],
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-400/10",
      accent: "text-blue-400",
      delay: 0
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Premium Protection",
      description: "Comprehensive 2-year warranty with accidental damage coverage included.",
      features: ["2-year warranty", "Accidental damage", "Free replacements"],
      color: "from-emerald-500 to-teal-400",
      bgColor: "bg-gradient-to-br from-emerald-500/10 to-teal-400/10",
      accent: "text-emerald-400",
      delay: 100
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Hassle-Free Returns",
      description: "30-day no-questions-asked return policy with free return shipping.",
      features: ["30-day returns", "Free returns", "Instant refunds"],
      color: "from-violet-500 to-purple-400",
      bgColor: "bg-gradient-to-br from-violet-500/10 to-purple-400/10",
      accent: "text-violet-400",
      delay: 200
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Expert Support",
      description: "Round-the-clock technical support from our team of smartphone experts.",
      features: ["Live chat", "Phone support", "Remote assistance"],
      color: "from-amber-500 to-orange-400",
      bgColor: "bg-gradient-to-br from-amber-500/10 to-orange-400/10",
      accent: "text-amber-400",
      delay: 300
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Smart Trade-In Program",
      description: "Get up to $500 credit for your old device. Instant valuation, quick payment.",
      features: ["Instant valuation", "Free shipping", "Quick payment"],
      color: "from-rose-500 to-pink-400",
      bgColor: "bg-gradient-to-br from-rose-500/10 to-pink-400/10",
      accent: "text-rose-400",
      delay: 400
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Pro Repair Services",
      description: "Certified repair centers using genuine parts. Same-day repairs available.",
      features: ["Same-day repair", "Genuine parts", "Certified technicians"],
      color: "from-indigo-500 to-blue-400",
      bgColor: "bg-gradient-to-br from-indigo-500/10 to-blue-400/10",
      accent: "text-indigo-400",
      delay: 500
    }
  ];

  const highlights = [
    { icon: <Zap className="w-5 h-5" />, text: "90% same-day repairs" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 customer support" },
    { icon: <Gift className="w-5 h-5" />, text: "Free gift wrapping" },
    { icon: <BadgeCheck className="w-5 h-5" />, text: "Certified authentic" },
    { icon: <Users className="w-5 h-5" />, text: "Expert consultations" },
    { icon: <BatteryCharging className="w-5 h-5" />, text: "Free battery check" },
  ];

  return (
    <div className="relative overflow-hidden py-10 lg:py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
      
      {/* Animated Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-200 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Premium Services
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Beyond Just
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              A Purchase
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive services that extend beyond the sale. From instant delivery 
            to professional repairs, experience the complete smartphone ecosystem.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ animationDelay: `${service.delay}ms` }}
            >
              {/* Card */}
              <div className={`
                relative overflow-hidden rounded-2xl p-8 h-full
                transition-all duration-500 transform
                ${hoveredIndex === index 
                  ? 'scale-[1.02] shadow-2xl' 
                  : 'shadow-lg hover:shadow-xl'
                }
                hero-glass border border-white/20
                backdrop-blur-sm
              `}>
                {/* Gradient Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.bgColor}`} />
                
                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px] bg-gradient-to-br ${service.color}`}>
                  <div className="w-full h-full rounded-2xl bg-white" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`
                    w-16 h-16 rounded-xl mb-6 flex items-center justify-center
                    bg-gradient-to-br ${service.color}
                    shadow-lg transform transition-transform duration-300
                    ${hoveredIndex === index ? 'scale-110 rotate-6' : ''}
                  `}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold mb-3 ${service.accent}`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${service.accent}`} />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <button className={`
                    inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold
                    transition-all duration-300 transform hover:scale-105
                    bg-gradient-to-r ${service.color} text-white
                    shadow-lg hover:shadow-xl
                  `}>
                    <span>Learn More</span>
                    <div className={`transform transition-transform duration-300 ${
                      hoveredIndex === index ? 'translate-x-2' : ''
                    }`}>
                      →
                    </div>
                  </button>
                </div>

                {/* Floating Elements */}
                {hoveredIndex === index && (
                  <>
                    <div className="absolute top-4 right-4 w-4 h-4 bg-gradient-to-r from-white/30 to-transparent rounded-full animate-ping" />
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-md" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Highlights Banner */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-90" />
          
          {/* Animated Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }} />
          </div>

          <div className="relative py-12 px-8 lg:px-16">
           

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors duration-300">
                    <div className="text-white">
                      {highlight.icon}
                    </div>
                  </div>
                  <span className="text-white text-sm font-medium">
                    {highlight.text}
                  </span>
                </div>
              ))}
            </div>

            
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
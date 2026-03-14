import React from 'react';
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
  const services = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Free express shipping on orders over $499",
      features: ["24-hour delivery", "Free shipping", "Real-time tracking"],
      color: "border-blue-200 bg-blue-50 text-blue-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Premium Protection",
      description: "2-year warranty with accidental damage coverage",
      features: ["2-year warranty", "Accidental damage", "Free replacements"],
      color: "border-emerald-200 bg-emerald-50 text-emerald-600"
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Easy Returns",
      description: "30-day return policy with free return shipping",
      features: ["30-day returns", "Free returns", "Instant refunds"],
      color: "border-purple-200 bg-purple-50 text-purple-600"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock technical support from experts",
      features: ["Live chat", "Phone support", "Remote assistance"],
      color: "border-amber-200 bg-amber-50 text-amber-600"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Trade-In Program",
      description: "Get up to $500 credit for your old device",
      features: ["Instant valuation", "Free shipping", "Quick payment"],
      color: "border-pink-200 bg-pink-50 text-pink-600"
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Pro Repairs",
      description: "Certified repairs using genuine parts",
      features: ["Same-day repair", "Genuine parts", "Certified technicians"],
      color: "border-indigo-200 bg-indigo-50 text-indigo-600"
    }
  ];

  const highlights = [
    { icon: <Zap className="w-4 h-4" />, text: "90% same-day repairs" },
    { icon: <Clock className="w-4 h-4" />, text: "24/7 customer support" },
    { icon: <Gift className="w-4 h-4" />, text: "Free gift wrapping" },
    { icon: <BadgeCheck className="w-4 h-4" />, text: "Certified authentic" },
    { icon: <Users className="w-4 h-4" />, text: "Expert consultations" },
    { icon: <BatteryCharging className="w-4 h-4" />, text: "Free battery check" }
  ];

  return (
    <div className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full mb-6">
            <span className="text-sm font-medium">Our Services</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Complete Smartphone Services
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From delivery to repairs, we provide everything you need for your smartphone journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 border ${service.color}`}>
                <div className={service.color.split(' ')[2]}>
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-3" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Highlights Banner */}
        <div className="bg-blue-600 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Why Choose Us
            </h3>
            <p className="text-blue-100">
              We're committed to providing the best service experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-3">
                  <div className="text-white">
                    {highlight.icon}
                  </div>
                </div>
                <span className="text-white text-sm">
                  {highlight.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
// src/pages/Services.jsx
import React from 'react';
import ServiceSection from '../components/ServiceSection';
import { 
  FaTools, 
  FaPhone, 
  FaLaptop, 
  FaHeadset, 
  FaShippingFast, 
  FaShieldAlt,
  FaExchangeAlt,
  FaGift
} from 'react-icons/fa';

const Services = () => {
  const detailedServices = [
    {
      icon: <FaTools className="text-4xl" />,
      title: "Repair Services",
      description: "Professional repair for all smartphone models with genuine parts.",
      features: ["Screen Replacement", "Battery Replacement", "Water Damage Repair", "Software Issues"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <FaPhone className="text-4xl" />,
      title: "Trade-In Program",
      description: "Get credit for your old device when purchasing a new one.",
      features: ["Instant Valuation", "Free Shipping", "Data Wiping", "Quick Payment"],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <FaLaptop className="text-4xl" />,
      title: "Device Setup",
      description: "We help you set up your new device and transfer all your data.",
      features: ["Data Transfer", "App Installation", "Account Setup", "Training"],
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: "24/7 Support",
      description: "Round-the-clock technical support for all your questions.",
      features: ["Phone Support", "Live Chat", "Email Support", "Remote Assistance"],
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const additionalServices = [
    {
      icon: <FaShippingFast />,
      title: "Express Delivery",
      description: "Same-day delivery available in major cities"
    },
    {
      icon: <FaShieldAlt />,
      title: "Extended Warranty",
      description: "Extend your device protection up to 3 years"
    },
    {
      icon: <FaExchangeAlt />,
      title: "Easy Returns",
      description: "30-day no-questions-asked return policy"
    },
    {
      icon: <FaGift />,
      title: "Gift Services",
      description: "Gift wrapping and personalized messages"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Comprehensive services to enhance your smartphone experience. 
            From purchase to repair and beyond, we've got you covered.
          </p>
        </div>
      </div>

      <ServiceSection />

      {/* Detailed Services */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Premium Service Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive service packages designed to meet all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {detailedServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex items-start mb-6">
                    <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mr-4`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{service.title}</h3>
                      <p className="text-gray-600 mt-2">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-3">Includes:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">From $49</span>
                      <span className="text-gray-500 text-sm ml-2">/service</span>
                    </div>
                    <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Additional Benefits</h2>
            <p className="text-gray-600">Extra perks that come with every purchase</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="text-primary text-3xl mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help With Your Device?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Our expert team is ready to assist you with any questions or service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition">
              Contact Support
            </button>
            <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition">
              Schedule Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
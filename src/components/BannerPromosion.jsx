import React, { useState, useEffect } from "react";
import { 
  Tag, 
  Clock, 
  Truck, 
  Shield, 
  Headphones, 
  ArrowRight,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const BannerPromotion = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [isVisible, setIsVisible] = useState(true);

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

  // Promo cards data
  const promoCards = [
    {
      id: 1,
      title: "Free Shipping",
      description: "On orders over $99",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "2-Year Warranty",
      description: "On all products",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Best Price",
      description: "Price match guarantee",
      icon: <Tag className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "Expert customer service",
      icon: <Headphones className="w-5 h-5" />,
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="bg-white">
      {/* Main Promo Banner */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="relative py-4">
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left - Timer */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Ends in:</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                  </div>
                  <span className="text-gray-400">:</span>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                  </div>
                  <span className="text-gray-400">:</span>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Center - Title */}
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  Summer Sale: Up to 50% Off
                </div>
                <div className="text-sm text-gray-600">
                  Limited time offer on all smartphones
                </div>
              </div>

              {/* Right - CTA */}
              <Link
                to="/products"
                className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Cards */}
      <div className="py-6 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {promoCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300"
              >
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  {card.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{card.title}</div>
                  <div className="text-sm text-gray-600">{card.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPromotion;
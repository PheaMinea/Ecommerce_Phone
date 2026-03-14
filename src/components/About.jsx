import React from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Users,
  Globe,
  Shield,
  Truck,
  Clock,
  Star,
  ArrowRight,
  ShoppingBag,
  Users as UsersIcon,
  Package,
  Target,
  Heart
} from "lucide-react";

const About = () => {
  const stats = [
    { label: "Happy Customers", value: "2.5M+", icon: <UsersIcon className="w-5 h-5" /> },
    { label: "Products", value: "50K+", icon: <Package className="w-5 h-5" /> },
    { label: "Countries", value: "50+", icon: <Globe className="w-5 h-5" /> },
    { label: "5-Star Reviews", value: "100K+", icon: <Star className="w-5 h-5" /> }
  ];

  const values = [
    { title: "Quality First", description: "We only sell premium, verified products", icon: <Award className="w-5 h-5" /> },
    { title: "Customer Focus", description: "24/7 support and easy returns", icon: <Heart className="w-5 h-5" /> },
    { title: "Fast Delivery", description: "Same-day shipping on most orders", icon: <Truck className="w-5 h-5" /> },
    { title: "Secure Shopping", description: "100% secure payment processing", icon: <Shield className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're on a mission to make premium technology accessible to everyone
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 text-lg mb-6">
            Founded in 2018, we started with a simple idea: make premium smartphones and 
            technology accessible to everyone. Today, we serve millions of customers 
            worldwide with the latest tech products.
          </p>
          <p className="text-gray-600">
            Our commitment to quality, customer service, and innovation has made us 
            one of the fastest-growing tech retailers in the world.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-blue-600 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="text-blue-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="bg-blue-50 rounded-xl p-8 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              To provide the best shopping experience for technology enthusiasts by offering 
              premium products, expert advice, and exceptional customer service at competitive prices.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Explore?</h2>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Shop Our Collection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Clock,
  Tag,
  Star,
  ShoppingCart,
  Eye,
  Heart,
  ArrowRight,
  Filter,
  Grid,
  List,
  Truck,
  Shield
} from "lucide-react";
import ProductCard from "./ProductCard";

const Deals = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const tabs = [
    { id: "all", label: "All Deals", count: 12 },
    { id: "flash", label: "Flash Sales", count: 4 },
    { id: "featured", label: "Featured", count: 6 },
    { id: "ending", label: "Ending Soon", count: 2 },
  ];

  // Sample deals data (using products data)
  const deals = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      brand: "Apple",
      price: 999,
      originalPrice: 1199,
      image: "https://i.pinimg.com/736x/1a/76/26/1a7626d44c15f3c572ed6399e27ead0d.jpg",
      description: "Titanium design with A17 Pro chip",
      specs: { processor: "A17 Pro", battery: "3274 mAh", camera: "48MP" },
      colors: ["Black Titanium", "White Titanium"],
      category: "flagship",
      rating: 4.8,
      reviewCount: 1243,
      discount: 17,
      tag: "Flash Sale"
    },
    {
      id: 2,
      name: "Galaxy S24 Ultra",
      brand: "Samsung",
      price: 1299,
      originalPrice: 1399,
      image: "https://i.pinimg.com/1200x/5b/d8/93/5bd893c5ec4277bc4cff54fbb3e79afb.jpg",
      description: "AI-powered with 200MP camera",
      specs: { processor: "Snapdragon 8", battery: "5000 mAh", camera: "200MP" },
      colors: ["Phantom Black", "Graphite"],
      category: "flagship",
      rating: 4.7,
      reviewCount: 987,
      discount: 7,
      tag: "Best Seller"
    },
    {
      id: 3,
      name: "Pixel 8 Pro",
      brand: "Google",
      price: 899,
      originalPrice: 999,
      image: "https://i.pinimg.com/1200x/7f/94/6a/7f946ad8484f77e08529409b430a9afb.jpg",
      description: "AI photography with 7 years updates",
      specs: { processor: "Tensor G3", battery: "5050 mAh", camera: "50MP" },
      colors: ["Obsidian", "Porcelain"],
      category: "flagship",
      rating: 4.6,
      reviewCount: 856,
      discount: 10,
      tag: "Popular"
    },
    {
      id: 4,
      name: "OnePlus 12",
      brand: "OnePlus",
      price: 799,
      originalPrice: 899,
      image: "https://i.pinimg.com/736x/8b/0a/ff/8b0affab4dc57570bf6c3e717684332d.jpg",
      description: "Fast charging with Hasselblad camera",
      specs: { processor: "Snapdragon 8", battery: "5400 mAh", camera: "50MP" },
      colors: ["Black", "Green"],
      category: "mid-range",
      rating: 4.5,
      reviewCount: 723,
      discount: 11,
      tag: "Hot Deal"
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Special Deals
          </h1>
          <p className="text-gray-600">
            Limited time offers on premium smartphones
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
              <span className="ml-2 text-sm">
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Showing {deals.length} deals
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? 'bg-gray-100 text-blue-600' : 'text-gray-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? 'bg-gray-100 text-blue-600' : 'text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium">Free Shipping</div>
              <div className="text-sm text-gray-600">On orders over $99</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium">2-Year Warranty</div>
              <div className="text-sm text-gray-600">Extended coverage</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium">Price Match</div>
              <div className="text-sm text-gray-600">Best price guarantee</div>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {deals.map((deal) => (
            <div key={deal.id} className="relative">
              <ProductCard product={deal} />
              {/* Deal Badge */}
              {deal.tag && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    {deal.tag}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Deals;
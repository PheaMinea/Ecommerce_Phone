// src/components/ProductDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { 
  ShoppingCart, 
  Heart, 
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  RefreshCw,
  Star,
  Battery,
  Camera,
  Cpu,
  Smartphone,
  Zap,
  Package,
  Check,
  ExternalLink,
  Share2,
  Maximize2,
  Minus,
  Plus,
  Award,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Play,
  X,
  TrendingUp,
  Eye
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, cartItems } = useShop();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showFullSpecs, setShowFullSpecs] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const product = products.find((p) => p.id === parseInt(id));

  // Initialize selections
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || "");
      setSelectedStorage(product.specs?.storage || "128GB");
      
      // Check if product is in cart
      const inCart = cartItems.some(item => item.id === product.id);
      setIsInCart(inCart);
    }
  }, [product, cartItems]);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    await addToCart({
      ...product,
      selectedColor,
      selectedStorage,
      quantity,
    });

    // Animation feedback
    setIsInCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate('/cart'), 500);
  };

  const images = [
    product?.image,
    product?.image.replace('736x', '1200x'),
    "https://i.pinimg.com/736x/3a/7b/76/3a7b76f8a2e4b8e0e4b8e0e4b8e0e4b8.jpg", // Mock additional images
    "https://i.pinimg.com/736x/4c/8f/95/4c8f95f8a2e4b8e0e4b8e0e4b8e0e4b8.jpg"
  ];

  const features = [
    { icon: <Zap className="w-5 h-5" />, title: "Fast Charging", desc: "0-100% in 30 min" },
    { icon: <Battery className="w-5 h-5" />, title: "All-Day Battery", desc: "Up to 24 hours" },
    { icon: <Camera className="w-5 h-5" />, title: "Pro Camera", desc: "Studio quality" },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Water Resistant", desc: "IP68 certified" },
    { icon: <Award className="w-5 h-5" />, title: "Premium Build", desc: "Aerospace grade" },
    { icon: <Clock className="w-5 h-5" />, title: "Future Ready", desc: "7 years updates" },
  ];

  const specs = product?.specs ? [
    { label: "Display", value: product.specs.screen, icon: <Smartphone className="w-4 h-4" /> },
    { label: "Processor", value: product.specs.processor, icon: <Cpu className="w-4 h-4" /> },
    { label: "Memory", value: product.specs.ram, icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Storage", value: product.specs.storage, icon: <Package className="w-4 h-4" /> },
    { label: "Battery", value: product.specs.battery, icon: <Battery className="w-4 h-4" /> },
    { label: "Camera", value: product.specs.camera, icon: <Camera className="w-4 h-4" /> },
    { label: "Dimensions", value: "146.7 x 71.5 x 7.8 mm", icon: <Maximize2 className="w-4 h-4" /> },
    { label: "Weight", value: "187g", icon: <Package className="w-4 h-4" /> },
    { label: "Connectivity", value: "5G, Wi-Fi 6E, Bluetooth 5.3", icon: <Zap className="w-4 h-4" /> },
    { label: "Security", value: "Face ID, In-display fingerprint", icon: <Shield className="w-4 h-4" /> },
  ] : [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-600 mb-3">Product Not Found</h2>
          <p className="text-gray-500 mb-6 max-w-md">
            The product you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 inline mr-2" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30"
    >
      {/* Dynamic Background Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(99, 102, 241, 0.15) 0%, 
            rgba(168, 85, 247, 0.1) 20%, 
            rgba(236, 72, 153, 0.05) 40%, 
            transparent 70%)`,
        }}
      />

      {/* Back Button */}
      <div className="sticky top-0 z-40 pt-6 px-4 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-x-1"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
          <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            Back to Products
          </span>
        </button>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-6">
            {/* Main Image Container */}
            <div className="relative group">
              {/* Animated Border */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700" />
              
              {/* Glass Effect Container */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/90 via-white/80 to-white/90 backdrop-blur-xl border border-white/50 shadow-2xl">
                {/* Image with Parallax */}
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                  
                  <img
                    ref={imageRef}
                    src={images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Zoom Overlay */}
                  <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110">
                    <Maximize2 className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Stock Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full shadow-lg flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      In Stock • Ships Today
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setActiveImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-x-1"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setActiveImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:translate-x-1"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Image Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeImage === index 
                          ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full blur-2xl animate-pulse delay-1000" />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative group/thumb rounded-2xl overflow-hidden transition-all duration-500 ${
                    activeImage === index 
                      ? 'ring-4 ring-offset-2 ring-blue-500 scale-105' 
                      : 'ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-300'
                  }`}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200" />
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${
                    activeImage === index 
                      ? 'from-blue-500/20 to-purple-500/20' 
                      : 'from-transparent to-transparent group-hover/thumb:from-gray-900/10'
                  } transition-all duration-300`} />
                </button>
              ))}
            </div>

            {/* Quick Features */}
            <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {features.slice(0, 6).map((feat, index) => (
                  <div 
                    key={index}
                    className="group/feature p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-purple-50 border border-gray-100 hover:border-blue-200 transition-all duration-500 transform hover:scale-105"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600">
                        {feat.icon}
                      </div>
                      <div className="font-bold text-gray-900">{feat.title}</div>
                    </div>
                    <div className="text-sm text-gray-600">{feat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Brand & Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    {product.brand}
                  </div>
                  <div className="text-xs text-gray-500">Premium Series</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  <span className="font-bold text-gray-900">4.8</span>
                  <span className="text-sm text-gray-600">(2.4k reviews)</span>
                </div>
                <button className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:border-blue-300 transition-all duration-300">
                  <Share2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
              <span className="block text-2xl lg:text-3xl font-normal text-gray-600 mt-2">
                {product.description}
              </span>
            </h1>

            {/* Price Section */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 font-bold rounded-full">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>or ${(product.price / 12).toFixed(2)}/month for 12 months at 0% APR</span>
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Select Color</h3>
                <span className="text-sm text-gray-600">Selected: {selectedColor}</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`group/color relative p-4 rounded-2xl transition-all duration-500 ${
                      selectedColor === color
                        ? 'bg-gradient-to-br from-blue-50 to-purple-50 ring-4 ring-offset-2 ring-blue-500'
                        : 'bg-white/80 hover:bg-white border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full shadow-lg ring-2 ring-offset-2 ring-white transition-transform duration-300 group-hover/color:scale-110"
                        style={{ backgroundColor: getColorCode(color) }}
                      />
                      <div className="text-left">
                        <div className={`font-semibold ${
                          selectedColor === color ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                          {color}
                        </div>
                        <div className="text-xs text-gray-500">Premium finish</div>
                      </div>
                    </div>
                    
                    {selectedColor === color && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Select Storage</h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {["128GB", "256GB", "512GB", "1TB"].map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`group/storage relative p-4 rounded-2xl transition-all duration-500 ${
                      selectedStorage === storage
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105'
                        : 'bg-white/80 hover:bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-xl font-bold mb-1 ${
                        selectedStorage === storage ? 'text-white' : 'text-gray-900'
                      }`}>
                        {storage}
                      </div>
                      <div className={`text-xs ${
                        selectedStorage === storage ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {storage === "1TB" ? "Recommended" : "Popular"}
                      </div>
                    </div>
                    
                    {selectedStorage === storage && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-1 border border-gray-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-700" />
                  </button>
                  <span className="w-12 text-center text-2xl font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-600">
                  <div className="font-semibold">Only 12 left in stock</div>
                  <div>Order soon!</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`relative group/cart p-4 rounded-2xl font-bold text-lg transition-all duration-500 ${
                    isInCart
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : isAddingToCart
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    {isAddingToCart ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : isInCart ? (
                      <>
                        <Check className="w-6 h-6" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </div>
                  
                  {/* Ripple Effect */}
                  {isAddingToCart && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-30" />
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="group/buy p-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-gray-900 to-black text-white hover:shadow-2xl hover:scale-105 transition-all duration-500"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span>Buy Now</span>
                    <ArrowRight className="w-6 h-6 transform group-hover/buy:translate-x-2 transition-transform" />
                  </div>
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex-1 p-4 rounded-2xl border transition-all duration-300 ${
                    isLiked
                      ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-600'
                      : 'bg-white/80 border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{isLiked ? 'Saved' : 'Add to Wishlist'}</span>
                  </div>
                </button>
                
                <button className="p-4 rounded-2xl bg-white/80 border border-gray-200 hover:bg-white hover:border-blue-300 transition-all duration-300">
                  <Eye className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl p-6 border border-blue-100/50">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/80 backdrop-blur-sm">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Free Shipping</div>
                    <div className="text-sm text-gray-600">Free 1-day delivery</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/80 backdrop-blur-sm">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-green-100 to-green-200">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">2-Year Warranty</div>
                    <div className="text-sm text-gray-600">Extended coverage</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/80 backdrop-blur-sm">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-purple-100 to-purple-200">
                    <RefreshCw className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">30-Day Returns</div>
                    <div className="text-sm text-gray-600">Easy returns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Technical Specifications</h2>
            <button
              onClick={() => setShowFullSpecs(!showFullSpecs)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold hover:shadow-md transition-all duration-300"
            >
              {showFullSpecs ? 'Show Less' : 'Show All'}
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0">
              {specs.slice(0, showFullSpecs ? specs.length : 5).map((spec, index) => (
                <div 
                  key={index}
                  className="group/spec p-6 border-r border-b border-gray-100/50 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100">
                      <div className="text-blue-600">{spec.icon}</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      {spec.label}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Animation */}
        <div className="fixed bottom-8 right-8 z-30">
          <button className="group/float p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-ping">
              {cartItems.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Color helper function
const getColorCode = (name) => {
  const map = {
    Black: "#000000",
    White: "#FFFFFF",
    Gray: "#9CA3AF",
    Silver: "#C0C0C0",
    Gold: "#FFD700",
    "Rose Gold": "#B76E79",
    Blue: "#3B82F6",
    Green: "#10B981",
    Violet: "#8B5CF6",
    Yellow: "#F59E0B",
    "Natural Titanium": "#71717A",
    "White Titanium": "#F3F4F6",
    "Black Titanium": "#1F2937",
    "Blue Titanium": "#60A5FA",
    "Phantom Black": "#111827",
    "Phantom White": "#F9FAFB",
    "Phantom Silver": "#D1D5DB",
    Obsidian: "#1F2937",
    Porcelain: "#F3F4F6",
    Bay: "#3B82F6",
    Hazel: "#D97706",
  };
  return map[name] || "#6B7280";
};

export default ProductDetail;
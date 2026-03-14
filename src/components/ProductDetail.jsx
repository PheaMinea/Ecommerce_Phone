import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { 
  ShoppingCart, 
  Heart, 
  ChevronLeft,
  Star,
  Shield,
  Truck,
  Battery,
  Camera,
  Cpu,
  Package,
  Check,
  ArrowRight,
  Plus,
  Minus
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, cartItems } = useShop();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  // Auto scroll to top when product changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id]); // This will run every time the product ID changes

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || "");
      setSelectedStorage(product.specs?.storage || "128GB");
      
      const inCart = cartItems.some(item => item.id === product.id);
      setIsInCart(inCart);
    }
  }, [product, cartItems]);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    await addToCart({
      ...product,
      selectedColor,
      selectedStorage,
      quantity,
    });

    setIsInCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate('/cart'), 500);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-700 mb-3">Product Not Found</div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black"
          >
            <ChevronLeft className="w-4 h-4 inline mr-1" />
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-1">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <div className="bg-gray-50 rounded-lg border border-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain p-8"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Rating */}
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-blue-600">
                {product.brand}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="ml-1 text-gray-500 text-sm">({product.reviewCount})</span>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div>
              <div className="text-3xl font-bold text-gray-900">
                ${product.price}
              </div>
              {product.originalPrice && (
                <div className="text-gray-500 line-through">
                  ${product.originalPrice}
                </div>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <div className="text-sm font-medium text-gray-900 mb-2">
                Color: <span className="text-gray-600">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color
                        ? 'border-blue-500'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: getColorCode(color) }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div>
              <div className="text-sm font-medium text-gray-900 mb-2">
                Storage
              </div>
              <div className="flex flex-wrap gap-2">
                {["128GB", "256GB", "512GB", "1TB"].map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedStorage === storage
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <div className="text-sm font-medium text-gray-900 mb-2">
                Quantity
              </div>
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-full py-3 rounded-md font-medium ${
                  isInCart
                    ? 'bg-green-500 text-white'
                    : isAddingToCart
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isAddingToCart ? (
                  'Adding...'
                ) : isInCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </span>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 rounded-md font-medium bg-gray-900 text-white hover:bg-black"
              >
                <span className="flex items-center justify-center gap-2">
                  Buy Now
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-full py-3 rounded-md font-medium border border-gray-300 hover:border-gray-400"
              >
                <span className="flex items-center justify-center gap-2">
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  {isLiked ? 'Saved' : 'Add to Wishlist'}
                </span>
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-sm font-medium">Free Shipping</div>
                    <div className="text-xs text-gray-500">1-2 days</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-sm font-medium">2-Year Warranty</div>
                    <div className="text-xs text-gray-500">Full coverage</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Battery className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-sm font-medium">Battery</div>
                    <div className="text-xs text-gray-500">{product.specs?.battery}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="text-sm font-medium">Camera</div>
                    <div className="text-xs text-gray-500">{product.specs?.camera?.split('+')[0]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <div className="space-y-4">
              {product.specs && Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-700">{key}</span>
                  <span className="text-gray-900 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getColorCode = (name) => {
  const map = {
    Black: "#000000",
    White: "#FFFFFF",
    Gray: "#9CA3AF",
    Blue: "#3B82F6",
    Green: "#10B981",
    "Natural Titanium": "#71717A",
    "Blue Titanium": "#60A5FA",
    "Phantom Black": "#111827",
    "Phantom White": "#F9FAFB",
    Obsidian: "#1F2937",
    Porcelain: "#F3F4F6",
  };
  return map[name] || "#6B7280";
};

export default ProductDetail;
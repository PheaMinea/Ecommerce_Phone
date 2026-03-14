import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Battery,
  Camera,
  Cpu,
  ChevronRight
} from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useShop();
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const inCart = cartItems.some(item => item.id === product.id);
    setIsInCart(inCart);
  }, [cartItems, product.id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsInCart(true);
    setTimeout(() => setIsInCart(false), 1500);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        {/* Image Section */}
        <div className="relative h-56 bg-gray-50">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 space-y-1">
            {discount && (
              <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -{discount}%
              </div>
            )}
            {product.category === 'flagship' && (
              <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                PREMIUM
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              className={`w-4 h-4 ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>

          {/* Product Image */}
          <div className="w-full h-full flex items-center justify-center p-6">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Brand Tag */}
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
              {product.brand}
            </span>
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-700">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-1">
          {product.description}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-3 mb-4">
          {product.specs?.processor && (
            <div className="flex items-center gap-1 text-gray-600">
              <Cpu className="w-3 h-3" />
              <span className="text-xs">{product.specs.processor.split(' ')[0]}</span>
            </div>
          )}
          {product.specs?.battery && (
            <div className="flex items-center gap-1 text-gray-600">
              <Battery className="w-3 h-3" />
              <span className="text-xs">{product.specs.battery}</span>
            </div>
          )}
          {product.specs?.camera && (
            <div className="flex items-center gap-1 text-gray-600">
              <Camera className="w-3 h-3" />
              <span className="text-xs">{product.specs.camera.split('+')[0]}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xl font-bold text-gray-900">
              ${product.price}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </div>
            )}
          </div>
          
          {/* Storage */}
          {product.specs?.storage && (
            <div className="text-sm font-medium text-gray-700">
              {product.specs.storage}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2 ${
            isInCart
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-900 text-white hover:bg-black'
          }`}
        >
          {isInCart ? (
            <>
              <div className="w-4 h-4 flex items-center justify-center">
                ✓
              </div>
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>

        {/* View Details Link */}
        <Link
          to={`/product/${product.id}`}
          className="mt-3 block text-center text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
// src/components/Cart.jsx
import React from "react";
import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Shield, CreditCard } from "lucide-react";

const Cart = ({ isPage = false }) => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } =
    useShop();

  const shippingCost = cartTotal > 500 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shippingCost + tax;

  // 🛍️ Empty Cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-blue-400" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">0</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart feels light</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md text-center">
          Add items from our premium collection to get started
        </p>
        <Link
          to="/products"
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-100 transition-all duration-300"
        >
          <span>Explore Products</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-600">{cartItems.length} items</span>
          <span className="text-gray-300">•</span>
          <span className="text-blue-600 font-medium">${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cart Actions */}
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  {cartItems.length} items in cart
                </span>
              </div>
            </div>
            <button
              onClick={clearCart}
              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="font-medium">Clear All</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors group"
              >
                {/* Image */}
                <div className="relative w-28 h-28 flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{item.discount || 10}%
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 ml-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">{item.brand}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-bold text-xl">
                          ${item.price}
                        </span>
                        <span className="text-gray-400 line-through text-sm">
                          ${(item.price * 1.2).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-gray-500 text-sm">
                        ${item.price} each
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        Save ${(item.price * item.quantity * 0.2).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-600 font-medium" : "font-medium"}>
                    {shippingCost === 0 ? "FREE" : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-semibold">Total</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">${grandTotal.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">Including all taxes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span className="text-sm">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-sm">SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            {!isPage && (
              <Link
                to="/products"
                className="block w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all text-center"
              >
                Continue Shopping
              </Link>
            )}

            {/* Promo Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Free Shipping!</h4>
                  <p className="text-sm text-gray-600">Add ${(500 - cartTotal).toFixed(2)} more to qualify</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((cartTotal / 500) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
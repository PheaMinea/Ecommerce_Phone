// src/pages/CartPage.jsx
import React from 'react';
import Cart from '../components/Cart';

const CartPage = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Cart isPage={true} />
        
        {/* Checkout Process Info */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Checkout Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2">
                1
              </div>
              <div className="font-semibold">Cart</div>
              <div className="text-sm text-gray-500">Review Items</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                2
              </div>
              <div className="font-semibold">Shipping</div>
              <div className="text-sm text-gray-500">Address & Method</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                3
              </div>
              <div className="font-semibold">Payment</div>
              <div className="text-sm text-gray-500">Secure Payment</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                4
              </div>
              <div className="font-semibold">Confirmation</div>
              <div className="text-sm text-gray-500">Order Summary</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
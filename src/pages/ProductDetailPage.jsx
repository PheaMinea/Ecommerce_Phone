// src/pages/ProductDetailPage.jsx
import React from 'react';
import ProductDetail from '../components/ProductDetail';

const ProductDetailPage = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <ProductDetail />
        
        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would typically map through related products */}
            <div className="text-center p-4">
              <p className="text-gray-500">Related products would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
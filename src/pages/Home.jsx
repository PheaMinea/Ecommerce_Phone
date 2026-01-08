// src/pages/Home.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import ServiceSection from '../components/ServiceSection';
import FeaturedProducts from '../pages/FeaturedProducts';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section>
        <HeroSection />
      </section>

      {/* Service Section */}
      <section className="py-16 bg-gray-50">
        <ServiceSection />
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <FeaturedProducts />
      </section>

      {/* Why Choose PhoneHub */}
      <section className=" bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brands Available */}
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">100+</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Brands Available</h3>
              <p className="text-gray-600">Wide selection from all major manufacturers</p>
            </div>

            {/* Fast Delivery */}
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">24h</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Express shipping available nationwide</p>
            </div>

            {/* Happy Customers */}
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1M+</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Happy Customers</h3>
              <p className="text-gray-600">Join our community of satisfied users</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

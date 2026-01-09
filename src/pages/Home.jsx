// src/pages/Home.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import ServiceSection from '../components/ServiceSection';
import FeaturedProducts from '../pages/FeaturedProducts';
import BannerPromosion from '../components/BannerPromosion';

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

      <section>
          <BannerPromosion/>
      </section>
    </div>
  );
};

export default Home;

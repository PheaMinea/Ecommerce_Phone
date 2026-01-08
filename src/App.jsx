// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Services from "./pages/Services";

function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/services" element={<Services />} />

              {/* 404 Page */}
              <Route
                path="*"
                element={
                  <div className="text-center py-20 text-gray-600">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-lg mb-6">Page not found</p>
                    <a
                      href="/"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      Go to Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;

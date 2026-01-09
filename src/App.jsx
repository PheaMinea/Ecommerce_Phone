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
import Deals from "./components/Deals";
import About from "./components/About";
import Contact from "./components/Contact";

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
              <Route path="/deals" element={<Deals/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />

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

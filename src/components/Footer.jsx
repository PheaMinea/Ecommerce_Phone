// src/components/Footer.jsx
import React from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaCreditCard,
  FaShieldAlt,
  FaHeadset 
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <FaPhoneAlt className="text-2xl text-primary" />
              <span className="text-2xl font-bold">PhoneHub</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted destination for premium smartphones and accessories. 
              We provide the latest technology with exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition">Products</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition">Services</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-primary mr-3" />
                <span className="text-gray-400">123 Tech Street, Silicon Valley, CA</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-primary mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary mr-3" />
                <span className="text-gray-400">support@phonehub.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new products and special offers!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
              />
              <button className="bg-primary px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2">
              <FaCreditCard className="text-green-400 text-2xl" />
              <div>
                <div className="font-semibold">Secure Payment</div>
                <div className="text-sm text-gray-400">100% Secure</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaShieldAlt className="text-blue-400 text-2xl" />
              <div>
                <div className="font-semibold">Warranty</div>
                <div className="text-sm text-gray-400">2-Year Guarantee</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeadset className="text-purple-400 text-2xl" />
              <div>
                <div className="font-semibold">Support</div>
                <div className="text-sm text-gray-400">24/7 Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} PhoneHub. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
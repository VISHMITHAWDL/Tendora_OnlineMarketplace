// components/Footer.jsx
import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
  Users,
  Award,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <footer className="bg-[#171717] text-[#EDEDED]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#DA0037] mb-4">Tendora</h3>
              <p className="text-sm leading-relaxed text-gray-300 mb-4">
                Discover the latest fashion trends and timeless styles. Your destination 
                for premium clothing, accessories, and lifestyle products with worldwide delivery.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#DA0037] flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#DA0037] flex-shrink-0" />
                <span className="text-sm">hello@tendora.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-[#DA0037] flex-shrink-0" />
                <span className="text-sm">Fashion District, NYC</span>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Collections</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/women" className="hover:text-[#DA0037] transition-colors">Women's Fashion</Link></li>
              <li><Link to="/men" className="hover:text-[#DA0037] transition-colors">Men's Style</Link></li>
              <li><Link to="/kids" className="hover:text-[#DA0037] transition-colors">Kids & Baby</Link></li>
              <li><Link to="/accessories" className="hover:text-[#DA0037] transition-colors">Accessories</Link></li>
              <li><Link to="/shoes" className="hover:text-[#DA0037] transition-colors">Footwear</Link></li>
              <li><Link to="/bags" className="hover:text-[#DA0037] transition-colors">Bags & Luggage</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-[#DA0037] transition-colors">New Arrivals</Link></li>
              <li><Link to="/sale" className="hover:text-[#DA0037] transition-colors">Sale Items</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="hover:text-[#DA0037] transition-colors">Contact Us</Link></li>
              <li><a href="/help" className="hover:text-[#DA0037] transition-colors">Help Center</a></li>
              <li><a href="/size-guide" className="hover:text-[#DA0037] transition-colors">Size Guide</a></li>
              <li><a href="/care-guide" className="hover:text-[#DA0037] transition-colors">Care Instructions</a></li>
              <li><a href="/shipping" className="hover:text-[#DA0037] transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-[#DA0037] transition-colors">Returns & Exchanges</a></li>
              <li><a href="/track" className="hover:text-[#DA0037] transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">About Tendora</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[#DA0037] transition-colors">Our Story</Link></li>
              <li><a href="/sustainability" className="hover:text-[#DA0037] transition-colors">Sustainability</a></li>
              <li><a href="/careers" className="hover:text-[#DA0037] transition-colors">Careers</a></li>
              <li><a href="/press" className="hover:text-[#DA0037] transition-colors">Press</a></li>
              <li><a href="/affiliate" className="hover:text-[#DA0037] transition-colors">Become a Partner</a></li>
              <li><a href="/privacy" className="hover:text-[#DA0037] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[#DA0037] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Fashion Benefits Banner */}
        <div className="mt-12 pt-8 border-t border-[#444444]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Truck size={24} className="text-[#DA0037] flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-sm">Free Shipping</h5>
                <p className="text-xs text-gray-400">On orders over $75</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw size={24} className="text-[#DA0037] flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-sm">Easy Returns</h5>
                <p className="text-xs text-gray-400">60-day return policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Award size={24} className="text-[#DA0037] flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-sm">Premium Quality</h5>
                <p className="text-xs text-gray-400">Curated fashion brands</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users size={24} className="text-[#DA0037] flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-sm">Style Experts</h5>
                <p className="text-xs text-gray-400">Personal styling advice</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-[#444444]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-white">Stay In Style</h4>
              <p className="text-sm text-gray-300">Get the latest fashion trends, exclusive deals, and style inspiration!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-0 md:w-96">
              <input
                type="email"
                placeholder="Enter your email for style updates"
                className="flex-1 px-4 py-2 rounded-md bg-[#2a2a2a] border border-[#444444] text-white placeholder-gray-400 focus:outline-none focus:border-[#DA0037] text-sm"
              />
              <button className="px-6 py-2 bg-[#DA0037] text-white rounded-md hover:bg-[#b8002e] transition-colors text-sm font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#444444] bg-[#0f0f0f]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Tendora Fashion. All rights reserved. | Crafted with <Heart size={14} className="inline mx-1 text-[#DA0037]" /> for fashion lovers worldwide.
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Follow our style:</span>
              <div className="flex space-x-3">
                <a href="https://facebook.com/tendora" className="text-gray-400 hover:text-[#DA0037] transition-colors" aria-label="Follow us on Facebook">
                  <Facebook size={18} />
                </a>
                <a href="https://instagram.com/tendora" className="text-gray-400 hover:text-[#DA0037] transition-colors" aria-label="Follow us on Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://twitter.com/tendora" className="text-gray-400 hover:text-[#DA0037] transition-colors" aria-label="Follow us on Twitter">
                  <Twitter size={18} />
                </a>
                <a href="https://youtube.com/tendora" className="text-gray-400 hover:text-[#DA0037] transition-colors" aria-label="Watch our fashion videos">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Secure payments:</span>
              <div className="flex space-x-2">
                <CreditCard size={16} className="text-gray-400" />
                <span className="text-xs text-gray-400">Visa, Mastercard, PayPal, Apple Pay, Google Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
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
  RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <footer className="bg-[#171717] text-[#EDEDED]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#DA0037] mb-4">Tendora</h3>
              <p className="text-sm leading-relaxed text-gray-300 mb-4">
                Your trusted online marketplace offering premium products with exceptional 
                customer service, secure shopping, and fast worldwide delivery since 2020.
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
                <span className="text-sm">support@tendora.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-[#DA0037] flex-shrink-0" />
                <span className="text-sm">123 Commerce St, Business District, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/contact" className="hover:text-[#DA0037] transition-colors">Contact Us</a></li>
              <li><a href="/help" className="hover:text-[#DA0037] transition-colors">Help Center</a></li>
              <li><a href="/faq" className="hover:text-[#DA0037] transition-colors">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-[#DA0037] transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-[#DA0037] transition-colors">Returns & Exchanges</a></li>
              <li><a href="/track" className="hover:text-[#DA0037] transition-colors">Track Your Order</a></li>
              <li><a href="/size-guide" className="hover:text-[#DA0037] transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/electronics" className="hover:text-[#DA0037] transition-colors">Electronics</Link></li>
              <li><Link to="/fashion" className="hover:text-[#DA0037] transition-colors">Fashion</Link></li>
              <li><Link to="/home-garden" className="hover:text-[#DA0037] transition-colors">Home & Garden</Link></li>
              <li><Link to="/sports" className="hover:text-[#DA0037] transition-colors">Sports & Outdoors</Link></li>
              <li><Link to="/beauty" className="hover:text-[#DA0037] transition-colors">Beauty & Health</Link></li>
              <li><Link to="/books" className="hover:text-[#DA0037] transition-colors">Books & Media</Link></li>
              <li><Link to="/deals" className="hover:text-[#DA0037] transition-colors">Special Deals</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[#DA0037] transition-colors">About Us</Link></li>
              <li><a href="/careers" className="hover:text-[#DA0037] transition-colors">Careers</a></li>
              <li><a href="/press" className="hover:text-[#DA0037] transition-colors">Press & Media</a></li>
              <li><a href="/affiliate" className="hover:text-[#DA0037] transition-colors">Affiliate Program</a></li>
              <li><a href="/privacy" className="hover:text-[#DA0037] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[#DA0037] transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="hover:text-[#DA0037] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Features Banner */}
        <div className="mt-12 pt-8 border-t border-[#444444]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Truck size={24} className="text-[#DA0037] flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-sm">Free Shipping</h5>
                <p className="text-xs text-gray-400">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw size={24} className="text-[#DA0037] flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-sm">Easy Returns</h5>
                <p className="text-xs text-gray-400">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield size={24} className="text-[#DA0037] flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-sm">Secure Payment</h5>
                <p className="text-xs text-gray-400">SSL encrypted checkout</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={24} className="text-[#DA0037] flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-sm">24/7 Support</h5>
                <p className="text-xs text-gray-400">Always here to help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-[#444444]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-white">Stay Updated</h4>
              <p className="text-sm text-gray-300">Subscribe to get special offers, free giveaways, and deals!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-0 md:w-96">
              <input
                type="email"
                placeholder="Enter your email"
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
              © {new Date().getFullYear()} Tendora. All rights reserved. | Made with ❤️ for great shopping experiences.
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              <div className="flex space-x-3">
                <a href="https://facebook.com" className="text-gray-400 hover:text-[#DA0037] transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-[#DA0037] transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="https://instagram.com" className="text-gray-400 hover:text-[#DA0037] transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://youtube.com" className="text-gray-400 hover:text-[#DA0037] transition-colors">
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">We accept:</span>
              <div className="flex space-x-2">
                <CreditCard size={16} className="text-gray-400" />
                <span className="text-xs text-gray-400">Visa, MC, PayPal, Apple Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
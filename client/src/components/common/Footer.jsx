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
    <footer className="bg-[#171717] text-[#EDEDED] w-full">
      {/* Main Footer Content - Full Width */}
      <div className="w-full px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#DA0037] mb-3 tracking-tight">Tendora</h3>
              <p className="text-sm text-gray-300 mb-6 max-w-md leading-relaxed">Your destination for modern fashion, secure shopping, and worldwide delivery.</p>
              <div className="flex flex-col gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-3 hover:text-gray-200 transition-colors duration-300 group">
                  <Phone size={16} className="text-[#DA0037] group-hover:scale-110 transition-transform duration-300" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 hover:text-gray-200 transition-colors duration-300 group">
                  <Mail size={16} className="text-[#DA0037] group-hover:scale-110 transition-transform duration-300" />
                  <span>hello@tendora.com</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="text-lg font-semibold mb-5 text-white tracking-wide">Quick Links</h4>
              <div className="flex flex-col gap-x-8 gap-y-3">
                <Link to="/about" className="hover:text-[#DA0037] text-sm transition-colors duration-300 hover:translate-x-1 transform inline-block"
                  >About</Link>
                <Link to="/contact" className="hover:text-[#DA0037] text-sm transition-colors duration-300 hover:translate-x-1 transform inline-block">Contact</Link>
                <Link to="/women" className="hover:text-[#DA0037] text-sm transition-colors duration-300 hover:translate-x-1 transform inline-block">Women</Link>
                <Link to="/men" className="hover:text-[#DA0037] text-sm transition-colors duration-300 hover:translate-x-1 transform inline-block">Men</Link>
                <Link to="/sale" className="hover:text-[#DA0037] text-sm transition-colors duration-300 hover:translate-x-1 transform inline-block">Sale</Link>
              </div>
            </div>

            <div className="flex-1">
              <h4 className="text-lg font-semibold mb-5 text-white tracking-wide">Customer Service</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Truck size={16} className="text-[#DA0037]" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <RotateCcw size={16} className="text-[#DA0037]" />
                  <span>30-day free returns</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Shield size={16} className="text-[#DA0037]" />
                  <span>Secure payments</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Newsletter Signup - Full Width */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-t border-[#444444] pt-10 mt-10">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white tracking-wide">Stay Updated</h4>
              <p className="text-sm text-gray-300 leading-relaxed">Get exclusive deals and style inspiration!</p>
            </div>
            <form className="flex gap-3 w-full max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md bg-[#2a2a2a] border border-[#444444] text-white placeholder-gray-400 focus:outline-none focus:border-[#DA0037] focus:ring-1 focus:ring-[#DA0037] text-sm transition-all duration-300"
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-[#DA0037] text-white rounded-md hover:bg-[#b8002e] transition-all duration-300 text-sm font-medium whitespace-nowrap shadow-lg hover:shadow-xl hover:shadow-[#DA0037]/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Full Width */}
      <div className="border-t border-[#444444] bg-[#0f0f0f] w-full">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Tendora. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a 
                href="https://facebook.com/tendora" 
                className="text-gray-400 hover:text-[#DA0037] transition-all duration-300 hover:scale-110 transform" 
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com/tendora" 
                className="text-gray-400 hover:text-[#DA0037] transition-all duration-300 hover:scale-110 transform" 
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://twitter.com/tendora" 
                className="text-gray-400 hover:text-[#DA0037] transition-all duration-300 hover:scale-110 transform" 
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://youtube.com/tendora" 
                className="text-gray-400 hover:text-[#DA0037] transition-all duration-300 hover:scale-110 transform" 
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-[#333333] flex flex-wrap justify-center gap-x-8 gap-y-3">
            <a href="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="/shipping" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Shipping Info</a>
            <a href="/returns" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Returns & Exchanges</a>
            <a href="/faq" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from "react";
import { ArrowRight, ShoppingBag, Star, Sparkles } from "lucide-react";
import Heroimg from "../../assets/Home_Assests/Heroimg.png";

const Herosection = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${Heroimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
      className="relative flex flex-col items-center justify-center text-center text-[#EDEDED] px-4 overflow-hidden"
    >

      {/* Content */}
      <div className="absolute bottom-[20%] left-[5%] max-w-2xl text-left space-y-6 z-10">
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-3 bg-[#444444]/70 backdrop-blur-sm rounded-full border border-[#EDEDED]/20 text-sm font-medium animate-pulse">
          <Sparkles className="w-4 h-4 mr-2 text-[#DA0037]" />
          New Collection Available
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-poppins leading-tight">
            <span className="inline-block text-[#EDEDED] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 0.1s forwards' }}>W</span>
            <span className="inline-block text-[#EDEDED] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 0.2s forwards' }}>e</span>
            <span className="inline-block text-[#EDEDED] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 0.3s forwards' }}>l</span>
            <span className="inline-block text-[#EDEDED] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 0.4s forwards' }}>c</span>
            <span className="inline-block text-[#EDEDED] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 0.5s forwards' }}>o</span>
            <span className="inline-block text-[#EDEDED] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 0.6s forwards' }}>m</span>
            <span className="inline-block text-[#EDEDED] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 0.7s forwards' }}>e</span>
            <span className="inline-block mx-2 opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 0.8s forwards' }}></span>
            <span className="inline-block text-[#EDEDED] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 0.9s forwards' }}>t</span>
            <span className="inline-block text-[#EDEDED] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 1.0s forwards' }}>o</span>
            <br />
            <span className="inline-block text-[#DA0037] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 1.1s forwards' }}>T</span>
            <span className="inline-block text-[#DA0037] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 1.2s forwards' }}>e</span>
            <span className="inline-block text-[#DA0037] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 1.3s forwards' }}>n</span>
            <span className="inline-block text-[#DA0037] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 1.4s forwards' }}>d</span>
            <span className="inline-block text-[#DA0037] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 1.5s forwards' }}>o</span>
            <span className="inline-block text-[#DA0037] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 1.6s forwards' }}>r</span>
            <span className="inline-block text-[#DA0037] opacity-0" style={{ animation: 'fadeInUp 0.5s ease-out 1.7s forwards' }}>a</span>
          </h1>

          {/* Subheading */}
          <div className="space-y-3 opacity-0" style={{ animation: 'fadeInUp 0.8s ease-out 2.0s forwards' }}>
            <p className="text-xl md:text-2xl font-bold font-urbanist text-[#EDEDED]">
              Where Style Meets Excellence
            </p>
            <p className="text-base md:text-lg font-urbanist text-[#EDEDED]/80 leading-relaxed">
              Discover premium fashion, exclusive collections, and unbeatable deals — all in one place.
            </p>
          </div>
        </div>

        {/* Features */}
        {/* <div className="flex flex-wrap gap-4 text-sm md:text-base opacity-0" style={{ animation: 'fadeInUp 0.8s ease-out 2.5s forwards' }}>
          <div className="flex items-center space-x-2 bg-[#444444]/60 px-4 py-2 rounded-full border border-[#EDEDED]/30 hover:bg-[#444444] transition-all duration-300">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">Premium Quality</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#444444]/60 px-4 py-2 rounded-full border border-[#EDEDED]/30 hover:bg-[#444444] transition-all duration-300">
            <ShoppingBag className="w-4 h-4 text-green-400" />
            <span className="font-semibold">Fast Delivery</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#444444]/60 px-4 py-2 rounded-full border border-[#EDEDED]/30 hover:bg-[#444444] transition-all duration-300">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="font-semibold">Exclusive Deals</span>
          </div>
        </div> */}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0" style={{ animation: 'fadeInUp 0.8s ease-out 3.0s forwards' }}>
          <button className="group relative px-8 py-3 bg-[#DA0037] rounded-full font-bold text-white text-base shadow-xl hover:bg-[#b1002c] hover:scale-105 transition-all duration-300 min-w-[180px]">
            <span className="flex items-center justify-center space-x-2">
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-[#EDEDED]/40 text-[#EDEDED] rounded-full font-bold text-base hover:bg-[#444444] hover:scale-105 transition-all duration-300 min-w-[180px]">
            Explore Collections
          </button>
        </div>
      </div>

      {/* Keyframe animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Herosection;

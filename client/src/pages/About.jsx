import React from "react";
import HappyCustomer from "../assets/About_Assests/Happycustomers.jpg";


const About = () => {
  return (
    <div className="bg-[#171717] text-[#EDEDED] min-h-screen flex flex-col items-center justify-center">
      {/* Modern Hero Section with Image */}
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 py-16 px-6">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Tendora Marketplace</h1>
          <p className="text-lg text-[#EDEDED]/80 mb-6">
            Tendora is a modern, secure, and user-focused online marketplace. We connect buyers and sellers with a seamless experience, prioritizing trust, speed, and simplicity.
          </p>
          <ul className="space-y-2 mb-8">
            <li className="text-base text-[#EDEDED]/70">• Secure payments & verified sellers</li>
            <li className="text-base text-[#EDEDED]/70">• Fast, reliable platform</li>
            <li className="text-base text-[#EDEDED]/70">• Customer-first support</li>
          </ul>
          <div className="flex gap-4">
            <a href="/signup" className="bg-[#DA0037] hover:bg-[#b8002c] transition px-6 py-3 rounded-lg font-medium">Get Started</a>
            <a href="/contact" className="border border-[#444444] hover:border-[#DA0037] hover:text-[#DA0037] transition px-6 py-3 rounded-lg font-medium">Contact Us</a>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <img src={HappyCustomer} alt="Happy Customers" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#DA0037]/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
      {/* Simple Stats Section */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-6">
        <div className="text-center p-6 rounded-xl bg-[#181818] border border-[#444444]">
          <div className="text-2xl font-bold text-[#DA0037] mb-2">12K+</div>
          <div className="text-xs uppercase text-[#EDEDED]/60">Active Users</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-[#181818] border border-[#444444]">
          <div className="text-2xl font-bold text-[#DA0037] mb-2">480+</div>
          <div className="text-xs uppercase text-[#EDEDED]/60">Vendors</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-[#181818] border border-[#444444]">
          <div className="text-2xl font-bold text-[#DA0037] mb-2">250K+</div>
          <div className="text-xs uppercase text-[#EDEDED]/60">Orders</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-[#181818] border border-[#444444]">
          <div className="text-2xl font-bold text-[#DA0037] mb-2">4.9/5</div>
          <div className="text-xs uppercase text-[#EDEDED]/60">Satisfaction</div>
        </div>
      </div>
    </div>
  );
};

export default About;

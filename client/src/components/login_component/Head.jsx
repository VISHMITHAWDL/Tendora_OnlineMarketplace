import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

const LoginHeader = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    // Navigate back to home page
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  }

  const handleSignUpClick = () => {
    navigate('/register');
  }

  return (
    <header className="bg-[#171717] text-[#EDEDED] px-6 py-4 shadow-md border-b border-[#444444]">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Back Button */}
        <button 
          onClick={handleBackClick}
          className="flex items-center space-x-2 text-[#EDEDED] hover:text-[#DA0037] transition duration-300 group"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Logo - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold tracking-wide">
          <span className="text-[#DA0037]">Ten</span>dora
        </div>

        {/* Login and Sign Up Buttons */}
        <div className="flex space-x-2 items-end">
          <button className="bg-[#DA0037] text-[#EDEDED] px-6 py-2 rounded-md font-semibold text-lg hover:bg-[#9b0028] transition duration-300"
            onClick={handleLoginClick}>
            Log In
          </button>
          <button className="bg-transparent border-2 border-[#DA0037] text-[#DA0037] px-6 py-2 rounded-md font-semibold text-lg hover:bg-[#DA0037] hover:text-[#EDEDED] transition duration-300"
            onClick={handleSignUpClick}>
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;

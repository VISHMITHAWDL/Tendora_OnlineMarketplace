import React, { useState } from 'react';
import Imageman from "../../assets/Home_Assests/man.jpg";
import Imagewomen from "../../assets/Home_Assests/woma.jpg";
import Imagekid from "../../assets/Home_Assests/kid.jpg";
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const naviagte = useNavigate();

  const handleCardClick = (link) => {
    naviagte(link);
  };
  const categories = [
    {
      id: 1,
      title: "Men's Fashion",
      subtitle: "Latest Trends",
      image: Imageman,
      link: "/menfashion",
      description: "Discover the latest in men's fashion with our curated collection of premium clothing and accessories."
    },
    {
      id: 2,
      title: "Women's Fashion",
      subtitle: "Elegant Style",
      image: Imagewomen,
      link: "/womenfashion",
      description: "Explore our sophisticated women's collection featuring timeless pieces and contemporary designs."
    },
    {
      id: 3,
      title: "Kids Fashion",
      subtitle: "Fun & Comfort",
      image: Imagekid,
      link: "/kidssection",
      description: "Comfortable and stylish options for your little ones with playful designs and quality materials."
    }
  ];

  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const handleKeyDown = (e, cardId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setHoveredCard(hoveredCard === cardId ? null : cardId);
    }
    if (e.key === 'Escape') {
      setHoveredCard(null);
    }
  };

  return (
    <div className="bg-[#171717] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#EDEDED] mb-4">
            Shop by Categories
          </h2>
          <p className="text-lg text-[#EDEDED]/70 max-w-2xl mx-auto">
            Discover our curated collections for everyone in your family
          </p>
        </div>

        {/* Categories Container */}
        <div className="flex flex-wrap justify-center items-start gap-6 relative">
          {categories.map((category) => {
            const isHovered = hoveredCard === category.id;
            
            return (
              <div
                key={category.id}
                className={`
                  relative bg-[#181818] border border-[#444444] rounded-2xl overflow-hidden
                  cursor-pointer transition-all duration-500 ease-out
                  focus:outline-none focus:ring-2 focus:ring-[#DA0037] focus:ring-offset-2 focus:ring-offset-[#171717]
                  ${isHovered 
                    ? 'w-96 z-20 border-[#DA0037] shadow-2xl shadow-[#DA0037]/20' 
                    : 'w-72 z-10 hover:border-[#555555]'
                  }
                  h-96
                `}
                onMouseEnter={() => handleCardHover(category.id)}
                onMouseLeave={handleCardLeave}
                onKeyDown={(e) => handleKeyDown(e, category.id)}
                tabIndex={0}
                role="button"
                aria-expanded={isHovered}
                aria-label={`${category.title} category card`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className={`
                      w-full h-full object-cover object-center transition-transform duration-500 ease-out
                      ${isHovered ? 'scale-110' : 'scale-100'}
                    `}
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className={`
                      absolute inset-0 transition-all duration-500 ease-out
                      ${isHovered 
                        ? 'bg-gradient-to-r from-[#171717]/90 via-[#DA0037]/40 to-transparent' 
                        : 'bg-gradient-to-t from-[#171717]/90 via-[#171717]/20 to-transparent'
                      }
                    `}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  {/* Always visible content */}
                  <div className={`transition-all duration-300 ${isHovered ? 'mb-4' : ''}`}>
                    <p className="text-sm text-[#EDEDED]/60 mb-1 uppercase tracking-wider">
                      {category.subtitle}
                    </p>
                    <h3 className={`
                      text-xl font-bold text-[#EDEDED] mb-2 transition-all duration-300 ease-in-out
                      ${isHovered ? 'text-white transform scale-105' : ''}
                    `}>
                      {category.title}
                    </h3>
                  </div>

                  {/* Expanded content - only visible on hover */}
                  <div 
                    className={`
                      overflow-hidden transition-all duration-500 ease-out
                      ${isHovered 
                        ? 'max-h-40 opacity-100 transform translate-y-0' 
                        : 'max-h-0 opacity-0 transform translate-y-4'
                      }
                    `}
                  >
                    <p className="text-[#EDEDED]/80 text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <a
                      href={category.link}
                      className="inline-flex items-center gap-2 
                               bg-[#DA0037] hover:bg-[#b8002c] 
                               text-white font-medium px-6 py-3 rounded-lg
                               transition-colors duration-200 ease-in-out
                               shadow-lg hover:shadow-xl group"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(category.link);
                      }}
                    >
                      Shop Now
                      <svg 
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Hover indicator */}
                <div 
                  className={`
                    absolute top-4 right-4 w-3 h-3 rounded-full transition-all duration-300
                    ${isHovered ? 'bg-[#DA0037] scale-100' : 'bg-transparent scale-0'}
                  `}
                />
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="text-center mt-12">
        </div>
      </div>
    </div>
  );
};

export default Categories;
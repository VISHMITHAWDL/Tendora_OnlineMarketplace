// components/ResponsiveProductCarousel.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

// Example product data
const exampleProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: ['https://via.placeholder.com/300?text=Headphones'],
    rating: 4.5,
    description: 'Over-ear, noise-cancelling, Bluetooth 5.0.'
  },
   {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: ['https://via.placeholder.com/300?text=Headphones'],
    rating: 4.5,
    description: 'Over-ear, noise-cancelling, Bluetooth 5.0.'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 149.99,
    image: ['https://via.placeholder.com/300?text=Smart+Watch'],
    rating: 4.2,
    description: 'Heart-rate monitor, GPS, 7-day battery life.'
  },
  {
    id: 3,
    name: 'Portable Speaker',
    price: 59.99,
    image: ['https://via.placeholder.com/300?text=Speaker'],
    rating: 4.7,
    description: 'Waterproof, 360° sound, 10-hour playtime.'
  },
  {
    id: 4,
    name: 'Fitness Tracker',
    price: 39.99,
    image: ['https://via.placeholder.com/300?text=Tracker'],
    rating: 4.1,
    description: 'Step counter, sleep monitor, calorie tracker.'
  },
  {
    id: 5,
    name: 'Gaming Mouse',
    price: 49.99,
    image: ['https://via.placeholder.com/300?text=Gaming+Mouse'],
    rating: 4.8,
    description: 'RGB lighting, 16000 DPI, programmable buttons.'
  },
  {
    id: 6,
    name: '4K Action Camera',
    price: 119.99,
    image: ['https://via.placeholder.com/300?text=Action+Camera'],
    rating: 4.3,
    description: 'Waterproof up to 30m, image stabilization.'
  },
];

const ResponsiveProductCarousel = ({ products = exampleProducts, itemsPerView = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  const goToSlide  = index => setCurrentIndex(Math.min(index, maxIndex));

  return (
    <div className="relative w-full mx-auto p-4 sm:p-6 bg-[#171717]">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[#EDEDED]">
        Featured Products
      </h2>

      {/* Desktop & Tablet Carousel */}
      <div className="hidden md:block relative overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(products.length * 100) / itemsPerView}%`
          }}
        >
          {products.map((product, idx) => (
            <div
              key={product.id ?? idx}
              className="px-2"
              style={{ width: `${100 / products.length}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full hover:opacity-80 transition-opacity shadow-lg"
          style={{ backgroundColor: '#DA0037' }}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full hover:opacity-80 transition-opacity shadow-lg"
          style={{ backgroundColor: '#DA0037' }}
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>

      {/* Mobile & Tablet Scrollable List */}
      <div className="md:hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4" style={{ width: 'max-content' }}>
            {products.map((product, idx) => (
              <div
                key={product.id ?? idx}
                className="flex-shrink-0 w-72 sm:w-80"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Indicator - Only show on desktop */}
      <div className="hidden md:flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-opacity duration-200 ${
              idx === currentIndex ? 'opacity-100' : 'opacity-50'
            }`}
            style={{ backgroundColor: '#DA0037' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ResponsiveProductCarousel;
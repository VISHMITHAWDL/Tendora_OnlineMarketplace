import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

// ProductCard Component
const ProductCard = ({ product }) => {


  return (
    <div className="group bg-gray-100 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-2xl h-[360px] sm:h-[380px] md:h-[400px]">
      <div className="relative h-[200px] sm:h-[210px] md:h-[230px] overflow-hidden">
        <Link to={`/productdetail/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-3 right-3 px-4 py-1.5 rounded-md text-white text-sm font-bold bg-gradient-to-r from-red-600 to-red-500 shadow-md">
          {product.discount}% OFF
        </div>
      </div>
      
      <div className="p-5 flex flex-col h-[160px] sm:h-[170px] bg-white">
        <h3 className="font-bold text-lg mb-2 truncate text-gray-800">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < product.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-red-600">
              ${product.price}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {product.brand}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
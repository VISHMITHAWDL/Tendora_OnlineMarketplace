import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

// ProductCard Component
const ProductCard = ({ product }) => {


  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl" style={{ backgroundColor: '#EDEDED' }}>
      <div className="relative">
        <Link to={`/productdetail/${product.id}`}><img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        /></Link>
        <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-white text-xs font-bold" style={{ backgroundColor: '#DA0037' }}>
          {product.discount}% OFF
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate" style={{ color: '#171717' }}>
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="ml-2 text-sm" style={{ color: '#444444' }}>
            ({product.reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold" style={{ color: '#DA0037' }}>
              ${product.price}
            </span>
            <span className="text-sm" style={{ color: '#444444' }}>
              {product.brand}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
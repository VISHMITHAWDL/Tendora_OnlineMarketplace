
import React, { useMemo, useState } from 'react';
import Data from '../../data/content.json';
import Filter from '../Productfilter/Filter';
import Pricefilter from '../Productfilter/Pricefilter';
import Colorfilter from '../Productfilter/Colorfilter';
import ProductCard from './Productcard';

const Productlist = ({ categorytype }) => {
  const Categorydata = Data?.categories;
  const allProducts = Data?.products || [];

  // Find the current category object
  const categorycontent = useMemo(() => {
    return Categorydata?.find((category) => category.code === categorytype);
  }, [categorytype]);

  // Get all type ids for this category
  const typeOptions = categorycontent?.types || [];
  const colorOptions = (categorycontent?.meta_data?.colors || []).map((color) => ({
    name: color,
    value: color.toLowerCase(),
    hex: undefined // Optionally map to hex if you want
  }));

  // State for filters
  const [selectedTypes, setSelectedTypes] = useState([]); // array of type ids
  const [selectedColors, setSelectedColors] = useState([]); // array of color names
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Get min/max price for this category
  const categoryTypeIds = typeOptions.map(t => t.id || t.type_id);
  const categoryProducts = allProducts.filter(
    (p) => p.category_id === categorycontent?.id
  );
  const minPrice = categoryProducts.length ? Math.min(...categoryProducts.map(p => p.price)) : 0;
  const maxPrice = categoryProducts.length ? Math.max(...categoryProducts.map(p => p.price)) : 1000;

  // Handlers
  const handleTypeChange = (types) => {
    // types is array of type objects with id/type_id
    setSelectedTypes(types.map(t => t.id || t.type_id));
  };
  const handleColorChange = (colors) => {
    setSelectedColors(colors.map(c => c.name));
  };
  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      // Type filter
      if (selectedTypes.length && !selectedTypes.includes(product.type_id)) return false;
      // Color filter
      if (selectedColors.length && !product.color.some(c => selectedColors.includes(c))) return false;
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      return true;
    });
  }, [categoryProducts, selectedTypes, selectedColors, priceRange]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters */}
      <div className="w-full md:w-1/4 space-y-6">
        <Filter types={typeOptions} onChange={handleTypeChange} />
        <Pricefilter min={minPrice} max={maxPrice} defaultValue={[minPrice, maxPrice]} onChange={handlePriceChange} />
        <Colorfilter colors={colorOptions} onChange={handleColorChange} />
      </div>
      {/* Product List */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                name: product.title,
                image: product.thumbnail,
                originalPrice: (product.price / (1 - product.discount / 100)).toFixed(2),
                reviews: Math.floor(Math.random() * 100) + 1 // Fake reviews for demo
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default Productlist;
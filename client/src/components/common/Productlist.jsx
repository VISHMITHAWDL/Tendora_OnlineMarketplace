
import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from './SearchBar';
import Pricefilter from '../Productfilter/Pricefilter';

import ProductCard from './Productcard';
import { getAllProducts } from '../../api/Porducts/fetchProduct';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/features/Common';
import CategoryTypeFilter from '../Productfilter/Filter';

const Productlist = ({ categorytype }) => {
  
  const Categorydata = useSelector((state) => state?.categoryState?.categories);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]); // Default price range
  const [searchResults, setSearchResults] = useState(null); // null means no search, array means filtered

  const category = useMemo(() => {
    return Categorydata?.find((category) => category.code === categorytype);
  }, [Categorydata, categorytype]);

  const categoryTypes = useMemo(() => {
    return category?.categoryTypes || [];
  }, [category]);

  // Get the minimum and maximum price from products
  const priceMinMax = useMemo(() => {
    if (!products || !products.length) return { min: 0, max: 2000 };
    const prices = products.map(product => product.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [products]);

  useEffect(() => {
    dispatch(setLoading(true));
    getAllProducts(category?.id)
      .then((data) => {
        setProducts(data || []);
        console.log("Fetched products:", data);
        // Reset price range when products change
        if (data && data.length) {
          const prices = data.map(product => product.price);
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          setPriceRange([min, max]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [category?.id, dispatch]);

  // Handle price range change
  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  // Filter products by selectedTypeId, price range, and search
  const filteredProducts = useMemo(() => {
    let baseProducts = Array.isArray(products) ? products : [];
    if (Array.isArray(searchResults)) {
      baseProducts = searchResults;
    }
    return baseProducts.filter(product => {
      // Filter by category type if selected
      const matchesType = !selectedTypeId || product.categoryTypeId === selectedTypeId;
      // Filter by price range
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesType && matchesPrice;
    });
  }, [products, selectedTypeId, priceRange, searchResults]);


  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      {/* Filters */}
      <div className="w-full md:w-1/4 space-y-6">
        <SearchBar
          products={products}
          onSearchResults={setSearchResults}
          onClearSearch={() => setSearchResults(null)}
          placeholder="Search products by name, brand, or description..."
          maxResults={5}
        />
        <Pricefilter 
          min={priceMinMax.min}
          max={priceMinMax.max}
          defaultValue={priceRange}
          onChange={handlePriceRangeChange}
          currency="$"
        />
        <CategoryTypeFilter
          categoryTypes={categoryTypes}
          selectedTypeId={selectedTypeId}
          onSelectType={setSelectedTypeId}
        />
      </div>
      {/* Product List */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(filteredProducts) && filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                name: product.name,
                image: product.thumbnail,
                price: product.price,
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

import React, { use, useEffect, useMemo, useState } from 'react';
import Data from '../../data/content.json';
import Filter from '../Productfilter/Filter';
import Pricefilter from '../Productfilter/Pricefilter';
import Colorfilter from '../Productfilter/Colorfilter';
import ProductCard from './Productcard';
import { getAllProducts } from '../../api/fetchProduct';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/features/Common';


const Productlist = ({ categorytype }) => {
  
  const Categorydata = useSelector((state) => state?.categoryState?.categories);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);


  const category = useMemo(() => {
    return Categorydata?.find((category) => category.code === categorytype);
  }, [Categorydata, categorytype]);

    useEffect(() => {
      dispatch(setLoading(true));
      getAllProducts(category?.id).then((data) => {
        setProducts(data);
        console.log("Fetched products:", data);
      }).catch((error) => {
        console.error("Error fetching products:", error);
      }).finally(() => {
        dispatch(setLoading(false));
      });
    }, [category?.id, dispatch]);


  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      {/* Filters */}
      <div className="w-full md:w-1/4 space-y-6">
        <Filter />
        <Pricefilter  />
        <Colorfilter />
      </div>
      {/* Product List */}
      <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(products) && products.length ? (
          products.map((product) => (
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
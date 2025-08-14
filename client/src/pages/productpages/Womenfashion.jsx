import React, { useEffect } from 'react'
import Productlist from '../../components/common/Productlist'
import { useDispatch, useSelector } from 'react-redux'
import { loadCategories } from '../../store/features/Category'
import fetchCategories from '../../api/Porducts/fetchCategories'

const Womenfashion = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categoryState?.categories);

  useEffect(() => {
    // Load categories if they're not already loaded
    if (!categories || categories.length === 0) {
      fetchCategories()
        .then((data) => {
          dispatch(loadCategories(data));
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [dispatch, categories]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Styled Header */}
      <div className="bg-[#171717] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r bg-clip-text  text-center mb-4 text-white">
            Women Fashion
          </h1>
          <div className="flex justify-center">
            <div className="w-32 h-1 bg-red-500 rounded-full"></div>
          </div>
          <p className="text-gray-300 text-center mt-4 text-lg">
            Discover the latest trends in women's fashion
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-2 py-4">
        <Productlist categorytype="WOMEN" />
      </div>
    </div>
  )
}

export default Womenfashion
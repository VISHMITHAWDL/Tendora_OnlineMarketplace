import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './Productcard';
import { getAllProducts } from '../../api/Porducts/fetchProduct';
import { setLoading } from '../../store/features/Common';

const ResponsiveProductCarousel = ({ categorytype, title = "New Arrivals" }) => {
  const Categorydata = useSelector((state) => state?.categoryState?.categories);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Find the category based on the code
  const category = useMemo(() => {
    return Categorydata?.find((category) => category.code === categorytype);
  }, [Categorydata, categorytype]);

  // Filter new arrival products
  const newArrivalProducts = useMemo(() => {
    return products.filter(product => product.newArrival === true);
  }, [products]);

  // Fetch products when category changes
  useEffect(() => {
    if (!category?.id) return;

    dispatch(setLoading(true));
    getAllProducts(category.id)
      .then((data) => {
        setProducts(data || []);
        console.log("Fetched products:", data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [category?.id, dispatch]);

  // Calculate how many items to show per view based on screen size
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4; // lg screens
      if (window.innerWidth >= 768) return 3;  // md screens
      if (window.innerWidth >= 640) return 2;  // sm screens
      return 1; // mobile
    }
    return 4; // default for SSR
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      // Reset to first slide if current index is out of bounds
      const maxIndex = Math.max(0, newArrivalProducts.length - getItemsPerView());
      if (currentIndex > maxIndex) {
        setCurrentIndex(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, newArrivalProducts.length]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, newArrivalProducts.length - itemsPerView) : prevIndex - 1
    );
  };

  const goToNext = () => {
    const maxIndex = Math.max(0, newArrivalProducts.length - itemsPerView);
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  // Don't render if no new arrival products
  if (!newArrivalProducts.length) {
    return null;
  }

  return (
    <div className="w-full bg-[#171717] py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#EDEDED]">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex >= Math.max(0, newArrivalProducts.length - itemsPerView)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(newArrivalProducts.length / itemsPerView) * 100}%`
          }}
        >
          {newArrivalProducts.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 px-2"
              style={{ width: `${80 / newArrivalProducts.length}%` }}
            >
              <ProductCard
                product={{
                  ...product,
                  image: product.thumbnail,
                  // Fake reviews for demo
                            discount: Math.floor(Math.random() * 11) // Random discount 0-10
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: Math.ceil(newArrivalProducts.length / itemsPerView) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              currentIndex === index ? 'bg-red-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ResponsiveProductCarousel;
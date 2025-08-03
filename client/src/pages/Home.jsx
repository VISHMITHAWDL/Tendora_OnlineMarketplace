import React, { useEffect } from "react";
import Herosection from "../components/Home_component/Herosection";
import ResponsiveProductCarousel from "../components/common/Productcarousel";
import Categories from "../components/Home_component/Catogeries";
import fetchCategories from "../api/Porducts/fetchCategories";
import { useDispatch } from "react-redux";
import { loadCategories } from "../store/features/Category";
import { setLoading } from "../store/features/Common";

const Home = () => {

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(setLoading(true));
    fetchCategories()
    .then(data => {
      dispatch(loadCategories(data));
      console.log("Fetched categories:", data);
    })
    .catch(error => {
      console.error("Error fetching categories:", error);
    }).finally(() => {
      dispatch(setLoading(false));
    });

  }, [dispatch]);



  return (
    <div className="bg-[#171717] text-[#EDEDED] min-h-screen">
      <Herosection />      
      
      {/* New Arrivals Carousels for different categories */}
      <div className="container mx-auto px-4 space-y-12">
        {/* Women's New Arrivals */}
        <ResponsiveProductCarousel 
          categorytype="WOMEN" 
          title="Women's New Arrivals" 
        />
        
        {/* Men's New Arrivals */}
        <ResponsiveProductCarousel 
          categorytype="MEN" 
          title="Men's New Arrivals" 
        />
        
        {/* Kids New Arrivals */}
        <ResponsiveProductCarousel 
          categorytype="KIDS" 
          title="Kids New Arrivals" 
        />
      </div>
      
      <Categories />
    </div>
  );
};

export default Home;

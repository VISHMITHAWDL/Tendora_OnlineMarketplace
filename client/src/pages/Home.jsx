import React, { useEffect } from "react";
import Herosection from "../components/Home_component/Herosection";
import Productcarousel from "../components/common/Productcarousel";
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
    <div>
      <Herosection />      
      <Productcarousel />
      <Categories />
    </div>
  );
};

export default Home;

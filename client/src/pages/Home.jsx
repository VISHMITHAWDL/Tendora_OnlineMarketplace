import React from "react";
import Herosection from "../components/Home_component/Herosection";
import Productcarousel from "../components/common/Productcarousel";
import Categories from "../components/Home_component/Catogeries";

const Home = () => {
  return (
    <div>
      <Herosection />      
      <Productcarousel />
      <Categories />
    </div>
  );
};

export default Home;

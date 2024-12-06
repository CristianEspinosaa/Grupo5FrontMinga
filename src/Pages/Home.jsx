import React from "react";
import { Link } from "react-router-dom";
import Hero from "../Components/Hero.jsx";
import Carousel from "../Components/Carousel.jsx";


const Home = () => {
  return (
    <>
          <Hero></Hero>

          <div className="container mx-auto px-12 py-8">
               <Carousel></Carousel>
          </div>
     
    </>
  );
};

export default Home;




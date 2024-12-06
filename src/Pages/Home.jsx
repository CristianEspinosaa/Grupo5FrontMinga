import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <>
          <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-center mb-4">
               Welcome to Minga!
          </h1>
          <p className="text-gray-600 text-center mb-8">
               Discover manga, manhua and manhwa, track your progress, have fun,
               read manga.
          </p>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
               Login
          </Link>
          <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
               Sign Up
          </Link>
          </div>
     
    </>
  );
};

export default Home;

import React from "react";
import bgHero from "../assets/bg_hero.png";

const Hero = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      {/* Contenido del Hero */}
      <div className="text-center text-white px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
        Your favorite comic book store ✨
        </h1>

        {/* Subtítulo */}
        <p className="text-lg sm:text-xl lg:text-2xl mb-6">
          Explore our catalog to live the adventue of your life
        </p>

        {/* Botón */}
        <button className="bg-gradient-to-r from-[#4436cb] to-[#5d51f2] text-white py-2 px-12 rounded-md text-lg  hover:opacity-90 transition">
          Let's go
        </button>
      </div>
    </div>
  );
};

export default Hero;

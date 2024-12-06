import React from "react";
import bgHero from "../assets/bg_hero.png";

const Hero = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      {/* Contenido del Hero */}
      <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-md sm:max-w-lg lg:max-w-2xl">
        {/* Título */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-snug sm:leading-normal">
          Your favorite comic book store ✨
        </h1>

        {/* Subtítulo */}
        <p className="text-sm sm:text-base lg:text-lg mb-6 leading-relaxed sm:leading-normal">
          Explore our catalog to live the adventure of your life
        </p>

        {/* Botón */}
        <button className="bg-gradient-to-r from-[#4436cb] to-[#5d51f2] text-white py-2 px-6 sm:px-10 lg:px-12 rounded-md text-sm sm:text-base lg:text-lg hover:opacity-90 transition">
          Let's go
        </button>
      </div>
    </div>
  );
};

export default Hero;

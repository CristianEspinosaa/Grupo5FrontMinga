import React from 'react';
import hero1 from '../../assets/hero1.png';
import hero2 from '../../assets/hero2.png';
import './Slider.css';

export default function Slider() {
  return (
    <section className="seccionHero-2 hidden lg:flex justify-center mt-10 mb-2">
      <div className="flex w-[100rem] h-[29vh] bg-gradient-to-r from-[#4338CA] to-[#5E52F3] rounded-md">
        <div className="flex justify-evenly w-1/2 relative">
          <img
            className="img1-seccionHero-2 absolute h-[115%] w-[300px] left-[70px] bottom-0"
            src={hero1}
            alt="Hero 1"
          />
          <img
            className="img2-seccionHero-2 absolute h-[103%] w-[190px] right-[100px] bottom-[20px]"
            src={hero2}
            alt="Hero 2"
          />
        </div>

        <div className="text-seccionHero-2 flex flex-col justify-center text-white w-[570px] p-11 gap-2">
          <h3 className="m-0 w-[235px] text-[27px] font-medium leading-[95.19%]">
            My hero Academia
          </h3>
          <p className="text-gray-400 text-base m-0">Manga</p>
          <p className="text-white text-sm w-[380px] m-0">
            In a world in which most of the population is born with a Gift, a different extraordinary ability in each one, it didn't take long for both villains and heroes to appear ready to stop them.
          </p>
        </div>
      </div>
    </section>
  );
}
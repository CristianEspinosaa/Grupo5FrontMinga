import React, { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const slidesData = [
     {
          id: 1,
          personaje:
               "https://s3-alpha-sig.figma.com/img/7010/55a8/ad631c0e34af539abb86743a2cafbda1?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=afDZIigVOIi1aDh1F0QlVYrD6c4pTsh6FfRxrFC1piGH8-lhP735YXt1yVtRNzQbC0QOVhgHWU3ovNPPUw60Clig35Nq~PpiU~ymZIz1J4tKLK5aIARWyZLctzxbuqZTADjEzSzbK1G2vmVwipAHj7ElpDiaPVX6T~yjFfhIvies19wi5ll55JPUM-1yvDS2nn70DrBcL2LUPAKPmaUEy0-AdZ9Ke41QOi-NEq4~H-ehRqNLBM0EtEKcdkabnMMoHPrgZv~a6-zn6WtVjHVF4kZAcLB3TgDqQZW4-uLL1t5N2PTbgD41GZPujL0kVTdk~OjtzExHpK~szQFxSHXSDA__",
          comic:
               "https://s3-alpha-sig.figma.com/img/0b79/70a5/01731543bd32ac773a1b2fa236c42971?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bd2m7QcJyCsQrumWdBCHWBR9E8UL0JPRsNXdLefFJ4st8MUJf6uagMHjonK3UaZI0e1tnSP7-ig-px94YBA6BGjE6lZV7xMDlWu~XYNa8LZhldFsnyRuSPSLssrlME1aiAKsCYnOGllEBf-Of7pXgTVYB1kVgwnbj5SFsaKyV0d~qJFx22nemEZ2uGNqNN1nMryUSMb42tOl5B7-KxjWKiF~vRZ9iWeUOp8VVao53acwpJuerra7Ul7TD-n4Im02ab2ks8G4s0LN~gCbcBkrB1W55Nr7EslQyChuA-Us9mjDwzoYTVYwCuVXc2lU3mfTB0jm7qmC2bvq9yAYUbux1w__",
          titulo: "Shonen:",
          descripcion:
               "Is the manga that is aimed at adolescent boys. They are series with large amounts of action, in which humorous situations often occur. The camaraderie between members of a collective or a combat team stands out.",
     },
     {
          id: 2,
          personaje:
               "https://static.wikia.nocookie.net/bokunoheroacademia/images/a/a4/Eijiro_MHUR_Icon.png",
          comic:
               "https://media.themoviedb.org/t/p/w220_and_h330_face/9LjBVBcRM0VW2yywXu5p6bqX965.jpg",
          titulo: "Naruto",
          descripcion:
               "A young ninja dreams of becoming the strongest Hokage while dealing with challenges, friendships, and battles.",
     },
     {
          id: 3,
          personaje:
               "https://static.wikia.nocookie.net/bokunoheroacademia/images/f/fd/Tomura_MHUR_Icon.png",
          comic: "https://playmax.xyz/img/c/400/454/1730387486/226902.jpg",
          titulo: "Dragon Ball",
          descripcion:
               "Join Goku on his adventures to find the Dragon Balls, battle strong opponents, and save the universe.",
     },
];

const Carousel = () => {
     const [currentSlide, setCurrentSlide] = useState(0);

     const goToNextSlide = () => {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
     };

     const goToPreviousSlide = () => {
          setCurrentSlide(
               (prevSlide) => (prevSlide - 1 + slidesData.length) % slidesData.length
          );
     };

     // Efecto para cambio automático
     useEffect(() => {
          const interval = setInterval(() => {
               goToNextSlide();
          }, 5000); // Cambia cada 5 segundos

          return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
     }, [currentSlide]);

     return (
          <div className="relative mt-20 bg-gradient-to-r from-[#4436cb] to-[#5d51f2] rounded-md p-6 my-6 shadow-xl h-[280px]">
               <div className="flex items-center justify-center">
                    <button
                         onClick={goToPreviousSlide}
                         className="bg-[#ffffffa6] text-black rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300 flex items-center "
                         aria-label="Previous"
                    >
                         <AiOutlineLeft size={24} />
                    </button>

                    <div className="flex items-center justify-center">

                         {/* Contenido de la diapositiva actual */}
                         <div className="w-full flex items-center justify-between translate-y-[-80px]">
                              <div className="w-full flex  justify-between">
                                   <div className="w-full flex items-end justify-center">
                                        <img
                                             src={slidesData[currentSlide].personaje}
                                             alt={`Personaje ${slidesData[currentSlide].titulo}`}
                                             className="w-72 h-auto"
                                        />
                                   </div>

                                   <div className="w-full flex items-end justify-center">
                                        <img
                                             src={slidesData[currentSlide].comic}
                                             alt={`Cómic ${slidesData[currentSlide].titulo}`}
                                             className="w-48 h-auto"
                                        />
                                   </div>
                              </div>

                              <div className="w-full flex items-end">
                              <div className="text-white px-12">
                                        <h3 className="text-2xl font-bold mb-4">
                                             {slidesData[currentSlide].titulo}
                                        </h3>
                                        <p className="text-sm leading-relaxed">
                                             {slidesData[currentSlide].descripcion}
                                        </p>
                                   </div>
                              </div>
                         </div>

                    </div>

                    {/* Botón siguiente */}
                    <button
                         onClick={goToNextSlide}
                         className="bg-[#ffffffa6] text-black rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center"
                         aria-label="Next"
                    >
                         <AiOutlineRight size={24} />
                    </button>
               </div>
          </div>
     );
};

export default Carousel;

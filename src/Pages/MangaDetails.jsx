import React, { useState } from "react";
import img from "../assets/fondoManga.png";
import reaction1 from "../assets/manitoArriba.png";
import reaction2 from "../assets/manitoAbajo.png";
import reaction3 from "../assets/caraSorprendida.png";
import reaction4 from "../assets/caraEnamorada.png";
import iconComment from "../assets/iconComment1.png";

const MangaDetails = () => {
    const [activeTab, setActiveTab] = useState("manga");

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">

            {/* Imagen como fondo en pantallas lg */}
            <div
                className="absolute inset-0 bg-cover object-top lg:top-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:block hidden rounded-lg"
                style={{ backgroundImage: `url(${img})`, height: "80%", width: "60%" }}
            ></div>

            <div
                className="w-2/5 bg-gray-100 rounded-3xl shadow-lg overflow-hidden flex flex-col relative z-10
                lg:absolute lg:bottom-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:w-[50%]"
            >
                <div className="relative lg:hidden h-1/2 w-full">
                    <img src={img} alt="Manga Cover" className="w-full h-full object-cover" />
                </div>


                {activeTab === "manga" && (
                    <div className="p-4 flex-1 overflow-auto">
                        <h3 className="text-lg font-semibold line-clamp-2 mb-2">
                            Naruto: And That's Why You're Disqualified!! #8
                        </h3>

                        <div className="flex justify-between items-center">
                            <button className="px-4 py-1 bg-[#FFE0DF] text-[#EF8481] rounded-full text-sm hover:bg-[#f37f7b] hover:text-white transition-colors">
                                Shonen
                            </button>
                            <p className="text-md text-gray-500 mb-4">Company Name</p>
                        </div>

                        {/* Reacciones */}
                        <div className="flex justify-evenly items-center border-t border-gray-200 py-4">
                            <button className="flex flex-col items-center justify-center text-yellow-500">
                                <img
                                    src={reaction1}
                                    alt="Like"
                                    className="w-16 h-16 max-w-full max-h-full sm:w-12 sm:h-12"
                                />
                            </button>
                            <button className="flex flex-col items-center justify-center text-red-500">
                                <img
                                    src={reaction2}
                                    alt="Dislike"
                                    className="w-16 h-16 max-w-full max-h-full sm:w-12 sm:h-12"
                                />
                            </button>
                            <button className="flex flex-col items-center justify-center text-yellow-500">
                                <img
                                    src={reaction3}
                                    alt="Surprised"
                                    className="w-16 h-16 max-w-full max-h-full sm:w-12 sm:h-12"
                                />
                            </button>
                            <button className="flex flex-col items-center justify-center text-pink-500">
                                <img
                                    src={reaction4}
                                    alt="Love"
                                    className="w-16 h-16 max-w-full max-h-full sm:w-12 sm:h-12"
                                />
                            </button>
                        </div>

                        {/* Sección de información */}
                        <div className="mt-4 flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                            <div className="text-center border-r-2 w-1/3">
                                <p className="font-semibold">4.5/5</p>
                                <p className="text-gray-500 text-sm">Rating</p>
                            </div>
                            <div className="text-center border-r-2 w-1/3">
                                <p className="font-semibold">265</p>
                                <p className="text-gray-500 text-sm">Chapters</p>
                            </div>
                            <div className="text-center w-1/3">
                                <p className="font-semibold">Eng</p>
                                <p className="text-gray-500 text-sm">Language</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "chapters" && (
                    <div className="p-4 flex-1 overflow-auto">
                        <div className="mb-8 flex items-center justify-center">
                            <h2 className="font-bold text-2xl">Chapters</h2>
                        </div>

                        {[1, 2, 3, 4, 5].map((chapter, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg shadow-sm"
                            >
                                <img src={img} alt={`Chapter ${chapter}`} className="w-12 h-12 rounded-lg" />
                                <div className="mx-3 flex flex-col flex-1">
                                    <h4 className="text-md font-semibold">Chapter #{chapter}</h4>
                                    <div className="flex items-center">
                                        <img src={iconComment} alt="Comment" className="w-6 h-6" />
                                        <p className="text-sm text-gray-500 ml-1">125 Comments</p>
                                    </div>
                                </div>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                                    Read
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Navegación */}
                <div className="flex items-center justify-center">
                    <div className="flex justify-between items-center border-t border-gray-200 shadow-sm rounded-full w-[98%]">
                        <button
                            className={`rounded-full w-1/2 font-medium py-2 ${
                                activeTab === "manga"
                                    ? "bg-gradient-to-r from-[#4338CA] to-[#5E52F3] text-white"
                                    : "hover:bg-gray-200"
                            }`}
                            onClick={() => setActiveTab("manga")}
                        >
                            Manga
                        </button>

                        <button
                            className={`rounded-full w-1/2 font-medium py-2 ${
                                activeTab === "chapters"
                                    ? "bg-gradient-to-r from-[#4338CA] to-[#5E52F3] text-white"
                                    : "hover:bg-gray-200"
                            }`}
                            onClick={() => setActiveTab("chapters")}
                        >
                            Chapters
                        </button>
                    </div>
                </div>

                {activeTab === "manga" && (
                    <p className="p-3 font-light text-sm text-gray-600 whitespace-normal break-words">
                        Naruto Uzumaki es un joven ninja lleno de energía que sueña con convertirse en el Hokage, el líder más fuerte y respetado de su aldea. A lo largo de su viaje, enfrenta desafíos, hace amigos y descubre el verdadero significado del esfuerzo y la perseverancia.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MangaDetails;

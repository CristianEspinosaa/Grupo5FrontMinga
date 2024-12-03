import React from "react";
import img1 from '../assets/Rectangle10.png';
import fondo1 from '../assets/Rectangle606.png';
import location from '../assets/location-marker.png';
import icon1 from '../assets/icon.png';

const EditAuthor = () => {
    return (
        <div className="relative">

            <div>
                <img src={fondo1} alt="fondo" className="hidden lg:block w-full h-2/3 object-cover" />
                <h1 className="hidden absolute inset-0 lg:flex pb-40 items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-semibold">
                    Profile
                </h1>
            </div>

            {/* Contenedor del formulario y la información del usuario */}
            <div className="fixed flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-around rounded-2xl bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] lg:w-[70%] h-[90vh] lg:h-[60vh] bg-white z-10 shadow-lg">

                {/* Información del usuario */}
                <div className="flex flex-col items-center p-6 rounded-lg w-full lg:w-64">
                    <img
                        src={img1}
                        alt="User Profile"
                        className="w-36 h-36 rounded-full mb-4"
                    />
                    <h2 className="text-lg font-semibold">Lucas Ezequiel Silva</h2>
                    <div className="flex items-center text-gray-600 text-sm mt-2">
                        <img
                            src={location}
                            alt="Location Icon"
                            className="w-5 h-5 mr-2"
                        />
                        <span>Caseros, Buenos Aires</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                        <img
                            src={icon1}
                            alt="Calendar Icon"
                            className="w-5 h-5 mr-2"
                        />
                        <span>16/02/2000</span>
                    </div>
                </div>

                {/* Formulario debajo de la información del usuario en pantallas pequeñas */}
                <form className="flex flex-col items-center p-6 rounded-lg w-2/3 lg:w-96 sm:mt-6 lg:mt-0">
                    <input
                        type="text"
                        name="firstName"
                        defaultValue="Lucas Ezequiel"
                        className="w-full mb-4 border-b-2 border-gray-500 focus:outline-none focus:border-green-500"
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        defaultValue="Silva"
                        className="w-full mb-4 border-b-2 border-gray-500 focus:outline-none focus:border-green-500"
                        placeholder="Last Name"
                        required
                    />
                    <input
                        type="text"
                        name="location"
                        defaultValue="Caseros, Buenos Aires"
                        className="w-full mb-4 border-b-2 border-gray-500 focus:outline-none focus:border-green-500"
                        placeholder="Location"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        defaultValue="2022-12-28"
                        className="w-full mb-4 border-b-2 border-gray-500 focus:outline-none focus:border-green-500"
                        required
                    />
                    <input
                        type="url"
                        name="profileImageUrl"
                        className="w-full mb-6 border-b-2 border-gray-500 focus:outline-none focus:border-green-500"
                        placeholder="URL Profile Image"
                    />
                    <button
                        type="submit"
                        className="w-full h-16 p-2 mb-4 font-semibold text-white text-2xl bg-[#34D399] rounded-full hover:bg-[#4de0aa]"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="w-full h-16 p-2 text-[#EE8380] font-semibold text-2xl bg-[#FBDDDC] rounded-full hover:bg-[#ed7a76] hover:text-white"
                    >
                        Delete Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditAuthor;

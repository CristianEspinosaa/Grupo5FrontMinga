import React, { useState } from 'react';
import logo from '../assets/Logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <nav className="flex justify-between items-center px-6 py-4 bg-transparent">
                <button
                    className="text-blue-600 text-3xl focus:outline-none"
                    onClick={toggleMenu}
                >
                    &#9776;
                </button>
                <a href="/" className="text-blue-600 text-3xl">
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                </a>
            </nav>

            {isOpen && (
                <div className="fixed top-0 left-0 w-64 h-full bg-blue-600 z-40">
                    <button
                        className="absolute top-4 left-6 text-white text-3xl"
                        onClick={toggleMenu}
                    >
                        &times;
                    </button>
                    <ul className="flex flex-col items-start mt-20 px-8 text-white space-y-6">
                        <li className="text-lg"><a href="#">Home</a></li>
                        <li className="text-lg"><a href="#">Mangas</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;

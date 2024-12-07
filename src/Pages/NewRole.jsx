import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate
import rectangle8 from '../assets/Rectangle8.png';
import logMinga from '../assets/log_minga.jpg';
import img1 from '../assets/author-1.png';
import img2 from '../assets/author-2.png';
import img3 from '../assets/author-3.png';
import img4 from '../assets/company-1.png';
import img5 from '../assets/company-2.png';
import img6 from '../assets/company-3.png';

const NewRole = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate(); // Crear la instancia de navigate

  const handleSelectRole = (role) => {
    setSelectedRole(role === selectedRole ? null : role);
    if (role === 1) {
      navigate('/pages/editAuthor'); // Redirigir a /pages/editAuthor al seleccionar Autor
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen justify-center">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="max-w-lg p-8 items-center justify-center">
          <h2 className="text-2xl font-roboto text-center mb-2 text-[#4338CA]">Change role to</h2>
          <div className="flex justify-center mb-8">
            <img src={logMinga} alt="logMinga" className="w-48" />
          </div>
          <div className="space-y-4">
            {/* Opción para unirse como Autor */}
            <div
              onClick={() => handleSelectRole(1)}
              className={`flex items-center justify-between border ${
                selectedRole === 1 ? 'border-blue-600' : 'border-gray-300'
              } rounded-md p-3 gap-4 hover:shadow-md cursor-pointer w-full max-w-md`}
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src={img1} alt="Author 1" className="w-9 h-9 rounded-full" />
                  <img src={img2} alt="Author 2" className="w-11 h-11 rounded-full z-10 scale-105" />
                  <img src={img3} alt="Author 3" className="w-9 h-9 rounded-full" />
                </div>
                <div>
                  <span className="text-[#4338CA] font-bold text-lg font-roboto">Join as an Author!</span>
                  <p className="text-sm font-roboto text-[#4338CA]">I'm a reader writing a manga</p>
                </div>
              </div>

              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  selectedRole === 1 ? 'bg-[#4338CA]' : 'bg-white border-gray-300'
                }`}
              >
                {selectedRole === 1 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                )}
              </div>
            </div>

            {/* Opción para unirse como Empresa */}
            <div
              onClick={() => handleSelectRole(2)}
              className={`flex items-center justify-between border ${
                selectedRole === 2 ? 'border-[#4338CA]' : 'border-gray-300'
              } rounded-md p-3 gap-2 hover:shadow-md cursor-pointer`}
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src={img4} alt="Company 1" className="w-9 h-9 rounded-full" />
                  <img src={img5} alt="Company 2" className="w-11 h-11 rounded-full z-10 scale-105" />
                  <img src={img6} alt="Company 3" className="w-9 h-9 rounded-full" />
                </div>
                <div>
                  <span className="text-[#4338CA] font-bold text-lg font-roboto">Join as a Company!</span>
                  <p className="text-sm font-roboto text-[#4338CA]">I'm a company and I want to publish my comics</p>
                </div>
              </div>

              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  selectedRole === 2 ? 'bg-[#4338CA]' : 'bg-white border-gray-300'
                }`}
              >
                {selectedRole === 2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src={rectangle8} alt="Background" className="w-full h-full object-fill" />
        <div className="absolute mt-44 ml-5 font-roboto font-semibold flex flex-col justify-center items-start text-white text-center px-2">
          <p className="text-2xl mb-6 text-start">
            Minga.com is the best place to find manga reviews. We've been super impressed by the quality of applicants.
          </p>
          <span className="font-roboto font-light text-lg"> - Ignacio Borasz</span>
        </div>
      </div>
    </div>
  );
};

export default NewRole;
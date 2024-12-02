import React from 'react';
import rectangle8 from '../assets/Rectangle8.png'

const RoleSelection = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen justify-center">

      
      <div className="w-full lg:w-1/2 flex items-center justify-center ">
        <div className="max-w-md p-8 items-center justify-center">
          <h2 className="text-3xl font-bold text-center mb-8">Change role to</h2>
          <div className="flex justify-center mb-8">
            <span className="text-4xl font-extrabold text-indigo-600">MINGA</span>
          </div>
          <div className="space-y-4">
           
            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:border-indigo-600">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40" 
                  alt="Author"
                  className="rounded-full mr-4"
                />
                <span className="text-lg font-medium">Join as an Author!</span>
              </div>
              <span className="text-sm text-gray-500">I'm a reader writing a manga</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-indigo-600 bg-indigo-100 rounded-lg">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40" 
                  alt="Company"
                  className="rounded-full mr-4"
                />
                <span className="text-lg font-medium text-indigo-600">Join as a Company!</span>
              </div>
              <span className="text-sm text-indigo-600">I'm a company and I want to publish my comics</span>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src={rectangle8}
          alt="Background"
          className="w-full h-full object-fill"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-10">
          <h1 className="text-4xl font-extrabold mb-4">Minga.com</h1>
          <p className="text-lg mb-6">
            Minga.com is the best place to find manga reviews. We've been super impressed by the quality of applicants.
          </p>
          <span className="italic text-sm">Ignacio Borasz</span>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;

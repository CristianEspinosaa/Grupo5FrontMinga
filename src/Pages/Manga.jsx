import React from 'react';

const Manga = () => {
  return (
    <div className="max-w-xs bg-gray-100 rounded-3xl shadow-lg overflow-hidden">
      {/* Imagen del Manga */}
      <div className="relative">
        <img
          src="https://via.placeholder.com/300x400" // Reemplaza con la URL de tu imagen
          alt="Manga Cover"
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          3-in-1
        </span>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">
          Naruto: And That's Why You're Disqualified!! #8
        </h3>
        <p className="text-sm text-gray-500 mb-4">Company Name</p>
        <span className="inline-block bg-pink-100 text-pink-600 text-xs font-medium px-3 py-1 rounded-full">
          Shōnen
        </span>
      </div>

      {/* Reacciones */}
      <div className="flex justify-evenly items-center border-t border-gray-200 py-4">
        <button className="flex flex-col items-center text-yellow-500">
          <span className="text-xl">👍</span>
        </button>
        <button className="flex flex-col items-center text-red-500">
          <span className="text-xl">👎</span>
        </button>
        <button className="flex flex-col items-center text-yellow-500">
          <span className="text-xl">😲</span>
        </button>
        <button className="flex flex-col items-center text-pink-500">
          <span className="text-xl">😍</span>
        </button>
      </div>

      {/* Información adicional */}
      <div className="grid grid-cols-3 border-t border-gray-200 text-center py-4">
        <div>
          <p className="text-lg font-semibold">4.5/5</p>
          <p className="text-xs text-gray-500">Rating</p>
        </div>
        <div>
          <p className="text-lg font-semibold">265</p>
          <p className="text-xs text-gray-500">Chapters</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Eng</p>
          <p className="text-xs text-gray-500">Language</p>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex justify-between items-center border-t border-gray-200 py-3 px-4">
        <button className="text-blue-500 font-medium">Manga</button>
        <button className="text-gray-400 font-medium">Chapters</button>
      </div>
    </div>
  );
};

export default Manga;

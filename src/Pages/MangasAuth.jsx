import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { readCategories } from "../store/actions/categoriesActions";
import { readMangasByAuthor } from "../store/actions/mangasActions";
import axios from "axios";
import backgroundImage from "../assets/manga-read.jpg";

const MangasAuth = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories); // Categorías desde Redux
  const { mangas } = useSelector((state) => state.mangas); // Mangas desde Redux

  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [authorId, setAuthorId] = useState(null);

  const token = localStorage.getItem("token");

  // Validar el token y obtener el autor
  useEffect(() => {
    const validateTokenAndFetchAuthor = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/validateToken",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const user = response.data.response;
        localStorage.setItem("userId", user._id);

        // Obtener el autor basado en el userId
        const authorResponse = await axios.get(
          `http://localhost:8080/api/authors/byUser/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const author = authorResponse.data.response[0];
        if (author) {
          setAuthorId(author._id);
          
          console.log("Author ID:", author._id); // Log en consola
          console.log("Nombre:", author.name); // Log en consola
        } else {
          console.error("No se encontró un autor para este usuario.");
        }
      } catch (error) {
        console.error("Error validando el token o obteniendo el autor:", error);
      }
    };

    if (token) {
      validateTokenAndFetchAuthor();
    } else {
      console.error("Token no encontrado. Por favor, inicia sesión.");
    }
  }, [token]);

  // Leer categorías al montar el componente
  useEffect(() => {
    dispatch(readCategories());
  }, [dispatch]);

  // Leer mangas por autor
  useEffect(() => {
    if (authorId) {
      dispatch(readMangasByAuthor(authorId, pageNumber, searchTerm, selectedCategory));
    }
  }, [dispatch, authorId, pageNumber, searchTerm, selectedCategory]);

  // Paginación
  const increasePage = useCallback(() => {
    setPageNumber((prevPage) => prevPage + 1);
  }, []);

  const decreasePage = useCallback(() => {
    if (pageNumber > 1) {
      setPageNumber((prevPage) => prevPage - 1);
    }
  }, [pageNumber]);

  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    setPageNumber(1); // Resetear a la página 1 al cambiar de categoría
  }, []);

  const getCategoryStyle = useMemo(() => (categoryId) => {
    const styles = {
      '67493629ebde636fb3873018': {
        active: 'bg-red-100 text-red-600',
        inactive: 'bg-white/80 text-orange-400 hover:bg-red-50',
      },
      '67493629ebde636fb3873019': {
        active: 'bg-pink-100 text-pink-600',
        inactive: 'bg-white/80 text-pink-400 hover:bg-pink-50',
      },
      '67493629ebde636fb387301c': {
        active: 'bg-orange-100 text-orange-600',
        inactive: 'bg-white/80 text-orange-400 hover:bg-orange-50',
      },
      '67493629ebde636fb387301b': {
        active: 'bg-violet-100 text-violet-600',
        inactive: 'bg-white/80 text-violet-400 hover:bg-violet-50',
      },
      '67493629ebde636fb387301a': {
        active: 'bg-green-100 text-green-600',
        inactive: 'bg-white/80 text-green-400 hover:bg-green-50'
      },
      all: {
        active: 'bg-gray-100 text-gray-600',
        inactive: 'bg-white/80 text-gray-400 hover:bg-gray-50',
      },
    };
    return styles[categoryId] || styles.all;
  }, []);

  const getLineColor = (categoryId) => {
    const colors = {
      '67493629ebde636fb3873018': 'bg-red-500',
      '67493629ebde636fb3873019': 'bg-pink-500',
      '67493629ebde636fb387301c': 'bg-orange-500',
      '67493629ebde636fb387301b': 'bg-violet-500',
      '67493629ebde636fb387301a': 'bg-green-500',
      default: 'bg-gray-400',
    };
    return colors[categoryId] || colors.default;
  };

  // Filtrar mangas
  const filteredMangas = useMemo(() => {
    return mangas.filter((manga) => {
      const matchesSearch =
        searchTerm === "" || manga.title.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || manga.category_id._id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [mangas, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="min-h-[60vh] bg-cover relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center 70%",
        }}
      >
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-white px-4">
            <h1 className="text-4xl font-bold mb-8">My Mangas</h1>
            <div className="w-full max-w-xl">
              <div className="bg-white/95 rounded-full shadow-lg p-2">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 text-gray-400" size={24} />
                  <input
                    type="text"
                    placeholder="Find your manga here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-3 px-12 rounded-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${selectedCategory === 'all'
                ? getCategoryStyle('all').active
                : getCategoryStyle('all').inactive
                }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category._id)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${selectedCategory === category._id
                  ? getCategoryStyle(category._id).active
                  : getCategoryStyle(category._id).inactive
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div>
            {/* Manga Grid */}
            {filteredMangas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMangas.map((manga, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white overflow-hidden hover:bg-gray-50 transition-colors w-[280px] sm:w-[360px] h-[120px] sm:h-[144px] mx-auto md:ml-20"
                  >
                    {/* Line Indicator */}
                    <div
                      className={`w-1 h-full self-stretch ${getLineColor(manga.category_id._id)}`}
                    ></div>

                    {/* Manga Details */}
                    <div className="flex flex-col gap-1 p-3 rounded-l-[2rem] w-[180px]">
                      <h3 className="font-normal text-sm sm:text-lg leading-tight line-clamp-1">
                        {manga.title}
                      </h3>
                      <p
                        className={`text-sm ${getCategoryStyle(manga.category_id._id).inactive.split(' ')[1]}`}
                      >
                        {manga.category_id.name}
                      </p>
                      <div className="flex gap-2">
                        <button className="px-4 py-1 bg-violet-100 text-violet-600 rounded-full text-sm hover:bg-violet-200 transition-colors">
                          Edit
                        </button>
                        <button className="px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm hover:bg-red-200 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Manga Cover */}
                    <div className="w-[160px] h-[144px] flex-shrink-0 ml-auto">
                      <img
                        src={manga.cover_photo}
                        alt={manga.title}
                        className="w-full h-full object-cover rounded-l-full rounded-r-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/api/placeholder/200/200'; // Placeholder image
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">No mangas found.</div>
            )}
          </div>
          <div className="flex justify-center items-center gap-4 py-6">
            <div className="flex items-center">
              {pageNumber < 2 ? "" : (
                <button
                  className="bg-[#8883F0] text-white rounded-md py-2 px-4 font-normal shadow-sm border-none hover:bg-[#6560bb] transition-all duration-300 cursor-pointer"
                  onClick={decreasePage}
                >
                  Prev
                </button>
              )}
              <p className="mx-4 text-lg">{pageNumber}</p>
              {filteredMangas.length > 6 && (
                <button
                  className="bg-[#4739D0] text-white rounded-md py-2 px-4 font-normal shadow-sm border-none hover:bg-[#6560bb] transition-all duration-300 cursor-pointer"
                  onClick={increasePage}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangasAuth;
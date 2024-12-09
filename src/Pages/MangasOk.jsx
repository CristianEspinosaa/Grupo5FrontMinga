import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import backgroundImage from '../assets/FondoManga2.jpeg';

const MangasOk = () => {
  const [categories, setCategories] = useState([]);
  const [mangas, setMangas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categories/all');
        const data = await response.json();
        setCategories(data.response || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch mangas
  useEffect(() => {
    if (categories.length === 0) return;

    const fetchMangas = async () => {
      try {
        const categoryParam = selectedCategory === 'all'
          ? categories.map((category) => category._id).join(',')
          : selectedCategory;

        const response = await fetch(
          `http://localhost:8080/api/mangas/all?page=${pageNumber}&search=${searchTerm}&category_id=${categoryParam}&_=${new Date().getTime()}`
        );
        const data = await response.json();
        setMangas(data.response || []);
      } catch (error) {
        console.error('Error fetching mangas:', error);
      }
    };

    fetchMangas();
  }, [pageNumber, searchTerm, selectedCategory, categories]);

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
  }, []);

  // Estilos de categoría
  const getCategoryStyle = useMemo(() => (categoryId) => {
    const styles = {
      '67493629ebde636fb3873018': {
        active: 'bg-red-100 text-red-600',
        inactive: 'bg-white/80 text-red-400 hover:bg-red-50',
      },
      '67493629ebde636fb3873019': {
        active: 'bg-emerald-100 text-emerald-600',
        inactive: 'bg-white/80 text-emerald-400 hover:bg-emerald-50',
      },
      '67493629ebde636fb387301c': {
        active: 'bg-orange-100 text-orange-600',
        inactive: 'bg-white/80 text-orange-400 hover:bg-orange-50',
      },
      '67493629ebde636fb387301b': {
        active: 'bg-violet-100 text-violet-600',
        inactive: 'bg-white/80 text-violet-400 hover:bg-violet-50',
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
      '67493629ebde636fb3873019': 'bg-emerald-500',
      '67493629ebde636fb387301c': 'bg-orange-500',
      '67493629ebde636fb387301b': 'bg-violet-500',
      default: 'bg-gray-400',
    };
    return colors[categoryId] || colors.default;
  };

  const filteredMangas = useMemo(() => {
    return mangas.filter((manga) => {
      const matchesSearch =
        searchTerm === '' || manga.title.toLowerCase().includes(searchTerm.toLowerCase());

      // Verificar si el manga pertenece a la categoría seleccionada
      const matchesCategory =
        selectedCategory === 'all' ||
        manga.category_id._id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [mangas, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="min-h-[60vh] bg-cover relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center 70%',
        }}
      >
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-white px-4">
            <h1 className="text-4xl font-bold mb-8">Mangas</h1>
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
                onClick={() => {
                  setSelectedCategory(category._id);
                  setPageNumber(1);
                }}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${selectedCategory === category._id
                  ? getCategoryStyle(category._id).active
                  : getCategoryStyle(category._id).inactive
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          {/* Manga Grid */}
          {filteredMangas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMangas.map((manga, index) => (
                <div key={index} className="flex items-center bg-white overflow-hidden hover:bg-gray-50 transition-colors w-[280px] sm:w-[360px] h-[120px] sm:h-[144px] mx-auto md:ml-20">
                  {/* Category Indicator Line */}
                  <div className={`w-1 h-full self-stretch ${getLineColor(manga.category_id._id)}`}></div>

                  {/* Left side - Info */}
                  <div className="flex flex-col gap-1 p-3 rounded-l-[2rem] w-[180px]">
                    <h3 className="font-normal text-sm sm:text-lg leading-tight line-clamp-1">
                      {manga.title}
                    </h3>
                    <p className="text-sm text-gray-400">Type</p>
                    <div className="flex gap-2">
                      <button className="px-4 py-1 bg-violet-100 text-violet-600 rounded-full text-sm hover:bg-violet-200 transition-colors">
                        Read
                      </button>
                    </div>
                  </div>

                  {/* Right side - Image */}
                  <div className="w-[160px] h-[144px] flex-shrink-0 ml-auto">
                    <img
                      src={manga.cover_photo}
                      alt={manga.title}
                      className="w-full h-full object-cover rounded-l-full rounded-r-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/api/placeholder/200/200';
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
        <div className="flex justify-between mt-4">
          <button onClick={decreasePage} className="py-2 px-4 bg-blue-500 text-white rounded">Previous</button>
          <button onClick={increasePage} className="py-2 px-4 bg-blue-500 text-white rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MangasOk;
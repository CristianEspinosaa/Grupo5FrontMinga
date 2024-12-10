import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Chapter = () => {
  let navigate = useNavigate();
  let { id, page } = useParams(); // Obtener 'id' y 'page' desde la URL
  let [chapter, setChapter] = useState({});
  let [next, setNext] = useState('');
  let [prev, setPrev] = useState('');
  let [index, setIndex] = useState(parseInt(page) || 0); // Asignar valor por defecto

  const url = 'http://localhost:8080/api/chapters/id/'; // URL base para la API

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    const headers = {
      Authorization: `Bearer ${token}`, // Agregar el token en el encabezado
    };

    // Llamada a la API para obtener el capítulo por ID
    axios
      .get(`${url}${id}`, { headers })  // Concatenar la URL con el 'id' y pasar los headers
      .then((response) => {
        setChapter(response.data.response.chapter);
        setPrev(response.data.response.prev);
        setNext(response.data.response.next);
      })
      .catch((error) => console.log('Error fetching chapter:', error));
  }, [id]); // Dependencia de 'id' para que se ejecute cuando cambie

  const handlePrev = () => {
    setIndex(prevIndex => {
      const newIndex = prevIndex - 1;
      if (newIndex < 0 && chapter.order === 1) {
        // Si estamos en la primera página, navegar al primer capítulo del manga
        navigate(`/manga/${chapter.manga_id}/1`);
        return newIndex;
      } else if (newIndex < 0) {
        // Si llegamos al principio del capítulo, navegar al capítulo previo
        navigate(`/chapters/${prev}/0`);
        window.location.reload(true); // Forzar la recarga de la página
        return newIndex;
      }
      navigate(`/chapters/${id}/${newIndex}`); // Navegar a la página anterior
      return newIndex;
    });
  };

  const handleNext = () => {
    setIndex(prevIndex => {
      const newIndex = prevIndex + 1;
      if (newIndex >= chapter.pages?.length) {
        // Si estamos en la última página, navegar al siguiente capítulo
        navigate(`/chapters/${next}/0`);
        window.location.reload(true);  // Forzar la recarga de la página
        return newIndex;
      }
      navigate(`/chapters/${id}/${newIndex}`); // Navegar a la página siguiente
      return newIndex;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gradient-to-r from-[#4436cb] to-[#5d51f2] text-white h-[6%] w-full flex justify-center items-center py-2">
        <h4>Cap N° {chapter.order} - {chapter.title}</h4>
      </div>

      <div className="h-[70%] w-full flex justify-center items-center py-6">
        <div
          className="relative flex items-center justify-center w-[21%] left-[20%]"
          onClick={handlePrev}
        >
          <img
            src="https://www.svgrepo.com/show/163122/backward-arrow.svg"
            alt="prevarrow"
            className="w-[0.8rem] bg-[#8080808a] p-[0.1rem]"
          />
        </div>

        <img
          className="object-contain h-full w-[40%]"
          src={chapter.pages?.[index]}
          alt="comicimage"
        />

        <div
          className="relative flex items-center justify-center w-[21%] right-[20%]"
          onClick={handleNext}
        >
          <img
            src="https://www.svgrepo.com/show/109221/next.svg"
            alt="nextarrow"
            className="w-[0.8rem] bg-[#8080808a] p-[0.1rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Chapter;
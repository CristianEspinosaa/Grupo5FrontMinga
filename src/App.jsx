import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { setUser } from './store/actions/authActions';
import axios from 'axios';
import StandarLayout from './Layouts/StandarLayout';
import SignRoute from './Components/SignRoute.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import NotFound from './Pages/NotFound.jsx';
import './App.css';

const router = createBrowserRouter([
  {
    element: <StandarLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/register", element: <SignRoute><Register /></SignRoute> },
      { path: "/login", element: <SignRoute><Login /></SignRoute> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const validateToken = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/users/validateToken", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.response; // Retorna el usuario si el token es válido
  } catch (error) {
    console.error("Error validating the token", error);
    return null;
  }
};

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Controla la pantalla de carga

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token).then((user) => {
        if (user) {
          dispatch(setUser({ user, token }));
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  if (isLoading) {
    return <div className="loading-screen">Cargando...</div>; // Puedes personalizar este mensaje
  }

  return <RouterProvider router={router} />;
}

export default App;
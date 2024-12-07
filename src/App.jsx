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
import DashBoard from './Pages/DashBoard.jsx';
import './App.css';
import AdminRoute from "./Components/AdminRoute.jsx";
import MangaPage from './Pages/mag_page_auth.jsx';
import MangasPage from './Pages/mangas_page.jsx';

const router = createBrowserRouter([
  {
    element: <StandarLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/mangas1", element: <MangaPage /> },
      { path: "/mangas2", element: <MangasPage /> },
      { path: "/register", element: <SignRoute><Register /></SignRoute> },
      { path: "/login", element: <SignRoute><Login /></SignRoute> },
      { path: "/dashboard", element: <AdminRoute><DashBoard /></AdminRoute> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const validateToken = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/users/validateToken", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.response;
  } catch (error) {
    console.error("Error validating the token", error);
    return null;
  }
};

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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

  return <RouterProvider router={router} />;
}

export default App;
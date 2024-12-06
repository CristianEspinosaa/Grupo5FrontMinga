import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home.jsx";
/* import NotFound from "./Pages/NotFound.jsx"; */
import StandarLayout from "./Layouts/StandarLayout.jsx";

const router = createBrowserRouter([
  {
    element: <StandarLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },

    ],
  },
  /* { path: "*", element: <NotFound /> },  */
]);

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;

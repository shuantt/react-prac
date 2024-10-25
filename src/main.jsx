import { createRoot } from "react-dom/client";
import App from "./App.jsx"; 
import Homework1 from "./pages/Homework1.jsx"; 
import Homework2 from "./pages/Homework2.jsx"; 
import Login from "./pages/Login.jsx";
import "./assets/css/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/homework1",
    element: <Homework1 />,
  },
  {
    path: "/homework2",
    element: <Homework2 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

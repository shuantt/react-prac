import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx"; 
import Homework from "./pages/Homework.jsx";
import Homework1 from "./pages/Homework1.jsx"; 
import Homework2 from "./pages/Homework2.jsx"; 
import Login from "./pages/Login.jsx";
import MemberProfile from "./pages/Profile.jsx";
import DefaultComponent from "./componenets/DefaultComponent.jsx";
import ErrorPage from "./pages/404.jsx";
import "./assets/css/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultComponent Component={App} />,
  },
  {
    path: "/homework",
    element: <Homework />,
  },
  {
    path: "/homework/1",
    element: <Homework1 />,
  },
  {
    path: "/homework/2",
    element: <Homework2 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <DefaultComponent Component={MemberProfile} />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

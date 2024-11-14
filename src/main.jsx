import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./componenets/Layout.jsx";
import App from "./App.jsx";
import Homework from "./pages/Homework.jsx";
import Homework1 from "./pages/Homework1.jsx";
import Homework2 from "./pages/Homework2.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import VIP from "./pages/VIP.jsx";
import ContextPracttice from "./pages/ContextPractice.jsx";
import DefaultComponent from "./componenets/DefaultComponent.jsx";
import { LanguageProvider } from "./store/languageContext";
import { AuthProvider } from "./store/authContext";
import { ThemeProvider } from "./store/themeContext";
import ErrorPage from "./pages/404.jsx";
import "./assets/css/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 使用 Layout 作為根組件
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
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
        element: <DefaultComponent Component={Login} />,
      },
      {
        path: "/profile",
        element: <DefaultComponent Component={Profile} />,
      },
      {
        path: "/VIP",
        element: <DefaultComponent Component={VIP} />,
      },
      {
        path: "/ContextPractice",
        element: <ContextPracttice />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </LanguageProvider>,
);

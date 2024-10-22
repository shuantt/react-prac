import { createRoot } from "react-dom/client";
// import App from "./App1.jsx"; // hook 練習用
// import App from "./App2.jsx"; // Table v1
// import App from "./App3.jsx"; // Table v2
import App from "./App.jsx"; 
import "./assets/css/index.css";

createRoot(document.getElementById("root")).render(
    <App />
);

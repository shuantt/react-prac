import { Link } from "react-router-dom";
import "../assets/css/index.css";

const ErrorPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/" className=" text-sm text-primary">回首頁</Link>
    </div>
  );
};

export default ErrorPage;

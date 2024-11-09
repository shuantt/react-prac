import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./componenets/Navbar";
import "./assets/css/index.css";

function App(props) {

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  
  const navigate = useNavigate();
  const navigateToPage = useCallback((path) => () => {
    navigate(`${path}`);
  });

  return (
    <>
      <Navbar.Container className="border-b-[1px] border-solid border-gray-500">
        <Navbar.Logo title="ReactPrac" />
        <Navbar.ItemGroup>
          <Navbar.Item text="首頁" href="/" />
          <Navbar.Item text="作業" href="/homework" />
          <Navbar.Item text="元件" href="/" />
          {username ?? (<Navbar.Item text="登入" href="/login" />)}
        </Navbar.ItemGroup>
      </Navbar.Container>

      {/* {!username ? (
        <button
          className="ml-2 rounded bg-primary px-2 py-1 text-sm text-white hover:bg-gray-500 hover:transition-all"
          onClick={navigateToPage("/login")}
        >
          登入
        </button>
      ) : (
        <>
          <button
            className="ml-2 rounded bg-primary px-2 py-1 text-sm text-white hover:bg-gray-500 hover:transition-all"
            onClick={navigateToPage("/profile")}
          >
            會員頁(需權限)
          </button>
          <button
            className="ml-2 rounded bg-primary px-2 py-1 text-sm text-white hover:bg-gray-500 hover:transition-all"
            onClick={logOut}
          >
            登出
          </button>
        </>
      )} */}
    </>
  );
}

export default App;

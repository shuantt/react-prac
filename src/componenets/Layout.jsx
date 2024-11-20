import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../store/authContext";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import Navbar from "./Navbar";
import { IconContext } from "react-icons";

const Layout = ({ children }) => {
  const navigator = useNavigate();
  const token = localStorage.getItem("token");

  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log(isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Navbar.Container className="mx-auto border-b-[1px] border-b-gray-500 p-4 md:px-14">
        {/* 桌面板 */}
        <Navbar.Content className="mx-auto hidden max-w-md items-center justify-center md:flex md:max-w-xl lg:max-w-7xl">
          <Navbar.Logo title="ReactPrac" href="/" />
          <Navbar.ItemGroup className="flex gap-5">
            <Navbar.Item text="練習目錄" href="/homework" />
            {token ? (
              <>
                <Navbar.Item text="一般會員" href="/profile" />
                <Navbar.Item text="VIP會員" href="/VIP" />
                <button
                  className="group relative flex items-center justify-center overflow-hidden rounded border border-black bg-white px-2 py-1 text-black"
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    <MdOutlineLogout className="text-sm group-hover:text-white" />
                    <span className="text-sm group-hover:text-white">登出</span>
                  </span>
                  <span className="absolute inset-0 -translate-x-full transform bg-black transition-transform group-hover:translate-x-0"></span>
                </button>
              </>
            ) : (
              <button
                className="group relative flex items-center justify-center overflow-hidden rounded border border-black bg-white px-2 py-1 text-black"
                onClick={() => {
                  toggleMenu();
                  navigator("/login");
                }}
              >
                <span className="relative z-10 flex items-center gap-1">
                  <MdOutlineAccountCircle className="text-sm group-hover:text-white" />
                  <span className="text-sm group-hover:text-white">登入</span>
                </span>
                <span className="absolute inset-0 -translate-x-full transform bg-black transition-transform group-hover:translate-x-0"></span>
              </button>
            )}
          </Navbar.ItemGroup>
        </Navbar.Content>

        <Navbar.Content className="relative mx-auto flex max-w-md items-center justify-center md:hidden">
          <Navbar.Logo title="ReactPrac" href="/" />
          {/* 手機板 */}
          <div>
            <button
              className="rounded border-[1px] border-solid border-gray-500 p-1 text-gray-500 hover:cursor-pointer hover:border-gray-400 hover:text-gray-400 hover:transition hover:duration-100"
              onClick={toggleMenu}
            >
              <RxHamburgerMenu />
            </button>
          </div>
        </Navbar.Content>
      </Navbar.Container>

      {/* 手機板表單 */}
      <Navbar.ItemGroup
        className={`absolute w-full transform flex-col items-center justify-center gap-2 bg-white p-4 shadow-md transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? "flex scale-100 opacity-100"
            : "hidden scale-95 opacity-0"
        }`}
      >
        <Navbar.Item text="練習目錄" href="/homework" onClick={toggleMenu} />
        {token ? (
          <>
            <Navbar.Item text="一般會員" href="/profile" onClick={toggleMenu} />
            <Navbar.Item text="VIP會員" href="/VIP" onClick={toggleMenu} />
            <button
              className="group relative flex items-center justify-center overflow-hidden rounded border border-black bg-white px-2 py-1 text-black"
              onClick={() => {
                logout();
                toggleMenu();
              }}
            >
              <span className="relative z-10 flex items-center gap-1">
                <MdOutlineLogout className="text-sm group-hover:text-white" />
                <span className="text-sm group-hover:text-white">登出</span>
              </span>
              <span className="absolute inset-0 -translate-x-full transform bg-black transition-transform group-hover:translate-x-0"></span>
            </button>
          </>
        ) : (
          <button
            className="group relative flex items-center justify-center overflow-hidden rounded border border-black bg-white px-2 py-1 text-black"
            onClick={() => {
              toggleMenu();
              navigator("/login");
            }}
          >
            <span className="relative z-10 flex items-center gap-1">
              <MdOutlineAccountCircle className="text-sm group-hover:text-white" />
              <span className="text-sm group-hover:text-white">登入</span>
            </span>
            <span className="absolute inset-0 -translate-x-full transform bg-black transition-transform group-hover:translate-x-0"></span>
          </button>
        )}
      </Navbar.ItemGroup>

      <main className="p-8 md:px-14">
        <div className="mx-auto max-w-md md:max-w-xl lg:max-w-7xl">
          <Outlet />
        </div>
      </main>

      <footer className="bg-gray-400 p-4 md:p-14">
        <div className="mx-auto max-w-md space-y-4 md:flex md:max-w-xl md:space-y-0 lg:max-w-7xl">
          {/* 網站說明 */}
          <div className="flex-1 space-y-2">
            <Link to="/" className="text-lg font-bold">
              ReactPrac
            </Link>
            <p className="text-sm">這是個 React 練習專案</p>
          </div>

          {/* 網站地圖 */}
          <div className="flex-2 flex flex-wrap gap-14">
            <div>
              <h2 className="text-md mb-1 font-bold">連結區1</h2>
              <div className="flex flex-col text-sm">
                <Link
                  to="/homework"
                  className="block cursor-pointer hover:text-link hover:underline"
                >
                  練習目錄
                </Link>
                <Link
                  to="/login"
                  className="block cursor-pointer hover:text-link hover:underline"
                >
                  登入頁
                </Link>
                <Link
                  to="/profile"
                  className="block cursor-pointer hover:text-link hover:underline"
                >
                  會員頁
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-md mb-1 font-bold">連結區1</h2>
              <div className="flex flex-col text-sm">
                <Link
                  to="/homework"
                  className="block cursor-pointer hover:text-link hover:underline"
                >
                  練習目錄
                </Link>
                <Link
                  to="/login"
                  className="block cursor-pointer hover:text-link hover:underline"
                >
                  登入頁
                </Link>
                <Link
                  to="/profile"
                  className="block cursor-pointer hover:text-link hover:underline"
                >
                  會員頁
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-md mb-1 font-bold">連結區1</h2>
              <div className="flex flex-col text-sm">
                <Link
                  to="/homework"
                  className="block cursor-pointer hover:text-link hover:underline"
                >
                  練習目錄
                </Link>
                <Link
                  to="/login"
                  className="block cursor-pointer hover:text-link hover:underline"
                >
                  登入頁
                </Link>
                <Link
                  to="/profile"
                  className="block cursor-pointer hover:text-link hover:underline"
                >
                  會員頁
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 版權資訊 */}
      <div className="bg-gray-800 p-4 md:px-14">
        <div className="mx-auto max-w-md space-y-4 md:flex md:max-w-xl lg:max-w-7xl">
          <p className="text-sm text-white">© 2024 ReactPrac</p>
        </div>
      </div>
    </>
  );
};

export default Layout;

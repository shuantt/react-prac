import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../store/authContext";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const { isLogin, isLoading, logout } = useAuth();
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigator = useNavigate();

  // 這個好像沒用...
  if (isLoading) {
    console.log("載入中...");
    return <>
        <div>載入中...</div>
    </>;
  }

  return (
    <>
      <Navbar.Container className="mx-auto border-b-[1px] border-b-gray-500 p-4 md:px-14">
        {/* 桌面板 */}
        <Navbar.Content className="mx-auto hidden max-w-md items-center justify-center md:flex md:max-w-xl lg:max-w-7xl">
          <Navbar.Logo title="ReactPrac" href="/" />
          <Navbar.ItemGroup className="flex gap-5">
            <Navbar.Item text="練習目錄" href="/homework" />
            {isLogin ? (
              <>
                <Navbar.Item text="一般會員" href="/profile" />
                <Navbar.Item text="VIP會員" href="/VIP" />
                <button
                  className="ml-2 rounded bg-primary px-2 py-1 text-sm text-white hover:bg-gray-500 hover:transition-all"
                  onClick={() => {
                    logout();
                  }}
                >
                  登出
                </button>
              </>
            ) : (
              <button
                className="ml-2 rounded bg-primary px-2 py-1 text-sm text-white hover:bg-gray-500 hover:transition-all"
                onClick={() => {
                  navigator("/login");
                }}
              >
                登入
              </button>
            )}
          </Navbar.ItemGroup>
        </Navbar.Content>

        <Navbar.Content className="md:hidden relative mx-auto flex max-w-md items-center justify-center">
          <Navbar.Logo title="ReactPrac" href="/" />
          {/* 手機板 */}
          <div>
            <button
              className="rounded border-[1px] border-solid border-gray-500 px-1 text-gray-500 hover:cursor-pointer hover:border-gray-400 hover:text-[15px] hover:transition hover:duration-100 hover:ease-linear"
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
            >
              三
            </button>
          </div>
        </Navbar.Content>
      </Navbar.Container>

      <Navbar.ItemGroup
        className={`absolute w-full transform flex-col items-center justify-center gap-2 bg-white p-4 shadow-md transition-all duration-300 ease-in-out ${
          toggleMenu
            ? "flex scale-100 opacity-100"
            : "hidden scale-95 opacity-0"
        }`}
      >
        <Navbar.Item text="練習目錄" href="/homework" />
        {isLogin ? (
          <>
            <Navbar.Item text="一般會員" href="/profile" />
            <Navbar.Item text="VIP會員" href="/VIP" />
            <button
              className="ml-2 block w-fit rounded bg-primary px-2 py-1 text-sm text-white hover:bg-gray-500 hover:transition-all"
              onClick={() => {
                logout();
              }}
            >
              登出
            </button>
          </>
        ) : (
          <button
            className="block rounded bg-primary px-2 py-1 text-sm text-white hover:bg-gray-500 hover:transition-all"
            onClick={() => {
              setToggleMenu(false);
              navigator("/login");
            }}
          >
            登入
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
                  className="hover:text-link block cursor-pointer hover:underline"
                >
                  練習目錄
                </Link>
                <Link
                  to="/login"
                  className="hover:text-link block cursor-pointer hover:underline"
                >
                  登入頁
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-link block cursor-pointer hover:underline"
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
                  className="hover:text-link block cursor-pointer hover:underline"
                >
                  練習目錄
                </Link>
                <Link
                  to="/login"
                  className="hover:text-link block cursor-pointer hover:underline"
                >
                  登入頁
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-link block cursor-pointer hover:underline"
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
                  className="hover:text-link block cursor-pointer hover:underline"
                >
                  練習目錄
                </Link>
                <Link
                  to="/login"
                  className="hover:text-link block cursor-pointer hover:underline"
                >
                  登入頁
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-link block cursor-pointer hover:underline"
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
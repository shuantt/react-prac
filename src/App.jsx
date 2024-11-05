import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/css/index.css";

// 本次遇到問題：
// 1. 非同步渲染兩次：元件重複載入 (沒有開 StricMode)
//    自己猜是進 DefaultComponent 時 fetch API 是非同步所以還沒 fetch 到會員資料，空的 user 就先被傳進 App；等到取得資料 setUser 後 state 更新，重新渲染 DefaultComponent
//    這樣就會造成兩次渲染，雖然畫面看起來對，但應該要避免這種情況，該怎麼處理比較好？
// 2. Profile 頁面 F5 時就算有 token 也會跳回登入頁面：跟上述問題相似，state 還沒更新就被傳進子元件 Profile.jsx，檢查到沒有 user 就轉跳到登入頁面。
//    這種頁面權限實務上怎麼處理比較好？
// 3. 渲染問題： 在 1. 的狀況，當 DefaultComponent state 更新時，組件有重新選染，並且會回到 App.jsx；
//              但 2. 跳轉到 Login 後，即使 DefaultComponent 取得資料，也不會重新渲染 Profile.jsx；兩者差別在路由有變動且 Login 頁面沒有包 DefaultComponent
//              但看不懂這個重新渲染的機制是什麼？為什麼 2. 的 DefaultComponent 更新不會再重新渲染一次子元件 Profile.jsx？ 還是其實有渲染，但因為路由在 /login  所以看不到？

function App(props) {
  const { username } = props;
  console.log("進入 AppComponent: Default 到 App 會跳兩次，第二次有資料", props);

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
      <div className="text-start">
        <h1 className="mb-4 text-2xl font-bold">練習作業目錄</h1>
        <ul className="space-y-2">
          <li>
            作業1-
            <a href="/homework1" className="text-primary underline">
              表格和分頁設計
            </a>
          </li>
          <li>
            作業2-
            <a href="/homework2" className="text-primary underline">
              表單元件設計:輸入框、下拉選單、多選、單選
            </a>
          </li>
          <li>
            作業3-頁面轉跳、DefaultComponent 運用
            {!username ? (
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
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;

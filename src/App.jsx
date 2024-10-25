import "./assets/css/index.css";

// 遇到問題：
// 1. id 重複問題 (我故意用同樣的選項，發現radio點擊卻勾選了checkbox)，目前我是直接自訂 id 但這樣不好管理還要想一堆id名稱，實務上是否直接直接產生唯一值當id就好? (像是 timesatmp 或 uuid)
// 2. 試著用 forwardRef 從父元件執行子元件的驗證，但目前子元件 validate 寫得很亂... 有點寫到眼花...
// 3. 父層二次驗證出現問題，回傳 isError 沒更新，可以看 Textbox.jsx 72 行 (應該是有異步問題，但我不確定也不知道怎麼解決)
//    問題重現方式：(可看console)
//      a.這邊我如果不填寫和選擇任何內容，送出表單的時候會顯示紅字和錯誤訊息(元件內的驗證)，但 isError 不會吃到 true, 所以返回父層就會成功送出表單
//      b.如果是子元件先執行過 onchange 事件(例如刪掉第一個輸入框的 Hello)，這時候就能吃到 isError = true，父層送出表單會阻擋

function App() {
  return (
    <>
      <div className="text-start">
        <h1 className="mb-4 text-2xl font-bold">練習作業目錄</h1>
        <ul className="space-y-2">
          <li>
            <a href="/homework1" className="text-primary underline">
              作業1-表格和分頁設計
            </a>
          </li>
          <li>
            <a href="/homework2" className="text-primary underline">
              作業2-表單元件設計:輸入框、下拉選單、多選、單選
            </a>
          </li>
          <li>
            <a href="/login" className="text-primary underline">
              作業3-登入頁面:頁面轉跳、DefaultComponent 運用
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;

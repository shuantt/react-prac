import { useRef, useState } from "react";
// import "./App.css";
import "./assets/css/index.css";
import TextBox from "./componenets/TextBox";
import DropdownList from "./componenets/DropdownList";
import CheckboxGroup from "./componenets/CheckboxGroup";
import RadioButton from "./componenets/RadioButton";

// 遇到問題：
// 1. id 重複問題 (我故意用同樣的選項，發現radio點擊卻勾選了checkbox)，目前我是直接自訂 id 但這樣不好管理還要想一堆id名稱，實務上是否直接直接產生唯一值當id就好? (像是 timesatmp 或 uuid)
// 2. 試著用 forwardRef 從父元件執行子元件的驗證，但目前子元件 validate 寫得很亂... 有點寫到眼花...
// 3. 父層二次驗證出現問題，回傳 isError 沒更新，可以看 Textbox.jsx 72 行 (應該是有異步問題，但我不確定也不知道怎麼解決)
//    問題重現方式：(可看console)
//      a.這邊我如果不填寫和選擇任何內容，送出表單的時候會顯示紅字和錯誤訊息(元件內的驗證)，但 isError 不會吃到 true, 所以返回父層就會成功送出表單 
//      b.如果是子元件先執行過 onchange 事件(例如刪掉第一個輸入框的 Hello)，這時候就能吃到 isError = true，父層送出表單會阻擋

function App() {
  const [formData, setFormData] = useState({
    note: "",
    phone: "",
    email: "",
    location: "",
    fruits: [],
    animal: "",
  });

  const noteRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const locationRef = useRef(null);
  const fruitsRef = useRef([]);
  const animalRef = useRef(null);

  let selectOptions = [
    { value: "taipei", label: "台北" },
    { value: "taoyuan", label: "桃園" },
    { value: "tainan", label: "台南" },
  ];

  let checkboxOptions = [
    { id: "cb-apple", name: "fruits", value: "apple", label: "蘋果" },
    { id: "cb-banana", name: "fruits", value: "banana", label: "香蕉" },
    { id: "cb-kiwi", name: "fruits", value: "kiwi", label: "奇異果" },
  ];

  let radioOptions = [
    { id: "rb-cat", name: "animal", value: "cat", label: "貓" },
    { id: "rb-dog", name: "animal", value: "dog", label: "狗" },
  ];

  const handleSubmit = () => {
    if (!validateForm()) {
      console.log("表單驗證失敗，請檢查表單");
      return;
    } else {
      setFormData({
        note: noteRef.current.getValue(),
        phone: phoneRef.current.getValue(),
        email: emailRef.current.getValue(),
        location: locationRef.current.getValue(),
        fruits: fruitsRef.current.getValue(),
        animal: animalRef.current.getValue(),
      });
      console.log("通過驗證，送出表單: " + JSON.stringify(formData));
    }
  };

  const handleClear = () => {
    noteRef.current.clearValue();
    phoneRef.current.clearValue();
    emailRef.current.clearValue();
    locationRef.current.clearValue();
    fruitsRef.current.clearValue();
    animalRef.current.clearValue();
    setFormData({
      note: "",
      phone: "",
      email: "",
      location: "",
      fruits: [],
      animal: "",
    })
    console.log("清除表單: " + JSON.stringify(formData));
  };

  const validateForm = () => {
    if (noteRef.current.validateValue().isError) {
      return false;
    } else if (phoneRef.current.validateValue().isError) {
      return false;
    } else if (emailRef.current.validateValue().isError) {
      return false;
    } else if (fruitsRef.current.validateValue().isError) {
      return false;
    } else {
      return true;
    }

    // ...額外父元件驗證
  };

  return (
    <div className="p-8">
      {/* Input Text Field */}
      <div className="mb-4 flex flex-col items-start space-y-6">
        <h2 className="text-lg font-bold">Input Text Field</h2>
        <TextBox
          id="tb-note"
          label={"備註"}
          type={"text"}
          defaultValue={"Hello"}
          placeholder={"輸入文字"}
          isRequired={true}
          isDisabled={false}
          variant="standard"
          size="md"
          ref={noteRef}
        />
        <TextBox
          id="tb-phone"
          label={"Phone"}
          type={"text"}
          validate={{ pattern: "^[0-9]*$", msg: "只可輸入數字 0 - 9" }}
          defaultValue={""}
          placeholder={"請輸入 0-9 數字"}
          isRequired={true}
          isDisabled={false}
          variant="fill"
          size="sm"
          ref={phoneRef}
        />
        <TextBox
          id="tb-email"
          label={"Email"}
          type={"email"}
          defaultValue={""}
          placeholder={"請輸入 Email"}
          validate={{
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            msg: "Email 格式錯誤",
          }}
          isRequired={true}
          isDisabled={false}
          variant="outline"
          size="md"
          ref={emailRef}
        />
      </div>
      <div className="my-8 border-b-[1px] border-solid border-gray-300"></div>

      {/* Dropdown */}
      <div className="mb-4 flex flex-col items-start space-y-4">
        <h2 className="text-lg font-bold">Dropdown</h2>
        <DropdownList
          id="ddl-fruits"
          label={"選擇地區"}
          options={selectOptions}
          size="base"
          ref={locationRef}
        />
      </div>
      <div className="my-8 border-b-[1px] border-solid border-gray-300"></div>

      {/* Checkbox */}
      <div className="mb-4 flex flex-col items-start space-y-4">
        <h2 className="text-lg font-bold">Checkbox</h2>
        <CheckboxGroup checkboxOptions={checkboxOptions} ref={fruitsRef} />
      </div>
      <div className="my-8 border-b-[1px] border-solid border-gray-300"></div>

      {/* RadioButton */}
      <div className="mb-4 flex flex-col items-start space-y-4">
        <h2 className="text-lg font-bold">RadioButton</h2>
        <RadioButton radioOptions={radioOptions} ref={animalRef} />
      </div>
      <div className="my-8 border-b-[1px] border-solid border-gray-300"></div>

      {/* 送出按鈕 */}
      <div className="space-x-4">
        <button
          className="rounded bg-primary px-4 py-2 text-white hover:bg-gray-500"
          onClick={handleSubmit}
        >
          送出表單
        </button>
        <button
          className="rounded bg-primary px-4 py-2 text-white hover:bg-gray-500"
          onClick={handleClear}
        >
          清除表單
        </button>
        <div className="my-8 border-b-[1px] border-solid border-gray-300"></div>
      </div>
    </div>
  );
}

export default App;

import { useRef, useState } from "react";
import { useEffect } from "react";
import "./App.css";
import "./assets/css/index.css";
import TextBox from "./componenets/TextBox";
import Dropdown from "./componenets/Dropdown";
import Checkbox from "./componenets/Checkbox";
import RadioButton from "./componenets/RadioButton";

function App() {
  const textInput = useRef("text");
  const numberInput = useRef("numeric");
  const emailInput = useRef("email");

  let isDisabled = false;
  let selectOptions = [
    { value: "1", label: "選項 1" },
    { value: "2", label: "選項 2" },
    { value: "3", label: "選項 123" },
  ];

  let checkboxItems = [
    { value: "apple", label: "蘋果" },
    { value: "banana", label: "香蕉" },
    { value: "kiwi", label: "奇異果" },
  ];

  let radioItems = [
    { value: "apple", label: "蘋果" },
    { value: "banana", label: "香蕉" },
    { value: "kiwi", label: "奇異果" },
  ];

  return (
    <>
      <div className="mb-4 space-y-6 text-start">
        <h2 className="text-lg font-bold">Input Text Field</h2>
        <TextBox
          label={"純文字"}
          type={"text"}
          defaultValue={""}
          validatePattern={""}
          placeholder={"輸入文字"}
          width={"w-80"}
          isDisabled={isDisabled}
          isRequired={true}
          ref={textInput}
        />
        <TextBox
          label={"Number"}
          type={"numeric"}
          defaultValue={""}
          validatePattern={"^[0-9]*$"}
          placeholder={"請輸入 0-9 數字"}
          width={"w-80"}
          isDisabled={isDisabled}
          isRequired={true}
          ref={numberInput}
        />
        <TextBox
          label={"Email"}
          type={"email"}
          defaultValue={""}
          validatePattern={"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"}
          placeholder={"請輸入 Email"}
          width={"w-80"}
          isDisabled={isDisabled}
          isRequired={true}
          ref={emailInput}
        />
        <hr></hr>
      </div>

      <div className="mb-4 space-y-4 text-start">
        <h2 className="text-lg font-bold">Dropdown</h2>
        <Dropdown label={"水果種類"} width={"w-80"} options={selectOptions} />
        <hr></hr>
      </div>

      <div className="mb-4 space-y-4 text-start">
        <h2 className="text-lg font-bold">Checkbox</h2>
        <Checkbox checkboxItems={checkboxItems}/>
        <hr></hr>
      </div>

      <div className="mb-4 space-y-4 text-start">
        <h2 className="text-lg font-bold">Checkbox</h2>
        <RadioButton radioItems={radioItems} />
        <hr></hr>
      </div>
    </>
  );
}

export default App;

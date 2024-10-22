import { useState, forwardRef, useImperativeHandle } from "react";

/*
《元件使用說明》
 label 可以設定輸入框的標籤文字
 type 可以設定 input 原生 html 類型；預設為 text
 defaultValue 可以設定輸入框的預設值；預設為空字串
 placeholder 可以設定輸入框的提示文字；預設為空字串
 variant 可以選擇 outline, fill, standard；預設為 standard
 size 可以選擇 sm, base, md, lg, full (目前僅操控寬度)；預設為 base
 validate 可以傳入 pattern(整則表達式) 與 msg(錯誤說明) 來驗證輸入值(目前僅加入使用 regular expression 驗證欄位合法性)；預設為空物件不檢查
 isDisabled 可以設定是否禁用輸入框，目前統一使用 bg-gray-300 來表示禁用狀態；預設為 false
 isRequired 可以設定是否為必填欄位；預設為 false
 */
const Textbox = forwardRef((props, ref) => {
  const {
    id = "",
    label = "輸入框",
    type = "text",
    defaultValue,
    placeholder = "",
    validate = { pattern: "", msg: "" },
    isDisabled = false,
    isRequired = false,
    variant = "standard",
    size = "base",
  } = props;

  const styleObj = {
    standard: {
      container: "border-b-[1px] border-gray-500",
      label: "text-[12px] text-start",
      input: "",
      success: "",
      error: "border-b-danger",
    },
    outline: {
      container: "rounded-md border-[1px] p-2",
      label: "text-[12px] absolute -top-2 bg-white ",
      input: "",
      success: "border-gray-500",
      error: "border-danger",
    },
    fill: {
      container: "rounded-md bg-gray-100 p-2 pt-5",
      label: "text-[12px] bg-none top-1 absolute",
      input: "border-b-2 border-gray-600",
      success: "",
      error: "border-[1px] border-solid border-danger",
    },
  };

  const sizeObj = {
    sm: "w-48",
    base: "w-64",
    md: "w-80",
    lg: "w-96",
    full: "w-full",
  };

  const [inputValue, setInputValue] = useState(defaultValue);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useImperativeHandle(ref, () => ({
    getValue: () => {
      return inputValue;
    },
    clearValue: () => {
      setInputValue("");
    },
    validateValue: () => {
      const errorMsg = validateInput(validate, isRequired, inputValue);
      // 這邊我如果不填寫和選擇任何內容，送出表單會成功
      // 執行onchange事件後，父層送出表單會失敗，應該是有異步問題(?)
      console.log("Textbox.jsx 76: ", errorMsg);
      if (errorMsg) {
        setIsError(true);
        setErrMsg(errorMsg);
        console.log(isError);
        return {
          isError: isError,
          errMsg: errorMsg,
        };
      } else {
        setIsError(false);
        setErrMsg("");
        return {
          isError: false,
          errMsg: "",
        };
      }
    },
  }));

  const handleInputOnChange = (e) => {
    setInputValue(e.target.value);
    const errorMsg = validateInput(validate, isRequired, e.target.value);
    if (errorMsg) {
      setIsError(true);
      setErrMsg(errorMsg);
    } else {
      setIsError(false);
      setErrMsg("");
    }
  };

  const validateInput = (validate, isRequired, value) => {
    const { pattern, msg } = validate;

    if (isRequired && value.trim() === "") {
      return "欄位必填";
    } else if (isRequired && pattern) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        return msg;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="w-full">
        <div
          className={`relative ${styleObj[variant].container} ${sizeObj[size]} ${isDisabled ? "bg-gray-300" : ""} ${isError ? styleObj[variant].error : styleObj[variant].success}`}
        >
          {label && (
            <label
              className={`${styleObj[variant].label} ${label ? "block" : "hidden"} ${isError ? "text-danger" : "text-gray-600"}`}
              htmlFor={id}
            >
              {label}
            </label>
          )}
          <input
            className={`h-full w-full p-1 outline-none ${styleObj[variant].input} ${isDisabled ? "cursor-not-allowed" : "cursor-text"}`}
            id={id}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={handleInputOnChange}
          />
        </div>
        {isError && (
          <div className="mt-1 text-start text-sm text-danger">{errMsg}</div>
        )}
      </div>
    </>
  );
});

export default Textbox;

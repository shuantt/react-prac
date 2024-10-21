import { forwardRef } from "react";
import { useState } from "react";

const Textbox = forwardRef((props, ref) => {
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  let {
    label = "輸入框",
    mode = "text",
    type = "text",
    validatePattern = "",
    defaultValue = "",
    placeholder = "",
    isDisabled = false,
    isRequired = false,
    width = "w-64",
    padding = "p-2",
  } = props;

  if (!defaultValue) {
    defaultValue = "";
  }

  if (isDisabled === undefined) {
    isDisabled = false;
  }

  const validateInput = (value) => {
    if (isRequired && value === "") {
      return "欄位必填";
    } else if (validatePattern) {
      const regex = new RegExp(validatePattern);
      if (!regex.test(value)) {
        setIsError(true);
        switch (type) {
          case "numeric":
            return "只可輸入數字 0 - 9";
            break;
          case "email":
            return "Email 格式錯誤";
            break;
          default:
            return "type 錯誤";
            break;
        }
      } else {
        setIsError(false);
        return "";
      }
    }
  };

  return (
    <>
      <div>
        <div
          className={`relative rounded-md border-[1px] ${padding} ${width} ${isDisabled ? "bg-gray-200" : ""} ${isError ? "border-danger" : "border-gray-600"}`}
        >
          {label && (
            <div
              className={`absolute -top-3 bg-white px-1 text-[12px] ${label ? "block" : "hidden"} ${isError ? "text-danger" : "text-gray-600"}` }
            >
              {label}
            </div>
          )}
          <input
            className={`h-full w-full p-1 outline-none ${isDisabled ? "cursor-not-allowed" : "cursor-text"}`}
            label={label}
            type={type}
            inputMode={mode}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={isDisabled}
            ref={ref}
            onChange={(e) => {
              const errorMsg = validateInput(e.target.value);
              if (errorMsg) {
                setIsError(true);
                setErrMsg(errorMsg);
              }
            }}
          />
        </div>
        {isError && <div className="text-danger">{errMsg}</div>}
      </div>
    </>
  );
});

export default Textbox;

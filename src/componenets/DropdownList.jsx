import { forwardRef, useImperativeHandle, useState } from "react";
import arrowDown from "../assets/arrow_down.svg";

const DropdownList = forwardRef((props, ref) => {
  const {
    label,
    options = [],
  } = props;

  const [isDroped, setIsDropded] = useState(false);
  const defaultValue = options[0].label;
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  let hidden = isDroped ? "block" : "hidden";
  const selectItem = (option) => {
    setSelectedValue(option.label);
    setIsDropded(false);
  };
  
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return selectedValue;
    },
    clearValue: () => {
      setSelectedValue(defaultValue);
    },
  }));

  const textboxStyle = {
    standard: {
      container: "border-b-[1px] border-gray-600",
      label: "text-[12px] text-start",
      input: "",
      error: "border-b-danger",
    },
    outline: {
      container: "rounded-md border-[1px] p-2",
      label: "text-[12px] absolute -top-2 bg-white ",
      input: "",
      error: "border-danger",
    },
    fill: {
      container: "rounded-md bg-gray-200 p-2 pt-5",
      label: "text-[12px] bg-none top-1 absolute",
      input: "border-b-2 border-gray-600",
      error: "border-[1px] border-solid border-danger",
    },
  };

  return (
    <>
      <div className={`relative`}>
        <div
          className={`relative rounded-md border-[1px] border-gray-600 p-2 cursor-pointer`}
          onClick={() => {
            setIsDropded(!isDroped);
          }}
        >
          <div
            className={`absolute -top-3 bg-white px-1 text-[12px] text-gray-600 ${label ? "block" : "hidden"}`}
          >
            {label}
          </div>
          <div className="flex items-center justify-between">
            <div className="p-1">{selectedValue || "請選擇"}</div>
            <img src={arrowDown} alt="arrow-down" />
          </div>
        </div>
        <ul
          className={`${hidden} absolute z-10 w-full cursor-pointer rounded-md border-[1px] border-gray-600 bg-white`}
        >
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              value={option.value}
              label={option.label}
              selectItem={() => {
                selectItem(option);
              }}
            />
          ))}
        </ul>
      </div>
    </>
  );
});

const DropdownItem = (props) => {
  let { value, label, selectItem } = props;
  return (
    <li
      className="p-2 hover:bg-gray-600 hover:text-white"
      onClick={selectItem}
      value={value}
    >
      {label}
    </li>
  );
};

export default DropdownList;

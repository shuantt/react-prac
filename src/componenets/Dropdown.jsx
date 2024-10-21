import { useState } from "react";
import arrowDown from "../assets/arrow_down.svg";

const Dropdown = (props, ref) => {
  const [isDroped, setIsDropded] = useState(false);

  const {
    label,
    options = [],
    defaultValue,
    width = "w-64",
    padding = "p-2",
  } = props;

  const isLabelShow = label ? true : false;
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  let hidden = isDroped ? "block" : "hidden";
  const selectItem = (option) => {
    console.log(option.label);
    setSelectedValue(option.label);
    setIsDropded(false);
  };

  return (
    <>
      <div className={`relative ${width}`}>
        <div
          className={`relative rounded-md border-[1px] border-gray-600 ${padding} cursor-pointer`}
          onClick={() => {
            setIsDropded(!isDroped);
          }}
        >
          <div
            className={`absolute -top-3 bg-white px-1 text-[12px] text-gray-600 ${isLabelShow ? "block" : "hidden"}`}
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
};

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

export default Dropdown;

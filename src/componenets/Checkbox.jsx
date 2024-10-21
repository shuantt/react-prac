import React, { useState } from "react";

const Checkbox = (props) => {
  const { checkboxItems } = props;
  const [checkedItems, setCheckboxItems] = useState([]);

  return (
    <>
      <div className="flex items-center space-x-4">
        {checkboxItems.map((item) => (
          <div key={item.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={item.value}
              className="text-blue-600 focus:ring-blue-500 h-5 w-5 rounded border-gray-300 cursor-pointer"
              onChange={(e) => {
                if (!checkedItems.includes(item.value)) {
                  setCheckboxItems([...checkedItems, item.value]);
                } else {
                  setCheckboxItems(
                    checkedItems.filter((value) => value !== item.value),
                  );
                }
              }}
            />
            <label htmlFor={item.label} className="text-gray-700">
              {item.label}
            </label>
          </div>
        ))}
      </div>
      {/* 確認用 */}
      <div>已選取: </div>
      {checkedItems.toString()}
    </>
  );
};

export default Checkbox;

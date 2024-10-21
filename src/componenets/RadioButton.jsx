import React, { useState } from "react";

const RadioButton = (props) => {
  const { radioItems } = props;
  const [selectedItem, setSelectedItem] = useState(radioItems[0].value);

  return (
    <>
      <div className="flex items-center space-x-4">
        {radioItems.map((item) => (
          <div
            key={item.value}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <input
              type="radio"
              id={item.value}
              className="text-blue-600 h-5 w-5 rounded border-gray-300"
              checked={selectedItem === item.value}
              onChange={(e) => {
                setSelectedItem(item.value);
              }}
            />
            <label htmlFor={item.value} className="text-gray-700">
              {item.label}
            </label>
          </div>
        ))}
      </div>
      {/* 確認用 */}
      <div>已選取: </div>
      {selectedItem.toString()}
    </>
  );
};

export default RadioButton;

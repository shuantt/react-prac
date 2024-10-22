import React, { useState, forwardRef, useImperativeHandle } from "react";

const RadioButtonGroup =  forwardRef((props, ref) => {
  const { radioOptions } = props;
  const defaultValue = radioOptions[0].value;
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  useImperativeHandle(ref, () => ({
    getValue: () => {
      return selectedItem;
    },
    clearValue: () => {
      setSelectedItem(defaultValue);
    },
  }));

  const handleRadiobuttonChange = (e) => {
    setSelectedItem(e.target.value);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        {radioOptions.map((item) => (
          <RadioButton
            key={item.id}
            {...item}
            isChecked={selectedItem === item.value}
            onRadiobuttonChange={handleRadiobuttonChange}
          />
        ))}
      </div>
      {/* 確認用 */}
      <div>已選取: {selectedItem.toString()}</div>
    </>
  );
});

const RadioButton = (props) => {
  const { id, name, label, value, isChecked, onRadiobuttonChange } = props;

  return (
    <>
      <div className="flex items-center space-x-2 hover:cursor-pointer">
        <input
          className="text-blue-600 h-5 w-5 rounded border-gray-300"
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          onChange={onRadiobuttonChange}
        />
        <label htmlFor={id} className="text-gray-700">
          {label}
        </label>
      </div>
    </>
  );
};

export default RadioButtonGroup;

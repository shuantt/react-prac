import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from "react";

const CheckboxGroup = forwardRef((props, ref) => {
  const { checkboxOptions } = props;
  const [checkedList, setCheckedList] = useState([]);
  const isInitRender = useRef(true);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrorMsg] = useState("");

  useImperativeHandle(ref, ()=>{
    return {
      getValue: () => {
        return checkedList;
      },
      clearValue: () => {
        setCheckedList([]);
      },
      validateValue: () => {
        if(checkedList.length === 0){
          setIsError(true);
          setErrorMsg("請至少選擇一個選項");
          return {
            isError: isError,
            errMsg: errMsg,
          };
        }
        else{
          setIsError(false);
          setErrorMsg("");
          return {
            isError: isError,
            errMsg: "",
          };
        }
      }
    }
  })

  const handleCheckboxOnChange = (e) => {
    let tempList = checkedList;
    if (!checkedList.includes(e.target.value)) {
      tempList = [...checkedList, e.target.value];
    } else {
      tempList = checkedList.filter((item) => item !== e.target.value);
    }
    setCheckedList(tempList);
  };

  useEffect(() => {
   if(isInitRender.current){
     isInitRender.current = false;
   }
   else{
    if(checkedList.length === 0){
      setIsError(true);
      setErrorMsg("至少選擇一個選項");
    }
    else{
      setIsError(false);
      setErrorMsg("");
    }
   }
  }, [checkedList]);

  return (
    <>
      <div className="flex items-center space-x-4">
        {checkboxOptions.map((item) => (
          <Checkbox
            key={item.id}
            {...item}
            isChecked={checkedList.includes(item.value)}
            onCheckboxChange={handleCheckboxOnChange}
          />
        ))}
      </div>
      {isError && (
          <div className="mt-1 text-start text-sm text-danger">{errMsg}</div>
        )}
      {/* 確認用 */}
      <div>已選取: {checkedList.toString()}</div>
    </>
  );
});

const Checkbox = (props) => {
  const { id, name, label, value, isChecked, onCheckboxChange } = props;

  return (
    <>
      <div className="flex items-center space-x-2">
        <input
          className=" h-5 w-5 cursor-pointer rounded border-gray-300"
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          onChange={onCheckboxChange}
        />
        <label htmlFor={id} className="text-gray-700">
          {label}
        </label>
      </div>
    </>
  );
};

export default CheckboxGroup;

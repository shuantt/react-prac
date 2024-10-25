import React, { useRef } from "react";
import "../assets/css/index.css";
import TextBox from "../componenets/TextBox";

const Login = () => {
  const refs = useRef({});

  return (
    <div className="mx-auto w-[400px]">
      <div className="flex flex-col items-start space-y-4 rounded-lg border-[1px] border-gray-500 p-10">
        <h1 className="text-lg font-bold">會員登入</h1>
        <form className="block space-y-4">
          <TextBox
            id="tb-account"
            label={"帳號"}
            type={"text"}
            defaultValue={""}
            placeholder={"輸入帳號"}
            isRequired={true}
            isDisabled={false}
            variant="outline"
            size="md"
            ref={refs.current.accountRef}
          />
          <TextBox
            id="tb-password"
            label={"密碼"}
            type={"password"}
            defaultValue={""}
            placeholder={"輸入密碼"}
            isRequired={true}
            isDisabled={false}
            variant="outline"
            size="md"
            ref={refs.current.passwordRef}
          />
        </form>
        <button className="rounded bg-primary px-4 py-2 text-white hover:bg-gray-500">
          送出表單
        </button>
        <div className="border-b-[1px] border-solid border-gray-500"></div>
        <div className="text-start">
          <div>測試帳號：tester1</div>
          <div>測試密碼：Abc123456@</div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
import TextBox from "../componenets/TextBox";
import "../assets/css/index.css";

const Login = () => {
  const { isLogin, login } = useAuth();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const refs = useRef({
    usernameRef: null,
    passwordRef: null,
  });

  const checkLogin = () => {
    fetch("http://172.104.121.100/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: refs.current.usernameRef.getValue(),
        password: refs.current.passwordRef.getValue(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("firtName", data.data.firstName);
          localStorage.setItem("lastName", data.data.lastName);
          localStorage.setItem("userRole", data.data.userRole);
          login(data.data.userRole);
          navigate("/");
        } else {
          setIsError(true);
          setErrMsg("帳號或密碼錯誤");
        }
      })
      .catch((error) => {
        setIsError(true);
        setErrMsg("帳號或密碼錯誤");
        console.error("Error:", error);
      });
  };

  return (
    <div className="mx-auto w-[400px]">
      <div className="flex flex-col items-start space-y-4 rounded-lg border-[1px] border-gray-500 p-10">
        <h1 className="text-lg font-bold">會員登入</h1>
        <form className="block space-y-4">
          <TextBox
            id="tb-username"
            label={"帳號"}
            type={"text"}
            defaultValue={""}
            placeholder={"輸入帳號"}
            isRequired={true}
            isDisabled={false}
            variant="outline"
            size="md"
            ref={(ele) => (refs.current.usernameRef = ele)}
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
            ref={(ele) => (refs.current.passwordRef = ele)}
          />
        </form>
        {isError && (
          <div className="mt-1 text-start text-sm text-danger">{errMsg}</div>
        )}
        <button
          className="rounded bg-primary px-4 py-2 text-white hover:bg-gray-500 hover:transition-all"
          onClick={checkLogin}
        >
          送出表單
        </button>
        <div className="border-b-[1px] border-solid border-gray-500"></div>
        <div className="text-start">
          <div>測試帳號(role:1): test02</div>
          <div>測試密碼: Aa123456</div>
          <div>---</div>
          <div>測試帳號(role:2): shuan</div>
          <div>測試密碼: Aa123456</div>
        </div>
      </div>
    </div>
  );
};

export default Login;

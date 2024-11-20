import React, { useEffect, useState } from "react";
import { useReducer } from "react";

const AuthContext = React.createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      console.log("進入 authReducer login");
      return {
        ...state,
        isLogin: true,
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        userRole: localStorage.getItem("userRole"),
      };
    case "logout":
      console.log("進入 authReducer logout");
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("userRole");
      return {
        ...state,
        isLogin: false,
        firstName: "",
        lastName: "",
        userRole: 0,
      };
    case "setFirstName":
      break;
    case "setLastName":
      break;
    case "setUserRole":
      break;
    default:
      throw new Error("reducer action type 錯誤");
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLogin: false,
    firstName: "",
    lastName: "",
    userRole: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("進入 AuthProvider token: ", token);
    if (token) {
      fetch("https://react-prac-api.hnd1.zeabur.app/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("AuthProvider API 回傳： ", data);
          if (data.status == "success") {
            dispatch({
              type: "login",
              payload: {
                firstName: data.data.firstName,
                lastName: data.data.lastNname,
                userRole: data.data.role,
              },
            });
          } else {
            dispatch({ type: "logout" });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          dispatch({ type: "logout" });
        });
    } else {
      dispatch({ type: "logout" });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: () => {
          dispatch({ type: "login" });
        },
        logout: () => {
          dispatch({ type: "logout" });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };

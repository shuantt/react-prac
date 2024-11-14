import React, { useEffect, useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userRole, setUserRole] = useState(0); // 0: visitor, 1: member, 2: vipMember

  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("進入 AuthProvider token: ", token);
    if (token) {
      fetch("http://172.104.121.100/auth/profile", {
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
            setIsLogin(true);
            setFirstName(data.data.first_name);
            setLastName(data.data.last_name);
            setUserRole(data.data.role);
          } else {
            setIsLogin(false);
            setFirstName("");
            setLastName("");
            setUserRole(0);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLogin(false);
          setFirstName("");
          setLastName("");
          setUserRole(0);
        });
    } else {
      setIsLogin(false);
      setFirstName("");
      setLastName("");
      setUserRole(0);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogin: isLogin,
        firstName: firstName,
        lastName: lastName,
        userRole: userRole,
        isLoading: isLoading,
        login: (role) => {
          setIsLogin(true);
          setUserRole(role);
          setFirstName(firstName);
          setLastName(lastName);
        },
        logout: () => {
          setIsLogin(false);
          setUserRole(0);
          localStorage.removeItem("token");
          localStorage.removeItem("firstName");
          localStorage.removeItem("lastName");
          localStorage.removeItem("userRole");
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

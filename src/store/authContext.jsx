import React, { useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState(0); // 0: visitor, 1: member, 2: vipMember

  return (
    <AuthContext.Provider
      value={{
        isLogin: isLogin,
        login: (role) => {
          setIsLogin(true);
          setUserRole(role);
        },
        logout: () => {
          setIsLogin(false);
          setUserRole(0);
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

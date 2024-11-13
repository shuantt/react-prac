import React, { createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        toggleTheme: () => {
          setTheme(theme === "light" ? "dark" : "light");
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
    const context = React.useContext(ThemeContext)
    return context;
}

export { ThemeProvider, useTheme };

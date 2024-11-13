import React, { createContext, useState } from "react";

const LanguageContext = React.createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("zh");

  return (
    <LanguageContext.Provider
      value={{
        language: language,
        toggleLanguage: () => {
          setLanguage(language === "zh" ? "en" : "zh");
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  return context;
};

export { LanguageProvider, useLanguage };

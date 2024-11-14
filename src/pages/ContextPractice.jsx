import { useLanguage } from "../store/languageContext";
import { useAuth } from "../store/authContext";
import { useTheme } from "../store/themeContext";

const ContextPracttice = () => {
  const { isLogin, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const themeStyle = {
    light: "bg-white text-black",
    dark: "bg-black text-white",
  };

  const buttonThemeStyle = {
    light: "bg-white text-black border border-black",
    dark: "bg-black text-white border border-white",
  };

  return (
    <div className={`p-8 rounded border-[1px] border-black ${themeStyle[theme]}`}>
      <h1 className={`mb-2 text-lg font-bold`}>
        {language === "zh" ? "useContext 練習" : "useContext Practice"}
      </h1>
      {language === "zh" ? (
        <h2>登入狀態: {isLogin ? "已登入" : "訪客"}</h2>
      ) : (
        <h2>Login Status: {isLogin ? "Logged in" : "Visitor"}</h2>
      )}
      <br />
      <div className="flex flex-col space-y-4">
        <button
          className={`block rounded px-4 py-2 ${buttonThemeStyle[theme]}`}
          onClick={() => {
            toggleTheme();
          }}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
        <button
          className={`block rounded px-4 py-2 ${buttonThemeStyle[theme]}`}
          onClick={() => {
            language === "zh" ? toggleLanguage("en") : toggleLanguage("zh");
          }}
        >
          {language === "zh" ? "中文" : "English"}
        </button>
      </div>
    </div>
  );
};

export default ContextPracttice;

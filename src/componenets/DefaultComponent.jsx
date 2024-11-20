import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { useEffect } from "react";

const DefaultComponent = ({ Component }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLogin, firstName, lastName, userRole } = useAuth();

  const user = {
    firstName: firstName,
    lastName: lastName,
    userRole: userRole,
  };

  const privatePages = [
    {
      path: "/profile",
      role: 1,
    },
    {
      path: "/VIP",
      role: 2,
    },
  ];

  const pageRule = privatePages.find((page) => page.path === location.pathname);
  console.log("pageRule", pageRule, 'userRole', userRole);

  useEffect(() => {
    // 已登入會員不可進登入頁
    console.log(location)
    if (location.pathname === "/login" && userRole > 0) {
      navigate("/");
      return;
    }

    // 如果是權限頁面要做判斷
    if (pageRule) {

      // 如果沒有登入，就導回登入頁
      if (!isLogin) {
        navigate("/login");
        return;
      }

      // 權限不足，導回首頁
      if (userRole < pageRule.role) {
        navigate("/");
        return;
      }
    }
  }, [isLogin, location]);

  // 有設定的頁面，就將 user 資料傳入
  return <Component {...user} />;
};

export default DefaultComponent;

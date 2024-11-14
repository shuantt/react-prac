import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

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
  console.log("pageRule", pageRule);
  console.log("userRole", userRole);

  if (location === "/login" && userRole > 0) {
    navigate("/");
    return;
  }

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

    // 有設定的頁面，就將 user 資料傳入
    return <Component {...user} />;
  } else {
    // 沒有設定的頁面，就直接顯示
    return <Component />;
  }
};

export default DefaultComponent;

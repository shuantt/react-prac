import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MemberProfile = (props) => {
  console.log("進到MemberProfile", props);
  const { username, first_name, last_name } = props;

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, []);

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Member Profile</h1>
      <div>會員帳號: {username}</div>
      <div>
        會員名稱: {last_name}
        {first_name}
      </div>
      <div className="space-x-2">
        <button
          className="rounded bg-primary px-4 py-2 text-white hover:bg-gray-500 hover:transition-all"
          onClick={() => navigate("/")}
        >
          回首頁
        </button>
        <button
          className="rounded bg-primary px-4 py-2 text-white hover:bg-gray-500 hover:transition-all"
          onClick={logOut}
        >
          登出
        </button>
      </div>
    </div>
  );
};

export default MemberProfile;

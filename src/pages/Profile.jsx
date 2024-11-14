import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  console.log("進到MemberProfile", props);
  const {  firstName, lastName } = props;

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">一般會員頁 (userRole: 1)</h1>
      <div>
        會員名稱: {lastName} {firstName}
      </div>
    </div>
  );
};

export default Profile;

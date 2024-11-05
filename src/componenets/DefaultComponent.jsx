import { useEffect } from "react";
import { useState } from "react";

const DefaultComponent = ({ Component }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  console.log(`進入 DefaultComponent token: ${token}, 使用者資料: `, user);

  useEffect(() => {
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
          console.log("DefaultComponent API 回傳： ", data);
          if (data.status == "success") {
            setUser({ ...data.data });
          } else {
            setUser(null);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <Component {...user} />
    </>
  );
};

export default DefaultComponent;

import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import "./assets/css/index.css";

function App() {
  const [userData, setUserData] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(userData.length / pageSize);
  const startIndex = (curPage - 1) * pageSize;
  const endIndex = curPage * pageSize;

  useEffect(() => {
    const apiUrl = `https://jsonplaceholder.typicode.com/users`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const THeadComponent = () => {
    const theadArr = [
      "ID",
      "Name",
      "Username",
      "Email",
      "Address",
      "Geo",
      "Phone",
      "Website",
      "Company",
      "Phrase",
      "Bussiness",
    ];
    return (
      <thead>
        <tr>
          {theadArr.map((item, index) => (
            <th style={{ fontWeight: 700, padding: "0.5rem" }} key={index}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const TBodyComponent = () => {
    let curPageData = userData.slice(startIndex, endIndex);

    const TDComponent = ({ content }) => {
      return (
        <td style={{ padding: "0.5rem", fontSize: "0.8rem" }}>{content}</td>
      );
    };

    return (
      <tbody>
        {curPageData.map((item) => (
          <tr key={item.id}>
            <TDComponent content={item.id} />
            <TDComponent content={item.name} />
            <TDComponent content={item.username} />
            <TDComponent content={item.email} />
            <TDComponent
              content={`${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}`}
            />
            <TDComponent content={`${item.address.geo.lat}, ${item.address.geo.lng}`} />
            <TDComponent content={item.phone} />
            <TDComponent content={item.website} />
            <TDComponent content={item.company.name} />
            <TDComponent content={item.company.catchPhrase} />
            <TDComponent content={item.company.bs} />
          </tr>
        ))}
      </tbody>
    );
  };

  const PaginationComponent = () => {
    const clickPageNo = (curPage) => {
      setCurPage(curPage);
    };

    return (
      <div style={{ margin: "8px" }}>
        {Array.from({ length: totalPages }, (num, i) => {
          const isCurPage = (curPage === i+1)

          return (
            <button
              key={i}
              style={{
                padding: "4px 8px",
                border: "1px solid black",
                borderRadius: "8px",
                margin: "4px",
                fontSize:'14px',
                color: isCurPage ? 'white' : 'black',
                backgroundColor : isCurPage ? 'black' : 'white',
              }}
              onClick={() => {
                clickPageNo(i + 1);
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <h2 style={{ padding: "1rem", fontSize: "1.5rem", fontWeight: "bold" }}>
        使用者資料
      </h2>
      <table style={{ display: "block", overflowX: "scroll" }}>
        <THeadComponent />
        <TBodyComponent />
      </table>
      <PaginationComponent />
    </>
  );
}

export default App;

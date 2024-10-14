import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import "./assets/css/index.css";

function App() {
  const [data, setData] = useState([]);
  const [curPage, setCurPage] = useState(1);

  const pageSize = 5;
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (curPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const curPageData = data.slice(startIndex, endIndex);

  // 初始化取得資料
  useEffect(() => {
    const apiUrl = `https://jsonplaceholder.typicode.com/users`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const GridComponent = () => {
    return (
      <>
        <div className="overflow-x-auto p-4">
          <table className="mx-auto border border-black text-center">
            <thead>
              <tr className="border-b-[1px] border-solid border-black">
                <th className="border-r-[1px] border-black p-2">ID</th>
                <th className="border-r-[1px] border-black p-2">Name</th>
                <th className="border-r-[1px] border-black p-2">UserName</th>
                <th className="border-r-[1px] border-black p-2">Email</th>
                <th className="border-r-[1px] border-black p-2">Address</th>
                <th className="border-r-[1px] border-black p-2">Phone</th>
                <th className="border-r-[1px] border-black p-2">Website</th>
                <th className="border-r-[1px] border-black p-2">Company</th>
                <th className="border-r-[1px] border-black p-2">Phrase</th>
                <th className="border-r-[1px] border-black p-2">Bussiness</th>
              </tr>
            </thead>
            <tbody>
              {curPageData.map((user) => (
                <tr
                  className="border-b-[1px] border-solid border-black"
                  key={user.id}
                >
                  <td className="border-r-[1px] border-black p-2">{user.id}</td>
                  <td className="border-r-[1px] border-black p-2">
                    {user.name}
                  </td>
                  <td className="border-r-[1px] border-black p-2">
                    {user.username}
                  </td>
                  <td className="border-r-[1px] border-black p-2">
                    {user.email}
                  </td>
                  <td className="border-r-[1px] border-black p-2">{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</td>
                  <td className="border-r-[1px] border-black p-2">
                    {user.phone}
                  </td>
                  <td className="border-r-[1px] border-black p-2">
                    {user.website}
                  </td>
                  <td className="border-r-[1px] border-black p-2">
                    {user.company.name}
                  </td>
                  <td className="border-r-[1px] border-black p-2">
                    {user.company.catchPhrase}
                  </td>
                  <td className="border-r-[1px] border-black p-2">
                    {user.company.bs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const PaginationComponent = () => {
    const nextPage = () => {
      if (curPage < totalPages) {
        setCurPage(curPage + 1);
      } else {
      }
    };

    const lastPage = () => {
      if (curPage > 1) {
        setCurPage(curPage - 1);
      } else {
      }
    };

    const clickPageNo = (pageNo) => {
      setCurPage(pageNo);
    };
    return (
      <div className="mx-auto flex justify-center gap-2 p-4">
        <button
          className="inline-block rounded border-[1px] border-solid border-black px-4 py-2 text-black hover:border-gray-500 hover:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400"
          onClick={lastPage}
          disabled={curPage === 1}
        >
          上一頁
        </button>
        {Array.from({ length: totalPages }, (v, i) => (
          <button
            className={`inline-block rounded border-[1px] border-solid border-black px-4 py-2 hover:border-gray-500 hover:text-gray-500 ${curPage === i + 1 ? "bg-black text-white" : "bg-white text-black"} `}
            key={i}
            onClick={() => clickPageNo(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="inline-block rounded border-[1px] border-solid border-black px-4 py-2 text-black hover:border-gray-500 hover:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-400 disabled:text-gray-400"
          onClick={nextPage}
          disabled={curPage === totalPages}
        >
          下一頁
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <GridComponent />
        <PaginationComponent />
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
// import "./assets/css/index.css";

// json 物件範例
// {
//   "id": 1,
//   "name": "Leanne Graham",
//   "username": "Bret",
//   "email": "Sincere@april.biz",
//   "address": {
//   "street": "Kulas Light",
//   "suite": "Apt. 556",
//   "city": "Gwenborough",
//   "zipcode": "92998-3874",
//   "geo": {
//   "lat": "-37.3159",
//   "lng": "81.1496"
//    }
//   },
//   "phone": "1-770-736-8031 x56442",
//   "website": "hildegard.org",
//   "company": {
//   "name": "Romaguera-Crona",
//   "catchPhrase": "Multi-layered client-server neural-net",
//   "bs": "harness real-time e-markets"
//    }
// }

function Homework1() {
  const [userData, setUserData] = useState([]);
  const [curPageNo, setCurPage] = useState(1);

  const headers = [
    { text: "ID", key: "id" },
    { text: "Name", key: "name" },
    { text: "Username", key: "username" },
    { text: "Email", key: "email" },
    { text: "Address", key: "address" },
    { text: "Geo", key: "geo" },
    { text: "Phone", key: "phone" },
    { text: "Website", key: "website" },
    { text: "Company", key: "company" },
    { text: "Phrase", key: "phrase" },
    { text: "Bussiness", key: "bussiness" }
  ];

  const pageSize = 5;
  const totalRows = userData.length;

  useEffect(() => {
    const apiUrl = `https://jsonplaceholder.typicode.com/users`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // 為了正確對應 header，先把資料變成單層物件方便用屬性名稱取值
        let userData = data.map((item) => {
          return {
            ...item,
            address: `${item.address.street}, ${item.address.suite}, ${item.address.city}, ${item.address.zipcode}`,
            geo: `${item.address.geo.lat}, ${item.address.geo.lng}`,
            company: item.company.name,
            phrase: item.company.catchPhrase,
            bussiness: item.company.bs,
          };
        });

        setUserData(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Table 元件設計想法：
  // 會需要從外部接收的有，curPage (當前頁碼)、pageSize(顯示數量)、headers(表頭文字)、data(資料)
  // 表頭跟資料要做對應，可以用屬性名取值，所以 headers 改成物件 text 是顯示文字，key 用來對應 data 的物件屬性
  // 不過如果是多層巢狀的就不知道怎麼設計，目前想到的就是把 data 處理成單層物件，對應 headers 裡 key 
  const TableComponent = (props) => {
    const { curPageNo, pageSize, headers, data } = props;
    const startIndex = (curPageNo - 1) * pageSize;
    const endIndex = curPageNo * pageSize;
    const curPageData = data.slice(startIndex, endIndex);

    const THeadComponent = () => {
      return (
        <thead>
          <tr>
            {headers.map((item) => (
              <th style={{ fontWeight: 700, padding: "0.5rem" }} key={item.key}>
                {item.text}
              </th>
            ))}
          </tr>
        </thead>
      );
    };

    const TBodyComponent = (props) => {
      let data = props.data;

      const TDComponent = (props) => {
        const { content } = props;

        return (
          <td style={{ padding: "0.5rem", fontSize: "0.8rem" }}>{content}</td>
        );
      };

      return (
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
                {headers.map((header) => (
                  <TDComponent key={header.key} content={item[header.key]} />
                ))}
            </tr>
          ))}
        </tbody>
      );
    };

    return (
      <>
        <table style={{ display: "block", overflowX: "scroll" }}>
          <THeadComponent headers={headers} />
          <TBodyComponent data={curPageData} />
        </table>
      </>
    );
  };

  // Pagination 元件設計想法：
  // 分頁用 curPage(當前頁碼)、pageSize(顯示數量)、totalRows(總筆數) 做計算和渲染，所以這些從外部傳進來
  // 點擊頁碼要改變當前頁面這個不知道怎麼改，現在都在同一個 jsx 檔，可以直接用全域 curPage 的 setCurPage 處理
  // 但拆成元件的話(如果是不同jsx檔的話)不知道狀態管理怎麼做
  const PaginationComponent = (props) => {
    const { curPageNo, pageSize, totalRows } = props;
    const totalPages = Math.ceil(totalRows / pageSize);

    const clickPageNo = (curPageNo) => {
      setCurPage(curPageNo);
    };

    return (
      <div style={{ margin: "8px" }}>
        {Array.from({ length: totalPages }, (num, i) => {
          const isCurPage = curPageNo === i + 1;

          return (
            <button
              key={i}
              style={{
                padding: "4px 8px",
                border: "1px solid black",
                borderRadius: "8px",
                margin: "4px",
                fontSize: "14px",
                color: isCurPage ? "white" : "black",
                backgroundColor: isCurPage ? "black" : "white",
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
      <TableComponent
        headers={headers}
        curPageNo={curPageNo}
        pageSize={pageSize}
        data={userData}
      />
      <PaginationComponent
        curPageNo={curPageNo}
        pageSize={pageSize}
        totalRows={totalRows}
      />
    </>
  );
}

export default Homework1;

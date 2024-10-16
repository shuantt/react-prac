import { useState } from "react";

const PaginationComponent = (props) => {
    const {curPageProps, totalPagesProps} = props;

    const clickPageNo = (curPage) => {
      setCurPage(curPage);
    };

    return (
      <div style={{ margin: "8px" }}>
        {Array.from({ length: totalPagesProps }, (num, i) => {
          const isCurPage = (curPageProps === i+1)

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

  export default PaginationComponent;
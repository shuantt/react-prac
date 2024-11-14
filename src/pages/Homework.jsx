import { Link } from "react-router-dom";

const Homework = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">作業目錄</h2>
      <div className="text-start">
        <ul className="space-y-2">
          <li>
            作業1:
            <Link to="/homework/1" className="text-link underline">
              表格和分頁設計
            </Link>
          </li>
          <li>
            作業2:
            <Link to="/homework/2" className="text-link underline">
              表單元件設計:輸入框、下拉選單、多選、單選
            </Link>
          </li>
          <li>作業3:頁面轉跳、DefaultComponent 運用</li>
          <li>
            作業4:
            <Link to="/contextPractice" className="text-link underline">
              useContext練習
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Homework;

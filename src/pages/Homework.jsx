const Homework = () => {
  return (
    <div>
      <h2>作業目錄</h2>
      <div className="text-start">
        <ul className="space-y-2">
          <li>
            作業1-
            <a href="/homework1" className="text-primary underline">
              表格和分頁設計
            </a>
          </li>
          <li>
            作業2-
            <a href="/homework2" className="text-primary underline">
              表單元件設計:輸入框、下拉選單、多選、單選
            </a>
          </li>
          <li>
            作業3-頁面轉跳、DefaultComponent 運用
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Homework;
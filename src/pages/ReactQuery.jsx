import {
  QueryClient,
  useQueryClient,
  QueryClientProvider,
  useQuery,
} from "react-query";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 當視窗聚焦時不重新發送請求
    },
  },
});

const fetchUser = async (userId) => {
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  const result = await data.json();
  return result;
};

const User = () => {
  const [userId, setUserId] = useState(1);
  const [msg, setMsg] = useState("");
  const { isLoading, error, data } = useQuery(
    [userId],
    () => fetchUser(userId),
    {
      keepPreviousData: true, // 不保留前一次的資料(會出現loading)
      retry: 3, // 失敗重試3次
      retryDelay: 1000, // 1秒後重新發送
      staleTime: 5000, // 5秒內不會重新發送請求
      cacheTime: 5000, // 5秒後刷新快取
    },
  );

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">使用者名稱</h2>
      <div>
        <span className="font-bold">使用者編號:</span> {data.id}
      </div>
      <div>
        <span className="font-bold">名字:</span> {data.name}
      </div>
      <button
        className="mr-2 rounded bg-black p-2 text-white"
        onClick={() => {
          setUserId((pre) => {
            if (pre === 1) {
              setMsg("已經是第一個使用者了");
              return pre;
            } else {
              setMsg("");
              return pre - 1;
            }
          });
        }}
      >
        Previous User
      </button>
      <button
        className="mr-2 rounded bg-black p-2 text-white"
        onClick={() => {
          setUserId((pre) => {
            if (pre === 10) {
              setMsg("已經是最後一個使用者了");
              return pre;
            } else {
              setMsg("");
              return pre + 1;
            }
          });
        }}
      >
        Next User
      </button>
      <div className="text-danger">{msg}</div>
    </div>
  );
};

const ReactQuery = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <User />
    </QueryClientProvider>
  );
};

export default ReactQuery;

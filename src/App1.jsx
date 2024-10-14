import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const StateComponent = () => {
    let [count, setCount] = useState(0);
    useEffect(() => {
      // console.log("useEffect called in StateComponent");
      // console.log("count 變動，count:" + count);
    }, [count]);

    const normalAddCount = () => {
      count++;
      console.log("normalAddCount called, count: ", count);
    }

    return (
      <>
        <h3>This is StateComponent</h3>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Add count</button>
        <button onClick={normalAddCount}>直接+1</button>
        <hr></hr>
      </>
    );
  };

  const RefComponent = () => {
    const [count, setCount] = useState(1);
    const countRef = useRef(5);
    const addCount = () => {
      // console.log("addCount called");

      // 目前兩個都寫，因為 count 是 state，會重新渲染，因此 countRef.current 也會被重新渲染
      // countRef 的生命週期會跟著 component 的生命週期，因此重新渲染後，值會一直被記錄
      setCount(count + 1);
      countRef.current += 1;

      // 這樣寫，countRef.current 的值會變動，但畫面不會被重新渲染
      // countRef.current += 1

      // 這樣寫 count 改變，countRef.current 會一直維持 5，不會變動
      // setCount(count + 1)

      // console.log("count: " + count);
      // console.log("countRef: " + countRef.current);
    };
    return (
      <>
        <h3>This is RefComponent</h3>
        <p>Count: {count}</p>
        <p>countRef: {countRef.current}</p>
        <button onClick={addCount}>Add count</button>
        <hr></hr>
      </>
    );
  };

  // const [userData, setUserData] = useState([]);
  const userData = [];

  useEffect(() => {
    console.log("useEffect called in App", userData);
    // const data = [];
    // data.push({ name: "John", age: 20 });
    // data.push({ name: "Tom", age: 25 });
    // data.push({ name: "Jane", age: 30 });
    // setUserData(data);
    // userData.push({ name: "John", age: 20 });
    // userData.push({ name: "Tom", age: 25 });
    // userData.push({ name: "Jane", age: 30 });
  }, [userData]);

  let newId = useRef(0);
  const addUser = () => {
    console.log('addUser called');
    newId.current++;
    userData.push({ id: newId.current, name: "New User", age: 0 });
    console.log(userData);
    const updatedUserData = [...userData, { id: newId.current, name: "New User", age: 0 }];

    // setUserData(() => { return [...userData, { id:newId.current , name: "New User", age: 0 }] });
  }

  const MapComponent = ({ user }) => {
    return (
      <>
        <h3>
          Name: {user.name}, Age: {user.age}
        </h3>
      </>
    );
  };

  return (
    <>
      <StateComponent />
      <RefComponent />
      <h3>This is UserData List</h3>
      {userData.map((user) => (
        <MapComponent key={user.id} {...{ user }} />
      ))}
      <button onClick={addUser}>Add User</button>
      <hr></hr>
    </>
  );
}

export default App;

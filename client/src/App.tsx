import React, { useEffect, useState } from "react";
import Todoe from "./component/todo";
import CTodo from "./component/ctodo";
import Input from "./component/InputField";
import "./App.css";
import axios from "axios";
const baseurl = "http://localhost:5000";
interface Todo {
  id: number;
  status: string;
  content: string;
  createdAt: Date;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const post = () => {
      axios.get<Todo[]>(`${baseurl}/get`).then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    };
    post();
  }, [todos]);

  // async function get() {
  //   let d = await getAll();
  //   // setTodos(d);
  //   console.log('todos', d);
  // }
  // get();
  // const todo = async () => {
  //   let data = await fetch(`${process.env.REACT_APP_BASEURL}/getAll`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   console.log("dd: ", data);
  // };
  // todo();

  return (
    <>
      <div className="flex flex-col min-h-screen h-full w-screen items-center py-8 px-16">
        <div className="pb-4">
          <h1 className="text-3xl font-semibold">Welcome, #user📝</h1>
        </div>
        <div>
          <div className="mb-4">
            <Input />
          </div>
        </div>
        <div className="mx-10 w-full h-[72vh] grid grid-cols-3 gap-5 p-2 border border-b-2">
          <div className="w-full h-full bg-red-100 flex flex-col p-1 overflow-y-scroll">
            <div className="py-1 w-full flex items-center justify-center font-medium text-lg">
              <h1>Pending</h1>
            </div>
            <div className="overflow-y-scroll h-full sc p-3">
              {todos.filter((data) => data.status === "Pending").map((data) => (
                <div key={data.id}>
                  <Todoe todoData={data} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[70vh] bg-blue-100  flex flex-col p-1 overflow-y-scroll">
            <div className="py-1 w-full flex items-center justify-center font-medium text-lg">
              <h1>In progress</h1>
            </div>
            <div className="overflow-y-scroll h-full sc p-3">
            {todos.filter((data) => data.status === "In Progress").map((data) => (
              <div key={data.id}>
                <Todoe todoData={data}/>
              </div>
            ))}
            </div>
          </div>
          <div className="w-full h-[70vh] bg-green-100   flex flex-col p-1 overflow-y-scroll">
            <div className="py-1 w-full flex items-center justify-center font-medium text-lg">
              <h1>Completed</h1>
            </div>
            <div className="overflow-y-scroll h-full sc p-3">
            {todos.filter((data) => data.status === "Completed").map((data) => (
              <div key={data.id}>
                <CTodo todoData={data} />
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

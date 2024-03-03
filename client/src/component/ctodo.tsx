import React from "react";
import { remove } from "../api";
interface Todo {
  id: number;
  status: string;
  content: string;
  createdAt: Date;
}
interface todoData {
  todoData: Todo;
}

function todo(data: todoData) {
  const handleDelete = async () => {
    await remove(data.todoData.id);
  };
  return (
    <div className="flex flex-row border-t-2 border-black justify-between w-full bg-transparent min-h-20  mb-3 items-center px-1 gap-1">
      <div className="h-full w-1/12">
        <h1>🟢</h1>
      </div>
      <div className="w-10/12 h-full flex flex-col flex-wrap">
        <input
          readOnly
          value={data.todoData.content}
          className="bg-transparent outline-none text-lg cursor-pointer text-medium mb-1 min-h-min text-wrap"
        ></input>
        <p className="text-sm">{data.todoData.createdAt.toString().substring(0, 10)}</p>
      </div>
      <div className="w-1/12 flex h-full flex-row justify-end text-xl">
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
}

export default todo;

import React from "react";
import { remove } from "../api";
interface Todo {
  id: number;
  status: string;
  content: string;
  createdAt: Date;
}
interface todoData{
  todoData: Todo
}



function todo(data: todoData) {
  const handleDelete = async() => {
    await remove(data.todoData.id);
  }
  return (
    <div className="flex flex-row justify-between w-full min-h-20 bg-orange-200 mb-3 items-center px-1 gap-1">
      <div className="w-11/12 h-full bg-white flex flex-col">
        <input readOnly value={data.todoData.content}></input>
        <p>{data.todoData.createdAt.toString().substring(0,10)}</p>
      </div>
      <div className="w-1/12 flex h-full flex-row justify-end text-xl">
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
}

export default todo;

import React, { useState } from "react";
import { update, remove } from "../api";
interface Todo {
  id: number;
  status: string;
  content: string;
  createdAt: Date;
}
interface todoData{
  todoData: Todo
}

function Todo(data: todoData) {
  const [content, setContent] = useState<string>(data.todoData.content);
  const [editContent, setEditContent] = useState<string>('');
  const [editable, setEditable] = useState<boolean>(false);

  const handleEditClick = () => {
    if(editable){
      setEditContent('');
    }
    else{
      setEditContent(content);
    }
    setEditable(!editable);
  }

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      setContent(editContent);
      let updatedData: Todo = {
        id: data.todoData.id,
        status: data.todoData.status,
        content: editContent,
        createdAt: data.todoData.createdAt

      }
      update(data.todoData.id, updatedData);
      setEditable(false);
    }
  }

  const handleStatus = async() => {
    let updatedData: Todo = {
      id: data.todoData.id,
      status: data.todoData.status === "Pending"? "In Progress": "Completed",
      content: data.todoData.content,
      createdAt: data.todoData.createdAt
    }
    await update(data.todoData.id, updatedData);
  }

  const handleDelete = async() => {
    await remove(data.todoData.id);
  }
  return (
    <div className="flex flex-row justify-between w-full min-h-20 bg-orange-200 mb-3 items-center px-1 gap-1">
      <div className="w-9/12 h-full bg-white flex flex-col">
        <input type="text" value={editable?editContent: content} onChange={(e) => setEditContent(e.target.value)} readOnly = {!editable} onKeyDown={handleEnterPress}></input>
        <p>{data.todoData.createdAt.toString().substring(0,10)}</p>
      </div>
      <div className="w-3/12 flex h-full flex-row justify-end gap-2 text-xl">
        <button onClick={handleStatus}>➡️</button>
        <button onClick={handleEditClick}>{!editable? '✏️': '❌'}</button>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
}

export default Todo;

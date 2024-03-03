import React, { useState } from "react";
import "./style.css";
import { create } from "../api";
export default function Input() {
  const [data, setData] = useState("");
  interface Todo {
    status: string;
    content: string;
  }
  const handleSubmit = () => {
    if (data.trim() !== "") {
      const jsonData: Todo = { status: "Pending", content: data };
      create(jsonData);
      setData("");
    }
  };
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <>
      <div className="input bg-transparent ">
        <input
          type="text"
          placeholder="Enter your Task Here..."
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="bg-transparent placeholder-black "
          onKeyDown={handleEnterPress}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="hover:bg-purple-200"
        >
          Add Task
        </button>
      </div>
    </>
  );
}

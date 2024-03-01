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
  return (
    <>
      <div className="input">
        <input
          type="text"
          placeholder="Enter your Task Here..."
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Add Task
        </button>
      </div>
    </>
  );
}

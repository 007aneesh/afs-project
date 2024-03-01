import React from "react";

function todo() {
  return (
    <div className="flex flex-row justify-between w-full min-h-20 bg-orange-200 mb-3 items-center px-1 gap-1">
      <div className="w-11/12 h-full bg-white flex flex-col">
        <input readOnly value="Content"></input>
        <p>Date</p>
      </div>
      <div className="w-1/12 flex h-full flex-row justify-end text-xl">
        <button>🗑️</button>
      </div>
    </div>
  );
}

export default todo;

import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

function TaskItem({ task, delItem }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="task-item"
      style={{
        color: checked && "grey",
        textDecoration: checked && "line-through",
      }}
    >
      <input type="checkbox" onClick={(e) => setChecked(e.target.checked)} />
      <p>{task.name}</p>
      <p>{task.desc}</p>
      <p>{task.completed}</p>
      <button
        onClick={() => delItem(task.name)}
        style={{ border: "none", color: checked ? "grey" : "red" }}
      >
        <FaRegTrashAlt />
      </button>
    </div>
  );
}

export default TaskItem;

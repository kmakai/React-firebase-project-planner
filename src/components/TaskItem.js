import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

function TaskItem({ task, delItem, checkhandle }) {
  const [checked, setChecked] = useState(task.completed);

  return (
    <div
      className="task-item"
      style={{
        color: checked && "grey",
        textDecoration: checked && "line-through",
      }}
    >
      <input
        type="checkbox"
        checked={checked ? true : false}
        onClick={(e) => {
          setChecked(e.target.checked);
          checkhandle(task, e.target.checked);
        }}
        onChange={(e) => {}}
      />
      <p>{task.name}</p>
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

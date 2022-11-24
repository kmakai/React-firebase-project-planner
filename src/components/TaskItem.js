import React from "react";

function TaskItem({ task, delItem }) {
  return (
    <div>
      <p>{task.name}</p>
      <p>{task.desc}</p>
      <p>{task.completed}</p>
      <button onClick={() => delItem(task.name)}>remove</button>
    </div>
  );
}

export default TaskItem;

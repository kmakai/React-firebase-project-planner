import React from "react";

function TaskItem({ task }) {
  return (
    <div>
      <p>{task.name}</p>
      <p>{task.desc}</p>
      <p>{task.completed}</p>
    </div>
  );
}

export default TaskItem;

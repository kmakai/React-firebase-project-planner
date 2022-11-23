import React from "react";
import TaskItem from "./TaskItem";

function Tasklist({ tasks }) {
  return (
    <div>
      {tasks.length ? (
        tasks.map((t) => <TaskItem task={t} />)
      ) : (
        <p>no tasks on this project</p>
      )}
    </div>
  );
}

export default Tasklist;

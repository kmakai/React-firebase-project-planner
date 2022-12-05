import React from "react";
import TaskItem from "./TaskItem";
import "../styles/Tasklist.css";

function Tasklist({ tasks, delTask, handleChecked }) {
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((t, ind) => (
          <TaskItem
            task={t}
            key={ind}
            delItem={delTask}
            checkhandle={handleChecked}
          />
        ))
      ) : (
        <strong>no tasks on this project</strong>
      )}
    </div>
  );
}

export default Tasklist;

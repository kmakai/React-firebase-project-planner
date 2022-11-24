import React from "react";
import TaskItem from "./TaskItem";

function Tasklist({ tasks, delTask }) {
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((t, ind) => <TaskItem task={t} key={ind} delItem={delTask} />)
      ) : (
        <p>no tasks on this project</p>
      )}
    </div>
  );
}

export default Tasklist;

import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import "../styles/Projectlist.css";

function ProjectsList({ projects, activeHandle, del }) {
  return (
    <div>
      <ul onClick={activeHandle} className="project-list-ul">
        {projects &&
          projects.map((p, ind) => (
            <li key={ind} id={p.id}>
              <button style={{ border: "none", color: "red" }} onClick={del}>
                <FaRegTrashAlt />
              </button>
              {p.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ProjectsList;

import React from "react";

function ProjectsList({ projects, activeHandle }) {
  return (
    <div>
      <ul onClick={activeHandle}>
        {projects &&
          projects.map((p, ind) => (
            <li key={ind} id={p.id}>
              {p.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ProjectsList;

import type { Project } from "../../types";
import ProjectCard from "./ProjectCard";

const ProjectsGrid = ({ projects }: { projects: Project[] }) => {
  return (
    // Projects Grid
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-8 mt-10">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsGrid;

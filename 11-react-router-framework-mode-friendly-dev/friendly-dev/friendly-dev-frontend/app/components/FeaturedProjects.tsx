import type { Project } from "../../types";
import ProjectsGrid from "./ProjectsGrid";

const FeaturedProjects = ({ projects }: { projects: Project[] }) => {
  if (projects.length === 0) return null;
  return (
    <section>
      <h1 className="font-bold text-3xl">🌟Featured Projects</h1>
      <ProjectsGrid projects={projects} />
    </section>
  );
};

export default FeaturedProjects;

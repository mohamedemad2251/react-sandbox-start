import { Link } from "react-router";
import type { Project } from "../../types";

const ProjectCard = ({ project }: { project: Project }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // console.log(`${import.meta.env.BASE_URL}images/no-image.png`);
  // console.log(project.image.url);
  return (
    <Link
      to={`/projects/${project.documentId}`}
      className="w-full bg-gray-800 rounded-md hover:scale-[1.02] transition-transform duration-300"
    >
      {/* First Flex Item: Image */}
      <div className="relative w-full aspect-[3]">
        <img
          src={
            project.image
              ? project.image.url
              : `${import.meta.env.BASE_URL}images/no-image.png`
          }
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Second Flex Item: Info */}
      <div className="flex flex-col gap-2 p-5">
        <h2 className="font-semibold text-2xl text-blue-400">
          {project.title}
        </h2>
        <p>{project.description}</p>
        <div className="flex justify-between items-center text-gray-400">
          <p>{project.category}</p>
          <p>{new Date(project.date).toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;

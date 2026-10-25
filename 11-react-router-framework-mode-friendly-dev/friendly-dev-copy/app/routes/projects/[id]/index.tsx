import { Link } from "react-router";
import type { Project } from "../../../../types";
import type { Route } from "./+types";

// For learning purposes, we'll use a client loader to fetch the data (i.e. Client-Side Fetching) to be able to utilize as much concepts as possible and to show the HydrationFallback we talked about before (check /projects/index.tsx)
// NOTE: This is the exact same as using a useEffect() to fetch + useState for isLoading but this is much cleaner since this doesn't use react's overhead. It's done client-side fully from react-router instead. But both works. Keep in mind that loader() (i.e. if ssr: true for react-router and loader() means SSR) has NOTHING to do with this method and useEffect() + useState() do NOT replace it.
export async function clientLoader({
  params,
}: Route.ClientLoaderArgs): Promise<Project> {
  // NOTE: I should make a try...catch but since the data is static in data/db.json and always served, I'll refrain from that for now.
  const response = await fetch(`http://localhost:8000/projects/${params.id}`);
  const data = (await response.json()) as Promise<Project>;
  return data;
}

// HydrateFallback is rendered while the client loader is running
// NOTE: Just like loader() and clientLoader(), HydrateFallback() is a special name for a special component. It needs to be named exactly that way in order to function for react-router
export function HydrateFallback() {
  return <div>Loading...</div>;
}

const ProjectDetailsPage = ({ loaderData: project }: Route.ComponentProps) => {
  return (
    <section>
      <Link
        to="/projects"
        className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
      >
        ← Back To Projects
      </Link>
      <div className="flex md:flex-row flex-col gap-5 mt-10">
        <div className="relative flex-1 h-40 rounded">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="font-bold text-3xl text-blue-500">{project.title}</h1>
          <p className="text-sm text-gray-400">
            {new Date(project.date).toLocaleDateString()} • {project.category}
          </p>
          <p>{project.description}</p>
          {/* Since this is outside of our localhost (external domain), we use the anchor element */}
          <a
            href={project.url}
            className="inline-block max-w-[180px] bg-blue-600 hover:bg-blue-700 text-white transition duration-250 px-6 py-2 text-center  rounded-md"
          >
            View Live Site →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsPage;

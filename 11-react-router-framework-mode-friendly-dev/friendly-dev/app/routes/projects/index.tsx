// This import type is used to import the Route namespace so that TypeScript doesn't complain about Route.ComponentProps. Remember that you have these main directories that TypeScript read from (refer to tsconfig.json):
// "**/*",
// "**/.server/**/*",
// "**/.client/**/*",
// ".react-router/types/**/*"

// So the Route here refers to .react-router/types/app/routes/projects/+types/index.ts (** from line 5 represents app/routes/projects/)
import type { Route } from "./+types";
import type { Project } from "../../../types";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import ProjectCategoryFilter from "~/components/ProjectCategoryFilter";
import ProjectsGrid from "~/components/ProjectsGrid";

// Loaders are methods used while navigating/routing. They can be server-side/client-side/statically-loaded to fetch data. Here are some main points I've harnessed about them so far:
// 1- Server-Side Loading/Fetching: The trending way of fetching. Basically, when the url is requested by the client, the server proceeds to FETCH the data itself, then servers the HTML/CSS/JS with the data intact. Meaning, the only network transmission is the client requesting the page. It's as if the client fetched a static page with no dynamic data.
// 2- Client-Side Loading/Fetching: The basic HTML/CSS is fetched by the client then the client fetches via his network the data requested. That results in what we call hydration, where the pre-fetching occurs by server, server sends the HTML/CSS incomplete, then the client completes it by fetching the data. This causes 2 main aspects: a) Slower loading since the client takes more time to fetch the data, b) causes Hydration Fallback which is showing a loading/skeleton so that the client have better UI/UX before the page fully loads up.
// 3- Static Loading/Fetching: The data is already fetched on the server ON EVERY BUILD. The problem with that is that the data will always be in sync with the building time. So, for example, if my last building process was in 2025 (somehow), the data fetched and showed on the website will be from 2025. Depending on the situation, this data can be out-dated or perfect for the current needs. Static loading/fetching  is the fastest way since you treat the HTML/CSS as static entirely and therefore, no fetching occurs except on build

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Friendly Dev | Projects" },
    {
      name: "description",
      content: "Showcasing projects and portfolio in Friend Dev",
    },
  ];
}

// Loader returns any (because response.json() returns any). So you can:
// 1- Provide an explicit return type of Promise<Projects>
// 2- Type out "data" as Project[]
// NOTE: The loader()'s type is Project[] | undefined because you've used try...catch
export async function loader() {
  try {
    const response = await fetch("http://localhost:8000/projects");
    if (!response.ok) {
      throw new Error("Error fetching projects");
    }
    const data: Project[] = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const getUnique = (arr: string[]) => {
  return [...new Set(arr)];
};

// react-router can detect that we've used server-side loader() so now ComponentProps's loaderData reflect to Project[] | undefined
// NOTE: It is wise that if we have other pieces of data, we return (in the loader()) projects as an object to be able to have multiple objects inside loaderData that we can utilize
export default function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const projects = loaderData;

  if (projects === undefined) {
    return (
      <section>
        {/* Heading */}
        <h1 className="font-bold text-3xl">🚀 Projects</h1>
        <p className="w-full h-full mt-5">No projects found.</p>
      </section>
    );
  }

  const [currentPage, setCurrentPage] = useState<number>(1);

  const allCategories: string[] = projects.map((project) => project.category);
  const categories = ["All", ...getUnique(allCategories)];
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");

  const PER_PAGE = 4;

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const totalPages = Math.ceil(filteredProjects.length / PER_PAGE);

  // Get projects in current page starting from first item in page till the last one
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * PER_PAGE,
    (currentPage - 1) * PER_PAGE + PER_PAGE,
  );

  return (
    <section>
      {/* Heading */}
      <h1 className="font-bold text-3xl">🚀 Projects</h1>
      <ProjectCategoryFilter
        categories={categories}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
        setCurrentPage={setCurrentPage}
      />
      {/* Projects Grid */}
      <ProjectsGrid projects={currentProjects} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}

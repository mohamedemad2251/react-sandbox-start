import FeaturedProjects from "~/components/FeaturedProjects";
import type { Route } from "./+types/index";
import type { PostMeta, Project } from "../../../types";
import AboutSection from "./components/AboutSection";
import type { LoaderFunctionArgs } from "react-router";
import FeaturedBlogs from "~/components/FeaturedBlogs";

// Metadata is defined per page (or at layout-layer for fallback) to show a specific title per page and for better SEO (used for google searches)

// Keep in mind that since this is an SSR-based project (Server-Side Rendering), Google and other search engines can indeed find/get the populated html documents (i.e. index.html, etc.) since they're rendered on the server and not on the client. This is great because SEO actually finds the most relevant pages that would give the user what he's looking for. So that's why meta is important here. Remember that in CSR (Client-Side Rendering), SEO gets an EMPTY page (i.e. empty index.html, etc.), therefore, it gives that page a lower priority for search engines because, well, it has no idea what the page is for or what content it has. So if you're focusing on SEO, go for SSR's.
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Friendly Dev | Home" },
    { name: "welcome", content: "Welcome to Friendly Dev!" },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  let concatData: {
    projects: Project[];
    blogs: PostMeta[];
  } = {
    projects: [],
    blogs: [],
  };
  try {
    const response = await fetch("http://localhost:8000/projects");
    if (!response.ok) {
      throw new Error("Error fetching projects");
    }
    const data: Project[] = await response.json();
    concatData = {
      ...concatData,
      projects: data,
    };
  } catch (error) {
    console.log(error);
  }

  try {
    const blogsUrl = new URL("/posts-meta.json", request.url);
    const response = await fetch(blogsUrl.href);

    if (!response.ok) {
      throw new Error("Error fetching blogs");
    }

    const data: PostMeta[] = await response.json();

    concatData = {
      ...concatData,
      blogs: data,
    };
  } catch (error) {
    console.log(error);
  }

  return concatData;
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { projects, blogs } = loaderData;

  const featuredProjects = projects?.filter(
    (project) => project.featured === true,
  );

  // Make it 2 only for now
  const featuredBlogs = blogs.slice(0, 2);

  return (
    <>
      {featuredProjects && <FeaturedProjects projects={featuredProjects} />}
      <AboutSection />
      {featuredBlogs && <FeaturedBlogs blogs={featuredBlogs} />}
    </>
  );
}

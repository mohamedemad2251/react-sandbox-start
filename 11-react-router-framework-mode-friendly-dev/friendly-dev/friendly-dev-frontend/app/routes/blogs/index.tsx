import PostMetaCard from "~/components/PostMetaCard";
import type { Post, StrapiResponse } from "../../../types";
import type { Route } from "./+types";
import Pagination from "~/components/Pagination";
import { useState } from "react";
import BlogsFilter from "~/components/BlogsFilter";

export async function loader({ request }: Route.LoaderArgs) {
  // NOTE: Our configuration is SSR enabled (i.e. Server-Side). Therefore, there IS no URL constructed. The URL is made on the browser which is client side. Loader has request.url to get the URL of the requested page (in this case, it's http://localhost:5173/blogs). We simply create a new URL with destination of "/posts-meta.json" (NOTE: the "/" means we will REPLACE any post-origin string with whatever we have in the destination). First param = destination, second = base.
  // const url = new URL("/posts-meta.json", request.url);
  // const response = await fetch(url);
  // if (response.ok) {
  //   const data: Post[] = await response.json();
  //   return {
  //     posts: data.sort(
  //       (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  //     ),
  //   };
  // } else {
  //   throw new Error("Failed to fetch blogs");
  // }

  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    const { data, meta }: StrapiResponse<Post> = await response.json();

    return { posts: data };
  } catch (error) {
    console.log(error);
  }
}

export default function BlogsPage({ loaderData }: Route.ComponentProps) {
  const posts = loaderData?.posts;

  if (!posts) {
    return (
      <section className="bg-gray-900 p-5">
        <p>No posts found.</p>
      </section>
    );
  }

  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts =
    searchQuery.trim().length > 0
      ? posts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : posts;

  const PER_PAGE = 2;

  const totalPages = Math.ceil(filteredPosts.length / PER_PAGE);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * PER_PAGE,
    (currentPage - 1) * PER_PAGE + PER_PAGE,
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <section className="bg-gray-900 p-5">
      <h1 className="font-bold text-3xl mb-5">📝 Blogs</h1>
      <BlogsFilter onSearch={handleSearch} />
      <ul className="flex flex-col gap-4">
        {currentPosts.map((post) => (
          <PostMetaCard key={post.id} post={post} />
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}

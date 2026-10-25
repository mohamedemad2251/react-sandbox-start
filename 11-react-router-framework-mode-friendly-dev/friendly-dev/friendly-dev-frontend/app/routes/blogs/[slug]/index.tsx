import { Link } from "react-router";
import type { Post, PostResponse, StrapiResponse } from "../../../../types";
import type { Route } from "./+types";
import ReactMarkdown from "react-markdown";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;
  const API_URL = import.meta.env.VITE_API_URL;
  // const url = new URL("/posts-meta.json", request.url);

  // const response = await fetch(url);

  // if (!response.ok) throw new Error("Failed to fetch blog");

  // const data: Post[] = await response.json();

  // const postMeta = data.find((postMeta) => postMeta.slug === slug);
  // if (!postMeta) throw new Response("Post Meta not found", { status: 404 });

  // NOTE: Since the metadata of the posts originate from /public, we can access it through the URL as it's accessible to any user. Hence we've used fetch(). However, now we're loading markdown/data/module from a file that is NOT accessible to the user, hence we used "dynamic importing"
  // const { default: post } = await import(`../../../posts/${slug}.md?raw`);

  try {
    const response = await fetch(`${API_URL}/posts/${slug}?populate=*`);

    const { data, meta }: PostResponse = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch blog");
    }

    console.log(data);

    return { post: data };
  } catch (error) {
    console.log(error);
  }
}

const BlogDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const post = loaderData?.post;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  if (!post) {
    return (
      <section className="bg-gray-900 p-6">
        <p>Failed to fetch blog.</p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gray-900 p-6">
        <h1 className="font-bold text-3xl text-blue-500 mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-7">
          {new Date(post.date).toDateString()}
        </p>
        {/* Max W None makes the content take the full width (I don't know why) */}
        <article className="max-w-none prose prose-invert mb-8">
          <img
            className="w-full aspect-[2] object-center object-cover"
            src={
              post.image
                ? post.image.url
                : `${import.meta.env.BASE_URL}images/no-image.png`
            }
            alt={post.excerpt}
          />
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </article>
        <Link
          to="/blogs"
          className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition-colors"
        >
          ← Back To Blogs
        </Link>
      </section>
    </>
  );
};

export default BlogDetailsPage;

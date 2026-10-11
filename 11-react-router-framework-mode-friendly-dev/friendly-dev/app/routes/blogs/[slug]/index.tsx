import { Link } from "react-router";
import type { PostMeta } from "../../../../types";
import type { Route } from "./+types";
import ReactMarkdown from "react-markdown";

export async function loader({ request, params }: Route.LoaderArgs): Promise<{
  postMeta: PostMeta;
  post: string;
}> {
  const { slug } = params;
  const url = new URL("/posts-meta.json", request.url);

  const response = await fetch(url);

  if (!response.ok) throw new Error("Failed to fetch blog");

  const data: PostMeta[] = await response.json();

  const postMeta = data.find((postMeta) => postMeta.slug === slug);
  if (!postMeta) throw new Response("Post Meta not found", { status: 404 });

  // NOTE: Since the metadata of the posts originate from /public, we can access it through the URL as it's accessible to any user. Hence we've used fetch(). However, now we're loading markdown/data/module from a file that is NOT accessible to the user, hence we used "dynamic importing"
  const { default: post } = await import(`../../../posts/${slug}.md?raw`);

  return { postMeta: postMeta, post: post };
}

const BlogDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { postMeta, post } = loaderData;
  return (
    <>
      <section className="bg-gray-900 p-6">
        <h1 className="font-bold text-3xl text-blue-500 mb-2">
          {postMeta.title}
        </h1>
        <p className="text-sm text-gray-500 mb-7">{new Date(postMeta.date).toDateString()}</p>
        {/* Max W None makes the content take the full width (I don't know why) */}
        <article className="max-w-none prose prose-invert mb-8">
          <ReactMarkdown>{post}</ReactMarkdown>
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

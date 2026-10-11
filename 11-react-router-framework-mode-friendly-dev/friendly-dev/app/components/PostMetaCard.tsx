import { Link } from "react-router";
import type { PostMeta } from "../../types";

const PostMetaCard = ({ post }: { post: PostMeta }) => {
  return (
    <article className="bg-gray-800 rounded shadow p-6">
      <h3 className="font-bold text-2xl text-blue-400">{post.title}</h3>
      <p className="text-sm text-gray-400">
        {new Date(post.date).toDateString()}
      </p>
      <p className="my-3">{post.excerpt}</p>
      <Link
        className="text-blue-300 hover:text-blue-400 transition-colors"
        to={`/blogs/${post.slug}`}
      >
        Read More →
      </Link>
    </article>
  );
};

export default PostMetaCard;

import type { Post } from "../../types";
import PostMetaCard from "./PostMetaCard";

const FeaturedBlogs = ({ blogs }: { blogs: Post[] }) => {
  return (
    <section className="my-8">
      <h1 className="font-bold text-3xl mb-3">🌟Featured Blogs</h1>
      <ul className="flex flex-wrap items-center gap-3">
        {blogs.map((blog) => (
          <li key={blog.id}>
            <PostMetaCard post={blog} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturedBlogs;

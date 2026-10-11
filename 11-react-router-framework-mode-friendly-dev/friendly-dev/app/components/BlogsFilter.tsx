import { useRef } from "react";

const BlogsFilter = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if ref is null or the field is empty
    if (!inputRef.current) return;

    onSearch(inputRef.current.value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center mb-5">
      <input
        ref={inputRef}
        type="text"
        name="search-query"
        id="search-query"
        className="bg-gray-600 rounded p-2"
      />
      <button
        className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer"
        type="submit"
      >
        Search 🔍
      </button>
    </form>
  );
};

export default BlogsFilter;

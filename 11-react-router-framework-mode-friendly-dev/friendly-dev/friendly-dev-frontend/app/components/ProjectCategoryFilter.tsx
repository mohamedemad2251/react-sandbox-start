type ProjectCategoryFilterProps = {
  categories: string[];
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
const ProjectCategoryFilter = ({
  categories,
  activeCategory,
  setActiveCategory,
  setCurrentPage,
}: ProjectCategoryFilterProps) => {
  return (
    <ul className="flex items-center gap-3 mt-4">
      {categories.map((category) => (
        <li key={category}>
          <button
            onClick={() => {
              setActiveCategory(category);
              setCurrentPage(1);
            }}
            className={`${category === activeCategory ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-800 text-gray-200 cursor-pointer"} rounded py-2 px-4 transition-colors`}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProjectCategoryFilter;

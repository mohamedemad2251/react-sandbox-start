const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const pagesArray: number[] = Array.from({ length: totalPages });

  if (totalPages <= 1) return null;

  return (
    <ol className="mt-5 flex justify-center items-center gap-3">
      {pagesArray.map((_, index) => (
        <li className="">
          <button
            className={`rounded px-2 py-1 transition-colors ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-800 text-gray-200 cursor-pointer "}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ol>
  );
};

export default Pagination;

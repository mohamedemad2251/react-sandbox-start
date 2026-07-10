import { useEffect, useState } from "react";
import { perPageOptions, sortByOptions } from "../consts/const";

const FilterBar = ({ search, perPage, setPerPage, sortBy, setSortBy }) => {
  const [item, setItem] = useState("");
  useEffect(() => {
    search(item);
  }, [item]);

  return (
    <div className="w-full flex gap-3 mb-5">
      {/* Search Bar */}
      <input
        type="text"
        name="item"
        id="item"
        placeholder="Search..."
        className="flex-1 outline-[#4090db] bg-[#1c1f26] rounded-lg text-white p-2"
        onChange={(e) => setItem(e.target.value)}
      />
      {/* Quantity */}
      <div className="flex gap-2 items-center">
        <label htmlFor="quantity">
          <strong>Show:</strong>{" "}
        </label>
        <select
          value={perPage}
          onChange={(e) => setPerPage(e.target.value)}
          id="quantity"
          className="outline-[#4090db]"
        >
          {perPageOptions.map((selectOption) => (
            <option
              className="bg-[#1c1f26] hover:bg-[#4090db] text-white"
              key={selectOption.value}
              value={selectOption.value}
            >
              {selectOption.label}
            </option>
          ))}
        </select>
      </div>
      {/* Sort By */}
      <div className="flex gap-2 items-center">
        <label htmlFor="sortBy">
          <strong>Sort By:</strong>{" "}
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          id="sortBy"
          className="outline-[#4090db]"
        >
          {sortByOptions.map((sortByOption) => (
            <option
              className="bg-[#1c1f26] hover:bg-[#4090db] text-white"
              key={sortByOption.value}
              value={sortByOption.value}
            >
              {sortByOption.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;

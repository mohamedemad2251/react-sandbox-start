import { Link } from "react-router";

const Header = () => {
  return (
    <header className="w-full flex justify-between">
      <h1>🚀 Crypto Dash</h1>
      <nav>
        <ul className="flex gap-2 items-center ">
          <li className="text-xl text-[#4090db] hover:text-white">
            {/* Notice how we didn't use <a>. Because anchor elements are native to the browser and they enforce a reload (by default). This beats the whole SPA purpose which requires that the pages are loaded client-side and not server-side (so no refreshing, same page) */}
            <Link to="/">Home</Link>
          </li>
          <li className="text-xl text-[#4090db] hover:text-white">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

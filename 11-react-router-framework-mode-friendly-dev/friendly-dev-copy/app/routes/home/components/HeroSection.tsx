import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-4 bg-gray-900 py-24">
      <h2 className="font-bold text-4xl">Hey, I'm Memo 👋</h2>
      <p className="text-gray-300 max-w-xl text-center">
        I build friendly web experiences and help others become confident,
        modern developers.
      </p>
      <div className="flex justify-center items-center gap-4">
        <Link
          to={"/projects"}
          className="bg-blue-600 hover:bg-blue-700 rounded-md px-6 py-2 transition-colors duration-200"
        >
          View Projects
        </Link>
        <Link
          to={"/contact"}
          className="border border-blue-600 hover:bg-blue-600 text-blue-400 hover:text-white rounded-md px-6 py-2 transition-colors duration-200"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

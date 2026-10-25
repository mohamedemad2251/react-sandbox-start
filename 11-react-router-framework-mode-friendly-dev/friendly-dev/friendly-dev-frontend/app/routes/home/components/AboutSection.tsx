import { Link } from "react-router";

const AboutSection = () => {
  return (
    <section className="flex flex-col gap-6 bg-gray-900 mt-10 p-20">
      <div className="flex md:flex-row flex-col items-center gap-10">
        <img
          src="/images/profile.jpg"
          alt="Profile Picture"
          className={`size-40 object-cover object-[40%_50%] rounded-full border-4 border-blue-500`}
        />
        <div className="md:text-left text-center">
          <h1 className="font-bold text-3xl">Hey, I'm Memo👋</h1>
          <p className="text-gray-300">
            I'm a passionate web developer and content creator who loves
            building friendly digital experiences and helping others grow into
            confident, modern developers.
          </p>
          <Link
            to="/about"
            className="inline-block mt-4 text-blue-400 hover:text-blue-500 transition-colors"
          >
            Learn More About Me
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

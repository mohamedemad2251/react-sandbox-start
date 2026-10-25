export default function AboutPage() {
  const techStack = [
    "React",
    "Next.js",
    "Vue",
    "Tailwind CSS",
    "Node.js",
    "Laravel",
    "Prisma",
    "MongoDB",
    "PostgreSQL",
    "Appwrite",
    "Docker",
  ];
  return (
    <section className="bg-gray-900 mt-10 p-20">
      <div className="flex md:flex-row flex-col md:items-start items-center gap-10">
        <img
          src="/images/profile.jpg"
          alt="Profile Picture"
          className={`size-50 object-cover object-[40%_50%] rounded-full border-4 border-blue-500`}
        />
        <div className="md:text-left text-center">
          <h1 className="font-bold text-3xl">Hey, I'm Memo👋</h1>
          <p className="text-gray-300">
            I'm a passionate web developer and content creator who loves
            building friendly digital experiences and helping others grow into
            confident, modern developers.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-20 md:text-left text-center">
        <h2 className="font-bold text-2xl">My Mission</h2>
        <p>
          After turning my life around, I made it my mission to share what I've
          learned with others - not just about code, but about building a life
          you're proud of. Through tutorials, courses, and real-world projects,
          I am to make development accessible, friendly, and something you look
          forward to each day.
        </p>
      </div>
      <div className="flex flex-col gap-4 mt-20 md:text-left text-center">
        <h2 className="font-bold text-2xl">🚀 Tech I use</h2>
        <ul className="flex flex-wrap md:justify-start justify-center gap-4">
          {techStack.map((tech) => (
            <li key={tech} className="bg-gray-700 rounded px-3 py-1">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    // Assuming main puts 64px margin (32px top and bottom)
    <section className="h-[calc(100dvh-130px)] flex flex-col gap-3 justify-center items-center">
      <h1 className="font-bold text-7xl text-blue-400">404</h1>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-gray-400">Sorry, the page you are looking for does not exist</p>
      <Link to="/" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 transition-colors rounded">Go Home</Link>
    </section>
  );
};

export default NotFoundPage;

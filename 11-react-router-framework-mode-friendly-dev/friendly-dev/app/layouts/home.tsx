import { Outlet } from "react-router";
import HeroSection from "~/routes/home/components/HeroSection";

const HomeLayout = () => {
  return (
    <>
      <HeroSection />
      <main className="max-w-[1500px] mx-auto px-6 my-8">
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;

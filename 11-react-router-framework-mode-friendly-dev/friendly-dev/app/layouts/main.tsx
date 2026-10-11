import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 my-8">
      <Outlet />
    </main>
  );
};

export default MainLayout;

"use client";
import { useState } from "react";
import { FaLaptopCode } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, type To } from "react-router";

type NavItemType = {
  label: string;
  to: To;
};

type NavItemProps = {
  navItem: NavItemType;
};

const navItems: NavItemType[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Projects",
    to: "/projects",
  },
  {
    label: "Blogs",
    to: "/blogs",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Contact",
    to: "/contact",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const NavItem = ({ navItem }: NavItemProps) => {
    return (
      <li>
        {/* Using NavLink allows us to check the {isActive} boolean, which helps us customize the current route/link (relative to the root) */}
        <NavLink
          to={navItem.to}
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `${isActive ? "text-blue-500 font-bold" : "text-white hover:text-blue-400"} `
          }
        >
          {navItem.label}
        </NavLink>
      </li>
    );
  };

  return (
    <header className="flex flex-col items-center bg-gray-800 border-y border-white/20 text-teal shadow-2xl p-5">
      <div className="w-full flex justify-between max-w-[1500px]">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex justify-center items-center gap-2 font-bold text-blue-300 text-xl leading-none "
        >
          <FaLaptopCode className="text-2xl text-blue-400" />
          The Friendly Developer
        </NavLink>
        {/* Desktop Menu */}
        <nav className="md:block hidden">
          <ul className="flex justify-center gap-5">
            {navItems.map((navItem) => (
              <NavItem key={navItem.to.toString()} navItem={navItem} />
            ))}
          </ul>
        </nav>
        {/* Mobile Menu */}
        <button
          onClick={() => setIsOpen((curr) => !curr)}
          className="md:hidden inline-flex justify-center items-center text-2xl"
        >
          {isOpen ? (
            <IoCloseSharp />
          ) : (
            <RxHamburgerMenu className="text-blue-400" />
          )}
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden mt-7">
          <ul className="flex justify-center items-center gap-4">
            {navItems.map((navItem) => (
              <NavItem key={navItem.to.toString()} navItem={navItem} />
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

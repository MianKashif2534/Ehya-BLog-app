import React, { useState } from "react";
import { images } from "../constants/index";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

const navItemInfo = [
  { name: "Home", type: "link" },
  { name: "Articles", type: "link" },
  { name: "Pages", type: "dropdown", items: ["About us", "Contact us"] },
  { name: "Pricing", type: "link" },
  { name: "Faq", type: "link" },
];

const NavItem = ({ item }) => {
  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <a href="/" className="px-3 py-2">
            {item.name}
          </a>
          <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 -top-0.5 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            |
          </span>
        </>
      ) : (
        <>
          <a href="/" className="px-3 py-2 flex gap-x-1 items-center">
            <span className="">{item.name}</span>
            <IoMdArrowDropdown />
          </a>
          <div className="hidden transition-all duration-500 pt-4 absolute right-0 bottom-0 transform translate-y-full group-hover:block">
            <ul className="flex flex-col shadow-lg rounded-lg overflow-hidden">
              {item.items.map((page, index) => {
                return (
                  <a
                    key={index}
                    className="hover:bg-dark-hard hover:text-white px-3 py-1 text-white lg:bg-dark-soft w-[120px]"
                    href="/"
                  >
                    {page}
                  </a>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </li>
  );
};

function Header() {
  const [navIsVisible, setNavIsVisible] = useState(false);

  const navVisibiltyHandler = () => {
    setNavIsVisible((curState) => !curState);
  };

  return (
    <section className="bg-[#dedee3]">
      <header className=" container px-5 py-3 flex justify-between mx-auto">
        <div>
          <img
            className="w-16 lg:w-full lg:mt-3"
            src={images.Logo}
            alt="logo"
          />
        </div>
        <div className="z-50 lg:hidden">
          {navIsVisible ? (
            <IoCloseSharp
              className="h-6 w-6 cursor-pointer"
              onClick={navVisibiltyHandler}
            />
          ) : (
            <IoMenu
              className="h-6 w-6 cursor-pointer"
              onClick={navVisibiltyHandler}
            />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-500 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col justify-center items-center gap-x-9 w-full fixed top-0 bottom-0 lg:w-auto lg:items-center lg:justify-end lg:flex-row lg:static`}
        >
          <ul className="items-center gap-y-5 flex flex-col lg:flex-row lg:gap-x-9 font-semibold text-white lg:text-dark-soft">
            {navItemInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          <button className="mt-5 lg:mt-0 border-2 border-blue-500 px-4 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
            Sign in
          </button>
        </div>
      </header>
    </section>
  );
}

export default Header;

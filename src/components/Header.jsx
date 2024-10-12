import React, { useState } from "react";
import { images } from "../constants/index";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/user";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const navItemInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "Blog", type: "link", href: "/blog" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About us", href: "/about" },
      { title: "Contact us", href: "/contact" },
    ],
  },
  { name: "Pricing", type: "link", href: "/pricing" },
  { name: "Faq", type: "link", href: "/faq" },
];

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownHandler = () => {
    setDropdown((currState) => {
      return !currState;
    });
  };
  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <Link to={item.href} className="px-3 py-2">
            {item.name}
          </Link>
          <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 -top-0.5 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            |
          </span>
        </>
      ) : (
        <div className="flex items-center flex-col">
          <button
            className="px-3 py-2 flex gap-x-1 items-center"
            onClick={dropdownHandler}
          >
            <span className="">{item.name}</span>
            <IoMdArrowDropdown />
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:right-0 lg:bottom-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
          >
            <ul className="bg-dark-soft lg:bg-transparent flex flex-col shadow-lg rounded-lg overflow-hidden cursor-pointer">
              {item.items.map((page, index) => {
                return (
                  <Link
                    key={index}
                    className="hover:bg-dark-hard hover:text-white px-3 py-1 text-white lg:bg-dark-soft w-[120px]"
                    to={page.href}
                  >
                    {page.title}
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

function Header() {
  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profiledropdown, setprofiledropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navVisibiltyHandler = () => {
    setNavIsVisible((curState) => !curState);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <section className="sticky right-0 left-0 top-0 z-50 bg-slate-100">
      <header className=" container px-5 py-3 flex justify-between mx-auto ">
        <Link to="/">
          <img
            className="w-16 lg:w-full lg:mt-3"
            src={images.Logo}
            alt="logo"
          />
        </Link>
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
          {userState.userInfo ? (
            <div className="items-center gap-y-5 flex flex-col lg:flex-row lg:gap-x-9 font-semibold text-white lg:text-dark-soft">
              <div className="relative group">
                <div className="flex items-center flex-col">
                  <button
                    className="flex items-center gap-1 mt-5 lg:mt-0 border-2 border-blue-500 px-3 py-1 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                    onClick={() => setprofiledropdown(!profiledropdown)}
                  >
                    <span className="">Account</span>
                    <IoMdArrowDropdown />
                  </button>
                  <div
                    className={`${
                      profiledropdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:right-0 lg:bottom-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                  >
                    <ul className="bg-white lg:bg-transparent flex flex-col shadow-lg rounded-lg overflow-hidden cursor-pointer">
                      {userState.userInfo.admin && (
                        <button
                          onClick={() => navigate("/admin")}
                          type="button"
                          className="hover:bg-dark-soft hover:text-white text-dark-hard px-3 py-1 w-[165px]"
                        >
                          Admin Dashboard
                        </button>
                      )}
                      <button
                        onClick={() => navigate("/profile")}
                        type="button"
                        className="hover:bg-dark-soft hover:text-white px-3 py-1 text-dark-hard w-[165px]"
                      >
                        Profile Page
                      </button>
                      <button
                        type="button"
                        onClick={logoutHandler}
                        className="hover:bg-dark-soft hover:text-white px-3 py-1 text-dark-hard w-[165px]"
                        href="/"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="mt-5 lg:mt-0 border-2 border-blue-500 px-4 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Login
            </button>
          )}
        </div>
      </header>
    </section>
  );
}

export default Header;

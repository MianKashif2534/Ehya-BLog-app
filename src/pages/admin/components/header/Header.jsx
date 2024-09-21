import React, { useEffect, useState } from "react";
import { images } from "../../../../constants";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import NavItem from "../NavItem";
import NavItemCollapse from "../NavItemCollapse";
import { useWindowSize } from "@uidotdev/usehooks";

const MENU_ITEMS = [
  {
    title: "Dashboard",
    name: "dashboard",
    link: "/admin",
    type: "link",
    icon: <AiFillDashboard className="text-xl" />,
  },
  {
    title: "Comments",
    name: "comments",
    link: "/admin/comments",
    type: "link",
    icon: <FaComments className="text-xl" />,
  },
  {
    title: "Posts",
    name: "posts",
    content: [
      { title: "New", link: "/admin/posts/new" },
      { title: "Manage", link: "/admin/posts/manage" },
    ],
    type: "collapse",
    icon: <MdDashboard className="text-xl" />,
  },
];

function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();
  // console.log(activeNavName)

  useEffect(() => {
    if (windowSize.width >= 1024) {
      setIsMenuActive(true); 
    } else {
      setIsMenuActive(false); 
    }
  }, [windowSize.width]);
  
  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  return (
    <header className="flex justify-between items-center p-4 w-full h-fit lg:h-full lg:max-w-[300px] lg:flex-col lg:justify-start lg:items-start">
      {/* logo */}
      <Link to="/">
        <img src={images.Logo} alt="" className="w-16 lg:hidden" />
      </Link>
      {/* menu burger icon  */}
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="h-6 w-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="h-6 w-6" onClick={toggleMenuHandler} />
        )}
      </div>
      {/* sidebarcontainer */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:w-full lg:h-full lg:static">
          {/* underlay  */}
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />
          {/* sidebar */}
          <div className="fixed left-0 bottom-0 top-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:h-full lg:w-full lg:static lg:p-6">
            <Link to="/">
              <img src={images.Logo} alt="" className="w-16" />
            </Link>

            <h4 className="text-[#C7C7C7] mt-10 font-bold">MAIN MENU</h4>
            <div className="flex flex-col gap-y-[0.563rem] mt-7">
              {MENU_ITEMS.map((item, index) =>
                item.type === "link" ? (
                  <NavItem
                    title={item.title}
                    icon={item.icon}
                    link={item.link}
                    name={item.name}
                    key={index}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                ) : (
                  <NavItemCollapse
                    title={item.title}
                    icon={item.icon}
                    link={item.link}
                    name={item.name}
                    key={index}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                    content={item.content}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
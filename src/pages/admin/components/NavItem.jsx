import React from "react";
import { NavLink } from "react-router-dom";

function NavItem({
  title,
  name,
  icon,
  link,
  activeNavName,
  setActiveNavName,
}) {
  return (
    <NavLink
      to={link}
      className={`${
        name === activeNavName
          ? "font-bold text-primary"
          : "font-semibold text-[#a5a5a5]"
      } flex gap-x-2 items-center text-lg py-1`}
      onClick={() => setActiveNavName(name)}
    >
      {icon}
      {title}
    </NavLink>
  );
}

export default NavItem;

  import React, { useEffect, useState } from "react";
  import { Link } from "react-router-dom";

  function NavItemCollapse({
    title,
    name,
    icon,
    link,
    type,
    content,
    activeNavName,
    setActiveNavName,
  }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
      if (activeNavName !== name) {
        setIsChecked(false);
      }
    }, [activeNavName, name]);
    return (
      <div className="collapse bg-base-200 collapse-arrow rounded-none min-h-0 py-0">
        {/* <input type="checkbox" className="min-h-0 py-0"/> */}
        <input
          type="checkbox"
          className="min-h-0 py-0"
          checked={name === activeNavName}
          onChange={() => {
            setActiveNavName(name);
            setIsChecked(!isChecked);
          }}
        />
        <div
          className={`collapse-title ${
            name === activeNavName
              ? "font-semibold text-primary"
              : "font-bold text-[#a5a5a5]"
          } text-lg font-medium flex items-center gap-x-2 py-0  pl-0`}
        >
          {icon}
          {title}
        </div>
        <div className="collapse-content">
          <div className="gap-y-1 flex flex-col text-[#a5a5a5]">
            {content?.map((item) => (
              <Link key={item.title} to={item.link}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  export default NavItemCollapse;

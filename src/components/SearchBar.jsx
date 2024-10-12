// SearchBar
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

function SearchBar({ className, onSearchKeyword }) {
  const [searchKeyword, setsearchKeyword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchKeyword({ searchKeyword });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-y-2.5 rounded-lg relative ${className}`}
    >
      <div className="relative flex items-center">
        <IoSearch className="absolute left-3 text-gray-500 w-6 h-6 cursor-pointer" />
        <input
          className="lg:pl-20 pl-10 pr-24 py-2 rounded-lg  placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] w-full placeholder:italic focus:outline-none shadow-[2px_-1px_50px_8px_rgba(204,204,204,0.51)] md:py-4"
          type="text"
          placeholder="Search article"
          value={searchKeyword}
          onChange={(e) => setsearchKeyword(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-primary rounded-lg px-2 lg:px-5 py-1 lg:py-2 md:rounded-xl md:w-fit md:py-2 md:px-3 "
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

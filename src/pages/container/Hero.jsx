import React from "react";
import images from "../../constants/images";
import { IoSearch } from "react-icons/io5";

function Hero() {
  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row lg:bg-white">
      <div className="mt-10 lg:w-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Read the most 
          interesting articles
        </h1>
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <div className="flex flex-col gap-y-2.5 rounded-lg mt-10 lg:mt-6 relative">
          <div className="relative flex items-center">
            <IoSearch className="absolute left-3 text-gray-500 w-6 h-6 cursor-pointer" />
            <input
              className="lg:pl-20 pl-10 pr-24 py-2 rounded-lg  placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] w-full placeholder:italic focus:outline-none shadow-[2px_-1px_50px_8px_rgba(204,204,204,0.51)] md:py-4"
              type="text"
              placeholder="Search article"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-primary rounded-lg px-2 lg:px-5 py-1 lg:py-2 md:rounded-xl md:w-fit md:py-2 md:px-3 ">
              Search
            </button>
          </div>
        </div>
        <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-2 lg:mt-6 xl:mt-10">
          <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              Design
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              User Experience
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              User Interfaces
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:1/2">
        <img
          className="w-full"
          src={images.HeroImage}
          alt="users are reading articles"
        />
      </div>
    </section>
  );
}

export default Hero;

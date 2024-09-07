import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { images } from "../constants";

function AriticleCard({ className }) {
  return (
    <div
      className={`rounded-lg shadow-[1px_1px_9px_1px_#a0aec0] overflow-hidden ${className}`}
    >
      <img
        className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        src={images.post}
        alt="title"
      />
      <div className="p-5">
        <h1 className="font-roboto font-bold text-dark-soft text-lg md:text-2xl lg:text-[28px]">
          Future of Work
        </h1>
        <p className="text-dark-light text-sm md:text-lg lg:mt-3 xl:mt-4">
          Majority of peole will work in jobs that don’t exist today.
        </p>
        <div className="mt-5 flex flex-nowrap justify-between items-center ">
          <div className="flex gap-x-2  items-center md:gap-x-2.5">
            <img className="h-9 w-9 md:h-10 md:w-10" src={images.postProfile} alt="profile" />
            <div className="flex flex-col italic text-dark-soft text-sm md:text-base">
              <h3 className="font-semibold">Viola Manisa</h3>
              <div className="flex items-center gap-x-1">
                <span className="bg-[#36B37E] bg-opacity-20 p-0.5 w-fit rounded-full">
                  <BsCheckLg className="w-2.5 h-2.5 text-[#36B37E]" />
                </span>
                <span>
                  <p className="text-xs md:text-sm text-dark-light ">Verified writer</p>
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold text-dark-light text-sm italic text-base">
            02 May
          </span>
        </div>
      </div>
    </div>
  );
}

export default AriticleCard;

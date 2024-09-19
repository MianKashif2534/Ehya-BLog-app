import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { images, stables } from "../constants";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

function AriticleCard({ post, className }) {
  return (
    <div
      className={`rounded-lg shadow-[1px_1px_9px_1px_#a0aec0] overflow-hidden ${className}`}
    >
      <Link to={`/blog/${post.slug}`}>
        <img
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
          src={
            post.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
              : images.samplePostImage
          }
          alt="title"
        />
      </Link>
      <div className="p-5">
        <Link to={`/blog/${post.slug}`} className="cursor-pointer">
          <h1 className="font-roboto font-bold text-dark-soft text-lg md:text-2xl lg:text-[28px]">
            {post.title}
          </h1>
          <p className="text-dark-light text-sm md:text-lg lg:mt-3 xl:mt-4">
            {post.caption}
          </p>
        </Link>
        <div className="mt-5 flex flex-nowrap justify-between items-center ">
          <div className="flex gap-x-2  items-center md:gap-x-2.5">
            <img
              className="h-8 w-8 md:h-10 md:w-10 rounded-full "
              src={
                post.user.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                  : images.sampleUserImage
              } 
              alt="profile"
            />

            <div className="flex flex-col italic text-dark-soft text-sm md:text-base">
              <h3 className="font-semibold">{post.user.name}</h3>
              <div className="flex items-center gap-x-1">
                <span
                  className={`${
                    post.user.verified ? "bg-[#36B37E]" : "bg-red-600"
                  } bg-opacity-20 p-0.5 w-fit rounded-full`}
                >
                  {post.user.verified ? (
                    <BsCheckLg className="w-2 h-2 text-[#36B37E]" />
                  ) : (
                    <RxCross2 className="w-2 h-2 text-red-600" />
                  )}
                </span>
                <span>
                  <p className="text-xs md:text-sm text-dark-light ">
                    {post.user.verified ? "Verified" : "Unverified"} writer
                  </p>
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold text-dark-light sm:text-sm italic text-base">
            {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("en-US", {
              month: "short",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AriticleCard;

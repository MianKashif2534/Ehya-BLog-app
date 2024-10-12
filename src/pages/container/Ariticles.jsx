import React from "react";
import AriticleCard from "../../components/AriticleCard";
import { FiArrowRightCircle } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { getallPosts } from "../../services/index/posts";
import toast from "react-hot-toast";
import ArticleCardSkeleton from "../../components/crop/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { Link } from "react-router-dom";

function Ariticles() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getallPosts("",1,6),
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  return (
    <div
      className={`container lg:justify-center mx-auto flex flex-col md:gap-x-5  px-5 py-10 `}
    >
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardSkeleton
              key={index}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-21px)]"
            />
          ))
        ) : isError ? (
          <ErrorMessage message="Couldn't get the posts" />
        ) : (
          data?.data.map((post) => (
            <AriticleCard
              key={post._id}
              post={post}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-21px)]"
            />
          ))
        )}
      </div>
      <Link to={"/blog"} className="flex mx-auto text-primary px-6 py-2 rounded-lg items-center gap-x-3 font-semibold border-2 border-primary hover:text-white hover hover:bg-primary transition-all duration-500 ease-in-out">
        <span>More articles</span>
        <FiArrowRightCircle className="h-7 w-7 p-0.5 rounded-full" />
      </Link>
    </div>
  );
}

export default Ariticles;

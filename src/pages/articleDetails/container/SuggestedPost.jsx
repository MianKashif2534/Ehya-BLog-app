// SuggestedPost
import React from "react";
import { Link } from "react-router-dom";

function SuggestedPost({ className, header, post = [] , tags}) {
  return (
    <>
      <div
        className={`w-full shadow-[0px_0px_6px_1px_#00000024] rounded-lg p-4 md:p-8 ${className}  lg:ml-10`}
      >
        <h1 className="font-bold font-roboto text-dark-hard md:text-xl">{header}</h1>
        <div className="grid gap-y-7 mt-5 md:grid-cols-2 md:gap-x-2 lg:grid-cols-1">
          {post.map((item) => {
            return (
              <div
                key={item._id}
                className="flex flex-nowrap items-center space-x-3 md:space-x-5"
              >
                <img
                  className="aspect-sqaure object-cover rounded-lg w-1/5 lg:w-1/3"
                  src={item.image}
                  alt=""
                />
                <div className="text-dark-hard font-roboto font-medium text-sm space-y-10 ">
                  <h3 className="md:text-base text-dark-hard text-sm font-roboto font-medium">{item.title}</h3>
                  <span className="text-dark-light opacity-60 text-xs">
                    {item.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric"
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
          <h1 className="font-bold font-roboto text-dark-hard mt-8 md:mt-9 md:text-xl">Tags</h1>
          <div className="flex flex-wrap mt-3 gap-x-2 gap-y-2">
           {tags.map((item,index)=>{
                return  <Link key={index} to='/' className="bg-primary text-xs inline-block text-white font-roboto px-4 py-2 border rounded-lg md:text-sm md:mt-2">
                  {item}
                </Link>
           })}
           </div>
        </div>
    </>
  );
}

export default SuggestedPost;

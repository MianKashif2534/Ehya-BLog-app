import React from "react";

function ArticleCardSkeleton({className}) {
  return (
    <div
      className={`rounded-lg shadow-[1px_1px_9px_1px_#a0aec0] overflow-hidden ${className} animate-pulse`}
    >
      {/* image */}
      <div className="w-full aspect-video bg-slate-300" />
      <div className="p-5">
        {/* title */}
        <div className="w-56 h-2 bg-slate-300 rounded-lg" />
        {/* capotion */}
        <div className="w-24 h-2 bg-slate-300 rounded-lg" />
        <div className="mt-5 flex flex-nowrap justify-between items-center">
          <div className="flex gap-x-2  items-center md:gap-x-2.5">
            {/* profile */}
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-slate-300" />
            <div className="flex flex-col italic text-dark-soft text-sm md:text-base">
              {/* userName */}
              <div className="w-24 h-2 bg-slate-300 rounded-lg" />
              {/* verifiedStatus */}
              <div className="w-16 h-2 mt-2 bg-slate-300 rounded-lg" />
            </div>
          </div>
          {/* date */}
          <div className="w-10 h-2 mt-4 bg-slate-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default ArticleCardSkeleton;

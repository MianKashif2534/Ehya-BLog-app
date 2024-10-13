// BlogPage
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getallPosts } from "../../services/index/posts";
import { useQuery } from "@tanstack/react-query";
import ArticleCardSkeleton from "../../components/crop/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import AriticleCard from "../../components/AriticleCard";
import Mainlayout from "../../components/Mainlayout";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import AsyncMultiSelectTagDropdown from "../../components/SelectAsyncPaginate";
import { filterCategories } from "../../utis/multiSelectTagsUtils";
import { getallCategories } from "../../services/index/postcategories";

let isFirstRun = true;

function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = Object.fromEntries([...searchParams]);
  const [categories, setCategories] = useState([]);
  const promiseOptions = async (search, loadedOptions, { page }) => {
    const { data: categoriesData, headers } = await getallCategories(
      search,
      page,
      5
    );

    return {
      options: filterCategories(search, categoriesData),
      hasMore:
        parseInt(headers["x-totalpagecount"]) !==
        parseInt(headers["x-currentpage"]),
      additional: {
        page: page + 1,
      },
    };
  };
  const currentPage = parseInt(searchParamsValue?.page) || 1;
  const searchKeyword = searchParamsValue?.search || "";

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["posts", categories],
    queryFn: () => getallPosts(searchKeyword, currentPage, 12, categories),
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [currentPage, refetch, searchKeyword]);

  const handlePageChange = (page) => {
    setSearchParams({ page, search: searchKeyword });
  };

  const handleSearch = ({ searchKeyword }) => {
    setSearchParams({ page: 1, search: searchKeyword || "" });
  };

  return (
    <Mainlayout>
      <div
        className={`container lg:justify-center mx-auto flex flex-col md:gap-x-5 px-5 py-10 `}
      >
        <div className="flex flex-col mb-10 space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:gap-x-4">
          <SearchBar
            className={"w-full max-w-xl my-2"}
            onSearchKeyword={handleSearch}
          />
          <AsyncMultiSelectTagDropdown
            placeholder={"Search by Categories"}
            loadOptions={promiseOptions}
            onChange={(selectedValues) => {
              setCategories(selectedValues.map((item) => item.value));
            }}
          />
        </div>
        <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading || isFetching ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't get the posts" />
          ) : data?.data.length === 0 ? (
            <p className="text-orange-500">No Post Found</p>
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
      </div>
      {!isLoading && (
        <Pagination
          onPageChange={(page) => handlePageChange(page)}
          currentPage={currentPage}
          totalPageCount={
            data?.headers?.["x-totalpagecount"]
              ? JSON.parse(data?.headers["x-totalpagecount"])
              : 1 // Default to 1 if undefined
          }
        />
      )}
    </Mainlayout>
  );
}

export default BlogPage;

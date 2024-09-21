// ManagePosts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getallPosts } from "../../../../services/index/posts";
import { stables, images } from "../../../../constants";
import Pagination from "../../../../components/Pagination";
import { deletePost } from "../../../../services/index/posts";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

let firstTimeRender = true;
function ManagePosts() {
  const userState = useSelector((state) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data: postData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["Post"],
    queryFn: () => getallPosts(searchKeyword, currentPage),
    // enabled: !firstTimeRender,
  });

  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation({
      queryKey: ["profile"],
      mutationFn: ({ slug, token }) => {
        return deletePost({ slug, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Post is deleted Successfully");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  useEffect(() => {
    if (firstTimeRender) {
      firstTimeRender = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const deletePostHandler = ({ slug, token }) => {
    mutateDeletePost({ slug, token });
  };
  const submitSearchHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };
  return (
    <div>
      <h1 className="font-semibold text-2xl">Manage Posts</h1>
      <div className="w-full px-4 mx-auto">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">Users</h2>
            <div className="text-end">
              <form
                onSubmit={submitSearchHandler}
                className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
              >
                <div className=" relative ">
                  <input
                    type="text"
                    id="form-subscribe-Filter"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Post title..."
                    value={searchKeyword}
                    onChange={searchKeywordHandler}
                  />
                </div>
                <button
                  className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Filter
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Tags
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {isFetching || isLoading ? (
                    <tr>
                      <td colSpan={5} className="w-full py-10 text-center">
                        ...loading
                      </td>
                    </tr>
                  ) : postData?.data?.length === 0 ? <tr>
                  <td colSpan={5} className="w-full py-10 text-center">
                  No post found
                  </td>
                </tr>: (
                    postData?.data.map((post, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="/" className="relative block">
                                <img
                                  src={
                                    post?.photo
                                      ? stables.UPLOAD_FOLDER_BASE_URL +
                                        post?.photo
                                      : images.samplePostImage
                                  }
                                  alt={post.title}
                                  className="mx-auto object-cover rounded-full h-10 w-10 "
                                />
                              </a>
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {post.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {post.categories && post.categories.length > 0
                              ? post.categories[0]
                              : "Uncategorized"}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex gap-x-2">
                            {post.tags?.length > 0
                              ? post.tags.map((tag, index) => (
                                  <p key={index}>
                                    {tag}
                                    {post.tags.length - 1 !== index && ","}
                                  </p>
                                ))
                              : "No tags"}
                          </div>
                        </td>
                        <td className="space-x-6 px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900 disabled:opacity-40 disabled:cursor-not-allowed"
                            disabled={isLoadingDeletePost}
                            onClick={() =>
                              deletePostHandler({
                                slug: post?.slug,
                                token: userState.userInfo.token,
                              })
                            }
                          >
                            Delete
                          </button>
                          <Link
                            to="/"
                            className="text-green-600 hover:text-green-900"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Pagination
                onPageChange={(page) => setCurrentPage(page)}
                currentPage={currentPage}
                totalPageCount={
                  postData?.headers?.["x-totalpagecount"]
                    ? JSON.parse(postData.headers["x-totalpagecount"])
                    : 1 // Default to 1 if undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagePosts;

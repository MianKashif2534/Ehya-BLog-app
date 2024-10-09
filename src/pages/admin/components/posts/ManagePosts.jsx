// ManagePosts
import { getallPosts } from "../../../../services/index/posts";
import { stables, images } from "../../../../constants";
import Pagination from "../../../../components/Pagination";
import { deletePost } from "../../../../services/index/posts";
import { Link } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTables from "../DataTables";

function ManagePosts() {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: postData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getallPosts(searchKeyword, currentPage),
    dataQueryKey: "posts",
    deleteDataMessage: "Post is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deletePost({
        slug,
        token,
      });
    },
  });

  return (
    <DataTables
      pageTitle={"Manage Posts"}
      dataListName="Posts"
      searchInputPlaceHolder={"Post title"}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeywordOnSubmitHandler={submitSearchHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Title" , "Category" , "Created At" , "Tags" , ""]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={postData?.data}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      headers={postData?.headers}
      userState={userState}
    >
     { postData?.data.map((post, index) => (
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
               ? post.categories
                  .slice(0, 3)
                  .map(
                    (category, index) =>
                      `${category.title}${
                        post.categories.slice(0, 3).length ===
                        index + 1
                          ? ""
                          : ", "
                      }`
                  )
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
            disabled={isLoadingDeleteData}
            onClick={() =>
              deleteDataHandler({
                slug: post?.slug,
                token: userState.userInfo.token,
              })
            }
          >
            Delete
          </button>
          <Link
            to={`/admin/posts/manage/edit/${post?.slug}`}
            className="text-green-600 hover:text-green-900"
          >
            Edit
          </Link>
        </td>
      </tr>))} </DataTables>
  );
}

export default ManagePosts;

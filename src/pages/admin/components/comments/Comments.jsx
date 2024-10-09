import React from "react";
import {
  deleteComment,
  getallComments,
  UpdateComments,
} from "../../../../services/index/comments";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTables from "../DataTables";
import { images, stables } from "../../../../constants";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function Comments() {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: commentsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getallComments(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "comments",
    deleteDataMessage: "comment is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteComment({
        commentId: slug,
        token,
      });
    },
  });

  const {
    isLoading: isLoadingUpdateCommentCheck,
    mutate: mutateUpdateCommentCheck,
  } = useMutation({
    mutationFn: ({ token, check, commentId }) => {
      return UpdateComments({ token, check, commentId });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["comments"]);
      toast.success(data?.check ? "Comment Approved" : "Comment Not Approved");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <DataTables
      pageTitle={"Manage Comments"}
      dataListName={"Comments"}
      searchInputPlaceHolder={"Search Comments..."}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeywordOnSubmitHandler={submitSearchHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Author",
        "Comment",
        "In Respond to",
        "Created At",
        "",
      ]}
      isFetching={isFetching}
      isLoading={isLoading}
      data={commentsData?.data}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      headers={commentsData?.headers}
    >
      {commentsData?.data?.map((comment) => (
        <tr key={comment._id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 italic">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      comment?.user?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + comment?.user?.avatar
                        : images.sampleUserImage
                    }
                    alt={comment?.user?.name}
                    className="mx-auto object-cover rounded-full h-10 w-10 "
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment?.user?.name}
                </p>
              </div>
            </div>
          </td>
          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {post.categories && post.categories.length > 0
                ? post.categories
                    .slice(0, 3)
                    .map(
                      (category, index) =>
                        `${category.title}${
                          post.categories.slice(0, 3).length === index + 1
                            ? ""
                            : ", "
                        }`
                    )
                : "Uncategorized"}
            </p>
          </td> */}
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            {comment?.replyOnUser !== null && (
              <p className="text-gray-900 whitespace-no-wrap italic opacity-65">
                In reply to{" "}
                <Link
                  className="text-blue-500 hover:underline"
                  to={`/blog/${comment?.post?.slug}#comment-${comment?._id}`}
                >{`${comment?.replyOnUser?.name}`}</Link>
              </p>
            )}
            <p className="text-gray-900 whitespace-no-wrap italic">{comment?.desc}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap italic opacity-65">
              <Link
                className="text-blue-500 hover:underline "
                to={`/blog/${comment?.post?.slug}`}
              >{`${comment?.post?.title}`}</Link>
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap italic opacity-65">
              {new Date(comment?.createdAt).toLocaleDateString("en-Us", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </td>
          <td className="space-x-6 px-5 py-5 text-sm bg-white border-b border-gray-200">
            <button
              type="button"
              className={`${
                comment?.check
                  ? "text-yellow-500 hover:text-yellow-900"
                  : "text-green-600 hover:text-green-900"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
              disabled={isLoadingDeleteData}
              onClick={() =>
                mutateUpdateCommentCheck({
                  token: userState.userInfo.token,
                  check: comment?.check ? false : true,
                  commentId: comment._id,
                })
              }
            >
              {comment?.check ? "Unapprove" : "Approve"}
            </button>
            <button
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={isLoadingDeleteData}
              onClick={() =>
                deleteDataHandler({
                  slug: comment?._id,
                  token: userState.userInfo.token,
                })
              }
            >
              Delete
            </button>
          </td>
          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
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
          </td> */}
        </tr>
      ))}
    </DataTables>
  );
}

export default Comments;

//Comment.jsx
import React from "react";
import images from "../../constants/images";
import { FaTrashCan } from "react-icons/fa6";
import { LuMessageSquare } from "react-icons/lu";
import { FaPencilAlt } from "react-icons/fa";
import CommentForm from "./CommentForm";
import { stables } from "../../constants";

export default function Comments({
  comment,
  loginUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentID = null,
  updateComment,
  deleteComment,
  replies,
}) {
  // const userLoggedIn = Boolean(loginUserId);
  const commentBelongsToUser = loginUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentID ? parentID : comment._id;
  const replyOnUserId = comment.user._id;
  return (
    <>
      <div
        className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] rounded-lg p-3"
        id={`comment-${comment?._id}`}
      >
        <img
          className="w-9 h-9 object-cover rounded-full"
          src={
            comment.user.avatar
              ? stables.UPLOAD_FOLDER_BASE_URL + comment.user.avatar
              : images.sampleUserImage
          }
          alt="user img"
        />
        <div className="flex flex-1 flex-col">
          <h4 className="font-semibold text-xs lg:text-sm">
            {comment.user.name}
          </h4>
          <span className="text-xs text-dark-light">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
          {!isEditing && (
            <p className="mt-[10px] text-dark-light text-xs lg:text-sm">
              {comment.desc}
            </p>
          )}
          {isEditing && (
            <CommentForm
              btnLable="Update"
              formSubmitHandler={(value) => updateComment(value, comment._id)}
              formCancelHandler={() => setAffectedComment(null)}
              initialText={comment.desc}
            />
          )}
          <div className="mt-5 flex gap-x-1 md:gap-x-4 text-dark-light font-roboto my-2 text-sm">
            {loginUserId && (
              <button
                className="flex items-center space-x-1"
                onClick={() =>
                  setAffectedComment({ type: "replying", _id: comment._id })
                }
              >
                <LuMessageSquare className="w-4 h-auto" />
                <span className="">Reply</span>
              </button>
            )}
            {commentBelongsToUser && (
              <div className="flex md:gap-x-4">
                <button
                  className="flex space-x-1 items-center"
                  onClick={() =>
                    setAffectedComment({ type: "editing", _id: comment._id })
                  }
                >
                  <FaPencilAlt className="w-3 h-auto" />
                  <span className="">Edit</span>
                </button>
                <button
                  className="flex space-x-1 items-center"
                  onClick={() => {
                    deleteComment(comment._id);
                  }}
                >
                  <FaTrashCan className="w-3 h-auto" />
                  <span className="">Delete</span>
                </button>
              </div>
            )}
          </div>
          {isReplying && (
            <CommentForm
              btnLable="Reply"
              formCancelHandler={() => setAffectedComment(null)}
              formSubmitHandler={(value) =>
                addComment(value, repliedCommentId, replyOnUserId)
              }
            />
          )}
          {replies.length > 0 && (
            <div>
              {replies.map((reply) => (
                <Comments
                  key={reply._id}
                  addComment={addComment}
                  affectedComment={affectedComment}
                  setAffectedComment={setAffectedComment}
                  comment={reply}
                  deleteComment={deleteComment}
                  loginUserId={loginUserId}
                  replies={[]}
                  updateComment={updateComment}
                  parentId={comment._id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

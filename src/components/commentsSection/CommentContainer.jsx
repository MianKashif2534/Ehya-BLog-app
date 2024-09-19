//CommentContainer.jsx
import React, { useState } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewComments , UpdateComments , deleteComment} from "../../services/index/comments";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function CommentContainer({ className, loginUserId, comments, postslug }) {
  const [affectedComment, setAffectedComment] = useState(null);
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const { mutate: mutateNewCommment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createNewComments({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: () => {
        toast.success(
          "Your comment is send successfully created , it will be visible after the confirmation from admin"
        );
      },
      onError: () => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const {
    mutate: mutateupdateCommment,
    error,
  } = useMutation({
    mutationFn: ({ token, desc, commentId }) => {
      return UpdateComments({ token, desc, commentId });
    },
    onSuccess: () => {
      toast.success("Your comment is send successfully updated");
      queryClient.invalidateQueries(["blog", postslug]);
    },
    onError: () => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate: mutateDeleteCommment } =
    useMutation({
      mutationFn: ({ token, commentId }) => {
        return deleteComment({ token, commentId });
      },
      onSuccess: () => {
        toast.success("Your comment is Deleted successfully");
        queryClient.invalidateQueries(["blog", postslug]);
      },
      onError: () => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewCommment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postslug,
    });
  };

  const updateCommentHandler = (value, commentId) => {
    mutateupdateCommment({
      token: userState.userInfo.token,
      desc: value,
      commentId,
    });
  };

  const deleteCommentHandler = (commentId) => {
    mutateDeleteCommment({
      token: userState.userInfo.token,
      commentId
    })
  };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLable={"Send"}
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />
      <div className="space-y-5 mt-5">
        {comments.map((comment) => {
          return (
            <Comments
              key={comment._id}
              comment={comment}
              loginUserId={loginUserId}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addComment={addCommentHandler}
              updateComment={updateCommentHandler}
              deleteComment={deleteCommentHandler}
              replies={comment.replies}
              // loginUserId={loginUserId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CommentContainer;

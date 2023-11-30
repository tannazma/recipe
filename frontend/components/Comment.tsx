import React from "react";
import { Comment } from "../types";

interface CommentProps {
  comment: Comment;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="comment-box">
      <div>{comment.name}</div>
      <span key={comment.id} className="star-btn">
        {" "}
        ☆ {comment.rating}
      </span>
      {comment.message}
      <div>{comment.created_at}</div>
    </div>
  );
};
export default Comment;

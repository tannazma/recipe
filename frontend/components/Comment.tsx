import React from "react";
import { Comment } from "../types";

interface CommentProps {
  comment: Comment;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="comment-box">
      <div>{comment.name}</div>
      <div>
        {[1, 2, 3, 4, 5].map((num) => (
          <span key={num} className="star-btn">
            {num <= comment.rating ? "★" : "☆"}
          </span>
        ))}
      </div>
      {comment.message}
      <div>{comment.created_at}</div>
    </div>
  );
};
export default Comment;

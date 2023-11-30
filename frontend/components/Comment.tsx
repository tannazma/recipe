import React from "react";
import { Comment } from "../types";

interface CommentProps {
  comment: Comment;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div>
      <span key={comment.id}>{comment.rating}</span>
    </div>
  );
};
export default Comment;

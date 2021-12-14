import React from "react";
import { CommentDto as Comment } from "../../__generated__/ourapt";

type CommentPreviewInFeedProps = {
  comment: Comment;
};
const CommentPreviewInFeed: React.FC<CommentPreviewInFeedProps> = ({
  comment,
}) => {
  return (
    <div>
      {comment.writer.nickname}의 {comment.mainText}
    </div>
  );
};

export default CommentPreviewInFeed;

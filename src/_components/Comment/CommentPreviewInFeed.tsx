import styled from "@emotion/styled";
import React from "react";
import { CommentDto as Comment } from "../../__generated__/ourapt";

type CommentPreviewInFeedProps = {
  comment: Comment;
};
const CommentPreviewInFeed: React.FC<CommentPreviewInFeedProps> = ({
  comment,
}) => {
  return (
    <CommentPreviewWrapper>
      <UserPreview>{comment.writer.nickname}</UserPreview>
      <CommentPreview>{comment.mainText}</CommentPreview>
    </CommentPreviewWrapper>
  );
};

export default CommentPreviewInFeed;

const CommentPreviewWrapper = styled.div`
  width: 100%;

  margin-top: 12px;

  display: flex;
  flex-direction: row;
`;

const UserPreview = styled.p`
  margin-right: 8px;

  flex-shrink: 0;

  color: #222222;
  font-size: 14px;
  font-weight: 500;
`;

const CommentPreview = styled.p`
  flex-grow: 1;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: #555555;
  font-size: 14px;
  font-weight: 400;
`;

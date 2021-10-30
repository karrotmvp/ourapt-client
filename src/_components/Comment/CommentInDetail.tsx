import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import UserAsAuthor from "../User/UserAsAuthor";

interface Comment {
  id: string;
  author: User;
  content: string;
  // type should be string OR Date (undecided)
  createdAt: string;
}

interface User {
  id: string;
  nickname: string;
  avatarSrc: string;
}

type CommentInDetailProps = {
  comment: Comment;
};

const CommentInDetail: React.FC<CommentInDetailProps> = ({ comment }) => {
  return (
    <div>
      <div className="AuthorCard">
        {/* <UserAsAuthor user={comment.author} /> */}
        <div className="AuthorCard-TimeStamp">작성: {comment.createdAt}</div>
      </div>

      <h4>{comment.content}</h4>
      <p>{comment.createdAt}에 작성되었어요</p>
    </div>
  );
};

export default CommentInDetail;

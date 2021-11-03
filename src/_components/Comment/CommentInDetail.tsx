import React from "react";
import { User } from "../../_types/ouraptTypes";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import UserAsAuthor from "../User/UserAsAuthor";

interface tempComment {
  id: string;
  user: User;
  content: string;
  // type should be string OR Date (undecided)
  createdAt: Date;
  updatedAt: Date;
}

type CommentInDetailProps = {
  comment: tempComment;
};

const CommentInDetail: React.FC<CommentInDetailProps> = ({ comment }) => {
  return (
    <div className="ArticleCard pd--16">
      <UserAsAuthor
        user={comment.user}
        createdAt={comment.createdAt}
        updatedAt={comment.updatedAt}
      />
      <p className="ArticleCard-Content mg-top--10">{comment.content}</p>
    </div>
  );
};

export default CommentInDetail;

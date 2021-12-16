import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import {
  VoteDto as Vote,
  CommentDto as Comment,
} from "../../../__generated__/ourapt";

import { useApi } from "../../../api";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import examineResBody from "../../../_modules/examineResBody";

import CommentInDetail from "../../Comment/CommentInDetail";
import CommentInDetailSubmitForm from "../../Comment/CommentInDetailSubmitForm";

const PageCommentDetail: React.FC = () => {
  const params = useParams<{ articleId?: string }>();
  const articleId = params.articleId || "";

  const api = useApi();

  const { push } = useNavigator();

  const [comment, setComment] = useState<Comment>();

  const [isCommentUpdate, setIsCommentUpdate] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await api.commentController.getCommentUsingGET({
        commentId: articleId,
      });

      const safeBody = examineResBody({
        resBody: response,
        validator: (data) => data.comment != null,
        onFailure: () => {
          push(`/error?cause=getCommentsByIdAtPageVoteDetail`);
        },
      });
      setComment(safeBody.data.comment);
    })();
  }, [isCommentUpdate, api.commentController, articleId, push]);

  return (
    <div className="page">
      <div className="PageVoteDetail-inner">
        <ScreenHelmet title="답글쓰기" />
        {comment && (
          <CommentInDetail
            key={comment.id}
            comment={comment}
            onPage={"PageCommentDetail"}
            setIsCommentUpdate={setIsCommentUpdate}
          />
        )}
      </div>
      {comment && (
        <CommentInDetailSubmitForm
          articleId={comment.id}
          placeholderText={"답글 달기..."}
          setIsCommentUpdate={setIsCommentUpdate}
        />
      )}
    </div>
  );
};

export default PageCommentDetail;

const ArticleArea = styled.div`
  width: 100%;

  border-bottom: 12px solid #f2f3f6;
`;

const CommentVacantViewTitle = styled.div`
  margin-top: 80px;
  color: #aaaaaa;
  font-size: 16px;
  font-weight: 700;
`;

const CommentVacantViewInfo = styled.div`
  margin-top: 4px;
  color: #aaaaaa;
  font-size: 15px;
  font-weight: 400;
`;

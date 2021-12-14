import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import {
  VoteDto as Vote,
  CommentDto as Comment,
} from "../../../__generated__/ourapt";

import { useApi } from "../../../api";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import examineResBody from "../../../_modules/examineResBody";

import VoteProgressAsArticle from "../../Vote/VoteProgressAsArticle";
import VoteClosedAsArticle from "../../Vote/VoteClosedAsArticle";
import CommentInDetail from "../../Comment/CommentInDetail";
import CommentInDetailSubmitForm from "../../Comment/CommentInDetailSubmitForm";

const PageVoteDetail: React.FC = () => {
  const params = useParams<{ articleId?: string }>();
  const articleId = params.articleId || "";

  const api = useApi();

  const { push } = useNavigator();

  const [vote, setVote] = useState<Vote>();
  const [comments, setComments] = useState<Array<Comment>>();

  const [isCommentUpdate, setIsCommentUpdate] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await api.voteController.getVoteByIdUsingGET({
        voteId: articleId,
      });

      const safeBody = examineResBody({
        resBody: response,
        validator: (data) => data.vote != null,
        onFailure: () => {
          push(`/error?cause=getVoteByIdAtPageVoteDetail`);
        },
      });
      setVote(safeBody.data.vote);
    })();
  }, [api.voteController, articleId, push]);

  useEffect(() => {
    (async () => {
      const response =
        await api.commentController.getCommentsOfQuestionUsingGET({
          articleId: articleId,
        });

      const safeBody = examineResBody({
        resBody: response,
        validator: (data) => data.comments != null,
        onFailure: () => {
          push(`/error?cause=getCommentsByIdAtPageVoteDetail`);
        },
      });
      setComments(safeBody.data.comments);
    })();
  }, [isCommentUpdate, api.commentController, articleId, push]);

  // TODO: 로더 깎아놓고 이하 vote && comments && 등은 일괄 제거하기
  return (
    <div className="page">
      <div className="PageVoteDetail-inner">
        <ScreenHelmet
          title={vote?.isInProgress ? "진행 중인 투표" : "종료된 투표"}
        />
        {vote && (
          <ArticleArea>
            <div className="ArticleCard pd--16">
              {vote.isInProgress ? (
                <VoteProgressAsArticle vote={vote} />
              ) : (
                <VoteClosedAsArticle vote={vote} />
              )}
            </div>
          </ArticleArea>
        )}
        {comments &&
          (comments.length === 0 ? (
            <div>
              <CommentVacantViewTitle>
                아직 댓글이 없어요.
              </CommentVacantViewTitle>
              <CommentVacantViewInfo>
                첫 댓글을 남겨보세요.
              </CommentVacantViewInfo>
            </div>
          ) : (
            <div>
              {comments.map((comment, idx) => {
                return (
                  <CommentInDetail
                    key={comment.id}
                    comment={comment}
                    onPage={"PageVoteDetail"}
                    setIsCommentUpdate={setIsCommentUpdate}
                  />
                );
              })}
            </div>
          ))}
      </div>
      {vote && (
        <CommentInDetailSubmitForm
          articleId={articleId}
          placeholderText={
            vote.isInProgress ? "투표 의견 달기..." : "종료된 투표 의견 달기..."
          }
          setIsCommentUpdate={setIsCommentUpdate}
        />
      )}
    </div>
  );
};

export default PageVoteDetail;

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

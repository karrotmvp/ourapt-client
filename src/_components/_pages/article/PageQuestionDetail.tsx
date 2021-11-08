import React, { useState, useEffect } from "react";

import { QuestionDto as Question } from "../../../__generated__/ourapt";
import { CommentDto as Comment } from "../../../__generated__/ourapt";
import { useApi } from "../../../api";

import styled from "@emotion/styled";

import { ScreenHelmet, useParams } from "@karrotframe/navigator";

import QuestionInDetail from "../../Question/QuestionInDetail";
import CommentInDetail from "../../Comment/CommentInDetail";
import CommentInDetailSubmitForm from "../../Comment/CommentInDetailSubmitForm";

import examineResBody from "../../../_modules/examineResBody";

const PageArticleDetail: React.FC = () => {
  const params = useParams<{ articleId?: string }>();
  const articleId = params.articleId || "";

  const api = useApi();

  const [question, setQuestion] = useState<Question>();
  const [comments, setComments] = useState<Array<Comment>>([]);

  // 새로 코멘트를 업데이트하면 새로 렌더링되도록 패치하는 flag
  const [isCommentUpdate, setIsCommentUpdate] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await api.questionController.getQuestionByIdUsingGET({
        questionId: articleId,
      });
      const question = examineResBody(response, "게시글 상세에서 본문 조회")
        .data.question;
      setQuestion(question);
    })();
  }, [api.questionController, articleId]);

  useEffect(() => {
    (async () => {
      const response =
        await api.commentController.getCommentsOfQuestionUsingGET({
          questionId: articleId,
        });
      const comments = examineResBody(response, "게시글 상세에서 댓글 조회")
        .data.comments;
      setComments(comments);
    })();
    // 초기화를 어디서 해줘야 할지 모르겠다. 초기화 하는 순간 다시 렌더링 되지 않나?
    // isCommentUpdate === true 인 경우에만 렌더링 되도록 할 수는 없나?
    setIsCommentUpdate(false);
  }, [isCommentUpdate, api.commentController, articleId]);

  return (
    <div className="Page">
      <div className="PageQuestionDetail-inner">
        <ScreenHelmet />
        <ArticleArea>
          {question && <QuestionInDetail question={question} />}
        </ArticleArea>
        <CommentsArea>
          <CommentsAreaTitle>
            댓글{" "}
            {question &&
              question.countOfComments > 0 &&
              question.countOfComments}
          </CommentsAreaTitle>
          {comments.map((comment, idx) => {
            return <CommentInDetail key={comment.id} comment={comment} />;
          })}
        </CommentsArea>
      </div>
      <CommentInDetailSubmitForm
        articleId={articleId}
        setIsCommentUpdate={setIsCommentUpdate}
      />
    </div>
  );
};

export default PageArticleDetail;

const ArticleArea = styled.div`
  width: 100%;

  border-bottom: 12px solid #f5f5f5;
`;

const CommentsArea = styled.div`
  margin-bottom: auto;
`;

const CommentsAreaTitle = styled.div`
  width: 100%;
  height: 100%;

  padding: 12px 16px;

  font-size: 16px;
  text-align: left;

  border-bottom: 1px solid #f5f5f5;
`;

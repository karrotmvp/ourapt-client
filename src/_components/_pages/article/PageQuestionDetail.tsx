import React, { useState, useEffect, useReducer } from "react";

import { useApi } from "../../../api";
import { QuestionDto as Question } from "../../../__generated__/ourapt";
import { CommentDto as Comment } from "../../../__generated__/ourapt";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { ScreenHelmet, useParams, useNavigator } from "@karrotframe/navigator";

import QuestionInDetail from "../../Question/QuestionInDetail";
import CommentInDetail from "../../Comment/CommentInDetail";
import examineResBody from "../../../_modules/examineResBody";
import CommentInDetailSubmitForm from "../../Comment/CommentInDetailSubmitForm";

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
  }, []);

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
  }, [isCommentUpdate]);

  return (
    <div className="Page">
      <div className="PageQuestionDetail-inner">
        <ScreenHelmet />
        <ArticleArea>
          {question && <QuestionInDetail question={question} />}
        </ArticleArea>
        <CommentsArea>
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
  margin-bottom: 12px;
  background-color: purple;
`;

const CommentsArea = styled.div`
  margin-bottom: auto;
  background-color: purple;
`;

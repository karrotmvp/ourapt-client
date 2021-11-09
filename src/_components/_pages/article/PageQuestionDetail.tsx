import React, { useState, useEffect } from "react";

import { QuestionDto as Question } from "../../../__generated__/ourapt";
import { CommentDto as Comment } from "../../../__generated__/ourapt";
import { useApi } from "../../../api";
import { useViewer } from "../../../_providers/useViewer";

import styled from "@emotion/styled";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import QuestionInDetail from "../../Question/QuestionInDetail";
import CommentInDetail from "../../Comment/CommentInDetail";
import CommentInDetailSubmitForm from "../../Comment/CommentInDetailSubmitForm";

import { ReactComponent as KebabIcon } from "../../../_assets/kebabIcon.svg";

import examineResBody from "../../../_modules/examineResBody";

const PageArticleDetail: React.FC = () => {
  const params = useParams<{ articleId?: string }>();
  const articleId = params.articleId || "";

  const api = useApi();

  const { push } = useNavigator();

  const [question, setQuestion] = useState<Question>();
  const [comments, setComments] = useState<Array<Comment>>([]);
  const myInfo = useViewer().viewer?.id;
  const [isMyArticle, setIsMyArticle] = useState<Boolean>(false);

  // 새로 코멘트를 업데이트하면 새로 렌더링되도록 패치하는 flag
  const [isCommentUpdate, setIsCommentUpdate] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await api.questionController.getQuestionByIdUsingGET({
        questionId: articleId,
      });

      const safeBody = examineResBody({
        resBody: response,
        validator: (data) => data.question != null,
        onFailure: () => {
          push(`/error?cause=getQuestionByIdAtPageQuestionDetail`);
        },
      });
      setQuestion(safeBody.data.question);
      const isMyArticle = myInfo === question?.writer.id;
      setIsMyArticle(isMyArticle);
    })();
  }, [api.questionController, articleId, myInfo, push, question?.writer.id]);

  useEffect(() => {
    (async () => {
      const response =
        await api.commentController.getCommentsOfQuestionUsingGET({
          questionId: articleId,
        });

      const safeBody = examineResBody({
        resBody: response,
        validator: (data) => data.comments != null,
        onFailure: () => {
          push(`/error?cause=getCommentsAtPageQuestionDetail`);
        },
      });
      setComments(safeBody.data.comments);
      setIsCommentUpdate(false);
    })();
    // 초기화를 어디서 해줘야 할지 모르겠다. 초기화 하는 순간 다시 렌더링 되지 않나?
    // isCommentUpdate === true 인 경우에만 렌더링 되도록 할 수는 없나?
  }, [isCommentUpdate, api.commentController, articleId, push]);

  const modifyBtn = () => {
    if (isMyArticle) {
      return (
        <KebabIcon
          onClick={(e) => {
            push(`/article/${articleId}/update`);
          }}
        />
      );
    }
    return;
  };

  return (
    <div className="Page">
      <div className="PageQuestionDetail-inner">
        <ScreenHelmet title="상세 게시글" appendRight={modifyBtn} />
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
            return (
              <CommentInDetail
                key={comment.id}
                comment={comment}
                setIsCommentUpdate={setIsCommentUpdate}
              />
            );
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

import React, { useState, useEffect } from "react";

import { QuestionDto as Question } from "../../../__generated__/ourapt";
import { CommentDto as Comment } from "../../../__generated__/ourapt";
import { useApi } from "../../../api";
import { useViewer } from "../../../_providers/useViewer";
import { useModal } from "../../../_providers/useModal";

import styled from "@emotion/styled";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import QuestionInDetail from "../../Question/QuestionInDetail";
import CommentInDetail from "../../Comment/CommentInDetail";
import CommentInDetailSubmitForm from "../../Comment/CommentInDetailSubmitForm";

import { ReactComponent as KebabIcon } from "../../../_assets/kebabIcon.svg";

import examineResBody from "../../../_modules/examineResBody";
import { useAnalytics } from "../../../_analytics/firebase";

const PageArticleDetail: React.FC = () => {
  const params = useParams<{ articleId?: string }>();
  const articleId = params.articleId || "";

  const { viewer } = useViewer();
  const Event = useAnalytics();

  const api = useApi();
  const { setModal } = useModal();

  const { push, replace, pop } = useNavigator();

  const myInfo = useViewer().viewer?.id;
  const [isMyArticle, setIsMyArticle] = useState<Boolean>(false);

  const [question, setQuestion] = useState<Question>();
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [commentsnum, setCommentsnum] = useState<Number>(0);

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

  const modifyBtn = isMyArticle ? (
    <KebabWrapper>
      <KebabIcon
        className="mg-right--17"
        onClick={(e) => {
          Event("clickModifyArticleBtn", {
            at: viewer?.checkedIn?.id,
            article: question?.id,
          });
          setModal(ModifyDeleteQuestionModal);
        }}
      />
    </KebabWrapper>
  ) : (
    <div></div>
  );

  function onModifyQuestionSelect() {
    Event("clickUpdateArticleModal", {
      at: viewer?.checkedIn?.id,
      article: question?.id,
    });
    setModal("close");
    replace(`/article/${articleId}/update`);
  }

  async function onDeleteQuestionConfirm() {
    const response = await api.questionController.deleteQuestionUsingDELETE({
      questionId: articleId,
    });
    if (response.status === "SUCCESS") {
      setModal("close");
      pop();
    }
  }

  const DeleteConfirmationModal = {
    _t: "ConfirmationModal",
    name: "DeleteQuestion",
    confirmationText: "게시글을 삭제할까요?",
    confirmationBtnText: "삭제할게요",
    confirmationAction: onDeleteQuestionConfirm,
  };

  function onDeleteQuestionSelect() {
    Event("clickDeleteArticleModal", {
      at: viewer?.checkedIn?.id,
      article: question?.id,
    });
    setModal(DeleteConfirmationModal);
  }

  const ModifyDeleteQuestionModal = {
    _t: "MultiSelectModal",
    name: "ModifyDeleteQuestion",
    selection: [
      {
        type: "수정",
        color: "#222222",
        action: onModifyQuestionSelect,
      },
      {
        type: "삭제",
        color: "#ff0000",
        action: onDeleteQuestionSelect,
      },
    ],
  };

  useEffect(() => {
    setCommentsnum(comments.length);
  }, [comments]);

  return (
    <div className="Page">
      <div className="PageQuestionDetail-inner">
        <ScreenHelmet title="상세 게시글" appendRight={modifyBtn} />
        <ArticleArea>
          {question && <QuestionInDetail question={question} />}
        </ArticleArea>
        <CommentsArea>
          <CommentsAreaTitle>
            댓글{commentsnum !== 0 && " " + commentsnum}
          </CommentsAreaTitle>
          {comments.length === 0 ? (
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
                    setIsCommentUpdate={setIsCommentUpdate}
                  />
                );
              })}
            </div>
          )}
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

const KebabWrapper = styled.div`
  padding-left: 16px;
`;

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

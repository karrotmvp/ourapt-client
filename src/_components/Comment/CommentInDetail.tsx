import React from "react";

import { CommentDto as Comment } from "../../__generated__/ourapt";

import { useAnalytics } from "../../_analytics/firebase";
import { useApi } from "../../api";
import { useViewer } from "../../_providers/useViewer";
import { useModal } from "../../_providers/useModal";

import UserAsAuthor from "../User/UserAsAuthor";

import { ReactComponent as KebabIcon } from "../../_assets/kebabIcon.svg";
import styled from "@emotion/styled";

type CommentInDetailProps = {
  comment: Comment;
  setIsCommentUpdate: React.Dispatch<React.SetStateAction<Boolean>>;
};

const CommentInDetail: React.FC<CommentInDetailProps> = ({
  comment,
  setIsCommentUpdate,
}) => {
  const { viewer } = useViewer();
  const isMyArticle = viewer?.id === comment.writer.id;
  const articleBackgroundColor = isMyArticle ? "#f9f9f9" : "#ffffff";

  const api = useApi();
  const { setModal } = useModal();

  const Event = useAnalytics();

  async function onDeleteCommentConfirm() {
    const response = await api.commentController.deleteCommentUsingDELETE({
      commentId: comment.id,
    });
    if (response.status === "SUCCESS") {
      setModal("close");
      setIsCommentUpdate(true);
    }
  }

  const DeleteConfirmationModal = {
    _t: "ConfirmationModal",
    name: "DeleteComment",
    confirmationText: "댓글을 삭제할까요?",
    confirmationBtnText: "삭제할게요",
    confirmationAction: onDeleteCommentConfirm,
  };

  function onDeleteCommentSelect() {
    Event("clickDeleteCommentModal", {
      at: viewer?.checkedIn?.id,
      article: comment.id,
    });
    setModal(DeleteConfirmationModal);
  }

  const ModifyDeleteCommentModal = {
    _t: "MultiSelectModal",
    name: "ModifyDeleteComment",
    selection: [
      {
        type: "삭제",
        color: "#ff0000",
        action: onDeleteCommentSelect,
      },
    ],
  };

  function onUserCardClick() {
    Event("clickUserCard", {
      context: "atPageDetail",
      at: viewer?.checkedIn?.id,
      articleType: "comment",
      article: comment.id,
      user: comment.writer.id,
    });
  }

  return (
    <div
      className="ArticleCard ArticleCardInList pd--16"
      style={{ backgroundColor: articleBackgroundColor }}
    >
      <div
        className="ArticleCardInlist-Author"
        onClick={() => onUserCardClick()}
      >
        <UserAsAuthor
          writer={comment.writer}
          createdAt={comment.createdAt}
          updatedAt={comment.updatedAt}
        />
        {isMyArticle && (
          <KebabWrapper>
            <KebabIcon
              onClick={(e) => {
                Event("clickModifyCommentBtn", {
                  at: viewer?.checkedIn?.id,
                  article: comment.id,
                });
                setModal(ModifyDeleteCommentModal);
              }}
            />
          </KebabWrapper>
        )}
      </div>
      <p className="ArticleCard-Content ArticleCardInList-CommentContent mg-top--10">
        {comment.mainText}
      </p>
    </div>
  );
};

export default CommentInDetail;

const KebabWrapper = styled.div`
  padding-left: 14px;
  padding-right: 10px;
`;

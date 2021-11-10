import React from "react";

import { CommentDto as Comment } from "../../__generated__/ourapt";
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
  const isMyArticle = useViewer().viewer?.id === comment.writer.id;
  const articleBackgroundColor = isMyArticle ? "#f9f9f9" : "#ffffff";

  const api = useApi();
  const { setModal } = useModal();

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

  return (
    <div
      className="ArticleCard ArticleCardInList pd--16"
      style={{ backgroundColor: articleBackgroundColor }}
    >
      <div className="ArticleCardInlist-Author">
        <UserAsAuthor
          writer={comment.writer}
          createdAt={comment.createdAt}
          updatedAt={comment.updatedAt}
        />
        {isMyArticle && (
          <KebabWrapper>
            <KebabIcon
              onClick={(e) => {
                setModal(ModifyDeleteCommentModal);
              }}
            />
          </KebabWrapper>
        )}
      </div>
      <p className="ArticleCard-Content ArticleCardInList-Content mg-top--10">
        {comment.mainText}
      </p>
    </div>
  );
};

export default CommentInDetail;

const KebabWrapper = styled.div`
  padding-left: 14px;
  padding-right: 2px;
`;

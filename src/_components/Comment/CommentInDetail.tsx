import React from "react";

import { CommentDto as Comment } from "../../__generated__/ourapt";
import { useViewer } from "../../_providers/useViewer";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import UserAsAuthor from "../User/UserAsAuthor";
import { ReactComponent as KebabIcon } from "../../_assets/kebabIcon.svg";
import { useModal } from "../../_providers/useModal";

type CommentInDetailProps = {
  comment: Comment;
};

const CommentInDetail: React.FC<CommentInDetailProps> = ({ comment }) => {
  const isMyArticle = useViewer().viewer?.id === comment.writer.id;
  const articleBackgroundColor = isMyArticle ? "#f7f7f7" : "#ffffff";

  const { setModal } = useModal();

  function onModifyCommentSelect() {
    alert(`${comment.id} 수정`);
  }

  function onDeleteCommentSelect() {
    setModal(DeleteConfirmationModal);
  }

  function onDeleteCommentConfirm() {
    alert("댓글삭제");
  }

  const DeleteConfirmationModal = {
    _t: "ConfirmationModal",
    name: "DeleteComment",
    confirmationText: "댓글을 삭제할까요?",
    confirmationBtnText: "삭제할게요",
    confirmationAction: onDeleteCommentConfirm,
  };

  const ModifyDeleteCommentModal = {
    _t: "MultiSelectModal",
    name: "ModifyDeleteComment",
    selection: [
      {
        type: "수정",
        color: "#222222",
        action: onModifyCommentSelect,
      },
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
          <KebabIcon
            onClick={(e) => {
              setModal(ModifyDeleteCommentModal);
            }}
          />
        )}
      </div>
      <p className="ArticleCard-Content ArticleCardInList-Content mg-top--10">
        {comment.mainText}
      </p>
    </div>
  );
};

export default CommentInDetail;

import React, { useState, useEffect, useReducer } from "react";

import { useApi } from "../../api";

import examineResBody from "../../_modules/examineResBody";

type State =
  | {
      _t: "blank";
      mainText: string;
    }
  | {
      _t: "typed";
      mainText: string;
    };

type Action = {
  _t: "CHANGE_TEXT";
  payload: string;
};

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action.payload) {
    case "":
      return {
        _t: "blank",
        mainText: action.payload,
      };
    default:
      return {
        _t: "typed",
        mainText: action.payload,
      };
  }
};

type CommentInDetailSubmitFormProps = {
  articleId: string;
  setIsCommentUpdate: React.Dispatch<React.SetStateAction<Boolean>>;
};

const CommentInDetailSubmitForm: React.FC<CommentInDetailSubmitFormProps> = ({
  articleId,
  setIsCommentUpdate,
}) => {
  const [state, dispatch] = useReducer(reducer, { _t: "blank", mainText: "" });

  const api = useApi();

  const [submitBtnActiveState, setSubmitBtnActiveState] = useState({
    disabled: true,
    className: "btn--inactive",
  });

  const [scrollHeight, setScrollHeight] = useState(32);
  const [showCounter, setShowCounter] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({
      _t: "CHANGE_TEXT",
      payload: e.target.value,
    });
    setScrollHeight(e.target.scrollHeight);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state._t === "typed") {
      const response = await api.commentController.writeNewCommentUsingPOST({
        questionId: articleId,
        commentContent: {
          mainText: state.mainText || "",
        },
      });
      examineResBody(response, "QuestionDetail에서 새 코멘트 제출");
      if (response.status === "SUCCESS") {
        setIsCommentUpdate(true);
        resetTextarea();
      }
    }
  }

  function resetTextarea() {
    dispatch({
      _t: "CHANGE_TEXT",
      payload: "",
    });
    setScrollHeight(32);
    setShowCounter(false);
  }

  useEffect(() => {
    if (state._t === "blank") {
      setSubmitBtnActiveState({ disabled: true, className: "btn--inactive" });
    } else {
      setSubmitBtnActiveState({ disabled: false, className: "btn--active" });
    }
  }, [state]);

  useEffect(() => {
    if (scrollHeight > 32) {
      setShowCounter(true);
    }
  }, [scrollHeight]);

  return (
    <form
      id={articleId}
      className="CommentSubmitForm"
      action="submit"
      onSubmit={handleSubmit}
    >
      <div className="CommentSubmitForm-textareaContainer">
        <textarea
          id="CommentSubmitForm-textarea"
          className="CommentSubmitForm-textarea"
          rows={1}
          style={{ height: scrollHeight }}
          maxLength={255}
          value={state.mainText}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              setScrollHeight(32);
              setShowCounter(false);
            }
          }}
          placeholder="알고 있는 내용을 공유해 보세요!"
        />
        {showCounter && (
          <div className="CommentSubmitForm-textCounter">
            ({state.mainText.length}/255)
          </div>
        )}
      </div>
      <button
        disabled={submitBtnActiveState.disabled}
        className={"CommentSubmitForm-btn " + submitBtnActiveState.className}
      >
        <img
          src={require("../../_assets/CommentSubmitBtnIcon.svg").default}
          alt="댓글 작성"
        />
      </button>
    </form>
  );
};

export default CommentInDetailSubmitForm;

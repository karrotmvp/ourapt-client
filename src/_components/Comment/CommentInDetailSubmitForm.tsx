import { useNavigator } from "@karrotframe/navigator";
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

  const { push } = useNavigator();

  const [submitBtnActiveState, setSubmitBtnActiveState] = useState({
    disabled: true,
    className: "btn--inactive",
  });

  const [defaultScrollHeight, setDefaultScrollHeight] = useState(84);
  const [scrollHeight, setScrollHeight] = useState(32);
  const [showCounter, setShowCounter] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length > 80) {
      dispatch({
        _t: "CHANGE_TEXT",
        payload: e.target.value.substring(0, 80),
      });
    } else {
      dispatch({
        _t: "CHANGE_TEXT",
        payload: e.target.value,
      });
    }
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
      const safeBody = examineResBody({
        resBody: response,
        onFailure: () => {
          push(`/error?cause=writeNewComments`);
        },
      });
      if (safeBody.status === "SUCCESS") {
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
    setScrollHeight(defaultScrollHeight);
    setShowCounter(false);
  }

  useEffect(() => {
    const textArea = document.getElementById("CommentSubmitForm-textarea");
    if (textArea && textArea.scrollHeight < defaultScrollHeight) {
      setDefaultScrollHeight(textArea.scrollHeight);
    }
  }, [state, defaultScrollHeight]);

  useEffect(() => {
    if (state._t === "blank") {
      setSubmitBtnActiveState({ disabled: true, className: "btn--inactive" });
    } else {
      setSubmitBtnActiveState({ disabled: false, className: "btn--active" });
    }
  }, [state]);

  useEffect(() => {
    if (scrollHeight > defaultScrollHeight) {
      setShowCounter(true);
    }
  }, [scrollHeight, defaultScrollHeight]);

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
          value={state.mainText}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              setScrollHeight(defaultScrollHeight);
              setShowCounter(false);
            }
          }}
          placeholder="알고 있는 내용을 공유해 보세요!"
        />
        {showCounter && (
          <div className="CommentSubmitForm-textCounter">
            ({state.mainText.length}/80)
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

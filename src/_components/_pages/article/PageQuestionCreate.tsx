import React, { useEffect, useReducer, useState } from "react";

import { useApi } from "../../../api";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import examineResBody from "../../../_modules/examineResBody";

// FIXME: State에서 textlength 받을 필요 없음. CommentSubmit폼 참조해서 .lenght로 바로 받아버리자!
type State =
  | {
      _t: "blank";
      mainText: string;
      textLength: Number;
    }
  | {
      _t: "typed";
      mainText: string;
      textLength: Number;
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
        textLength: action.payload.length,
      };
    default:
      return {
        _t: "typed",
        mainText: action.payload,
        textLength: action.payload.length,
      };
  }
};

const PageArticleCreate: React.FC = () => {
  const api = useApi();
  const [state, dispatch] = useReducer(reducer, {
    _t: "blank",
    mainText: "",
    textLength: 0,
  });

  const { push, pop } = useNavigator();

  const [submitBtnActiveState, setSubmitBtnActiveState] = useState({
    disabled: true,
    className: "btn--inactive",
  });

  const voteId = useParams<{ articleId?: string }>().articleId || "no-params";

  useEffect(() => {
    if (state._t === "blank") {
      setSubmitBtnActiveState({ disabled: true, className: "btn--inactive" });
    } else {
      setSubmitBtnActiveState({ disabled: false, className: "btn--active" });
    }
  }, [state]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length > 255) {
      dispatch({
        _t: "CHANGE_TEXT",
        payload: e.target.value.substring(0, 255),
      });
    } else {
      dispatch({
        _t: "CHANGE_TEXT",
        payload: e.target.value,
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state._t === "typed") {
      const response = await api.questionController.writeNewQuestionUsingPOST({
        voteId: voteId,
        questionContent: {
          mainText: state.mainText,
        },
      });

      const safeBody = examineResBody({
        resBody: response,
        validator: (data) => data.question != null,
        onFailure: () => {
          push(`/error?cause=writeNewQuestionAtPageQuestionCreate`);
        },
      });
      pop();
    }
  }

  return (
    <div className="Page">
      <ScreenHelmet title="게시글 작성" />
      <form className="QuestionCreateUpdateForm pd--16" onSubmit={handleSubmit}>
        <textarea
          className="QuestionCreateUpdateForm-input mg-bottom--16"
          // autoFocus
          placeholder="우리 아파트 이웃들과 이야기를 나눠보세요!"
          value={state.mainText}
          onChange={handleChange}
        />
        <div className="QuestionCreateUpdateForm-textCounter">
          ({state.textLength}/255)
        </div>
        <button
          disabled={submitBtnActiveState.disabled}
          className={
            "QuestionCreateUpdateForm-btn btn-full btn " +
            submitBtnActiveState.className
          }
        >
          게시글 올리기
        </button>
      </form>
    </div>
  );
};

export default PageArticleCreate;

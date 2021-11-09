import React, { useEffect, useReducer, useState } from "react";

import { useApi } from "../../../api";

import { ScreenHelmet, useNavigator } from "@karrotframe/navigator";

import examineResBody from "../../../_modules/examineResBody";

type State =
  | {
      _t: "blank";
      textLength: number;
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
  const [state, dispatch] = useReducer(reducer, { _t: "blank", textLength: 0 });

  const { push } = useNavigator();

  const [submitBtnActiveState, setSubmitBtnActiveState] = useState({
    disabled: true,
    className: "btn--inactive",
  });

  useEffect(() => {
    if (state._t === "blank") {
      setSubmitBtnActiveState({ disabled: true, className: "btn--inactive" });
    } else {
      setSubmitBtnActiveState({ disabled: false, className: "btn--active" });
    }
  }, [state]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({
      _t: "CHANGE_TEXT",
      payload: e.target.value,
    });
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state._t === "typed") {
      const response = await api.questionController.writeNewQuestionUsingPOST({
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

      const question = safeBody.data.question;
      push(`/article/${question.id}`);
    }
  }

  return (
    <div className="Page">
      <ScreenHelmet title="게시글 작성" />
      <form className="QuestionCreateUpdateForm pd--16" onSubmit={handleSubmit}>
        <textarea
          className="QuestionCreateUpdateForm-input mg-bottom--16"
          placeholder="아파트 생활, 맛집에 대해 글을 써보세요!"
          maxLength={255}
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

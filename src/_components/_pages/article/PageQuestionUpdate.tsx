import React, { useEffect, useReducer, useState } from "react";

// import { QuestionDto as Question } from "../../../__generated__/ourapt";
import { useApi } from "../../../api";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import examineResBody from "../../../_modules/examineResBody";

type State =
  | {
      _t: "blank";
      mainText: string;
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
  const params = useParams<{ articleId?: string }>();
  const articleId = params.articleId || "";

  const api = useApi();
  const [state, dispatch] = useReducer(reducer, {
    _t: "blank",
    mainText: "",
    textLength: 0,
  });

  const { push, replace } = useNavigator();
  // const [question, setQuestion] = useState<Question>();

  const [submitBtnActiveState, setSubmitBtnActiveState] = useState({
    disabled: true,
    className: "btn--inactive",
  });

  useEffect(() => {
    (async () => {
      const response = await api.questionController.getQuestionByIdUsingGET({
        questionId: articleId,
      });

      const safeBody = examineResBody({
        resBody: response,
        validator: (data) => data.question != null,
        onFailure: () => {
          push(`/error?cause=getQuestionByIdAtPageQuestionUpdate`);
        },
      });

      const question = safeBody.data.question;
      dispatch({
        _t: "CHANGE_TEXT",
        payload: question.mainText,
      });
    })();
  }, [api.questionController, articleId, push]);

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
      const response = await api.questionController.updateQuestionUsingPATCH({
        questionId: articleId,
        questionContent: {
          mainText: state.mainText,
        },
      });

      const safeBody = examineResBody({
        resBody: response,
        validator: (data) => data.question != null,
        onFailure: () => {
          push(`/error?cause=writeNewQuestionAtPageQuestionUpdate`);
        },
      });
      const question = safeBody.data.question;
      replace(`/article/${question.id}`);
    }
  }

  return (
    <div className="Page">
      <ScreenHelmet title="게시글 작성" />
      <form className="QuestionCreateUpdateForm pd--16" onSubmit={handleSubmit}>
        <textarea
          className="QuestionCreateUpdateForm-input mg-bottom--16"
          placeholder="아파트 생활, 맛집에 대해 글을 써보세요!"
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
          게시글 수정
        </button>
      </form>
    </div>
  );
};

export default PageArticleCreate;

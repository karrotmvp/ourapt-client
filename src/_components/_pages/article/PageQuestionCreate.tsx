import React, { useEffect, useReducer, useState } from "react";

import { useViewer } from "../../../_providers/useViewer";
import { useApi } from "../../../api";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

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

// reducer
// type에 따라서 적당한 다음 상태를 연결해주는 친구

const PageArticleCreate: React.FC = () => {
  const api = useApi();
  const { regionId } = useViewer();
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
          regionId: regionId,
        },
      });
      const question = examineResBody(response, "새 게시글 쓰기").data.question;
      // const question = response.data.question;
      push(`/article/${question.id}`);
    }
  }

  return (
    <div className="Page">
      <ScreenHelmet />
      {/* articleForm으로 하지 않고 questionForm으로 하는 이유, 또 버튼을 분리하지 않고 form 안에 넣어버리는 이유 = 확장은 나중에 생각할 것, 지금은 question에 한정하여 생각할 것이므로!  */}
      <form className="QuestionCreateUpdateForm pd--16" onSubmit={handleSubmit}>
        <textarea
          className="QuestionCreateUpdateForm-input mg-bottom--16"
          placeholder="아파트 생활, 맛집, 모임에 대해 글을 써보세요!"
          maxLength={255}
          onChange={handleChange}
        />
        {state.textLength} / 255
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

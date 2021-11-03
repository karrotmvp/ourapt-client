import React, { useEffect, useReducer, useState } from "react";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";
type PageQuestionCreateState =
  | {
      _t: "init"; // "not-writing"
      writing: false;
    }
  | {
      _t: "writing"; // "not-writing",
      mainText: string;
      writing: true;
    };

type PageQuestionCreateAction = { type: "CHANGE_TEXT"; payload: string };
// https://react.vlpt.us/basic/20-useReducer.html

// initState
const initState: PageQuestionCreateState = {
  _t: "init",
  writing: false,
};

function handleChange(newText: string): PageQuestionCreateState {
  if (newText.length === 0) {
    return {
      _t: "init",
      writing: false,
    };
  }
  return {
    _t: "writing",
    mainText: newText,
    writing: true,
  };
}

function reducer(
  state: PageQuestionCreateState,
  action: PageQuestionCreateAction
): PageQuestionCreateState {
  switch (action.type) {
    case "CHANGE_TEXT":
      return handleChange(action.payload);
    default:
      return state;
  }
}

// reducer
// type에 따라서 적당한 다음 상태를 연결해주는 친구

const PageArticleCreate: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const { push } = useNavigator();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // server에 submit
    // question detail 페이지로 돌아가기

    // push(`/article/${questionId}`);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "CHANGE_TEXT",
      payload: e.target.value,
    });
  }

  return (
    <div className="Page">
      <ScreenHelmet />
      {/* articleForm으로 하지 않고 questionForm으로 하는 이유, 또 버튼을 분리하지 않고 form 안에 넣어버리는 이유 = 확장은 나중에 생각할 것, 지금은 question에 한정하여 생각할 것이므로!  */}
      <form className="QuestionCreateUpdateForm pd--16" onSubmit={handleSubmit}>
        <textarea
          className="QuestionCreateUpdateForm-input mg-bottom--16"
          // type="text"
          placeholder="아파트 생활, 맛집, 모임에 대해 글을 써보세요!"
          // onChange={handleChange}
        />
        <button className="QuestionCreateUpdateForm-btn btn-full btn--active">
          게시글 올리기
        </button>
      </form>
    </div>
  );
};

export default PageArticleCreate;

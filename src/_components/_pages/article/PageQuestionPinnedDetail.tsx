import React, { useState, useEffect, useReducer } from "react";

import { QuestionDto as Question } from "../../../__generated__/ourapt";
import { useApi } from "../../../api";

import { useViewer } from "../../../_providers/useViewer";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import examineResBody from "../../../_modules/examineResBody";
import { listenerCount } from "process";
import { stat } from "fs";

type State =
  | {
      _t: "blank";
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
      };
    default:
      return {
        _t: "typed",
        mainText: action.payload,
      };
  }
};

const PageQuestionPinnedDetail: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { _t: "blank" });

  const params = useParams<{ articleId?: string }>();
  const articleId = params.articleId || "";

  const api = useApi();
  const { regionId } = useViewer();
  const [pinnedQuestion, setPinnedQuestion] = useState<Question>();

  const { push } = useNavigator();
  // questionId로 Question 내용 받아오기

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      _t: "CHANGE_TEXT",
      payload: e.target.value,
    });
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state._t === "typed") {
      alert(state.mainText);
      // const response = await api.commentController.writeNewCommentUsingPOST({
      //   questionId: articleId,
      //   commentContent: {
      //     mainText: state.mainText || "",
      //     regionId: regionId,
      //   },
      // });
      // alert(response);
      // examineResBody(response, "PinnedDetail에서 새 코멘트 제출");
      // if (response.status === "SUCCESS") {
      //   alert(response);
      //   push(`article/${articleId}`);
      // }
    }
  }

  return (
    <div className="Page">
      <ScreenHelmet />
      <form
        id={articleId}
        className="BriefSubmitForm pd--24"
        action="submit"
        onSubmit={handleSubmit}
      >
        <QuestionPinnedTitle>
          우리 아파트의 벽 색깔 맘에 드나요?
        </QuestionPinnedTitle>
        <input
          className="BriefSubmitForm-input mg-bottom--16"
          type="text"
          placeholder="어떻게 생각하세요?"
          onChange={handleChange}
        />
        <button
          id="submitBtn"
          disabled={submitBtnActiveState.disabled}
          className={
            "BriefSubmitForm-btn btn-full " + submitBtnActiveState.className
          }
        >
          내 의견 댓글로 남기기
        </button>
      </form>
    </div>
  );
};

export default PageQuestionPinnedDetail;

const QuestionPinnedTitle = styled.div`
  margin-bottom: 80px;

  text-align: left;
  font-size: 26px;
  font-weight: 700;
  line-height: 34px;
`;

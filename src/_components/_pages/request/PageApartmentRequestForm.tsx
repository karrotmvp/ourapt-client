import React, { useState, useEffect, useReducer } from "react";

import styled from "@emotion/styled";

import { ScreenHelmet } from "@karrotframe/navigator";
import { useApi } from "../../../api";
import { mini } from "../../../_Karrotmarket/KarrotmarketMini";

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

const PageApartmentRequestForm: React.FC = () => {
  const api = useApi();
  const [state, dispatch] = useReducer(reducer, { _t: "blank", mainText: "" });

  const [submitBtnActiveState, setSubmitBtnActiveState] = useState({
    disabled: true,
    className: "btn--inactive",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      _t: "CHANGE_TEXT",
      payload: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state._t === "typed") {
      const response =
        await api.noApartmentController.submitAnswerNoApartmentUsingPOST({
          answer: {
            answer: state.mainText,
          },
        });
      if (response.status === "SUCCESS") {
        mini.close();
      }
    }
    resetInput();
  }

  function resetInput() {
    dispatch({
      _t: "CHANGE_TEXT",
      payload: "",
    });
  }

  useEffect(() => {
    if (state._t === "blank") {
      setSubmitBtnActiveState({ disabled: true, className: "btn--inactive" });
    } else {
      setSubmitBtnActiveState({ disabled: false, className: "btn--active" });
    }
  }, [state]);

  return (
    <div className="Page">
      <ScreenHelmet />
      <form
        className="BriefSubmitForm pd--24"
        action="submit"
        onSubmit={handleSubmit}
      >
        <ApartmentRequestFormTitle>
          목록에 살고 계신 아파트가 없나요?
        </ApartmentRequestFormTitle>
        <ApartmentRequestFormInfo>
          서비스 준비 중인 지역이라면 아파트가 뜨지 않아요.
          <br />
          나의 지역 오픈 시에 알림을 보내드리고 있어요.
        </ApartmentRequestFormInfo>
        <input
          className="BriefSubmitForm-input mg-bottom--16"
          type="text"
          value={state.mainText}
          onChange={handleChange}
          placeholder="지역명 + 아파트 이름"
        />
        <button
          disabled={submitBtnActiveState.disabled}
          className={
            "BriefSubmitForm-btn btn-full btn " + submitBtnActiveState.className
          }
        >
          오픈하면 알림받기
        </button>
      </form>
    </div>
  );
};

export default PageApartmentRequestForm;

const ApartmentRequestFormTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
`;
const ApartmentRequestFormInfo = styled.div`
  margin-top: 12px;
  margin-bottom: 40px;

  color: #555555;
  font-size: 15px;
`;

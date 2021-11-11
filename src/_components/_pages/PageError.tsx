import React, { useEffect } from "react";

import styled from "@emotion/styled";

import { useAnalytics } from "../../_analytics/firebase";
import { useViewer } from "../../_providers/useViewer";

import {
  ScreenHelmet,
  useNavigator,
  useQueryParams,
} from "@karrotframe/navigator";

import { ReactComponent as PageErrorIcon } from "../../_assets/PageErrorIcon.svg";

const PageError: React.FC = () => {
  const params = useQueryParams<{ cause?: string }>().cause || "";

  const { viewer } = useViewer();
  const Event = useAnalytics();

  const { pop } = useNavigator();

  function onGoBackBtnClick() {
    pop();
  }

  useEffect(() => {
    Event("viewPageError", {
      at: viewer?.checkedIn?.id,
      cause: params,
      user: viewer?.id,
    });
  }, []);

  return (
    <PageErrorContainer className="Page center">
      <ScreenHelmet />
      <PageErrorIcon />
      <PageErrorTitle>불편을 드려서 정말 죄송해요.</PageErrorTitle>
      <PageErrorInfo>
        찾고 계신 페이지에 문제가 생겼어요. <br /> 이전 페이지로 돌아가시겠어요?
      </PageErrorInfo>
      <button className="btn-184 btn btn--active" onClick={onGoBackBtnClick}>
        이전 페이지로 돌아가기
      </button>
      <ErrorLog>{params}</ErrorLog>
    </PageErrorContainer>
  );
};

export default PageError;

const PageErrorContainer = styled.div`
  position: relative;
`;

const PageErrorTitle = styled.div`
  margin-top: 32px;
  margin-bottom: 8px;

  font-size: 18px;
  font-weight: 700;
`;

const PageErrorInfo = styled.div`
  margin-bottom: 48px;

  color: #555555;
  font-size: 15px;
`;

const ErrorLog = styled.p`
  position: absolute;
  bottom: 10px;

  color: #dddddd;
  font-size: 6px;
`;

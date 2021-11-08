import React from "react";

import styled from "@emotion/styled";

import { ReactComponent as PageErrorIcon } from "../../_assets/PageErrorIcon.svg";

const PageError: React.FC = () => {
  function onGoBackBtnClick() {
    // history.back();
  }
  return (
    <PageErrorContainer className="center">
      <PageErrorIcon />
      <PageErrorTitle>불편을 드려서 정말 죄송해요.</PageErrorTitle>
      <PageErrorInfo>
        찾고 계신 페이지에 문제가 생겼어요. <br /> 이전 페이지로 돌아가시겠어요?
      </PageErrorInfo>
      <button className="btn-184 btn btn--active" onClick={onGoBackBtnClick}>
        이전 페이지로 돌아가기
      </button>
    </PageErrorContainer>
  );
};

export default PageError;

const PageErrorContainer = styled.div`
  width: 100%;
  height: 100%;

  margin-top: 92px;
  background-color: aliceblue;
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

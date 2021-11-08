import React from "react";

import styled from "@emotion/styled";

import { ScreenHelmet } from "@karrotframe/navigator";

const PageApartmentRequsetForm: React.FC = () => {
  return (
    <div className="Page">
      <ScreenHelmet />
      <form className="BriefSubmitForm pd--24" action="submit">
        <ApartmentRequestFormTitle>
          목록에 살고 계신 아파트가 없나요?
        </ApartmentRequestFormTitle>
        <ApartmentRequestFormInfo>
          아직 서비스 준비 중인 지역이에요.
          <br />
          나의 지역 오픈 시에 알림을 보내드리고 있어요.
        </ApartmentRequestFormInfo>
        <input
          className="BriefSubmitForm-input mg-bottom--16"
          type="text"
          placeholder="아파트 이름을 적어주세요"
        />
        <button className="BriefSubmitForm-btn btn-full btn btn--inactive">
          오픈하면 알림받기
        </button>
      </form>
    </div>
  );
};

export default PageApartmentRequsetForm;

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

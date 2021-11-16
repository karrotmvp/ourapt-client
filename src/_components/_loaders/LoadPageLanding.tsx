import React from "react";

import styled from "@emotion/styled";

const LoadPageLanding: React.FC = () => {
  return (
    <div className="Page">
      <div className="loader--ScreenHelmet"></div>
      <div className="pd--24">
        <LoadLandingTitle_FirstLine className="loader" />
        <LoadLandingTitle_SecondLine className="loader" />
        <LoadBrandWrapper>
          <LoadBrandTitle className="loader" />
          <LoadBrandHorizon className="loader" />
        </LoadBrandWrapper>
        <LoadApartmentInLanding className="loaderItem-first" />
        <LoadApartmentInLanding className="loaderItem-second" />
        <LoadApartmentInLanding className="loaderItem-third" />
        <LoadApartmentInLanding className="loaderItem-fourth" />
      </div>
    </div>
  );
};

export default LoadPageLanding;

const LoadLandingTitle_FirstLine = styled.div`
  height: 24px;
  width: 130px;

  margin-bottom: 12px;
`;
const LoadLandingTitle_SecondLine = styled.div`
  height: 24px;
  width: 240px;

  margin-bottom: 24px;
`;

const LoadBrandWrapper = styled.div`
  margin-bottom: 8px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LoadBrandTitle = styled.div`
  width: 30px;
  height: 15px;
`;

const LoadBrandHorizon = styled.div`
  height: 1px;
  width: 268px;

  margin-right: 0;

  border: none;
`;

const LoadApartmentInLanding = styled.div`
  width: 100%;
  height: 54px;

  margin-bottom: 16px;

  border-radius: 8px;
`;

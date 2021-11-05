import React, { useEffect, useState } from "react";

import { ApartmentDto as Apartment } from "../../__generated__/ourapt";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { useAccessToken } from "../../_providers/useAccessToken";
import { useApi } from "../../api";

import { mini } from "../../_Karrotmarket/KarrotmarketMini";
import { ScreenHelmet, useNavigator } from "@karrotframe/navigator";

import ApartmentInLanding from "../Apartment/ApartmentInLanding";
import { useViewer } from "../../_providers/useViewer";
import examineResBody from "../../_modules/examineResBody";
import { response } from "msw";

type PageLandingProps = {
  apartments: Array<Apartment>;
};

const PageLanding: React.FC<PageLandingProps> = ({ apartments }) => {
  const api = useApi();
  const { accessToken, issueAccessTokenFromAuthorizationCode } =
    useAccessToken();
  const { viewer } = useViewer();

  const { push, pop, replace } = useNavigator();
  const goPageApartmentRequestForm = () => {
    push(`/apartment/request`);
  };

  async function checkedInAndGoFeed(apartmentId: string) {
    const response = await api.userController.changeMyCheckedInUsingPATCH({
      newCheckedInInfo: {
        newApartmentId: apartmentId,
      },
    });
    if (response.status === "SUCCESS") push(`/feed/${apartmentId}`);
  }

  const submitAgreement = (apartmentId: string) => {
    mini.startPreset({
      preset: `${process.env.REACT_APP_PRESET_URL}`,
      params: {
        appId: `${process.env.REACT_APP_ID}`,
      },
      onSuccess: function (result) {
        if (result && result.code) {
          issueAccessTokenFromAuthorizationCode(result.code);
        }
        alert(`코드 리젠할게요! ${accessToken}`);
        checkedInAndGoFeed(apartmentId);
      },
    });
  };

  function onApartmentInLandingClick(apartmentId: string) {
    if (accessToken) {
      return checkedInAndGoFeed(apartmentId);
    } else {
      return submitAgreement(apartmentId);
    }
  }
  return (
    <div className="Page">
      <ScreenHelmet />
      {/* {regionId}에서 접속한 사람이 보는 랜딩페이지 */}
      <div className="Page pd--24">
        {apartments.length === 0 ? (
          // TODO : Error Throwing 페이지 혹은 이미지 만들어서 넣어놓기
          <div>
            아파트먼트 리스트가 0인데 있을 수 없는 일입니다... 에러 쓰로잉
            페이지로 넘겨줄 것
          </div>
        ) : (
          <div className="width--100">
            <PageLandingTitle>
              현재 살고 계신 <br /> 아파트에 방문해 보세요!
            </PageLandingTitle>
            {apartments.map((apartment, idx) => {
              return (
                <ApartmentInLanding
                  key={apartment.id}
                  apartment={apartment}
                  onApartmentInLandingClick={() => {
                    onApartmentInLandingClick(apartment.id);
                  }}
                />
              );
            })}
            <PageLandingAdditionalInfo
              className="font-color--key font-weight--700"
              onClick={() => goPageApartmentRequestForm()}
            >
              목록에 살고 계신 아파트가 없나요?
            </PageLandingAdditionalInfo>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLanding;

const PageLandingTitle = styled.div`
  margin-bottom: 24px;

  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
`;

const PageLandingAdditionalInfo = styled.div`
  width: 100%;
  height: 44px;

  margin-top: 40px;

  font-size: 13px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;

  background-color: #fdeeee;
`;

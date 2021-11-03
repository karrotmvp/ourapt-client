import React, { useEffect, useState } from "react";

import { UserDto as User } from "../../__generated__/ourapt";
import { ApartmentDto as Apartment } from "../../__generated__/ourapt";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { useMyInfoState, useMyInfoDispatch } from "../../_modules/setMyInfo";
import { useApi } from "../../api";

import { ScreenHelmet, useNavigator } from "@karrotframe/navigator";

import {
  getRegionFromURLParams,
  getCodeFromURLParams,
} from "../../_modules/getQueryFromURLParams";

import examineResponse from "../../_modules/examineResponse";
import examineResBody from "../../_modules/examineResBody";

import ApartmentInLanding from "../Apartment/ApartmentInLanding";

const PageLanding: React.FC = () => {
  const [apartments, setApartments] = useState<Array<Apartment>>([]);
  const myInfo = useMyInfoState();
  const dispatch = useMyInfoDispatch();

  const api = useApi();

  const { push, pop, replace } = useNavigator();
  const goPageApartmentRequestForm = () => {
    push(`/apartment/request`);
  };

  // 이것들은 전체 앱이 만들어질 때 가져와서 콘텍스트로 갖고 있는 편이 안정적이다?
  const regionId = getRegionFromURLParams();

  const setUser = (user: User) => dispatch({ _t: "SET_USER", user: user });
  const setAccessToken = (accessToken: string) =>
    dispatch({ _t: "SET_ACCESSTOKEN", accessToken: accessToken });

  async function showApartmentsFromRegionId() {
    let response;
    if (regionId !== "NO_REGION_ID") {
      response = await api.apartmentController.getApartmentInRegionUsingGET({
        regionId: regionId,
      });
    } else if (true) {
      response = await api.apartmentController.getApartmentInRegionUsingGET({
        // regionId: "b7ca1e49757c",
        regionId: "a87002cc41f1",
      });
    } else {
      alert("다시 접속해 주세요");
    }
    const apartments = examineResBody(response, "regionId로 apartment 받기")
      .data.apartments;
    setApartments(apartments);
  }

  async function issueAccessTokenByCode(code: string) {
    if (process.env.REACT_APP_TEST === "MSW_버전") {
      code = "tempcode";
    }

    const response = await api.oauthController.karrotLoginUsingPOST({
      body: {
        authorizationCode: code,
      },
    });
    const accessToken = examineResBody(response, "code로 AccessToken 발급받기")
      .data.accessToken;

    return "Bearer " + accessToken;
  }

  async function getMyInfo(accessToken: string) {
    let response;
    response = await api.userController.getMyInfoUsingGET({
      headers: {
        Authorization: accessToken,
      },
    });
    console.log(`여기 정보를 받아오나요? ${response}`);
    const myInfo = examineResBody(
      response,
      "AccessToken으로 내 정보 받아오기"
    ).data;
    return myInfo;
  }

  async function setMyInfo() {
    const user = await getMyInfo(myInfo.accessToken);
    setUser(user);
  }

  async function init() {
    showApartmentsFromRegionId();
  }

  useEffect(() => {
    console.log("유즈이펙트가 돌아요!");
    init();
  }, []);

  useEffect(() => {
    setMyInfo();
  }, [myInfo]);
  return (
    <div className="Page">
      <ScreenHelmet />
      {/* {regionId}에서 접속한 사람이 보는 랜딩페이지 */}
      <div className="Page pd--24">
        {apartments.length === 0 ? (
          <div></div>
        ) : (
          <div className="width--100">
            <PageLandingTitle>
              현재 살고 계신 <br /> 아파트에 방문해 보세요!
            </PageLandingTitle>
            {apartments.map((apartment, idx) => {
              return <ApartmentInLanding apartment={apartment} />;
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

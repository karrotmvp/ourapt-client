import React, {
  useEffect,
  useState,
  useReducer,
  createContext,
  useContext,
  Dispatch,
} from "react";

import { UserDto as User } from "../../api";
import { ApartmentDto as Apartment } from "../../api";
import { Class2Api as ApartmentControllerApi } from "../../api";
import { Class3Api as OAuthControllerApi } from "../../api";
import { Class6Api as UserControllerApi } from "../../api";
import { Configuration } from "../../api";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { ScreenHelmet, useNavigator } from "@karrotframe/navigator";

import { useMyInfoState, useMyInfoDispatch } from "../../_modules/setMyInfo";
import {
  getRegionFromURLParams,
  getCodeFromURLParams,
} from "../../_modules/getQueryFromURLParams";
import examineResponse from "../../_modules/examineResponse";
import examineResBody from "../../_modules/examineResBody";

import ApartmentInLanding from "../Apartment/ApartmentInLanding";

const PageLanding: React.FC = () => {
  // API call:
  // request ---- 가지고 있는 regionId를 서버로 보내고, (regionId는 params로 받아올 예정)
  // response ---- 해당 region이 가지고 있는 channel 목록들을 받아옵니다.
  const { push, pop, replace } = useNavigator();
  const goPageApartmentRequestForm = () => {
    push(`/apartment/request`);
  };
  // const UserContext = React.createContext();
  const [apartments, setApartments] = useState<Array<Apartment>>([]);

  const regionId = getRegionFromURLParams();
  let code = getCodeFromURLParams();

  if (process.env.REACT_APP_TEST === "MSW_버전") {
    code = "tempcode";
  }

  const state = useMyInfoState();
  const dispatch = useMyInfoDispatch();
  const setUser = (user: User) => dispatch({ _t: "SET_USER", user: user });
  const setAccessToken = (accessToken: any) =>
    dispatch({ _t: "SET_ACCESSTOKEN", accessToken: accessToken });

  const apartmentController = new ApartmentControllerApi();
  const oauthController = new OAuthControllerApi();
  const userController = new UserControllerApi();
  const configuration = new Configuration();

  async function showApartmentsFromRegionId() {
    let response;
    if (regionId !== "NO_REGION_ID") {
      response = await apartmentController.getApartmentInRegionUsingGETRaw({
        regionId: regionId,
      });
    } else if (true) {
      response = await apartmentController.getApartmentInRegionUsingGETRaw({
        // regionId: "b7ca1e49757c",
        regionId: "1f0758ccde06",
      });
    } else {
      alert("다시 접속해 주세요");
    }
    const resBody = await examineResponse(response);
    // examineResBody(resBody, "regionId로 apartment 받기");
    setApartments(resBody.data.apartments);
  }

  async function issueAccessTokenByCode() {
    let response;
    response = await oauthController.karrotLoginUsingPOSTRaw({
      body: {
        authorizationCode: code,
      },
    });
    const resBody = await examineResponse(response);
    // examineResBody(resBody, "code로 AccessToken 발급받기");
    return "Bearer " + resBody.data.accessToken;
  }

  async function getMyInfo() {
    let response;
    response = await userController.getMyInfoUsingGETRaw();
    const resBody = await examineResponse(response);
    // examineResBody(resBody, "AccessToken으로 내 정보 받아오기");
    return resBody.data;
  }

  async function init() {
    // 웹뷰 테스트 하기 전까지는 임시로 코드를 먹여 놓을게요!
    if (!code) {
      showApartmentsFromRegionId();
      console.log("여기서 분기가 걸리면 아래로 내려가지 못해요!");
    } else {
      setAccessToken(issueAccessTokenByCode);
      setUser(await getMyInfo());
      console.log(
        `여기는 페이지랜딩인데요, ${JSON.stringify(state.user.checkedIn)}`
      );
      // if ()
      // if (userInfo.isCheckedIn) {
      //   // 아파트 피드로 보내주기
      // } else {
      //   showApartmentsFromRegionId();
      // }
    }
  }

  useEffect(() => {
    console.log("유즈이펙트가 돌아요!");
    init();
  }, []);
  // console.log(window.sessionStorage.getItem("ouraptAccessToken"));

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

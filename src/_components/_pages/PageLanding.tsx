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

// const configuration = new Configuration({
//   accessToken: "",
// });

// const apartmentController = new ApartmentControllerApi(configuration);
// const oauthController = new OAuthControllerApi(configuration);
// const userController = new UserControllerApi(configuration);
const apartmentController = new ApartmentControllerApi();
const oauthController = new OAuthControllerApi();
const userController = new UserControllerApi();

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
  const setAccessToken = (accessToken: string) =>
    dispatch({ _t: "SET_ACCESSTOKEN", accessToken: accessToken });

  async function showApartmentsFromRegionId() {
    let response;
    if (regionId !== "NO_REGION_ID") {
      response = await apartmentController.getApartmentInRegionUsingGET({
        regionId: regionId,
      });
    } else if (true) {
      response = await apartmentController.getApartmentInRegionUsingGET({
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

  async function issueAccessTokenByCode() {
    let response;
    response = await oauthController.karrotLoginUsingPOST({
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
    // response = await userController.getMyInfoUsingGET({
    //   headers: {
    //     Authorization: accessToken,
    //   },
    // });
    console.log(accessToken);
    try {
      await userController.getMyInfoUsingGET({
        headers: {
          Authorization: accessToken,
        },
      });
    } catch (e) {
      console.log(e);
    }
    // console.log(`여기 정보를 받아오나요? ${response}`);
    // const myInfo = examineResBody(
    //   response,
    //   "AccessToken으로 내 정보 받아오기"
    // ).data;
    // return myInfo;
  }

  async function init() {
    // 웹뷰 테스트 하기 전까지는 임시로 코드를 먹여 놓을게요!
    code = "nEcir4RXbUDEDtFvqZSJ";
    if (!code) {
      showApartmentsFromRegionId();
      console.log("여기서 분기가 걸리면 아래로 내려가지 못해요!");
    } else {
      const accessToken = await issueAccessTokenByCode();
      setAccessToken(accessToken);
      // 이거 왜 한번에 하면 안되는지 궁금
      console.log(`그냥 ${accessToken}`);
      console.log(`액세스토큰 받아오기 성공? ${state.accessToken}`);
      const myInfo = await getMyInfo(state.accessToken);
      console.log(`제가 마이인포를 잘받아왔을가요? ${myInfo}`);
      // setUser(myInfo);
      console.log(`콘텍스트 안에서 잘 받아졌나 확인해볼까요? ${state.user}`);

      // 한번 더 분기해주겠습니다!
      const isCheckedIn = state.user.checkedIn;
      // 서버에서는 null로 보내주지만 여기에서 받을 때는 undefined로 변환될 수도 있어서 그냥 !로 잡아주었습니다.
      if (!isCheckedIn) {
        showApartmentsFromRegionId();
      } else {
        push(`/feed/${isCheckedIn.id}`);
      }
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

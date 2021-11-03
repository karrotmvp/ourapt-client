import React, { useEffect } from "react";

import { UserDto as User } from "../__generated__/ourapt";

import { useApi } from "../api";
import { useMyInfoState, useMyInfoDispatch } from "../_modules/setMyInfo";
import examineResBody from "../_modules/examineResBody";

import PageLanding from "../_components/_pages/PageLanding";
import PageFeed from "../_components/_pages/PageFeed";

import {
  getCodeFromURLParams,
  getRegionFromURLParams,
} from "../_modules/getQueryFromURLParams";
import { access } from "fs";

const OnLanding: React.FC = () => {
  // export default function OnLanding() {
  const regionId = getRegionFromURLParams(); // "NO_REGION_ID" 이거나 리즌아이디를 받아옴
  const code = getCodeFromURLParams(); // "NOT_AGREED" 이거나 코드를 받아옴

  const myInfoState = useMyInfoState();
  const dispatch = useMyInfoDispatch();

  const setRegionId = (regionId: string) =>
    dispatch({ _t: "SET_REGIONID", regionId: regionId });
  const setCode = (code: string) => dispatch({ _t: "SET_CODE", code: code });

  useEffect(() => {
    setRegionId(regionId);
    setCode(code);
  }, []);

  const api = useApi();

  const setAccessToken = (accessToken: string) =>
    dispatch({ _t: "SET_ACCESSTOKEN", accessToken: accessToken });
  const setUser = (user: User) => dispatch({ _t: "SET_USER", user: user });

  async function issueAccessTokenByCode(code: string) {
    if (process.env.REACT_APP_TEST === "MSW_버전") {
      code = "tempcode";
    }

    const response = await api.oauthController.karrotLoginUsingPOST({
      body: {
        authorizationCode: code,
      },
    });
    const temp = response.data?.accessToken;
    alert(`여기서 걸리려나? ${temp}`);
    const accessToken = examineResBody(response, "code로 AccessToken 발급받기")
      .data.accessToken;

    return "Bearer " + accessToken;
  }

  async function issueMyInfoByAccessToken(accessToken: string) {
    const response = await api.userController.getMyInfoUsingGET({
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

  //   async function accessTokenHandler() {
  //     let code = myInfoState.code;

  //     // Test
  //     code = "OKlTTj59nIeAlNdzILeE";

  //     if (code !== "NOT_AGREED") {
  //       const accessToken = await issueAccessTokenByCode(code);
  //       alert(`받았다! ${accessToken}`);
  //       setAccessToken(accessToken);
  //     }
  //   }

  //   accessTokenHandler();

  //   useEffect(() => {
  //     if (myInfoState.accessToken && !myInfoState.user) {
  //       (async function () {
  //         const myInfo = await issueMyInfoByAccessToken(myInfoState.accessToken);
  //         setUser(myInfo);
  //       })();
  //     }
  //   }, [myInfoState]);

  //   if (myInfoState.code === "NOT_AGREED") {
  //     return () => {
  //       <PageLanding />;
  //     };
  //   }
  //   if (!myInfoState.user.checkedIn) {
  //     return () => {
  //       <PageLanding />;
  //     };
  //   } else {
  //     const checkedInApartmentId = myInfoState.user.checkedIn.id;
  //     return () => {
  //       <PageFeed apartmentId={checkedInApartmentId} />;
  //     };
  //   }
  if (myInfoState.code === "NOT_AGREED") {
    return <PageLanding />;
  }
  if (!myInfoState.user.checkedIn) {
    return <PageLanding />;
  } else {
    const checkedInApartmentId = myInfoState.user.checkedIn.id;
    return <PageFeed apartmentId={checkedInApartmentId} />;
  }
};

export default OnLanding;

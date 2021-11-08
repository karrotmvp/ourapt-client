// 얘가 하는 역할은? AccessToken이 있는 경우에 user 정보 받아와서 저장하기
// 얘는 늘 액세스토큰이 있을 때만 issueing 할 예정이지만!
// code를 추후 얻어서 주입하는 것처럼, AT를 추후에 얻어서 주입하는 것도 대비해야 하는가?

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import {
  UserDto as User,
  CommonResponseBodyOneUserDto,
} from "../__generated__/ourapt";

import { useApi } from "../api";
import { useAccessToken } from "./useAccessToken";
import examineResBody from "../_modules/examineResBody";
import { getRegionFromURLParams } from "../_modules/getQueryFromURLParams";

type State =
  | {
      _t: "pending"; // 액세스토큰이 있지만 아직 뷰어 정보를 받아오지 않는 경우
      regionId: string;
    }
  | {
      _t: "ready"; // 액세스토큰이 null 인 경우 - viewer도 null / 액세스토큰이 있고 viewer를 받아온 경우
      regionId: string;
      viewer: User | null;
    };

type Action = {
  _t: "SET_VIEWER";
  viewer: User;
};

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  return {
    ...prevState,
    _t: "ready",
    viewer: action.viewer,
  };
};

const ViewerContext = createContext<User | null>(null);
const RegionIdContext = createContext<string>("");

export const ViewerProvider: React.FC = (props) => {
  const api = useApi();
  // 무한 렌더링이 일어날까? 아니야... useAT에서 이미 useMemo 했기 때문에 발생하지 않을 것이라고 짐작해보자...
  const { accessToken } = useAccessToken();
  const regionId = getRegionFromURLParams();

  const [state, dispatch] = useReducer(
    reducer,
    accessToken
      ? { _t: "pending", regionId: regionId }
      : { _t: "ready", regionId: regionId, viewer: null }
  );

  useEffect(() => {
    if (accessToken && state._t === "pending") {
      const getViewerFromAccessToken = async function () {
        const response = await api.userController.getMyInfoUsingGET();
        return response;
      };
      const distpatchIssuedViewer = async function (
        getViewerFunction: Promise<CommonResponseBodyOneUserDto>
      ) {
        const resBody = await getViewerFunction;
        const viewer = examineResBody(
          resBody,
          "useViewer에서 AT로 내 정보 가져오기"
        ).data.user;

        dispatch({
          _t: "SET_VIEWER",
          viewer: viewer,
        });
      };

      distpatchIssuedViewer(getViewerFromAccessToken());
    }
  }, [accessToken, state, api.userController]); // AT가 재설정될 경우에만 새로 돌도록 합니다.

  if (state._t === "pending") {
    return null;
  }
  return (
    <ViewerContext.Provider value={state.viewer}>
      <RegionIdContext.Provider value={state.regionId}>
        {props.children}
      </RegionIdContext.Provider>
    </ViewerContext.Provider>
  );
};

export function useViewer() {
  const viewer = useContext(ViewerContext);
  const regionId = useContext(RegionIdContext);

  return useMemo(() => ({ viewer, regionId }), [viewer, regionId]);
}

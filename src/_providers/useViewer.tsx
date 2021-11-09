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

import { LogFirstRequestUsingGETRefererEnum as RefEnum } from "../__generated__/ourapt";

import { useApi } from "../api";
import { useAccessToken } from "./useAccessToken";
import examineResBody from "../_modules/examineResBody";
import { getRegionFromURLParams } from "../_modules/getQueryFromURLParams";

type State =
  | {
      _t: "pending"; // 액세스토큰이 있지만 아직 뷰어 정보를 받아오지 않는 경우
      regionId: string;
      instanceId: RefEnum;
      viewer: User | null;
    }
  | {
      _t: "ready"; // 액세스토큰이 null 인 경우 - viewer도 null / 액세스토큰이 있고 viewer를 받아온 경우
      regionId: string;
      instanceId: RefEnum;
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

const ViewerContext = createContext<State | null>(null);
// const ViewerContext = createContext<User | null>(null);
// const RegionIdContext = createContext<string>("");
// const InstanceIdContext = createContext<string>("");

export const ViewerProvider: React.FC = (props) => {
  const api = useApi();

  const { accessToken } = useAccessToken();

  const regionId = getRegionFromURLParams();
  const InstanceId = RefEnum.Unknown;

  const [state, dispatch] = useReducer(
    reducer,
    accessToken
      ? {
          _t: "pending",
          regionId: regionId,
          instanceId: InstanceId,
          viewer: null,
        }
      : {
          _t: "ready",
          regionId: regionId,
          instanceId: InstanceId,
          viewer: null,
        }
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
  }, [state._t, accessToken, api.userController]); // AT가 재설정될 경우에만 새로 돌도록 합니다.

  if (state._t === "pending") {
    return null;
  }

  return (
    // <RegionIdContext.Provider value={state.regionId}>
    //   <InstanceIdContext.Provider value={state.instanceId}>
    <ViewerContext.Provider value={state}>
      {props.children}
    </ViewerContext.Provider>
    //   </InstanceIdContext.Provider>
    // </RegionIdContext.Provider>
  );
};

// const RegionProvider

export function useViewer() {
  const myInfoContext = useContext(ViewerContext);
  const viewer = myInfoContext?.viewer;
  const regionId = myInfoContext?.regionId ?? "unknownRegion";
  const instanceId = myInfoContext?.instanceId ?? RefEnum.Unknown;
  // const regionId = useContext(RegionIdContext);
  // const instanceId = useContext(InstanceIdContext);

  return useMemo(
    () => ({ viewer, regionId, instanceId }),
    [viewer, regionId, instanceId]
  );
}

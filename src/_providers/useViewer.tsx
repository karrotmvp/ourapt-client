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
import { useNavigator } from "@karrotframe/navigator";

type State =
  | {
      _t: "pending"; // 액세스토큰이 있지만 아직 뷰어 정보를 받아오지 않는 경우
      viewer: User | null;
    }
  | {
      _t: "ready"; // 액세스토큰이 null 인 경우 - viewer도 null / 액세스토큰이 있고 viewer를 받아온 경우
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

export const ViewerProvider: React.FC = (props) => {
  const api = useApi();
  const { push } = useNavigator();

  const { accessToken } = useAccessToken();

  const [state, dispatch] = useReducer(
    reducer,
    accessToken
      ? {
          _t: "pending",
          viewer: null,
        }
      : {
          _t: "ready",
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
        const response = await getViewerFunction;

        const safeBody = examineResBody({
          resBody: response,
          validator: (data) => data.user != null,
          onFailure: () => {
            push(`/error?cause=getMyInfoAtUseViewer`);
          },
        });

        const viewer = safeBody.data.user;
        dispatch({
          _t: "SET_VIEWER",
          viewer: viewer,
        });
      };
      distpatchIssuedViewer(getViewerFromAccessToken());
    }
  }, [state._t, accessToken, api.userController, push]); // AT가 재설정될 경우에만 새로 돌도록 합니다.

  if (state._t === "pending") {
    return null;
  }

  return (
    <ViewerContext.Provider value={state}>
      {props.children}
    </ViewerContext.Provider>
  );
};

export function useViewer() {
  const myInfoContext = useContext(ViewerContext);
  const viewer = myInfoContext?.viewer;

  return useMemo(() => ({ viewer }), [viewer]);
}

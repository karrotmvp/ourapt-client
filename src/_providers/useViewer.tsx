// 얘가 하는 역할은? AccessToken이 있는 경우에 user 정보 받아와서 저장하기
// 얘는 늘 액세스토큰이 있을 때만 issueing 할 예정이지만!
// code를 추후 얻어서 주입하는 것처럼, AT를 추후에 얻어서 주입하는 것도 대비해야 하는가?

import React, {
  createContext,
  useCallback,
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
import getLogger from "../_modules/logger";

type State =
  | {
      _t: "pending"; // 액세스토큰이 있지만 아직 뷰어 정보를 받아오지 않는 경우
      viewer: User | null;
    }
  | {
      _t: "ready"; // 액세스토큰이 null 인 경우 - viewer도 null / 액세스토큰이 있고 viewer를 받아온 경우
      viewer: User | null;
    };

type Action =
  | {
      _t: "SET_VIEWER";
      viewer: User;
    }
  | {
      _t: "REFRESH_VIEWER";
    };

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "SET_VIEWER":
      return {
        ...prevState,
        _t: "ready",
        viewer: action.viewer,
      };
    case "REFRESH_VIEWER":
      return {
        ...prevState,
        _t: "pending",
      };
  }
};

const ViewerContext = createContext<User | null>(null);

const voidFC = async () => {};
const ViewerSetterContext = createContext<() => Promise<void>>(voidFC);

const ViewerRefreshContext = createContext<() => void>(voidFC);

export const ViewerProvider: React.FC = (props) => {
  const api = useApi();
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

  // TONY START
  // const getViewerFromAccessToken = () => {
  //   return api.userController.getMyInfoUsingGET();
  // };

  // useEffect(
  //   () => {
  //     // ...
  //   },
  //   [
  //     //...
  //   ]
  // );

  // const refreshViewer = async () => {
  //   const viewer = await getViewerFromAccessToken();
  //   dispatch({
  //     _t: "SET_VIEWER",
  //     viewer,
  //   });
  // };

  // TONY END

  useEffect(() => {
    if (accessToken && state._t === "pending") {
      // if (accessToken) {
      const getViewerFromAccessToken = async function () {
        const response = await api.userController.getMyInfoUsingGET();
        return response;
      };
      const dispatchIssuedViewer = async function (
        getViewerFunction: () => Promise<CommonResponseBodyOneUserDto>
      ) {
        const response = await getViewerFunction();

        const safeBody = examineResBody({
          resBody: response,
          validator: (data) => data.user != null,
          onFailure: () => {
            getLogger().error(`/error?cause=getMyInfoAtUseViewer`);
          },
        });

        const viewer = safeBody.data.user;
        dispatch({
          _t: "SET_VIEWER",
          viewer: viewer,
        });
      };
      dispatchIssuedViewer(getViewerFromAccessToken);
    }
  }, [state._t, accessToken, api.userController]); // AT가 재설정될 경우에만 새로 돌도록 합니다.

  const setViewerWithAccessToken = useCallback(async () => {
    const response = await api.userController.getMyInfoUsingGET();
    const safeBody = examineResBody({
      resBody: response,
      validator: (data) => data.user != null,
      onFailure: () => {
        getLogger().error(`/error?cause=getMyInfoAtUseViewerSetter`);
      },
    });
    const viewer = safeBody.data.user;
    dispatch({
      _t: "SET_VIEWER",
      viewer: viewer,
    });
  }, [api.userController]);

  // FIXME: invalidateViewer
  const refreshViewer = () => {
    dispatch({
      _t: "REFRESH_VIEWER",
    });
  };

  if (state._t === "pending") {
    return null;
  }

  return (
    <ViewerContext.Provider value={state.viewer}>
      <ViewerSetterContext.Provider value={setViewerWithAccessToken}>
        <ViewerRefreshContext.Provider value={refreshViewer}>
          {props.children}
        </ViewerRefreshContext.Provider>
      </ViewerSetterContext.Provider>
    </ViewerContext.Provider>
  );
};

export function useViewer() {
  const viewer = useContext(ViewerContext);
  const setViewerWithAccessToken = useContext(ViewerSetterContext);
  const refreshViewer = useContext(ViewerRefreshContext);

  return useMemo(
    () => ({ viewer, setViewerWithAccessToken, refreshViewer }),
    [viewer, setViewerWithAccessToken, refreshViewer]
  );
}

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
  CommonResponseBodyUserDto,
} from "../__generated__/ourapt";

import { useApi } from "../api";
import { useAccessToken } from "./useAccessToken";
import { access } from "fs";
import examineResBody from "../_modules/examineResBody";

type State =
  | {
      _t: "pending"; // 액세스토큰이 있지만 아직 뷰어 정보를 받아오지 않는 경우
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
    _t: "ready",
    viewer: action.viewer,
  };
};

const ViewerContext = createContext<User | null>(null);

export const ViewerProvider: React.FC = (props) => {
  console.log(`안녕하세요! 저는 뷰어 프로바이더입니다. 제가 돌아볼게요. `);

  const api = useApi();
  // 무한 렌더링이 일어날까? 아니야... useAT에서 이미 useMemo 했기 때문에 발생하지 않을 것이라고 짐작해보자...
  const { accessToken } = useAccessToken();

  const [state, dispatch] = useReducer(
    reducer,
    accessToken ? { _t: "pending" } : { _t: "ready", viewer: null }
  );

  console.log(`********** 유즈이펙트 돌아갑니다`);
  useEffect(() => {
    if (accessToken && state._t === "pending") {
      console.log(`@VProvider --- AT가 있고 && 펜딩이라 뷰어 불러올게요!`);
      const issueViewerFromAccessToken = async function () {
        const response = await api.userController.getMyInfoUsingGET({
          headers: {
            Authorization: accessToken,
          },
        });
        return response;
      };
      const distpatchIssuedViewer = async function (
        issueViewerFunction: Promise<CommonResponseBodyUserDto>
      ) {
        const resBody = await issueViewerFunction;
        const viewer = examineResBody(
          resBody,
          "useViewer에서 AT로 내 정보 가져오기"
        ).data;

        dispatch({
          _t: "SET_VIEWER",
          viewer: viewer,
        });

        console.log(`V 불러왔는데요 : ${viewer}`);
      };

      distpatchIssuedViewer(issueViewerFromAccessToken());
    } else {
      console.log(
        `@VProvider --- AT가 없거나 이미 V를 다 불러온 상태인가봐요.`
      );
    }
  }, [accessToken]); // AT가 재설정될 경우에만 새로 돌도록 합니다.
  console.log(`********** 유즈이펙트 다돌았습니다`);

  if (state._t === "pending") {
    console.log("pending에서 멈추는 경우인데, 이 경우는 나타나면 안돼요.");
    return null;
  } else {
    console.log(
      `ready로 잘 완료됐다면, 저장된 값이 제대로 됐나 확인하기 위해 id를 찍어볼게요 : ${state.viewer?.id}`
    );
  }

  return (
    <ViewerContext.Provider value={state.viewer}>
      {props.children}
    </ViewerContext.Provider>
  );
};

export function useViewer() {
  const viewer = useContext(ViewerContext);

  return useMemo(() => ({ viewer }), [viewer]);
}

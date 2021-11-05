import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { useApi } from "../api";
import { CommonResponseBodyKarrotAccessTokenDto } from "../__generated__/ourapt";

import examineResBody from "../_modules/examineResBody";
import examineResponse from "../_modules/examineResponse";
import { getCodeFromURLParams } from "../_modules/getQueryFromURLParams";

type State =
  | {
      _t: "pending"; // 코드가 있지만 아직 액세스 토큰을 받아오지 않는 경우
    }
  | {
      _t: "ready"; // 코드가 없는 경우, 코드가 있고 액세스 토큰을 받아온 경우
      accessToken: string | null;
    };

type Action = {
  _t: "SET_ACCESS_TOKEN";
  accessToken: string;
};

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  return {
    _t: "ready",
    accessToken: action.accessToken,
  };
};

const AccessTokenContext = createContext<string | null>(null);

const voidFC = () => {};
const AccessTokenSetterContext = createContext<(code: string) => void>(voidFC);

export const AccessTokenProvider: React.FC = (props) => {
  console.log(
    `안녕하세요! 저는 액세스토큰 프로바이더입니다. 제가 돌아볼게요. `
  );
  const api = useApi();
  let code = useMemo(() => {
    return getCodeFromURLParams();
  }, []);
  console.log(`코드가 있나요? ${code}`);

  const manualCode: Boolean = true;

  if (manualCode) {
    code = "u8m8ShBD27M1mihR6hKX";
    console.log(`코드는 매뉴얼로 입력해줄게요! ${code}`);
  }

  const [state, dispatch] = useReducer(
    reducer,
    // code 유무 파악해서 없는 경우 바로 ready로 넘겨주고, 있는 경우 액세스토큰 받아와야 하니 대기상태로 넘겨줄것
    code && code !== "NOT_AGREED"
      ? { _t: "pending" }
      : { _t: "ready", accessToken: null }
  );

  console.log(`지금 스테이터스는요 ${state._t}`);
  console.log(`********** 유즈이펙트 돌아갑니다`);
  useEffect(() => {
    if (code && code !== "NOT_AGREED" && state._t === "pending") {
      console.log(
        `@ATProvider --- 코드가 있고 && 펜딩이라 액세스토큰 불러올게요!`
      );
      const issueAccessTokenFromAuthorizationCode = async function () {
        const response = await api.oauthController.karrotLoginUsingPOST({
          body: {
            authorizationCode: code,
          },
        });
        return response;
      };

      const dispatchIssuedAccessToken = async function (
        issueAccessTokenFunction: Promise<CommonResponseBodyKarrotAccessTokenDto>
      ) {
        const resBody = await issueAccessTokenFunction;
        const accessToken = examineResBody(
          resBody,
          "useAccessToken에서 code로 AT 발급받기"
        ).data.accessToken;

        console.log(`나 지금 프로미스니? ${accessToken}`);

        dispatch({
          _t: "SET_ACCESS_TOKEN",
          accessToken: "Bearer " + accessToken,
        });
        console.log(`AT 불러왔는데요 : ${accessToken}`);
      };

      dispatchIssuedAccessToken(issueAccessTokenFromAuthorizationCode());
    } else {
      console.log(
        `@ATProvider --- 코드가 없거나 이미 AT를 다 불러온 상태인가봐요.`
      );
    }
  }, [code]);
  console.log(`********** 유즈이펙트 다돌았습니다`);

  const issueAccessTokenFromAuthorizationCode = useCallback(
    async (code: string) => {
      const response = await api.oauthController.karrotLoginUsingPOST({
        body: {
          authorizationCode: code,
        },
      });
      const accessToken = examineResBody(
        response,
        "외부에서 useAccessToken 활용하여 code로 AT 발급받기"
      ).data.accessToken;

      dispatch({
        _t: "SET_ACCESS_TOKEN",
        accessToken: "Bearer " + accessToken,
      });
    },
    []
  );

  if (state._t === "pending") {
    console.log(
      "pending에서 멈추는 경우인데, 이 경우는 나타나면 안 돼요. 발급이 실패했나봐요. "
    );
    return null;
  } else {
    console.log(`ready로 잘 완료됐다면, 저장된 값은 : ${state.accessToken}`);
  }

  return (
    <AccessTokenContext.Provider value={state.accessToken}>
      <AccessTokenSetterContext.Provider
        value={issueAccessTokenFromAuthorizationCode}
      >
        {props.children}
      </AccessTokenSetterContext.Provider>
    </AccessTokenContext.Provider>
  );
};

// 사용할 때는 이렇게
export function useAccessToken() {
  const accessToken = useContext(AccessTokenContext);
  const issueAccessTokenFromAuthorizationCode = useContext(
    AccessTokenSetterContext
  );

  return useMemo(
    () => ({ accessToken, issueAccessTokenFromAuthorizationCode }),
    [accessToken, issueAccessTokenFromAuthorizationCode]
  );
}

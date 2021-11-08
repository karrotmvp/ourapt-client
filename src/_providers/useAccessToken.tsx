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
  const api = useApi();
  let code = useMemo(() => {
    return getCodeFromURLParams();
  }, []);

  const manualCode: Boolean = true;

  if (manualCode) {
    code = "oXM_Ug2p1fAbZoOErLbU";
  }

  const [state, dispatch] = useReducer(
    reducer,
    // code 유무 파악해서 없는 경우 바로 ready로 넘겨주고, 있는 경우 액세스토큰 받아와야 하니 대기상태로 넘겨줄것
    code && code !== "NOT_AGREED"
      ? { _t: "pending" }
      : { _t: "ready", accessToken: null }
  );

  useEffect(() => {
    if (code && code !== "NOT_AGREED" && state._t === "pending") {
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

        console.log(accessToken);

        dispatch({
          _t: "SET_ACCESS_TOKEN",
          accessToken: "Bearer " + accessToken,
        });
      };

      dispatchIssuedAccessToken(issueAccessTokenFromAuthorizationCode());
    }
  }, [code, state, api.oauthController]);

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
    [api.oauthController]
  );

  if (state._t === "pending") {
    return null;
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

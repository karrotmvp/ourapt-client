import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

type State =
  | {
      _t: "pending";
    }
  | {
      _t: "ready";
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

const noop = () => {};
const AccessTokenContext = createContext<string | null>(null);
const AccessTokenSetterContext = createContext<(code: string) => void>(noop);

export const AccessTokenProvider: React.FC = (props) => {
  const code = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("code");
  }, []);

  const [state, dispatch] = useReducer(
    reducer,
    code ? { _t: "pending" } : { _t: "ready", accessToken: null }
  );

  useEffect(() => {
    if (code && state._t === "pending") {
      // code를 통해 accessToken을 가진다

      dispatch({
        _t: "SET_ACCESS_TOKEN",
        accessToken: "",
      });
    }
  }, [code]);

  const setAccessTokenFromAuthorizationCode = useCallback(
    async (code: string) => {
      // code를 통해 accessToken을 가진다

      dispatch({
        _t: "SET_ACCESS_TOKEN",
        accessToken: "",
      });
    },
    []
  );

  if (state._t === "pending") {
    return null;
  }

  return (
    <AccessTokenContext.Provider value={state.accessToken}>
      <AccessTokenSetterContext.Provider
        value={setAccessTokenFromAuthorizationCode}
      >
        {props.children}
      </AccessTokenSetterContext.Provider>
    </AccessTokenContext.Provider>
  );
};

export function useAccessToken() {
  const accessToken = useContext(AccessTokenContext);
  const setAccessTokenFromAuthorizationCode = useContext(
    AccessTokenSetterContext
  );

  return useMemo(
    () => ({ accessToken, setAccessTokenFromAuthorizationCode }),
    [accessToken, setAccessTokenFromAuthorizationCode]
  );
}

// const { accessToken, setAccessTokenFromAuthorizationCode } = useAccessToken();

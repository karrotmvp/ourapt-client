import React, { useReducer, createContext, useContext, Dispatch } from "react";
import { UserDto as User } from "../__generated__/ourapt";

type MyInfoState = {
  regionId: string;
  code: string;
  accessToken: string;
  user: User;
};

type MyInfoAction =
  | { _t: "SET_REGIONID"; regionId: string }
  | { _t: "SET_CODE"; code: string }
  | { _t: "SET_USER"; user: User }
  | { _t: "SET_ACCESSTOKEN"; accessToken: string };

type MyInfoDispatch = Dispatch<MyInfoAction>;

const MyInfoStateContext = createContext<MyInfoState | null>(null);
const MyInfoDispatchContext = createContext<MyInfoDispatch | null>(null);

function reducer(state: MyInfoState, action: MyInfoAction): MyInfoState {
  switch (action._t) {
    case "SET_REGIONID":
      return { ...state, regionId: action.regionId };
    case "SET_CODE":
      return { ...state, code: action.code };
    case "SET_USER":
      if (state.user) {
        return state;
      } else {
        return {
          ...state,
          user: action.user,
        };
      }
    case "SET_ACCESSTOKEN":
      return {
        ...state,
        accessToken: action.accessToken,
      };
    default:
      throw new Error("Unhandled Action");
  }
}

export function useMyInfoState() {
  const state = useContext(MyInfoStateContext);
  console.log(`얘는 스테이트 ~~~~ ${state}`);
  if (!state) throw new Error("Error at useMyInfoState");
  return state;
}

export function useMyInfoDispatch() {
  const dispatch = useContext(MyInfoDispatchContext);
  console.log(`디스패치 여기 ~~~~~~ ${dispatch}`);
  if (!dispatch) throw new Error("Error at useMyInfoDispatch");
  return dispatch;
}

export function MyInfoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    regionId: "",
    code: "",
    accessToken: "",
    user: {},
  });

  return (
    <MyInfoStateContext.Provider value={state}>
      <MyInfoDispatchContext.Provider value={dispatch}>
        {children}
      </MyInfoDispatchContext.Provider>
    </MyInfoStateContext.Provider>
  );
}

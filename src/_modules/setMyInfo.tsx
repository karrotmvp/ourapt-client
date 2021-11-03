import React, {
  useEffect,
  useState,
  useReducer,
  createContext,
  useContext,
  Dispatch,
} from "react";
import { UserDto as User, UserDtoFromJSON } from "../api";

type MyInfoState = {
  accessToken: any;
  user: User;
};

type MyInfoAction =
  | { _t: "SET_USER"; user: User }
  | { _t: "SET_ACCESSTOKEN"; accessToken: any };

type MyInfoDispatch = Dispatch<MyInfoAction>;

const MyInfoStateContext = createContext<MyInfoState | null>(null);
const MyInfoDispatchContext = createContext<MyInfoDispatch | null>(null);

function reducer(state: MyInfoState, action: MyInfoAction): MyInfoState {
  switch (action._t) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
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
  if (!state) throw new Error("Error at useMyInfoState");
  return state;
}

export function useMyInfoDispatch() {
  const dispatch = useContext(MyInfoDispatchContext);
  if (!dispatch) throw new Error("Error at useMyInfoDispatch");
  return dispatch;
}

export function MyInfoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
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

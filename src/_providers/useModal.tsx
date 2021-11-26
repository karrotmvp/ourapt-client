import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";

type Modal = MultiSelectModal | ConfirmationModal | AlertModal | Onboarding;

type MultiSelectModal = {
  _t: string;
  name: string;
  selection?: Array<MultiSelectModalSelection>;
};

type MultiSelectModalSelection = {
  type: string;
  color: string;
  action: any;
};

type ConfirmationModal = {
  _t: string;
  name: string;
  confirmationText?: string;
  confirmationBtnText?: string;
  confirmationAction?: any;
};

type AlertModal = {
  _t: string;
  name: string;
  alertTitle?: string;
  alertInfo?: string;
  alertAction?: any;
};

type Onboarding = {
  _t: string;
  name: string;
  action?: any;
};

type State =
  | {
      _t: "modal-closed";
    }
  | {
      _t: "multiSelectModal-opened";
      modal: MultiSelectModal;
    }
  | {
      _t: "confirmationModal-opened";
      modal: ConfirmationModal;
    }
  | {
      _t: "alertModal-opened";
      modal: AlertModal;
    }
  | {
      _t: "onboarding-opened";
      modal: Onboarding;
    };

type Action =
  | {
      _t: "OPEN_MULTISELECT_MODAL";
      payload: MultiSelectModal;
    }
  | {
      _t: "OPEN_CONFIRMATION_MODAL";
      payload: ConfirmationModal;
    }
  | {
      _t: "OPEN_ALERT_MODAL";
      payload: AlertModal;
    }
  | {
      _t: "OPEN_ONBOARDING";
      payload: Onboarding;
    }
  | {
      _t: "CLOSE_MODAL";
    };

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "OPEN_MULTISELECT_MODAL":
      return { _t: "multiSelectModal-opened", modal: action.payload };
    case "OPEN_CONFIRMATION_MODAL":
      return { _t: "confirmationModal-opened", modal: action.payload };
    case "OPEN_ALERT_MODAL":
      return { _t: "alertModal-opened", modal: action.payload };
    case "OPEN_ONBOARDING":
      return { _t: "onboarding-opened", modal: action.payload };
    default:
      return { _t: "modal-closed" };
  }
};

const ModalContext = createContext<State>({ _t: "modal-closed" });

const voidFC = () => {};
const ModalSetterContext =
  createContext<(modal: Modal | "close") => void>(voidFC);

export const ModalProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, { _t: "modal-closed" });

  const setModal = useCallback((modal: Modal | "close") => {
    if (modal === "close") {
      dispatch({ _t: "CLOSE_MODAL" });
      return;
    }
    switch (modal._t) {
      case "MultiSelectModal":
        dispatch({ _t: "OPEN_MULTISELECT_MODAL", payload: modal });
        return;
      case "ConfirmationModal":
        dispatch({ _t: "OPEN_CONFIRMATION_MODAL", payload: modal });
        return;
      case "AlertModal":
        dispatch({ _t: "OPEN_ALERT_MODAL", payload: modal });
        return;
      case "Onboarding":
        dispatch({ _t: "OPEN_ONBOARDING", payload: modal });
        return;
      default:
        dispatch({ _t: "CLOSE_MODAL" });
        return;
    }
  }, []);

  return (
    <ModalContext.Provider value={state}>
      <ModalSetterContext.Provider value={setModal}>
        {props.children}
      </ModalSetterContext.Provider>
    </ModalContext.Provider>
  );
};

export function useModal() {
  const modalState = useContext(ModalContext);
  const setModal = useContext(ModalSetterContext);

  return useMemo(() => ({ modalState, setModal }), [modalState, setModal]);
}

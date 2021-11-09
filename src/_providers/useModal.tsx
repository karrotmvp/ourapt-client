import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import getLogger from '../_modules/logger';

type Modal = MultiSelectModal | ConfirmationModal;

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

type State =
  | {
      _t: 'modal-closed';
    }
  | {
      _t: 'multiSelectModal-opened';
      modal: MultiSelectModal;
    }
  | {
      _t: 'confirmationModal-opened';
      modal: ConfirmationModal;
    };

type Action =
  | {
      _t: 'OPEN_MULTISELECT_MODAL';
      payload: MultiSelectModal;
    }
  | {
      _t: 'OPEN_CONFIRMATION_MODAL';
      payload: ConfirmationModal;
    }
  | {
      _t: 'CLOSE_MODAL';
    };

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case 'OPEN_MULTISELECT_MODAL':
      return { _t: 'multiSelectModal-opened', modal: action.payload };
    case 'OPEN_CONFIRMATION_MODAL':
      return { _t: 'confirmationModal-opened', modal: action.payload };
    default:
      return { _t: 'modal-closed' };
  }
};

const ModalContext = createContext<State>({ _t: 'modal-closed' });

const voidFC = () => {};
const ModalSetterContext =
  createContext<(modal: Modal | 'close') => void>(voidFC);

export const ModalProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, { _t: 'modal-closed' });

  const setModal = useCallback((modal: Modal | 'close') => {
    if (modal === 'close') {
      console.log(`셋모달 ${modal}`);
      dispatch({ _t: 'CLOSE_MODAL' });
      return;
    }
    switch (modal._t) {
      case 'MultiSelectModal':
        dispatch({ _t: 'OPEN_MULTISELECT_MODAL', payload: modal });
        return;
      case 'ConfirmationModal':
        dispatch({ _t: 'OPEN_CONFIRMATION_MODAL', payload: modal });
        return;
      default:
        dispatch({ _t: 'CLOSE_MODAL' });
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

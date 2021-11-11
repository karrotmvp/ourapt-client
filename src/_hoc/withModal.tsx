import { useModal } from "../_providers/useModal";

export default function WithModal() {
  const { modalState, setModal } = useModal();

  function onOverlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLDivElement;
    if (target.id === "Overlay") {
      setModal("close");
    }
  }

  switch (modalState._t) {
    case "multiSelectModal-opened":
      return (
        <div
          id="Overlay"
          className="Overlay MultiSelectModal-Overlay"
          onClick={(e) => {
            onOverlayClick(e);
          }}
        >
          <div id="Modal" className="MultiSelectModal-Wrapper">
            {modalState.modal.selection?.map((selection, idx) => {
              return (
                <div
                  key={idx}
                  className="MultiSelectModal-Selection"
                  style={{ color: selection.color }}
                  onClick={selection.action}
                >
                  {selection.type}
                </div>
              );
            })}
          </div>
        </div>
      );
    case "confirmationModal-opened":
      return (
        <div
          id="Overlay"
          className="Overlay ConfirmationModal-Overlay"
          onClick={(e) => {
            onOverlayClick(e);
          }}
        >
          <div id="Modal" className="ConfirmationModal-Wrapper">
            {modalState.modal.confirmationText}
            <div className="ConfirmationModal-BtnWrapper">
              <button
                className="ConfirmationModal-RejectBtn btn"
                onClick={(e) => {
                  setModal("close");
                }}
              >
                취소
              </button>
              <button
                className="ConfirmationModal-ConfirmBtn btn"
                onClick={modalState.modal.confirmationAction}
              >
                {modalState.modal.confirmationBtnText}
              </button>
            </div>
          </div>
        </div>
      );
    case "alertModal-opened":
      return (
        <div
          id="Overlay"
          className="Overlay AlertModal-Overlay"
          onClick={(e) => {
            onOverlayClick(e);
          }}
        >
          <div id="Modal" className="AlertModal-Wrapper">
            <div className="AlertModal-Title">
              {modalState.modal.alertTitle}
            </div>
            <div className="AlertModal-Info">{modalState.modal.alertInfo}</div>
            <button
              className="AlertModal-CheckBtn btn btn--active"
              onClick={modalState.modal.alertAction}
            >
              확인
            </button>
          </div>
        </div>
      );
  }

  return <div />;
}

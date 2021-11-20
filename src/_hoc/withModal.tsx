import { useModal } from "../_providers/useModal";
import { ReactComponent as CloseIcon } from "../_assets/iconClose.svg";

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
    case "onboarding-opened":
      return (
        <div id="Modal" className="Onboarding-Wrapper vertical-centered">
          <CloseIcon className="Onboarding-CloseIcon" />

          <div className="Onboarding-Title">
            {modalState.modal.apartmentName}
            <br />
            이웃들과 이야기를 나눠보세요!
          </div>
          <p className="Onboarding-Info">
            아래의 주제로 이웃들과 이야기할 수 있어요
          </p>
          <ul>
            <li className="Onboarding-InfoItem">
              <span className="mg-right--8">🏥</span>
              <p>병원 가야 하는데 집 근처 괜찮은 병원이 궁금할 때</p>
            </li>
            <li className="Onboarding-InfoItem">
              <span className="mg-right--8">🍴</span>
              <p>우리 아파트 근처 새로 생긴 음식점이 궁금할 때</p>
            </li>
            <li className="Onboarding-InfoItem">
              <span className="mg-right--8">⏰</span>
              <p>단지 내 피트니스의 운영시간을 알고 싶을 때</p>
            </li>
          </ul>
          <button
            className="Onboarding-Btn btn btn-full btn--active"
            onClick={(e) => {
              window.localStorage.setItem("onboarded", "true");
              setModal("close");
            }}
          >
            이웃들과 이야기하러 가기
          </button>
        </div>
      );
  }

  return <div />;
}

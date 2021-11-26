import { useViewer } from "../_providers/useViewer";
import { useModal } from "../_providers/useModal";
import { useAnalytics } from "../_analytics/firebase";

import { ReactComponent as CloseIcon } from "../_assets/iconClose.svg";

import Slider from "react-slick";

export default function WithModal() {
  const { modalState, setModal } = useModal();

  const Event = useAnalytics();
  const { viewer } = useViewer();

  function onOverlayClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLDivElement;
    if (target.id === "Overlay") {
      setModal("close");
    }
  }

  const onboardingCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
      Event("viewOnboarding", {
        context: viewer
          ? viewer.checkedIn
            ? viewer.checkedIn.id
            : "not checked in"
          : "not our user",
      });
      return (
        <div id="Modal" className="Onboarding-Wrapper vertical-centered">
          <CloseIcon
            className="Onboarding-CloseIcon"
            onClick={(e) => {
              Event("closeOnboarding", {
                context: "withCloseBtn",
              });
              window.localStorage.setItem("viewOnboarding", "true");
              modalState.modal.action();
              setModal("close");
            }}
          />
          <div className="Onboarding-Carousel">
            <Slider {...onboardingCarouselSettings}>
              <div>
                <div className="Onboarding-Title">
                  이웃들과 함께 만드는 재미
                </div>
                <p className="Onboarding-Info">
                  반가워요! 우리아파트는 이웃들과 주제에 대해 <br />
                  투표하고 이야기 나눌 수 있는 곳이에요
                </p>
                <div className="Onboarding-imgWrapper">
                  <img
                    src={require("../_assets/Onboarding01.svg").default}
                  ></img>
                </div>
              </div>
              <div>
                <div className="Onboarding-Title">
                  이젠 검색하지 말고 <br />
                  이웃들과 만들어보세요!
                </div>
                <div className="Onboarding-imgWrapper">
                  <img
                    src={require("../_assets/Onboarding02.svg").default}
                  ></img>
                </div>
              </div>
            </Slider>
          </div>
          <button
            className="Onboarding-Btn btn btn-full btn--active"
            onClick={(e) => {
              Event("closeOnboarding", {
                context: "withBottomBtn",
              });
              window.localStorage.setItem("viewOnboarding", "true");
              setModal("close");
              modalState.modal.action();
            }}
          >
            이웃들과 이야기하러 가기
          </button>
        </div>
      );
  }

  return <div />;
}

import React, { useState } from "react";
import { mini } from "../Karrotmarket/KarrotmarketMini";

// interface PreopenQuestionFormProps extends HTMLAttributes<HTMLDivElement> {
//   a?: string;
// }

// const PreopenQuestionForm: FC<PreopenQuestionFormProps> = (props) => {
//   const { a, ...restProps } = props;
//   return <div className="PreopenQuestionForm" {...restProps}></div>;
// };

type PreopenQuestionFormProps = {
  regionId: string | null;
};

// const PreopenQuestionForm: React.FC<PreopenQuestionFormProps> = ({ state }) => {
const PreopenQuestionForm: React.FC<PreopenQuestionFormProps> = ({
  regionId,
}) => {
  const [form, setForm] = useState({
    question: "",
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const question = event.target.value;
    setForm({
      question: question,
    });
  }

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   console.log("엥?");
  //   const requestHeaders: HeadersInit = new Headers();
  //   const Authorization: string | any =
  //     window.localStorage.getItem("ouraptAccessToken");
  //   requestHeaders.set("Content-Type", "application/json");
  //   requestHeaders.set(Authorization, Authorization);
  //   fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/article/question`, {
  //     method: "POST",
  //     headers: requestHeaders,
  //     body: JSON.stringify({
  //       mainText: form.question,
  //       regionId: regionId,
  //     }),
  //   }).then((response) => {
  //     if (response.ok) {
  //       console.log("제출 완료!");
  //       openConfirmationModal();
  //     }
  //   });
  //   setForm({
  //     question: "",
  //   });
  // }
  function handleSubmitBtn() {
    console.log("되나요?");
    // alert(regionId);
    const requestHeaders: HeadersInit = new Headers();
    const Authorization: string | any =
      window.localStorage.getItem("ouraptAccessToken");
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", Authorization);
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/article/question`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({
        mainText: form.question,
        regionId: regionId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("제출 완료!");
          openConfirmationModal();
        }
      })
      .catch((error) => {
        console.log(error.devMessage);
      });
    setForm({
      question: "",
    });
  }

  const modal: HTMLElement | null = document.getElementById(
    "PreopenQuestionModal"
  );

  function openConfirmationModal() {
    if (!!modal) {
      modal.style.display = "block";
    }
  }

  function closeConfirmationModal() {
    if (!!modal) {
      modal.style.display = "none";
    }
    mini.close();
  }

  return (
    <div className="PreopenQuestionForm">
      <div className="PP-QF-display">
        <p className="PP-QF--displayMessage">알림 신청을 끝냈어요!</p>
        <p className="PP-QF--displayInfo">
          아파트 이웃들이 모이면 알림을 보내드릴게요
          <br />
          오픈 기다리며 이웃들에게 가볍게 한마디 남겨보세요
        </p>
      </div>
      <div className="PP-QF-submit">
        {/* <form className="PP-QF--submit-form" onSubmit={handleSubmit}> */}
        <form className="PP-QF--submit-form">
          <input className="PP-QF--submit-input" onChange={onChange}></input>
          <p className="PP-QF--submit-info">
            <span>예시</span>
            우리 강아지와 산책해요! 상가 세탁소 현금만 받나요?
          </p>
        </form>
        <button
          className="PP-QF--questionBtn PP-btn PP-btn--abled"
          type="submit"
          onClick={handleSubmitBtn}
        >
          가볍게 남겨볼게요
        </button>
      </div>
      <div className="PreopenQuestionModal" id="PreopenQuestionModal">
        <div className="PP-QF-modal--overlay">
          <div className="PP-QF-modal--content">
            <h1 className="PP-QF-modal--title">알림 받기 신청</h1>
            <p>오픈 시 알림을 보내드릴게요</p>
            <button
              className="PP-QF-modal--closeBtn"
              onClick={closeConfirmationModal}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreopenQuestionForm;

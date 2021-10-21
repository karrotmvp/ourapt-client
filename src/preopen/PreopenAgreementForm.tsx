import React from "react";

import { sendWebhookToSlack, getAccessToken } from "./PreopenActions";

// 당근마켓 미니
import { mini } from "../Karrotmarket/KarrotmarketMini";
import { setConstantValue } from "typescript";

type PreopenAgreementFormProps = {
  displayAptName: string;
  displayAptImagesSrc: string;
  regionId: string | null;
  setState: any;
};

// const PreopenAgreementForm: React.FC<PreopenAgreementFormProps> = (props) => {
const PreopenAgreementForm: React.FC<PreopenAgreementFormProps> = ({
  displayAptName,
  displayAptImagesSrc,
  regionId,
  setState,
}) => {
  let urlSearchParams = new URLSearchParams(window.location.search);

  function submitAgreement() {
    sendWebhookToSlack(` :fire: ${displayAptName}에서 동의창을 열었어요!`);
    mini.startPreset({
      preset: `${process.env.REACT_APP_PRESET_URL}`,
      params: {
        appId: `${process.env.REACT_APP_ID}`,
      },
      onSuccess: async function (result) {
        if (result && result.code) {
          // test(result.code);
          const accessToken: string | any = await getAccessToken(result.code);
          window.localStorage.setItem("ouraptAccessToken", accessToken);
          // const accessToken = await getAccessToken(result.code);
          console.log(
            `${window.localStorage.getItem(accessToken)} 받아왔어요!`
          );
          setState({
            _t: "afterAgreement",
            regionId: urlSearchParams.get("region_id"),
          });
        }
      },
    });
  }

  return (
    <div className="PreopenAgreementForm">
      <div className="PP-AF-display">
        <img
          className="PP-AF--logo-ourapt"
          src={require("./assets/logo-ourapt.png").default}
        />
        <br />
        <img
          className="PP-AF--logo-mvp"
          src={require("./assets/logo-mvp.png").default}
        />
        <p className="PP-AF--displayQuestion">
          {displayAptName}
          <br />
          아파트 주민이세요?
        </p>
        <p className="PP-AF-displayInfo">
          우리 아파트 이웃들끼리 편하게
          <br />
          이야기할 수 있는 공간을 준비 중이에요.
        </p>
        <img
          className="PP-AF--displayImg"
          src={require(`${displayAptImagesSrc}`).default}
        />
      </div>
      <div className="PP-AF-agreement">
        <p className="PP-AF--agreementInfo">
          지금 알림 신청하면 오픈 소식을 놓치지 않을 수 있어요!
        </p>
        <button
          className="PP-AF--agreementBtn PP-btn PP-btn--abled"
          onClick={submitAgreement}
        >
          한번 오픈 알림 받아볼게요
        </button>
      </div>
    </div>
  );
};

export default PreopenAgreementForm;

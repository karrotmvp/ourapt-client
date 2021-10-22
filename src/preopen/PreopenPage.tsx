import React, {
  ReactEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import {
  sendWebhookToSlack,
  getAccessToken,
  getRegionInfo,
} from "./PreopenActions";

// 당근마켓 미니, 캐럿프레임
import { ScreenHelmet } from "@karrotframe/navigator";
import { mini } from "../Karrotmarket/KarrotmarketMini";

// 폼 컴포넌트
import PreopenAgreementForm from "./PreopenAgreementForm";
import PreopenQuestionForm from "./PreopenQuestionForm";

// 환경변수
import * as dotenv from "dotenv";
dotenv.config();

// 스펙을 반영한 상태 선언: 토니가 가르쳐 준 방식대로! 두 가지로 선언해 보았어요.
type State = {
  // _t: "beforeAgreement" | "afterAgreement";
  // isPreload: Boolean;
  _t: string;
  regionId: string | null;
  code: string | null;
  accessToken: string | null;
  displayAptName: string;
  displayAptImagesSrc: string;
};

// regionHashDepth3에 따른 객체 설정... 이건 함수로 자동화 할 수는 없을까요? 확인해보기!
const displayApt = new Map();
displayApt.set("1f0758ccde06", {
  displayAptName: "송도 1동",
  displayAptImagesSrc: `./assets/1f0758ccde06.png`,
});
displayApt.set("a87002cc41f1", {
  displayAptName: "송도 2동",
  displayAptImagesSrc: `./assets/a87002cc41f1.png`,
});
displayApt.set("0b96cc858bf6", {
  displayAptName: "송도 3동",
  displayAptImagesSrc: `./assets/0b96cc858bf6.png`,
});
displayApt.set("6a7eefda7865", {
  displayAptName: "잠실 2동",
  displayAptImagesSrc: `./assets/6a7eefda7865.png`,
});
displayApt.set("regionTest", {
  displayAptName: "당근마켓 이용중인",
  displayAptImagesSrc: `./assets/default.png`,
});

// 우선 state를 정의해주고, setState를 커스텀한다:
// let state: State = {
//   _t: "beforeAgreement",
//   isPreload: false,
//   regionId: null,
//   code: null,
//   accessToken: null,
//   displayAptName: "",
//   displayAptImagesSrc: "",
// };

// function setState(nextState: State) {
//   state = { ...nextState };
// }

const PreopenPage: React.FC = () => {
  const [state, setState] = useState({
    _t: "beforeAgreement",
    // isPreload: false,
    regionId: null,
    code: null,
    accessToken: null,
    displayAptName: "당근마켓 이용중인",
    displayAptImagesSrc: "./assets/default.png",
  } as State);
  // 맨 처음 페이지 렌더링 할 때: 이미 신청한 사람인지 확인할 정보들을 모아요.
  // let isAgreed: Boolean = false;
  let urlSearchParams = new URLSearchParams(window.location.search);
  // const regionId: string | null = urlSearchParams.get("region_id");

  function checkIsAgreed() {
    return urlSearchParams.has("code");
  }

  // 가져온 regionHashDepth3에 따른 이미지 파일과 이름 설정하기
  async function init() {
    const regionId: string | any = await getRegionInfo(
      urlSearchParams.get("region_id")
    );
    // alert(regionId);
    // if (checkIsAgreed()) {
    if (!checkIsAgreed()) {
      const code = urlSearchParams.get("code");
      console.log(`코드를 발급하려고 하는데요, ${code}`);
      const accessToken = (await getAccessToken(code)) ?? "";
      window.localStorage.setItem("ouraptAccessToken", accessToken);
      setState({
        ...state,
        // isPreload: urlSearchParams.get("preload") === "true",
        _t: "afterAgreement",
        regionId: urlSearchParams.get("region_id"),
        code,
        accessToken,
      });
    } else {
      // alert(displayApt.has(regionId));
      setState({
        ...state,
        // isPreload: urlSearchParams.get("preload") === "true",
        _t: "beforeAgreement",
        regionId,
        code: null,
        accessToken: null,
        displayAptName: displayApt.has(regionId)
          ? displayApt.get(regionId).displayAptName
          : "당근마켓 이용중인",
        displayAptImagesSrc: displayApt.has(regionId)
          ? displayApt.get(regionId).displayAptImagesSrc
          : "./assets/default.png",
      });
    }
  }

  // 우선 isAgreed를 체크해줄 것.
  // checkIsAgreed();

  // 만약 isAgreed라면 1) 액세스토큰을 가져와서 저장해둘 것.
  // if (isAgreed) {
  //   // const code: string | null = "0b96cc858bf6";
  // }

  // 그 다음 regionInfo를 설정해줄 것.
  // 그리고 나서 전체를 초기화할 수 있다!
  // const displayAptInfo = "a87002cc41f1";
  // alert("stop");
  // alert(window.location.href);
  // // alert(!state.isPreload);
  // alert(JSON.stringify(state, null, 2));
  // 초기 상태 불러오기
  // if (!state.isPreload) {
  //   alert("이닛할게!");
  //   init();
  // }
  useEffect(() => {
    // alert("initialize!");
    init().catch((err) => alert(err));
  }, []);

  // 슬랙 웹훅 걸어줄 것
  // if (isPreload !== true) {
  //   sendWebhookToSlack(
  //     ` :partying_face: ${state.displayAptName}에서 우리 페이지를 방문했어요!`
  //   );
  // }

  return (
    <div className="PreopenPage">
      <ScreenHelmet />
      {state._t === "afterAgreement" ? (
        <PreopenQuestionForm regionId={state.regionId} />
      ) : (
        <PreopenAgreementForm
          displayAptName={state.displayAptName}
          displayAptImagesSrc={state.displayAptImagesSrc}
          regionId={state.regionId}
          setState={setState}
        />
      )}
    </div>
  );
};

export default PreopenPage;

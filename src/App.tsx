import React from "react";

// 당근마켓 미니앱, 캐럿프레임
// import Mini from "@karrotmarket/mini";
import { Navigator, Screen } from "@karrotframe/navigator";
import "@karrotframe/navigator";
import { mini } from "./_Karrotmarket/KarrotmarketMini";

// 페이지뷰
import PreopenPage from "./_PREOPEN/PreopenPage";
import TempPage from "./pages/TempPage";

// 부분 페이지뷰를 더 잘 말하는 이름들이 궁금합니다...
import Modal from "./components/OverlayPopup/Modal";
import HalfView from "./components/OverlayPopup/HalfView";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navigator
        theme="Cupertino"
        onClose={() => {
          mini.close();
        }}
      >
        {/* <Screen path="/">
          <PreopenPage />
        </Screen> */}
        <Screen path="/temp">
          <TempPage />
        </Screen>
      </Navigator>
      <Modal />
      <HalfView />
    </div>
  );
};

export default App;

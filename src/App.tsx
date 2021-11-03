import React from "react";
import {
  MyInfoProvider,
  useMyInfoDispatch,
  useMyInfoState,
} from "./_modules/setMyInfo";

// 당근마켓 미니앱, 캐럿프레임
// import Mini from "@karrotmarket/mini";
import { Navigator, Screen } from "@karrotframe/navigator";
import "@karrotframe/navigator";
import { mini } from "./_Karrotmarket/KarrotmarketMini";

// HOC
import OnLanding from "./_hoc/onLanding";

// 페이지뷰
import PreopenPage from "./_PREOPEN/PreopenPage";
import PageLanding from "./_components/_pages/PageLanding";
import PageApartmentRequsetForm from "./_components/_pages/request/PageApartmentRequestForm";
import PageFeed from "./_components/_pages/PageFeed";
import PageQuestionPinnedDetail from "./_components/_pages/article/PageQuestionPinnedDetail";
import PageQuestionDetail from "./_components/_pages/article/PageQuestionDetail";
import PageQuestionUpdate from "./_components/_pages/article/PageQuestionUpdate";
import PageQuestionCreate from "./_components/_pages/article/PageQuestionCreate";
import { ApiProvider } from "./api";

if (process.env.REACT_APP_TEST === "MSW_버전") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const App: React.FC = () => {
  return (
    <MyInfoProvider>
      <ApiProvider>
        <div className="App">
          <Navigator
            theme="Cupertino"
            onClose={() => {
              mini.close();
            }}
          >
            <Screen path="/">
              <OnLanding />
            </Screen>
            <Screen path="/preopen">
              <PreopenPage />
            </Screen>
            <Screen path="/landing">
              <PageLanding />
            </Screen>
            <Screen path="/apartment/request">
              <PageApartmentRequsetForm />
            </Screen>
            <Screen path="/feed/:apartmentId">
              <PageFeed apartmentId={""} />
            </Screen>
            <Screen path="/article/:articleId/pinned">
              <PageQuestionPinnedDetail />
            </Screen>
            <Screen path="/article/create">
              <PageQuestionCreate />
            </Screen>
            <Screen path="/article/:articleId">
              <PageQuestionDetail />
            </Screen>
            <Screen path="/article/:articleId/update">
              <PageQuestionUpdate />
            </Screen>
          </Navigator>
        </div>
      </ApiProvider>
    </MyInfoProvider>
  );
};

export default App;

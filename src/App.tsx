import React from "react";

// 당근마켓 미니앱, 캐럿프레임
// import Mini from "@karrotmarket/mini";
import { Navigator, Screen } from "@karrotframe/navigator";
import { mini } from "./_Karrotmarket/KarrotmarketMini";

import { css } from "@emotion/css";

// HOC
import WithLanding from "./_hoc/withLanding";
import WithModal from "./_hoc/withModal";

// 페이지뷰
import PageLanding from "./_components/_pages/PageLanding";
import PageApartmentRequestForm from "./_components/_pages/request/PageApartmentRequestForm";
import PageFeed from "./_components/_pages/PageFeed";
import PageQuestionPinnedDetail from "./_components/_pages/article/PageQuestionPinnedDetail";
import PageQuestionDetail from "./_components/_pages/article/PageQuestionDetail";
import PageQuestionUpdate from "./_components/_pages/article/PageQuestionUpdate";
import PageQuestionCreate from "./_components/_pages/article/PageQuestionCreate";
import PageError from "./_components/_pages/PageError";

import { ApiProvider } from "./api";
import { AccessTokenProvider } from "./_providers/useAccessToken";
import { ViewerProvider } from "./_providers/useViewer";
import { ModalProvider } from "./_providers/useModal";

if (process.env.REACT_APP_TEST === "MSW_버전") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

// TODO: 프로바이더들 합치는 것도 고려해보자

const App: React.FC = () => {
  return (
    <AccessTokenProvider>
      <ApiProvider>
        <ViewerProvider>
          <ModalProvider>
            <div className="App">
              <Navigator
                className={css`
                  --kf_navigator_navbar-height: 56px;
                `}
                theme="Cupertino"
                onClose={() => {
                  mini.close();
                }}
              >
                <Screen path="/" component={WithLanding} />
                <Screen path="/landing">
                  <PageLanding />
                </Screen>
                <Screen path="/apartment/request">
                  <PageApartmentRequestForm />
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
                <Screen path="/error">
                  <PageError cause={""} />
                </Screen>
                <WithModal />
              </Navigator>
            </div>
          </ModalProvider>
        </ViewerProvider>
      </ApiProvider>
    </AccessTokenProvider>
  );
};

export default App;

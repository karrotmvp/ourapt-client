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
import PageVoteDetail from "./_components/_pages/article/PageVoteDetail";
import PageCommentDetail from "./_components/_pages/article/PageCommentDetail";
import PageVoteCreate from "./_components/_pages/article/PageVoteCreate";
import PageError from "./_components/_pages/PageError";

import { FirebaseAnalyticsProvider } from "./_analytics/firebase";
import { ApiProvider } from "./api";
import { AccessTokenProvider } from "./_providers/useAccessToken";
import { ViewerProvider } from "./_providers/useViewer";
import { ModalProvider } from "./_providers/useModal";

if (process.env.REACT_APP_ENV === "MSW") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

// TODO: 프로바이더들 합치는 것도 고려해보자

const App: React.FC = () => {
  return (
    <FirebaseAnalyticsProvider>
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
                  <Screen path="/vote/:articleId">
                    <PageVoteDetail />
                  </Screen>
                  <Screen path="/comment/:articleId">
                    <PageCommentDetail />
                  </Screen>
                  <Screen path="/error">
                    <PageError />
                  </Screen>
                  <Screen path="/create">
                    <PageVoteCreate />
                  </Screen>
                  <WithModal />
                </Navigator>
              </div>
            </ModalProvider>
          </ViewerProvider>
        </ApiProvider>
      </AccessTokenProvider>
    </FirebaseAnalyticsProvider>
  );
};

export default App;

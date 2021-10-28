import React from "react";

// 당근마켓 미니앱, 캐럿프레임
// import Mini from "@karrotmarket/mini";
import { Navigator, Screen } from "@karrotframe/navigator";
import "@karrotframe/navigator";
import { mini } from "./_Karrotmarket/KarrotmarketMini";

// 페이지뷰
import PreopenPage from "./_PREOPEN/PreopenPage";
import PageLanding from "./_components/_pages/PageLanding";
import PageFeed from "./_components/_pages/PageFeed";
import PageTopFeedDetail from "./_components/_pages/topFeed/PageTopFeedDetail";
import PageArticleDetail from "./_components/_pages/article/PageArticleDetail";
import PageArticleUpdate from "./_components/_pages/article/PageArticleUpdate";
import PageArticleCreate from "./_components/_pages/article/PageArticleCreate";
// import { Route, Switch, useHistory } from "react-router";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navigator
        theme="Cupertino"
        onClose={() => {
          mini.close();
        }}
      >
        <Screen path="/preopen">
          <PreopenPage />
        </Screen>
        <Screen path="/landing">
          <PageLanding regionId="송도 2동" />
        </Screen>
        <Screen path="/feed/:channelId">
          <PageFeed />
        </Screen>
        <Screen path="/topFeed/:topFeedId">
          <PageTopFeedDetail />
        </Screen>
        <Screen path="/article/create">
          <PageArticleCreate />
        </Screen>
        <Screen path="/article/:articleId">
          <PageArticleDetail />
        </Screen>
        <Screen path="/article/:articleId/update">
          <PageArticleUpdate articleId={"article123"} />
        </Screen>
      </Navigator>
    </div>
  );
};

export default App;

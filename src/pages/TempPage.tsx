import React, { useReducer } from "react";
import { reducer } from "../reducers/TempPage.reducer";

import FeedPage from "./FeedPage";
import LoadingPage from "./LoadingPage";
import ReadContentPage from "./ReadContentPage";
import UpsertArticlePage from "./UpsertArticlePage";

const TempPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    _t: "loading",
  });

  function init() {
    dispatch({
      _t: "INIT",
      channelId: "송도 2동",
    });
  }

  // function onReadContentClick(contentType: string) {
  const onReadContentClick = (contentType: string) => {
    dispatch({
      _t: "SHOW_CONTENT",
      contentType: contentType,
    });
  };

  function onUpdateArticleClick() {
    dispatch({
      _t: "SHOW_UPSERT_ARTICLE_FORM",
      articleType: "extisting",
      articleId: "somewhat1234",
    });
  }

  function onCreateArticleClick() {
    dispatch({
      _t: "SHOW_UPSERT_ARTICLE_FORM",
      articleType: "new",
      articleId: "new",
    });
  }

  switch (state._t) {
    case "loading":
      return <LoadingPage />;
    case "viewFeed":
      return <FeedPage />;
    case "upsertArticle":
      return <UpsertArticlePage />;
    case "viewContent":
      return <ReadContentPage />;
    // case "showModal"의 경우도 정의하자!
  }

  init();

  return (
    <div>
      {/* <button onClick={onReadContentClick("info")}>인포메이션-읽기-버튼</button> */}
      <button onClick={() => onReadContentClick("info")}>
        인포메이션-읽기-버튼
      </button>
      <button onClick={() => onReadContentClick("topFeed")}>
        탑피드-읽기-버튼
      </button>
      <button onClick={() => onReadContentClick("article")}>
        아티클-읽기-버튼
      </button>
      <button onClick={onUpdateArticleClick}>아티클-업데이트-버튼</button>
      <button onClick={onCreateArticleClick}>아티클-새로쓰기-버튼</button>
      임시 렌더링 페이지입니당! 우선 여기에 스테이트와 액션을 정의해볼
      예정이고요, 이후 캐럿프레임을 뜯어보고 나서 App.tsx로 끌어내 줄
      예정이에요~!
    </div>
  );
};

export default TempPage;

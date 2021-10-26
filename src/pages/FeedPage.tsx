import React, { useReducer } from "react";

import { reducer } from "../reducers/TempPage.reducer";

const FeedPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    _t: "loading",
  });

  function onReadContentClick() {
    dispatch({
      _t: "SHOW_CONTENT",
      contentType: "article",
    });
  }

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

  return (
    <div>
      메인 피드 - 채널에 따라 보여주는 피드 구성이나 내용이 달라져야 하고요. -
      인포메이션 컴포넌트 - 탑피드 컴포넌트 - 아티클 리스트 컴포넌트 ... - 등등
      return (
      <div>
        <button onClick={onReadContentClick}>글읽기버튼</button>
        <button onClick={onUpdateArticleClick}>글업데이트버튼</button>
        <button onClick={onCreateArticleClick}>글새로쓰기버튼</button>
        임시 렌더링 페이지입니당! 우선 여기에 스테이트와 액션을 정의해볼
        예정이고요, 이후 캐럿프레임을 뜯어보고 나서 App.tsx로 끌어내 줄
        예정이에요~!
      </div>
      );
    </div>
  );
};

export default FeedPage;

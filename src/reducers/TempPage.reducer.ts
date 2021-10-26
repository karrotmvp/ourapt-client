import React from "react";

type State =
  | {
      _t: "loading";
    }
  | {
      _t: "viewFeed";
      channelId: string;
    }
  | {
      _t: "upsertArticle";
      articleType: string; // "new" | "existing"
      articleId: string; // new일 경우 null로 넘겨줄까요?
      // 혹은 Type과 Id를 합쳐서, "new" 혹은 id값으로 넘겨줄까요?
      articleText: string;
      submitHandler: string; // 나중에 Function으로 바꿀 것?
    }
  | {
      _t: "viewContent";
      contentType: string;
    }
  | {
      _t: "showModal";
    };

type Action =
  | {
      _t: "INIT";
      channelId: string;
      // 앱에 접속할 경우, 첫 화면 (지금은 피드) 을 로딩해서 보여줍니다.
      // 채널 정보에 따라 보여주는 정보가 달라집니다.
    }
  | {
      _t: "SHOW_UPSERT_ARTICLE_FORM";
      articleType: string;
      articleId: string;
      // upsertArticle 페이지로 보여주는 액션입니다.
      // 액션 타입에 따라서 create와 update를 분기해줍니다.
    }
  | {
      _t: "UPDATE_ARTICLE_TEXT";
      articleText: string;
      // upsetArticle 뷰에서 작성하는 텍스트에 따라서 onChange로 상태를 업데이트해주는 액션.
    }
  | {
      _t: "SUBMIT_ARTICLE";
      articleText: string; // 이거 불필요하지 않을까?
      contentType: string;
      // "SUBMIT_ARTICLE": upsertArticle 뷰에서 작성한 아티클을 저장하는 액션.
      // 현재 여기서는 1. 아티클을 저장해서 서브밋해주고 2. 해당 아티클을 보여줘야 하는데 이 두 동작을 분리해야 할까?
      // 그렇다! 이 액션은 스테이트를 바꿔주는거니까...
      // -> 그렇다면 "SHOW_SUBMITTED_ARTICLE"이나 "AFTER_SUBMIT_ARTICLE"로 바꿔야하지 않을까?
      // -> 그런데 그럴거면 "SHOW_CONTENT"로 퉁칠 수 있지 않을까?
    }
  | {
      _t: "SHOW_CONTENT";
      contentType: string;
      // 모든 종류의 콘텐츠를 보여주는 액션.
      // 콘텐츠 타입에 따라서 분기해서 다른 컴포넌트를 보여줍니다.
    }
  | {
      _t: "SHOW_MODAL";
      modalType: string;
      // 어 그런데 모달 컴포넌트를 띄우는 액션을 여기에 걸어도 되나? 되나? 되... 려나?
    };

export const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "INIT": {
      return {
        ...prevState,
        _t: "viewFeed",
        channelId: action.channelId,
      };
    }
    case "SHOW_UPSERT_ARTICLE_FORM": {
      return {
        ...prevState,
        _t: "upsertArticle",
        articleType: action.articleType,
        // 여기에서 분기해줘야 할 것 같은데...
        articleId: action.articleType === "new" ? "" : action.articleId,
        articleText:
          action.articleType === "new"
            ? ""
            : "아티클 아이디에 대해서 가져온 텍스트",
        submitHandler:
          action.articleType === "new"
            ? "createArticle API"
            : "updateArticle API",
      };
    }
    case "UPDATE_ARTICLE_TEXT": {
      return {
        ...prevState,
        _t: "upsertArticle",
        articleType: "어 정말 이상한 지점인데요,",
        articleId:
          "기존 state의 articleId를 그대로 받아올 수 있는 것 아닌가요?",
        articleText: action.articleText,
        submitHandler:
          "그러면 그냥 ...prevState에서 받아와야 하는 것 아닌가요?",
      };
    }
    case "SUBMIT_ARTICLE": {
      return {
        ...prevState,
        _t: "viewContent",
        contentType: action.contentType,
      };
    }
    case "SHOW_CONTENT": {
      return {
        ...prevState,
        _t: "viewContent",
        contentType: action.contentType,
      };
    }
    case "SHOW_MODAL": {
      return {
        ...prevState,
        _t: "showModal",
      };
    }
  }
};

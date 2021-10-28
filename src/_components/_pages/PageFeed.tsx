import React from "react";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import TopFeedInFeed from "../AdminSurvey/AdminSurveyInFeed";
import QuestionInFeed from "../Question/QuestionInFeed";
// import { useHistory } from "react-router";

const PageFeed: React.FC = () => {
  // 먼저 파라미터를 기반으로 내가 어느 채널에 있는지 확인해요.
  const params = useParams<{ channelId?: string }>();
  const tempChannelId = params.channelId;

  // API call:
  // request ---- 갖고 있는 channelId를 서버로 보내줘요.
  // response ---- 해당 채널의 다양한 정보들을 받아와요. 어떻게 받아올지, 어떻게 쪼갤지는 제이콥과 함께 이야기해요.

  const tempChannelData = {
    id: tempChannelId,
    displayName: "대표아파트",
    topFeed: [
      {
        id: "topFeed1",
        title: "우리아파트 김밥 맛집 알려주세요!",
        participated: 1234,
      },
    ],
    article: [
      {
        id: "article1",
        question: {
          title: "우리 아파트 벽 색깔 맘에 드나요?",
        },
        commentsNum: 10,
      },
      {
        id: "article2",
        question: {
          title: "좋은 미용실 선택해주세요",
        },
        commentsNum: 3,
      },
      {
        id: "article3",
        question: {
          title: "이런 식으로 만들어 볼 거예요",
        },
        commentsNum: 100,
      },
    ],
  };

  const { push, pop, replace } = useNavigator();
  // DELETE
  // const history = useHistory();
  const goArticleDetail = (articleId: string) => {
    push(`/article/${articleId}`);
    // DELETE
    // history.push(`/article/${articleId}`);
  };

  const onFloatingBtnClick = () => {
    push("article/create");
    // DELETE
    // history.push(`/article/create`);
  };
  return (
    <div className="Page">
      <ScreenHelmet />
      {tempChannelId}를 이용해 받아온 {tempChannelData.displayName}의 피드예요.
      <div>
        <TopFeedArea>
          <div>알려주세요!</div>
          {tempChannelData.topFeed.map((topFeed) => {
            return <TopFeedInFeed topFeed={topFeed} />;
          })}
        </TopFeedArea>
        <ArticleArea>
          <div>커뮤니티</div>
          {tempChannelData.article.map((article) => {
            return (
              <ArticleWrapper>
                <QuestionInFeed question={article.question} />
                {article.commentsNum}개의 댓글
                <button onClick={() => goArticleDetail(article.id)}>
                  상세보기
                </button>
              </ArticleWrapper>
            );
          })}
        </ArticleArea>
      </div>
      <button
        className="floatingButton btn--active"
        onClick={onFloatingBtnClick}
      >
        글쓰기
      </button>
    </div>
  );
};

export default PageFeed;

const TopFeedArea = styled.div`
  // 이 width나 padding 들을 반복할 필요 없이 묶어놓은 게 유틸리티 css의 의의일까?
  width: 100%;
  padding: 20px;
  background-color: purple;
`;
const ArticleArea = styled.div`
  width: 100%;
  padding: 20px;
  background-color: hotpink;
`;
const ArticleWrapper = styled.div`
  display: flex;
`;

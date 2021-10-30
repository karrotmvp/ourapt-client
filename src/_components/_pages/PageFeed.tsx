import React from "react";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import TopFeedInFeed from "../AdminSurvey/AdminSurveyInFeed";
import QuestionInFeed from "../Question/QuestionInFeed";
import UserAsAuthor from "../User/UserAsAuthor";
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
        title: "우리아파트 맛집 알려주세요!",
        participated: 1234,
      },
      // {
      //   id: "topFeed1",
      //   title: "우리아파트 참치김밥 맛집 알려주세요!",
      //   participated: 1234,
      // },
      // {
      //   id: "topFeed1",
      //   title: "우리아파트 참치날치알 김밥 맛집 알려주세요!",
      //   participated: 1234,
      // },
    ],
    article: [
      {
        id: "article1",
        user: {
          profile: {
            userId: "aa",
            nickname: "닉네임1",
            profileImgUrl: "./../...",
          },
          pushAgreedAt: new Date("1995-12-17T03:24:00"),
          createdAt: new Date("2021-10-27T03:24:00"),
          updatedAt: new Date("2021-10-27T03:24:00"),
        },
        question: {
          title: "우리 아파트 벽 색깔 맘에 드나요?",
          createdAt: new Date("2021-10-27T03:24:00"),
          updatedAt: new Date("2021-10-27T03:24:00"),
        },
        commentsNum: 10,
      },
      {
        id: "article2",
        user: {
          profile: {
            userId: "bb",
            nickname: "닉네임2",
            profileImgUrl: "./../...",
          },
          pushAgreedAt: new Date("1995-12-17T03:24:00"),
          createdAt: new Date("1995-12-27T03:24:00"),
          updatedAt: new Date("1995-12-28T03:24:00"),
        },
        question: {
          title: "좋은 미용실 선택해주세요",
          createdAt: new Date("1995-12-27T03:24:00"),
          updatedAt: new Date("1995-12-28T03:24:00"),
        },
        commentsNum: 3,
      },
      {
        id: "article3",
        user: {
          profile: {
            userId: "bb",
            nickname: "닉네임2",
            profileImgUrl: "./../...",
          },
          pushAgreedAt: new Date("1995-12-17T03:24:00"),
          createdAt: new Date("1995-12-29T03:24:00"),
          updatedAt: new Date("1995-12-29T03:24:00"),
        },
        question: {
          title: "이런 식으로 만들어 볼 거예요",
          createdAt: new Date("1995-12-29T03:24:00"),
          updatedAt: new Date("1995-12-29T03:24:00"),
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
      <TopFeedArea className="pd-16">
        {tempChannelData.topFeed.map((topFeed) => {
          return <TopFeedInFeed topFeed={topFeed} />;
        })}
      </TopFeedArea>
      <ArticleArea>
        <AreaTitle className="pd-16">커뮤니티</AreaTitle>
        {tempChannelData.article.map((article) => {
          return (
            <ArticleWrapper
              className="pd-16"
              onClick={() => goArticleDetail(article.id)}
            >
              <UserAsAuthor
                user={article.user}
                createdAt={article.question.createdAt}
                updatedAt={article.question.updatedAt}
              />
              <QuestionInFeed question={article.question} />
              <div>
                <div>댓</div>
                {article.commentsNum}
              </div>
            </ArticleWrapper>
          );
        })}
      </ArticleArea>
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
  margin-bottom: 12px;
  background-color: purple;
`;

const AreaTitle = styled.div`
  margin-bottom: 1px;

  padding-bottom: 8px;
  text-align: left;

  font-size: 18px;
  font-weight: bold;

  background-color: lavender;
`;

const ArticleArea = styled.div`
  width: 100%;
`;
const ArticleWrapper = styled.div`
  margin-top: 1px;
  margin-bottom: 1px;

  display: flex;
  flex-direction: column;

  background-color: lavender;
`;

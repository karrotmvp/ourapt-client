import React from "react";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import QuestionPinnedInFeed from "../Question/QuestionPinnedInFeed";
import QuestionInFeed from "../Question/QuestionInFeed";
import UserAsAuthor from "../User/UserAsAuthor";
// import { useHistory } from "react-router";

type PageFeedProps = {
  apartmentId: string;
};

const PageFeed: React.FC<PageFeedProps> = ({ apartmentId }) => {
  // 먼저 파라미터를 기반으로 내가 어느 채널에 있는지 확인해요.
  const params = useParams<{ apartmentId?: string }>();
  const tempChannelId = params.apartmentId;

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
        question: {
          id: "article1",
          user: {
            id: "우리아이디",
            profile: {
              id: "당근아이디",
              nickname: "당근닉네임",
              profileImageUrl: "../..../....",
            },
            isPushAgreed: true,
            bannedAt: new Date("2021-10-27T03:24:00"),
            createdAt: new Date("2021-10-27T03:24:00"),
            updatedAt: new Date("2021-10-27T03:24:00"),
            checkedIn: {
              id: "아파트아이디",
              name: "아파트 이름", // 아파트 이름
              brandName: "브랜드 이름",
              regionDepth1: {
                id: "", // 리전 ID
                name: "", // 리전 이름
              }, // 아파트 속한 depth1 리전
              regionDepth2: {
                id: "", // 리전 ID
                name: "", // 리전 이름
              }, // 아파트 속한 depth1 리전
              regionDepth3: {
                id: "", // 리전 ID
                name: "", // 리전 이름
              }, // 아파트 속한 depth1 리전
              regionDepth4: {
                id: "", // 리전 ID
                name: "", // 리전 이름
              }, // 아파트 속한 depth1 리전
              bannerImage: "../.../.../",
              isActive: true, // 활성화 여부
              createdAt: new Date("2021-10-27T03:24:00"),
              updatedAt: new Date("2021-10-27T03:24:00"),
            },
          },
          content: "우리 아파트 벽 색ㄱ깔 어흐흑",
          createdAt: new Date("2021-10-27T03:24:00"),
          updatedAt: new Date("2021-10-27T03:24:00"),
        },
        commentsNum: 10,
      },
      {
        question: {
          id: "article1",
          user: {
            id: "우리아이디",
            profile: {
              id: "당근아이디",
              nickname: "당근닉네임",
              profileImageUrl: "../..../....",
            },
            isPushAgreed: true,
            bannedAt: new Date("2021-10-27T03:24:00"),
            createdAt: new Date("2021-10-27T03:24:00"),
            updatedAt: new Date("2021-10-27T03:24:00"),
            checkedIn: {
              id: "아파트아이디",
              name: "아파트 이름", // 아파트 이름
              brandName: "브랜드 이름",
              regionDepth1: {
                id: "", // 리전 ID
                name: "", // 리전 이름
              }, // 아파트 속한 depth1 리전
              regionDepth2: {
                id: "", // 리전 ID
                name: "", // 리전 이름
              }, // 아파트 속한 depth1 리전
              regionDepth3: {
                id: "", // 리전 ID
                name: "", // 리전 이름
              }, // 아파트 속한 depth1 리전
              regionDepth4: {
                id: "", // 리전 ID
                name: "", // 리전 이름
              }, // 아파트 속한 depth1 리전
              bannerImage: "../.../.../",
              isActive: true, // 활성화 여부
              createdAt: new Date("2021-10-27T03:24:00"),
              updatedAt: new Date("2021-10-27T03:24:00"),
            },
          },
          content: "우리 아파트 벽 색ㄱ깔 어흐흑",
          createdAt: new Date("2021-10-27T03:24:00"),
          updatedAt: new Date("2021-10-27T03:24:00"),
        },
        commentsNum: 10,
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

  const onArticleCreateBtnClick = () => {
    push("article/create");
    // DELETE
    // history.push(`/article/create`);
  };
  return (
    <div className="Page">
      <div className="PageFeed-inner">
        <ScreenHelmet />
        <TopFeedArea className="pd--16">
          {tempChannelData.topFeed.map((topFeed) => {
            return <QuestionPinnedInFeed question={topFeed} />;
          })}
        </TopFeedArea>
        <ArticleArea>
          <AreaTitle className="pd--16">아파트 주민 라운지</AreaTitle>
          {tempChannelData.article.map((article) => {
            return (
              <ArticleWrapper
                className="pd--16"
                onClick={() => goArticleDetail(article.question.id)}
              >
                {/* <UserAsAuthor
                user={article.user}
                createdAt={article.question.createdAt}
                updatedAt={article.question.updatedAt}
              /> */}
                <QuestionInFeed question={article.question} />
                <CommentThumbnail>
                  <div className="mg-right--8">댓</div>
                  <div className="font-size--15 font-weight--400 font-color--11">
                    {article.commentsNum}
                  </div>
                </CommentThumbnail>
              </ArticleWrapper>
            );
          })}
        </ArticleArea>
      </div>
      <div className="btn--floating">
        <ArticleCreateBtn onClick={onArticleCreateBtnClick}>
          <img
            src={require("../../_assets/ArticleCreateBtnIcon.svg").default}
          />
        </ArticleCreateBtn>
      </div>
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

const CommentThumbnail = styled.div`
  background-color: violet;

  margin-left: auto;

  display: flex;
  flex-direction: row;
`;

const ArticleCreateBtn = styled.div`
  width: 64px;
  height: 64px;

  margin-right: 16px;
  margin-left: auto;

  background-color: #e95454;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

import React, { useCallback, useEffect, useReducer, useState } from "react";

import { QuestionDto as Question } from "../../__generated__/ourapt";
import { VoteDto as Vote } from "../../__generated__/ourapt";
import { useApi } from "../../api";
import { useViewer } from "../../_providers/useViewer";

import { useAnalytics } from "../../_analytics/firebase";

import styled from "@emotion/styled";
import { css } from "@emotion/css";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";
import { PullToRefresh } from "@karrotframe/pulltorefresh";

import Slider from "react-slick";

import ApartmentInNavigator from "../Apartment/ApartmentInNavigator";
import QuestionInFeed from "../Question/QuestionInFeed";

import examineResBody from "../../_modules/examineResBody";

import { ReactComponent as OuraptLogo } from "../../_assets/ouraptLogo.svg";
import { ReactComponent as IconPlus } from "../../_assets/iconPlus.svg";
import LoadPageFeed from "../_loaders/LoadPageFeed";
import VotePinnedInFeed from "../Vote/VotePinnedInFeed";
import VoteClosedInFeed from "../Vote/VoteClosedInFeed";

type State = {
  _t: "loading";
  closed: Array<Vote> | null;
  pinned: { _t: "vote"; article: Vote } | null;
  articles: Array<Question> | null;
};

type Action =
  | {
      _t: "PATCH_CLOSED_VOTES";
      closed: Array<Vote>;
    }
  | {
      _t: "PATCH_PINNED_ARTICLE";
      pinned: { _t: "vote"; article: Vote };
    }
  | {
      _t: "PATCH_ARTICLES";
      articles: Array<Question>;
    };

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "PATCH_CLOSED_VOTES":
      return {
        ...prevState,
        _t: "loading",
        closed: action.closed,
      };
    case "PATCH_PINNED_ARTICLE":
      return {
        ...prevState,
        _t: "loading",
        pinned: action.pinned,
      };
    case "PATCH_ARTICLES":
      return {
        ...prevState,
        _t: "loading",
        articles: action.articles,
      };
  }
};

type PageFeedProps = {
  apartmentId: string;
};

const PageFeed: React.FC<PageFeedProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    _t: "loading",
    closed: null,
    pinned: null,
    articles: null,
  });

  const params =
    useParams<{ apartmentId?: string }>().apartmentId || props.apartmentId;

  const api = useApi();

  const { viewer } = useViewer();
  const Event = useAnalytics();

  const { push } = useNavigator();
  const goArticleDetail = (articleId: string) => {
    Event("clickArticleDetail", { at: params, article: articleId });
    push(`/article/${articleId}`);
  };

  const onArticleCreateBtnClick = (context: number) => {
    Event("clickCreateArticleBtn", { at: params, when: `${context}` });
    push(`/vote/${state.pinned?.article.id}/create`);
  };

  const getClosedVotesByCursorPerPage = useCallback(
    (params: string, cursor: number, perPage: number) => {
      (async () => {
        const resBody = await api.voteController.getVoteByIdUsingGET1({
          apartmentId: params,
          cursor,
          perPage,
        });
        const safeBody = examineResBody({
          resBody,
          validator: (data) => data.votes != null,
          onFailure: () => {
            push(`/error?cause=getClosedVotesByCursorPerPageAtPageFeed`);
          },
        });
        dispatch({ _t: "PATCH_CLOSED_VOTES", closed: safeBody.data.votes });
      })();
    },
    [api.questionController, push]
  );

  const getPinnedVote = useCallback(() => {
    (async () => {
      const response =
        await api.voteController.getRandomPinnedVoteOfApartmentUsingGET({
          apartmentId: params,
        });
      if (response && response.status === "DATA_NOT_FOUND_FROM_DB") {
      } else {
        const safeBody = examineResBody({
          resBody: response,
          validator: (data) => data.vote != null && data.questions != null,
          onFailure: () => {
            push(`/error?cause=getPinnedVoteAtPageFeed`);
          },
        });
        dispatch({
          _t: "PATCH_PINNED_ARTICLE",
          pinned: { _t: "vote", article: safeBody.data.vote },
        });
        dispatch({
          _t: "PATCH_ARTICLES",
          articles: safeBody.data.questions,
        });
      }
    })();
  }, [api.voteController, params, push]);

  function onApartmentInNavigatorClick() {
    Event("clickApartmentBanner", { at: params });
    push(`/landing`);
  }

  useEffect(() => {
    getPinnedVote();
  }, [getPinnedVote]);

  useEffect(() => {
    getClosedVotesByCursorPerPage(params, Date.now(), 100);
  }, [getClosedVotesByCursorPerPage, params]);

  async function handleDispose() {
    getPinnedVote();
    getClosedVotesByCursorPerPage(params, Date.now(), 100);
  }

  useEffect(() => {
    Event("viewPageFeed", { at: `${params}` });
  }, []);

  const ArticleAreaTitleApartmentName = viewer?.checkedIn?.name.replace(
    "송도 ",
    ""
  );

  const closedVotesSettings = {
    centerMode: true,
    infinite: false,
    centerPadding: "34px",
    slidesToShow: 1,
  };

  if (state.articles) {
    return (
      <div className="Page">
        <div className="PageFeed-inner">
          <ScreenHelmet
            appendLeft={<OuraptLogo />}
            appendRight={
              <ApartmentInNavigator
                apartmentId={params}
                onClickAction={onApartmentInNavigatorClick}
              />
            }
          />
          <PullToRefresh
            className={css`
              width: 100%;
              position: absolute;
              /* background: url("./../../_assets/tempPRT.png") repeat !important; */
              /* --kf_pulltorefresh_fallbackSpinner-color: transparent; */
            `}
            onPull={(dispose) => {
              handleDispose().then(() => {
                dispose();
              });
            }}
          >
            {state.closed && (
              <ClosedArea>
                <AreaTitle className="pd--16">종료된 투표</AreaTitle>
                <div className="VoteCarouselLayout">
                  <Slider {...closedVotesSettings}>
                    {state.closed.map((vote, idx) => {
                      return <VoteClosedInFeed vote={vote} />;
                    })}
                  </Slider>
                </div>
              </ClosedArea>
            )}
            <AreaDivider />
            <AreaTitle className="pd--16 horizontal--centered">
              우리아파트 투표
              <OpenedInfo className="centered">진행 중</OpenedInfo>
            </AreaTitle>
            {state.pinned && (
              <PinnedArea className="pd--16 pd-top--8">
                <VotePinnedInFeed vote={state.pinned.article} />
              </PinnedArea>
            )}
            <ArticleArea>
              <AreaTitle className="pd--16">투표 자유게시판</AreaTitle>
              {state.articles.length === 0 ? (
                <div>
                  <ArticleVacantViewTitle>
                    우리아파트에 오신 것을 환영해요!
                  </ArticleVacantViewTitle>
                  <ArticleVacantViewInfo>
                    투표 주제에 대해 이야기를 나눠보세요.
                  </ArticleVacantViewInfo>
                  <button
                    className="btn-160 btn btn--active mg-top--48 mg-bottom--64"
                    onClick={() => onArticleCreateBtnClick(0)}
                  >
                    게시글 작성
                  </button>
                </div>
              ) : (
                <div>
                  {/* <InputArea
                    onClick={() =>
                      onArticleCreateBtnClick(state.articles?.length || 0)
                    }
                  >
                    진행 중인 투표에 대해 어떻게 생각하세요?
                  </InputArea> */}
                  {state.articles.map((question) => {
                    return (
                      <ArticleWrapper
                        key={question.id}
                        className="pd--16"
                        onClick={() => goArticleDetail(question.id)}
                      >
                        <QuestionInFeed question={question} />
                        <CommentThumbnail>
                          <img
                            className="mg-right--6"
                            src={
                              require("../../_assets/CommentInFeedIcon.svg")
                                .default
                            }
                            alt="댓글 수"
                          />
                          <div className="font-size--15 font-weight--400 font-color--11">
                            {question.countOfComments}
                          </div>
                        </CommentThumbnail>
                      </ArticleWrapper>
                    );
                  })}
                  <FeedInfoWrapper>
                    <FeedInfoText>
                      이웃과 나누고 싶은 이야기를 등록해 보세요!
                    </FeedInfoText>
                  </FeedInfoWrapper>
                </div>
              )}
            </ArticleArea>
          </PullToRefresh>
        </div>
        {state.articles.length !== 0 && (
          <div className="btn--floating">
            <ArticleCreateBtnFloating
              onClick={() => push(`/create`)}
              // onClick={() =>
              //   onArticleCreateBtnClick(state.articles?.length || 0)
              // }
            >
              {/* <img
                src={require("../../_assets/ArticleCreateBtnIcon.svg").default}
                alt="투표 쓰기"
              /> */}
              <IconPlus className="mg-right--8" />
              투표 만들기
            </ArticleCreateBtnFloating>
          </div>
        )}
      </div>
    );
  }

  return <LoadPageFeed />;
};

export default PageFeed;

const AreaDivider = styled.div`
  width: calc(100% - 32px);
  height: 1px;

  margin-left: 16px;

  background-color: #f2f3f6;
`;

const ClosedArea = styled.div`
  width: 100%;
`;

const PinnedArea = styled.div`
  width: 100%;

  border-bottom: 12px solid #f5f5f5;
`;

const OpenedInfo = styled.p`
  width: 48px;
  height: 22px;

  margin-left: 8px;
  /* padding: 3px 5px; */

  color: #e95454;
  font-size: 12px;
  font-weight: 500;

  background-color: #fdeeee;

  /* border: 1px solid #f4aaaa; */
  border-radius: 4px;
`;

const InputArea = styled.div`
  height: 80px;

  margin: 16px;
  padding: 12px;

  color: #aaaaaa;
  font-size: 17px;
  font-weight: 500;
  text-align: left;

  background-color: #f7f7f7;
`;

const AreaTitle = styled.div`
  padding-bottom: 8px;
  text-align: left;

  font-size: 18px;
  font-weight: bold;

  display: flex;
  flex-direction: row;
`;

const ArticleArea = styled.div`
  width: 100%;
`;
const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid #f5f5f5;
`;

const CommentThumbnail = styled.div`
  margin-left: auto;

  display: flex;
  flex-direction: row;
`;

const FeedInfoWrapper = styled.div`
  width: 100%;
  height: 64px;

  padding: 16px 48px;
`;
const FeedInfoText = styled.div`
  width: 100%;
  height: 100%;

  color: #999999;
  font-size: 14px;
  line-height: 32px;

  border-radius: 20px;
`;

const ArticleCreateBtnFloating = styled.div`
  /* width: 64px;
  height: 64px; */

  width: 128px;
  height: 44px;

  margin-right: 16px;
  margin-left: auto;

  color: #ffffff;
  font-size: 15px;
  font-weight: 700;

  background-color: #e95454;

  border-radius: 100px;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
`;

const ArticleVacantViewTitle = styled.div`
  margin-top: 80px;
  margin-bottom: 4px;

  color: #aaaaaa;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const ArticleVacantViewInfo = styled.div`
  color: #aaaaaa;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
`;

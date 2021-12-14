import React, { useCallback, useEffect, useReducer, useState } from "react";

import {
  FeedItemDto as FeedItem,
  VoteDto as Vote,
} from "../../__generated__/ourapt";
import { useApi } from "../../api";
import { useViewer } from "../../_providers/useViewer";

import { useAnalytics } from "../../_analytics/firebase";

import styled from "@emotion/styled";
import { css } from "@emotion/css";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";
import { PullToRefresh } from "@karrotframe/pulltorefresh";

import ApartmentInNavigator from "../Apartment/ApartmentInNavigator";

import examineResBody from "../../_modules/examineResBody";

import { ReactComponent as OuraptLogo } from "../../_assets/ouraptLogo.svg";
import { ReactComponent as IconPlus } from "../../_assets/iconPlus.svg";
import LoadPageFeed from "../_loaders/LoadPageFeed";
import VotePinnedInFeed from "../Vote/VotePinnedInFeed";

type State = {
  _t: "loading";
  feedItems: Array<FeedItem> | null;
};

type Action = {
  _t: "PATCH_FEED_ITEMS";
  feedItems: Array<FeedItem>;
};

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "PATCH_FEED_ITEMS":
      return {
        ...prevState,
        _t: "loading",
        feedItems: action.feedItems,
      };
  }
};

type PageFeedProps = {
  apartmentId: string;
};

const PageFeed: React.FC<PageFeedProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    _t: "loading",
    feedItems: null,
  });

  const params =
    useParams<{ apartmentId?: string }>().apartmentId || props.apartmentId;

  const api = useApi();

  const { viewer } = useViewer();
  const Event = useAnalytics();

  const { push } = useNavigator();

  // const goArticleDetail = (articleId: string) => {
  //   Event("clickArticleDetail", { at: params, article: articleId });
  //   push(`/article/${articleId}`);
  // };

  const getPinnedVotesByCursorPerPage = useCallback(
    (params: string, cursor: number, perPage: number) => {
      (async () => {
        const response = await api.voteController.getVotesUsingGET({
          apartmentId: params,
          cursor,
          perPage,
        });
        if (response && response.status === "DATA_NOT_FOUND_FROM_DB") {
        } else {
          const safeBody = examineResBody({
            resBody: response,
            validator: (data) => data.items != null,
            onFailure: () => {
              push(`/error?cause=getPinnedVoteAtPageFeed`);
            },
          });
          dispatch({
            _t: "PATCH_FEED_ITEMS",
            feedItems: safeBody.data.items,
          });
        }
      })();
    },
    [api.voteController, params, push]
  );

  function onApartmentInNavigatorClick() {
    Event("clickApartmentBanner", { at: params });
    push(`/landing`);
  }

  useEffect(() => {
    getPinnedVotesByCursorPerPage(params, Date.now(), 100);
  }, [getPinnedVotesByCursorPerPage]);

  async function handleDispose() {
    getPinnedVotesByCursorPerPage(params, Date.now(), 100);
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

  if (state.feedItems) {
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
              --kf_pulltorefresh_backgroundColor: #f2f3f6;
            `}
            onPull={(dispose) => {
              handleDispose().then(() => {
                dispose();
              });
            }}
          >
            <AreaTitle className="horizontal--centered">
              우리아파트 투표
            </AreaTitle>
            <AreaInfo>이웃들의 의견이 모이면 알림을 보내드려요.</AreaInfo>

            {state.feedItems &&
              state.feedItems.map((feedItem, idx) => {
                return (
                  <PinnedArea className="pd--16 pd-top--8">
                    <VotePinnedInFeed feedItem={feedItem} />
                  </PinnedArea>
                );
              })}

            <FeedInfoWrapper>
              <FeedInfoText>
                이웃과 나누고 싶은 이야기를 등록해 보세요!
              </FeedInfoText>
            </FeedInfoWrapper>
          </PullToRefresh>
        </div>
        <div className="btn--floating">
          <ArticleCreateBtnFloating onClick={() => push(`/create`)}>
            <IconPlus
              className="mg-right--8"
              width="10"
              height="10"
              stroke="white"
            />
            투표 만들기
          </ArticleCreateBtnFloating>
        </div>
      </div>
    );
  }

  return <LoadPageFeed />;
};

export default PageFeed;

const AreaDivider = styled.div`
  width: 100%;
  padding: 0 16px;

  background-color: #ffffff;
`;

const Horizon = styled.hr`
  width: 100%;
  height: 1px;

  margin: 0px;

  background-color: #f2f3f6;

  border: none;
`;

const ClosedArea = styled.div`
  width: 100%;
  padding-bottom: 16px;

  background-color: #ffffff;
`;

const PinnedArea = styled.div`
  width: 100%;

  border-bottom: 12px solid #f2f3f6;

  background-color: #ffffff;
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
  padding: 24px 16px 0px;
  text-align: left;

  font-size: 20px;
  font-weight: bold;

  display: flex;
  flex-direction: row;

  background-color: #ffffff;
`;

const AreaInfo = styled.p`
  padding: 8px 0 20px 16px;
  color: #777777;
  font-size: 14px;
  text-align: left;

  background-color: #ffffff;

  border-bottom: 12px solid #f2f3f6;
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
  height: 136px;

  padding-top: 4px;

  background-color: #f2f3f6;
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

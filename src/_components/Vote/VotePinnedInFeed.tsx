import React, { useCallback, useEffect, useReducer } from "react";

import { useAnalytics } from "../../_analytics/firebase";
import { useViewer } from "../../_providers/useViewer";
import { useApi } from "../../api";

import { VoteDto as Vote, VoteItemDtoToJSON } from "../../__generated__/ourapt";
import { VoteItemDto as VoteItem } from "../../__generated__/ourapt";

import VoteItemAsArticle from "./VoteItemAsArticle";

import { ReactComponent as VoteCountIcon } from "./../../_assets/VoteCountIcon.svg";
import styled from "@emotion/styled";

type VotePinnedInFeedProps = {
  vote: Vote;
};

type State =
  | {
      _t: "not-voted";
      voteStatus: {
        index: number;
        item: VoteItem;
        itemCount: number;
      }[];
      votedIndex: number;
      totalCount: number;
    }
  | {
      _t: "voted";
      voteStatus: {
        index: number;
        item: VoteItem;
        itemCount: number;
      }[];
      votedIndex: number;
      totalCount: number;
    };

type Action =
  | {
      _t: "PATCH";
      payload: boolean;
      voteStatus: {
        index: number;
        item: VoteItem;
        itemCount: number;
      }[];
      votedIndex: number;
      totalCount: number;
    }
  | { _t: "RETRIEVE" }
  | {
      _t: "CASTING";
      payload: number;
    };

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  let prevIndex = prevState.votedIndex;
  let newVoteStatus = [];
  for (let voteItem of prevState.voteStatus) {
    newVoteStatus.push({
      index: voteItem.index,
      item: voteItem.item,
      itemCount: voteItem.itemCount,
    });
  }
  let newTotalCount = prevState.totalCount;
  switch (action._t) {
    case "RETRIEVE":
      newVoteStatus[prevIndex].itemCount -= 1;
      newTotalCount -= 1;
      return {
        _t: "not-voted",
        votedIndex: -1,
        voteStatus: newVoteStatus,
        totalCount: newTotalCount,
      };
    case "CASTING":
      if (prevState._t === "voted") {
        newVoteStatus[prevIndex].itemCount -= 1;
        newVoteStatus[action.payload].itemCount += 1;
      } else {
        newVoteStatus[action.payload].itemCount += 1;
        newTotalCount += 1;
      }
      return {
        _t: "voted",
        votedIndex: action.payload,
        voteStatus: newVoteStatus,
        totalCount: newTotalCount,
      };
    case "PATCH":
      if (action.payload) {
        return {
          _t: "voted",
          voteStatus: action.voteStatus,
          votedIndex: action.votedIndex,
          totalCount: action.totalCount,
        };
      } else {
        return {
          _t: "not-voted",
          voteStatus: action.voteStatus,
          votedIndex: action.votedIndex,
          totalCount: action.totalCount,
        };
      }
  }
};

const VotePinnedInFeed: React.FC<VotePinnedInFeedProps> = ({ vote }) => {
  const { viewer } = useViewer();
  const viewerId = viewer?.id || "";

  const api = useApi();

  let voteStatus = vote.items.map((item, idx) => {
    return {
      index: idx,
      item,
      itemCount: item.voterIds.length,
    };
  });

  let votedIndex: number = -1;

  for (let voteItem of voteStatus) {
    if (voteItem.item.voterIds.indexOf(viewerId) !== -1) {
      votedIndex = voteItem.index;
      continue;
    }
  }

  const totalCount = voteStatus.reduce((acc, cur) => {
    return acc + cur.itemCount;
  }, 0);

  const [state, dispatch] = useReducer(
    reducer,
    votedIndex !== -1
      ? { _t: "voted", voteStatus, votedIndex, totalCount }
      : { _t: "not-voted", voteStatus, votedIndex, totalCount }
  );

  useEffect(() => {
    if (votedIndex === -1) {
      dispatch({
        _t: "PATCH",
        payload: false,
        voteStatus,
        votedIndex,
        totalCount,
      });
    } else {
      dispatch({
        _t: "PATCH",
        payload: true,
        voteStatus,
        votedIndex,
        totalCount,
      });
    }
  }, [vote]);

  const Event = useAnalytics();

  useEffect(() => {
    console.log(vote.mainText);
    console.log(
      `현재 스테이트 ${JSON.stringify(
        state.voteStatus,
        null,
        2
      )} 이때 총 투표 값 ${state.totalCount}`
    );
  }, [state]);

  const onItemClick = useCallback(
    (voteItem: { item: VoteItem; index: number }) => {
      if (state._t === "voted" && state.votedIndex === voteItem.index) {
        const response = api.voteController.cancelVotingUsingDELETE({
          itemId: voteItem.item.id,
        });
        response.catch((err) => {
          alert("다시 시도해주세요.");
        });
        dispatch({ _t: "RETRIEVE" });
      } else {
        const response = api.voteController.submitVotingUsingPOST({
          itemId: voteItem.item.id,
        });
        response.catch((err) => {
          alert("다시 시도해주세요.");
        });
        dispatch({ _t: "CASTING", payload: voteItem.index });
      }
    },
    [api.voteController, state._t, state.voteStatus, state.votedIndex]
  );

  return (
    <div className="ArticleCard pd-16">
      <form className="VoteForm">
        <p className="ArticleCard-Content ArticleCardInList-Content">
          {vote.mainText}
        </p>
        <VoteTotalCount className="VoteTotalCount mg-top--4 mg-bottom--12">
          <VoteCountIcon className="mg-right--8" />
          {state.totalCount}명 참여
        </VoteTotalCount>
        <ul className="VoteItemList">
          {state.voteStatus.map((voteItem, idx) => {
            return (
              <VoteItemAsArticle
                displayed={state._t === "not-voted" ? false : true}
                voteItem={voteItem.item}
                isSelected={Boolean(state.votedIndex === voteItem.index)}
                action={() => {
                  onItemClick(voteItem);
                }}
                itemCount={voteItem.itemCount}
                totalCount={state.totalCount}
              />
            );
          })}
        </ul>
        <p className="ArticleCard-Info mg-top--12">
          이웃들의 의견이 모이면 알림을 보내드려요
        </p>
      </form>
    </div>
  );
};

export default VotePinnedInFeed;

const VoteTotalCount = styled.div`
  color: #777777;
  font-size: 13px;
`;

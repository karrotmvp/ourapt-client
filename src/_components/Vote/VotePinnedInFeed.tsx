import React, { useCallback, useEffect, useReducer } from "react";

import { useAnalytics } from "../../_analytics/firebase";
import { useViewer } from "../../_providers/useViewer";
import { useApi } from "../../api";

import { VoteDto as Vote, VoteItemDtoToJSON } from "../../__generated__/ourapt";
import { VoteItemDto as VoteItem } from "../../__generated__/ourapt";

import VoteItemAsArticle from "./VoteItemAsArticle";

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
  | { _t: "RETRIEVE" }
  | {
      _t: "CASTING";
      payload: number;
    };

const VotePinnedInFeed: React.FC<VotePinnedInFeedProps> = ({ vote }) => {
  const { viewer } = useViewer();
  const viewerId = viewer?.id || "";

  const reducer: React.Reducer<State, Action> = (prevState, action) => {
    let newVoteStatus = prevState.voteStatus;
    let newTotalCount = prevState.totalCount;
    switch (action._t) {
      case "RETRIEVE":
        newVoteStatus[prevState.votedIndex].item.voterIds.splice(
          newVoteStatus[prevState.votedIndex].item.voterIds.indexOf(viewerId),
          1
        );
        newTotalCount -= 1;
        return {
          ...prevState,
          _t: "not-voted",
          votedIndex: -1,
          totalCount: newTotalCount,
        };
      case "CASTING":
        if (prevState._t === "voted") {
          newVoteStatus[prevState.votedIndex].item.voterIds.splice(
            newVoteStatus[prevState.votedIndex].item.voterIds.indexOf(viewerId),
            1
          );
        } else {
          newTotalCount += 1;
        }
        console.log("몇 번 찍히나요?");
        newVoteStatus[action.payload].item.voterIds.push(viewerId);
        return {
          _t: "voted",
          voteStatus: newVoteStatus,
          votedIndex: action.payload,
          totalCount: newTotalCount,
        };
    }
  };
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
      console.log(`${voteItem.index}`);
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

  const Event = useAnalytics();

  useEffect(() => {
    console.log(`현재 스테이트 ${JSON.stringify(state.voteStatus, null, 2)}`);
    console.log(`그래서 지금은 ${state._t}`);
  }, [state]);

  const onItemClick = useCallback(
    (voteItem: { item: VoteItem; index: number }) => {
      if (state._t === "voted" && state.votedIndex === voteItem.index) {
        console.log("일단 취소 됩니다!");
        const response = api.voteController.cancelVotingUsingDELETE({
          itemId: voteItem.item.id,
        });
        response.catch((err) => {
          alert("다시 시도해주세요.");
        });
        dispatch({ _t: "RETRIEVE" });
        console.log(state.voteStatus);
      } else {
        console.log("일단 됩니다!");
        const response = api.voteController.submitVotingUsingPOST({
          itemId: voteItem.item.id,
        });
        response.catch((err) => {
          alert("다시 시도해주세요.");
        });
        dispatch({ _t: "CASTING", payload: voteItem.index });
      }
    },
    []
  );

  return (
    <div className="ArticleCard pd-16">
      <form className="VoteForm">
        <p className="ArticleCard-Title">title 대신 임시로 받아올게요</p>
        <p className="ArticleCard-Content ArticleCardInList-Content mg-top--10 mg-bottom--16">
          {vote.mainText}
          {viewerId}
          {vote.items[0].voterIds}
        </p>
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
                totalCount={totalCount}
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

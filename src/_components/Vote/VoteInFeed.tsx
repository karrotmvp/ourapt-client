import React, { useReducer } from "react";

import styled from "@emotion/styled";

import { useAnalytics } from "../../_analytics/firebase";
import { useViewer } from "../../_providers/useViewer";

import { KarrotProfile } from "../../__generated__/ourapt";

import UserAsAuthor from "../User/UserAsAuthor";

import { ReactComponent as CheckIcon } from "../../_assets/CheckIcon.svg";

type tempVoteItem = {
  id: string; // 객관식질문 ID
  mainText: string; // 질문내용
  votedCount: number;
  isMyVote: boolean;
};

type tempVote = {
  id: string; // 객관식질문 ID
  writer: KarrotProfile; // 작성자
  mainText: string; // 질문내용
  createdAt: Date; // 생성일
  updatedAt: Date; // 최근 수정일
  isPinned: boolean; // 상단 노출 여부
  byAdmin: boolean; // 관리자가 작성한 글인지 여부
  items: Array<tempVoteItem>;
  countOfComments: number;
};

type VoteInFeedProps = {
  vote: tempVote;
};

type State =
  | {
      _t: "not-voted";
    }
  | {
      _t: "voted";
      voted: tempVoteItem;
    };

type Action =
  | { _t: "RETRIEVE" }
  | {
      _t: "CASTING";
      payload: tempVoteItem;
    };

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "RETRIEVE":
      return { _t: "not-voted" };
    case "CASTING":
      return { _t: "voted", voted: action.payload };
  }
};

const VoteInFeed: React.FC<VoteInFeedProps> = ({ vote }) => {
  const votedItem: tempVoteItem | undefined = vote.items.find(
    (item) => item.isMyVote === true
  );

  const totalVote: number = vote.items.reduce(
    (acc, cur) => acc + cur.votedCount,
    0
  );

  const [state, dispatch] = useReducer(
    reducer,
    votedItem ? { _t: "voted", voted: votedItem } : { _t: "not-voted" }
  );

  const Event = useAnalytics();
  const { viewer } = useViewer();

  function onUserCardClick() {
    Event("clickUserCard", {
      context: "atPageFeed",
      at: viewer?.checkedIn?.id,
      articleType: "question",
      article: vote.id,
      user: vote.writer.id,
    });
  }

  function onItemClick(item: tempVoteItem) {
    if (state._t === "voted" && state.voted === item) {
      dispatch({ _t: "RETRIEVE" });
    } else {
      dispatch({ _t: "CASTING", payload: item });
    }
  }

  return (
    <div className="ArticleCard pd-16">
      <div
        className="ArticleCardInlist-Author"
        onClick={() => onUserCardClick()}
      >
        <UserAsAuthor
          writer={vote.writer}
          createdAt={vote.createdAt}
          updatedAt={vote.updatedAt}
        />
      </div>
      <VoteForm>
        <p className="ArticleCard-Content ArticleCardInList-Content mg-top--10 mg-bottom--16">
          {vote.mainText}
        </p>
        <VoteItemList>
          {state._t === "not-voted"
            ? vote.items.map((item, idx) => {
                return (
                  <VoteItem key={item.id} onClick={() => onItemClick(item)}>
                    <VoteItemLabel>
                      <CheckIcon width="14" height="12" stroke="#cccccc" />
                      {item.mainText}
                    </VoteItemLabel>
                  </VoteItem>
                );
              })
            : vote.items.map((item, idx) => {
                return (
                  <VoteItem key={item.id} onClick={() => onItemClick(item)}>
                    <VoteItemPoll
                      style={{
                        backgroundColor:
                          state.voted === item ? "purple" : "aliceblue",
                        width:
                          state.voted === item
                            ? `${
                                ((item.votedCount + 1) / (totalVote + 1)) * 100
                              }%`
                            : `${(item.votedCount / (totalVote + 1)) * 100}%`,
                      }}
                    ></VoteItemPoll>
                    <VoteItemLabel>
                      <CheckIcon
                        width="14"
                        height="12"
                        stroke="#cccccc"
                        className="mg-right--16"
                      />
                      {item.mainText}
                      <VoteItemCount>
                        {state.voted === item
                          ? item.votedCount + 1
                          : item.votedCount}
                        명
                      </VoteItemCount>
                    </VoteItemLabel>
                  </VoteItem>
                );
              })}
        </VoteItemList>
      </VoteForm>
    </div>
  );
};

export default VoteInFeed;

const VoteForm = styled.form``;

const VoteItemList = styled.ul`
  width: 100%;
`;

const VoteItem = styled.li`
  height: 44px;
  width: 100%;

  margin-bottom: 8px;

  position: relative;

  background-color: #f7f7f7;

  border-radius: 8px;
`;

const VoteItemPoll = styled.div`
  height: 100%;
  width: 100%;

  position: absolute;

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const VoteItemLabel = styled.p`
  width: 100%;
  height: 100%;

  padding: 10px 16px;

  position: absolute;
  z-index: 1;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const VoteItemCount = styled.p`
  margin-left: auto;
`;

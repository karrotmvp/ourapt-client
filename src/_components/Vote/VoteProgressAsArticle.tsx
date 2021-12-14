import React, { useCallback, useEffect, useReducer } from "react";

import { mini } from "../../_Karrotmarket/KarrotmarketMini";

import { useAnalytics } from "../../_analytics/firebase";
import { useViewer } from "../../_providers/useViewer";
import { useApi } from "../../api";

import { VoteDto as Vote } from "../../__generated__/ourapt";
import { VoteItemDto as VoteItem } from "../../__generated__/ourapt";

import UserAsAuthorV3 from "../User/UserAsAuthorV3";
import VoteItemAsArticle from "./VoteItemAsArticle";

import styled from "@emotion/styled";

import { ReactComponent as VoteCountIcon } from "./../../_assets/VoteCountIcon.svg";
import { getInstalledFromURLParams } from "../../_modules/getQueryFromURLParams";
import CommentPreviewInFeed from "../Comment/CommentPreviewInFeed";

type VoteProgressAsArticleProps = {
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

const VoteProgressAsArticle: React.FC<VoteProgressAsArticleProps> = ({
  vote,
}) => {
  const { viewer } = useViewer();
  const viewerId = viewer?.id || "";

  const api = useApi();
  const isInstalled = getInstalledFromURLParams();

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
        handleInstallPreset();
      } else {
        const response = api.voteController.submitVotingUsingPOST({
          itemId: voteItem.item.id,
        });
        response.catch((err) => {
          alert("다시 시도해주세요.");
        });
        dispatch({ _t: "CASTING", payload: voteItem.index });
        handleInstallPreset();
      }
    },
    [api.voteController, state._t, state.voteStatus, state.votedIndex]
  );

  const submitInstall = useCallback(() => {
    Event("viewKarrotInstallation", { action: "view" });
    mini.startPreset({
      preset: `${process.env.REACT_APP_INSTALL_URL}`,
      params: {
        appId: `${process.env.REACT_APP_ID}`,
      },
      onSuccess: function (result) {
        Event("clickKarrotInstallation", { action: "click" });
      },
      onFailure: () => {
        alert("다시 한 번 시도해 주세요.");
      },
    });
  }, []);

  function handleInstallPreset() {
    const viewInstallPreset = Boolean(
      window.localStorage.getItem("viewInstallPreset")
    );
    const showInstallPreset = !isInstalled && !viewInstallPreset;
    if (showInstallPreset) {
      window.localStorage.setItem("viewInstallPreset", "true");
      setTimeout(() => submitInstall(), 3000);
    }
  }

  return (
    <form className="VoteForm">
      <VoteTotalCount className="VoteTotalCount horizontal-centered mg-top--16 mg-bottom--8">
        <VoteCountIcon className="VoteTotalCount mg-right--8" />
        {state.totalCount}명 이웃 참여
      </VoteTotalCount>
      <VoteTitle className="ArticleCard-Title mg-bottom--16">
        <span className="VoteQuestionIcon mg-right--8">Q.</span>
        {vote.mainText}
      </VoteTitle>
      <UserAsAuthorV3
        writer={vote.writer}
        createdAt={vote.createdAt}
        updatedAt={vote.updatedAt}
      />
      <ul className="VoteItemList mg-top--16">
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
    </form>
  );
};

export default VoteProgressAsArticle;

const VoteTotalCount = styled.div``;

const VoteTitle = styled.div``;
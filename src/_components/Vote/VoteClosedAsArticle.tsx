import React, { useCallback, useEffect, useReducer } from "react";
import { useViewer } from "../../_providers/useViewer";

import { VoteDto as Vote, VoteItemDtoToJSON } from "../../__generated__/ourapt";

import VoteItemAsClosedArticle from "./VoteItemAsClosedArticle";

import styled from "@emotion/styled";

import { ReactComponent as VoteCountIcon } from "./../../_assets/VoteCountIcon.svg";

type VoteClosedAsArticleProps = {
  vote: Vote;
};

const VoteClosedAsArticle: React.FC<VoteClosedAsArticleProps> = ({ vote }) => {
  const { viewer } = useViewer();
  const viewerId = viewer?.id || "";

  let myVoteIndex: number = -1;
  let mostVoteCount: number = 1;

  for (let voteItem of vote.items) {
    if (voteItem.voterIds.indexOf(viewerId) !== -1) {
      myVoteIndex = vote.items.indexOf(voteItem);
      continue;
    }
    if (voteItem.voterIds.length >= mostVoteCount) {
      mostVoteCount = voteItem.voterIds.length;
    }
  }

  const totalCount = vote.items.reduce((acc, cur) => {
    return acc + cur.voterIds.length;
  }, 0);

  return (
    <form className="VoteForm">
      <VoteTotalCount className="VoteTotalCount horizontal-centered mg-top--4 mg-bottom--8">
        <VoteCountIcon className="mg-right--8" />
        {totalCount}명 이웃이 함께 투표했어요
      </VoteTotalCount>
      <p className="ArticleCard-Content ArticleCardInList-Content mg-bottom--16">
        {vote.mainText}
      </p>
      <ul className="VoteItemList">
        {vote.items.map((voteItem, idx) => {
          return (
            <VoteItemAsClosedArticle
              voteItem={voteItem}
              isSelected={Boolean(myVoteIndex === vote.items.indexOf(voteItem))}
              isMostVoted={Boolean(mostVoteCount === voteItem.voterIds.length)}
              itemCount={voteItem.voterIds.length}
              totalCount={totalCount}
            />
          );
        })}
      </ul>
    </form>
  );
};

export default VoteClosedAsArticle;

const VoteTotalCount = styled.div`
  color: #777777;
  font-size: 13px;
`;

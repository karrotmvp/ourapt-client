import React, { useCallback, useEffect, useReducer } from "react";
import { useViewer } from "../../_providers/useViewer";

import { VoteDto as Vote } from "../../__generated__/ourapt";

import UserAsAuthorV3 from "../User/UserAsAuthorV3";
import VoteItemAsClosedArticle from "./VoteItemAsClosedArticle";

import styled from "@emotion/styled";
import { useNavigator } from "@karrotframe/navigator";

type VoteClosedAsArticleProps = {
  vote: Vote;
};

const VoteClosedAsArticle: React.FC<VoteClosedAsArticleProps> = ({ vote }) => {
  const { viewer } = useViewer();
  const viewerId = viewer?.id || "";

  const { push } = useNavigator();

  function onVoteClick() {
    push(`/vote/${vote.id}`);
  }

  let myVoteIndex: number = -1;
  let mostVoteCount: number = 1;

  for (let voteItem of vote.items) {
    if (voteItem.voterIds.indexOf(viewerId) !== -1) {
      myVoteIndex = vote.items.indexOf(voteItem);
      continue;
    }
  }

  for (let voteItem of vote.items) {
    if (voteItem.voterIds.length >= mostVoteCount) {
      mostVoteCount = voteItem.voterIds.length;
    }
  }

  const totalCount = vote.items.reduce((acc, cur) => {
    return acc + cur.voterIds.length;
  }, 0);

  return (
    <form className="VoteForm">
      <div onClick={() => onVoteClick()}>
        <VoteTotalCount className="VoteTotalCount horizontal-centered mg-top--16 mg-bottom--8">
          {/* <VoteCountIcon className="VoteTotalCount mg-right--8" /> */}
          {totalCount}명 이웃 참여 완료
        </VoteTotalCount>
        <VoteTitle className="ArticleCard-Title mg-bottom--16">
          {/* <ClosedIcon>종료</ClosedIcon> */}
          {vote.mainText}
        </VoteTitle>
        <UserAsAuthorV3
          writer={vote.writer}
          createdAt={vote.createdAt}
          updatedAt={vote.updatedAt}
        />
      </div>
      <ul className="VoteItemList mg-top--16">
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

const VoteTotalCount = styled.div``;

const VoteTitle = styled.div``;

const ClosedIcon = styled.span`
  margin-right: 8px;
  padding: 6px 10px;

  color: #ffffff;
  font-size: 12px;
  font-weight: 500;

  border-radius: 10px;
  background: #333333;
`;

import React from "react";

import styled from "@emotion/styled";

import { VoteDto as Vote } from "../../__generated__/ourapt";

import { ReactComponent as VoteCountIcon } from "../../_assets/VoteCountIcon.svg";
import { useNavigator } from "@karrotframe/navigator";

type VoteClosedInFeedProps = {
  vote: Vote;
};

const VoteClosedInFeed: React.FC<VoteClosedInFeedProps> = ({ vote }) => {
  const { push } = useNavigator();

  const closedVoteTotalCount = vote.items.reduce((acc, cur) => {
    return acc + cur.voterIds.length;
  }, 0);

  return (
    <VoteContainer onClick={() => push(`/vote/${vote.id}`)}>
      <VoteTotalCount className="VoteTotalCount horizontal-centered mg-top--4 mg-bottom--8">
        <VoteCountIcon className="mg-right--8" />
        {closedVoteTotalCount}명 이웃이 함께 투표했어요
      </VoteTotalCount>
      <VoteMainText>{vote.mainText}</VoteMainText>
      <ArrowIcon>
        <img src={require("../../_assets/ClosedVoteArrowIcon.svg").default} />
      </ArrowIcon>
    </VoteContainer>
  );
};

export default VoteClosedInFeed;

const VoteContainer = styled.div`
  margin: 8px 16px 22px;
  padding: 16px;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  border: 1px solid #ebebeb;
  border-radius: 8px;
`;

const VoteTotalCount = styled.div`
  color: #777777;
  font-size: 13px;
`;

const VoteMainText = styled.p`
  width: 90%;
  text-align: left;
`;

const ArrowIcon = styled.div`
  height: auto;

  position: absolute;
  top: 38px;
  right: 24px;
`;

import React from "react";

import { FeedItemDto as FeedItem } from "../../__generated__/ourapt";

import styled from "@emotion/styled";

import { useNavigator } from "@karrotframe/navigator";

import VoteProgressAsArticle from "./VoteProgressAsArticle";
import CommentPreviewInFeed from "../Comment/CommentPreviewInFeed";
import VoteClosedAsArticle from "./VoteClosedAsArticle";

type VotePinnedInFeedProps = {
  feedItem: FeedItem;
};

const VotePinnedInFeed: React.FC<VotePinnedInFeedProps> = ({ feedItem }) => {
  const { push } = useNavigator();

  function onVoteClick() {
    push(`/vote/${feedItem.vote.id}`);
  }

  return (
    <div className="ArticleCard pd-16">
      {/* TODO : VoteClosedAsArticle로 분기해서 연결해주기 */}
      {feedItem.vote.isInProgress ? (
        <VoteProgressAsArticle vote={feedItem.vote} />
      ) : (
        <VoteClosedAsArticle vote={feedItem.vote} />
      )}
      <div onClick={() => onVoteClick()}>
        <CountOfComments>
          댓글 {feedItem.vote.countOfComments}개
        </CountOfComments>
        <AreaDivider>
          <Horizon />
        </AreaDivider>
        {feedItem.lastComment && (
          <CommentPreviewInFeed comment={feedItem.lastComment} />
        )}
      </div>
      {feedItem.vote.isInProgress ? (
        <InputArea onClick={() => onVoteClick()}>투표 의견 달기...</InputArea>
      ) : (
        <InputArea onClick={() => onVoteClick()}>
          종료된 투표 의견 달기...
        </InputArea>
      )}
    </div>
  );
};

export default VotePinnedInFeed;

const CountOfComments = styled.p`
  margin: 12px 0;

  color: #222222;
  font-size: 14px;
  font-weight: 700;
`;

const AreaDivider = styled.div`
  width: 100%;

  background-color: #ffffff;
`;

const Horizon = styled.hr`
  width: 100%;
  height: 1px;

  margin: 0px;

  background-color: #f2f3f6;

  border: none;
`;

const InputArea = styled.div`
  height: 40px;
  margin-top: 12px;
  padding: 8px 16px;
  color: #999999;
  font-size: 14px;
  text-align: left;
  background-color: #fbfbfb;
`;

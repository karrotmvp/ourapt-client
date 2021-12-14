import React from "react";

import { FeedItemDto as FeedItem } from "../../__generated__/ourapt";

import styled from "@emotion/styled";

import { useNavigator } from "@karrotframe/navigator";

import VoteProgressAsArticle from "./VoteProgressAsArticle";
import CommentPreviewInFeed from "../Comment/CommentPreviewInFeed";

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
      <VoteProgressAsArticle vote={feedItem.vote} />
      <div onClick={() => onVoteClick()}>
        <CountOfComments>
          댓글 {feedItem.vote.countOfComments}개
        </CountOfComments>
        {feedItem.lastComment && (
          <CommentPreviewInFeed comment={feedItem.lastComment} />
        )}
      </div>
      <InputArea onClick={() => onVoteClick()}>투표 의견 달기</InputArea>
    </div>
  );
};

export default VotePinnedInFeed;

const CountOfComments = styled.p``;

const InputArea = styled.div`
  height: 40px;
  padding: 8px 16px;
  color: #999999;
  font-size: 14px;
  text-align: left;
  background-color: #fbfbfb;
`;

import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface TopFeed {
  id: string;
  title: string;
  participated: number;
}

type TopFeedInFeedProps = {
  topFeed: TopFeed;
};

const TopFeedInFeed: React.FC<TopFeedInFeedProps> = ({ topFeed }) => {
  console.log(topFeed);
  return (
    <TopFeedInFeedWrapper>
      <h3>{topFeed.title}</h3>
      <p>전체 {topFeed.participated}명 참여</p>
      <button className="tempBtn-middle btn--active">참여할래요!</button>
    </TopFeedInFeedWrapper>
  );
};

export default TopFeedInFeed;

const TopFeedInFeedWrapper = styled.div`
  width: 100%;
  height: 160px;

  background-color: lightblue;
`;

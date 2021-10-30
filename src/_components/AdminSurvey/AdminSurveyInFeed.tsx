import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

// import { ReactComponent as iconArrowRight } from "../../assets/iconArrowRight.svg";

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
    <TopFeedInFeedWrapper className="pd-16">
      <QuestionIcon>Q</QuestionIcon>
      <MainText>{topFeed.title}</MainText>
      {/* <iconArrowRight /> */}
      <DetailIcon>
        <img src={require("../../_assets/iconArrowRight.svg").default} />
      </DetailIcon>
    </TopFeedInFeedWrapper>
  );
};

export default TopFeedInFeed;

const TopFeedInFeedWrapper = styled.div`
  width: 100%;
  // height는 지정하지 않기로하자!

  display: flex;
  flex-direction: row;
  align-content: center;

  border-radius: 8px;
  background-color: lightblue;
`;

const QuestionIcon = styled.div`
  width: 28px;
  height: 28px;
  background-color: #ffe455;
  border-radius: 50%;
`;

const MainText = styled.div`
  margin-right: auto;
  line-height: 28px;
  vertical-align: middle;
  background-color: red;
`;

const DetailIcon = styled.div`
  margin-right: 8px;

  display: flex;

  background-color: blue;
`;

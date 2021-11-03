import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import iconArrowRight from "../../assets/iconArrowRight.svg";
import { useNavigator } from "@karrotframe/navigator";

interface tempQuestion {
  id: string;
  title: string;
  participated: number;
}

type QuestionPinnedInFeedProps = {
  question: tempQuestion;
};

const QuestionPinnedInFeed: React.FC<QuestionPinnedInFeedProps> = ({
  question,
}) => {
  const { push } = useNavigator();
  const goArticlePinnedDetail = (articleId: string) => {
    push(`/article/${articleId}/pinned`);
  };

  return (
    <QuestionPinnedInFeedContainer className="pd--16">
      <QuestionPinnedInFeedWrapper>
        <QuestionIcon className="mg-right--8">Q</QuestionIcon>
        <MainText>{question.title}</MainText>
      </QuestionPinnedInFeedWrapper>
      <QuestionPinnedInFeedBtn
        onClick={() => goArticlePinnedDetail(question.id)}
      >
        <p className="mg-right--8">내 의견 남기러 가기</p>
        <img src={require("../../_assets/iconArrowRight.svg").default} />
      </QuestionPinnedInFeedBtn>
    </QuestionPinnedInFeedContainer>
  );
};

export default QuestionPinnedInFeed;

const QuestionPinnedInFeedContainer = styled.div`
  width: 100%;
  // height는 지정하지 않기로하자!

  display: flex;
  flex-direction: column;
  align-content: center;

  border: solid 1px #ebebeb;
  border-radius: 8px;
  //   background-color: lightblue;
`;

const QuestionPinnedInFeedWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const QuestionIcon = styled.div`
  width: 28px;
  height: 28px;

  background-color: #fbdddd;

  color: #e95454;
  font-size: 16px;
  font-weight: 700;
  line-height: 1em;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
`;

const MainText = styled.div`
  height: 48px;
  margin-right: auto;
  line-height: 24px;
  vertical-align: middle;
  background-color: red;
`;

const QuestionPinnedInFeedBtn = styled.div`
  width: 100%;

  padding-top: 8px;

  color: #e95454;

  display: flex;
  flex-direction: row;
  justify-content: center;

  border-top: 1px solid #ebebeb;
  background-color: lightgreen;
`;

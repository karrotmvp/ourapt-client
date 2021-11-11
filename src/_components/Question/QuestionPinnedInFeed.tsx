import React from "react";

import { QuestionDto as Question } from "../../__generated__/ourapt";

import { useAnalytics } from "../../_analytics/firebase";
import { useViewer } from "../../_providers/useViewer";

import styled from "@emotion/styled";

import { useNavigator } from "@karrotframe/navigator";

type QuestionPinnedInFeedProps = {
  question: Question;
};

const QuestionPinnedInFeed: React.FC<QuestionPinnedInFeedProps> = ({
  question,
}) => {
  const Event = useAnalytics();
  const { viewer } = useViewer();

  const { push } = useNavigator();
  const goArticlePinnedDetail = (articleId: string) => {
    Event("clickPinnedArticleCard", {
      at: viewer?.checkedIn?.id,
      article: articleId,
    });
    push(`/article/${articleId}/pinned`);
  };

  return (
    <QuestionPinnedInFeedContainer className="pd--16">
      <QuestionPinnedInFeedWrapper>
        <QuestionIcon className="mg-right--8">Q</QuestionIcon>
        <MainText>{question.mainText}</MainText>
      </QuestionPinnedInFeedWrapper>
      <QuestionPinnedInFeedBtn
        onClick={() => goArticlePinnedDetail(question.id)}
      >
        <p className="mg-right--8">내 의견 남기러 가기</p>
        <img
          src={require("../../_assets/iconArrowRight.svg").default}
          alt="페이지 상세 보기"
        />
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
  width: calc(100% - 36px);
  /* margin-right: auto; */

  margin-top: 2px;
  margin-bottom: 8px;

  font-size: 17px;
  font-weight: 700;
  text-align: left;
  line-height: 24px;
  vertical-align: middle;
`;

const QuestionPinnedInFeedBtn = styled.div`
  width: 100%;

  padding-top: 13px;

  color: #e95454;

  display: flex;
  flex-direction: row;
  justify-content: center;

  border-top: 1px solid #ebebeb;
`;

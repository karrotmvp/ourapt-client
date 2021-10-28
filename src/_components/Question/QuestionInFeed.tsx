import React from "react";

import { useNavigator } from "@karrotframe/navigator";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface Question {
  title: string;
}

type QuestionInFeedProps = {
  question: Question;
};

const ArticleInFeed: React.FC<QuestionInFeedProps> = ({ question }) => {
  return (
    <QuestionInFeedWrapper>
      <h4>{question.title}</h4>
    </QuestionInFeedWrapper>
  );
};

export default ArticleInFeed;

const QuestionInFeedWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;

  background-color: lightpink;
`;

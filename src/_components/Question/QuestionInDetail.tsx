import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface Question {
  content: string;
}

type QuestionInDetailProps = {
  question: Question;
};

const QuestionInDetail: React.FC<QuestionInDetailProps> = ({ question }) => {
  return <div>{question.content}</div>;
};

export default QuestionInDetail;

import React from "react";

import { QuestionDto as Question } from "../../__generated__/ourapt";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import UserAsAuthor from "../User/UserAsAuthor";

type QuestionInFeedProps = {
  question: Question;
};

const ArticleInFeed: React.FC<QuestionInFeedProps> = ({ question }) => {
  return (
    <div className="ArticleCard pd-16">
      <UserAsAuthor
        writer={question.writer}
        createdAt={question.createdAt}
        updatedAt={question.updatedAt}
      />
      <p className="ArticleCard-Content mg-top--10 mg-bottom--16">
        {question.mainText}
      </p>
    </div>
  );
};

export default ArticleInFeed;

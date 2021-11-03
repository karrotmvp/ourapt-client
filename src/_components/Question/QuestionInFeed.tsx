import React from "react";
import { User } from "../../_types/ouraptTypes";

import { useNavigator } from "@karrotframe/navigator";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import UserAsAuthor from "../User/UserAsAuthor";

type tempQuestion = {
  id: string;
  user: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

type QuestionInFeedProps = {
  question: tempQuestion;
};

const ArticleInFeed: React.FC<QuestionInFeedProps> = ({ question }) => {
  return (
    <div className="ArticleCard pd-16">
      <UserAsAuthor
        user={question.user}
        createdAt={question.createdAt}
        updatedAt={question.updatedAt}
      />
      <p className="ArticleCard-Content mg-top--10 mg-bottom--16">
        {question.content}
      </p>
    </div>
  );
};

export default ArticleInFeed;

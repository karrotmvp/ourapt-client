import React from "react";
import {
  User,
  Apartment,
  Question,
  KarrotProfile,
} from "../../_types/ouraptTypes";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import UserAsAuthor from "../User/UserAsAuthor";

type tempQuestion = {
  id: string;
  user: KarrotProfile;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

type QuestionInDetailProps = {
  question: tempQuestion;
};

const QuestionInDetail: React.FC<QuestionInDetailProps> = ({ question }) => {
  return (
    <div className="ArticleCard pd--16">
      <UserAsAuthor
        writer={question.user}
        createdAt={question.createdAt}
        updatedAt={question.updatedAt}
      />
      <p className="ArticleCard-Content mg-top--10 mg-bottom--64">
        {question.content}
      </p>
    </div>
  );
};

export default QuestionInDetail;

import React from "react";

import { QuestionDto as Question } from "../../__generated__/ourapt";

import UserAsAuthor from "../User/UserAsAuthor";

type QuestionInDetailProps = {
  question: Question;
};

const QuestionInDetail: React.FC<QuestionInDetailProps> = ({ question }) => {
  return (
    <div className="ArticleCard pd--16">
      <UserAsAuthor
        writer={question.writer}
        createdAt={question.createdAt}
        updatedAt={question.updatedAt}
      />
      <p className="ArticleCard-Content mg-top--10 mg-bottom--64">
        {question.mainText}
      </p>
    </div>
  );
};

export default QuestionInDetail;

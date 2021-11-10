import React from "react";

import { QuestionDto as Question } from "../../__generated__/ourapt";

import UserAsAuthor from "../User/UserAsAuthor";

type QuestionInFeedProps = {
  question: Question;
};

const ArticleInFeed: React.FC<QuestionInFeedProps> = ({ question }) => {
  return (
    <div className="ArticleCard ArticleCardInLi pd-16">
      <div className="ArticleCardInlist-Author">
        <UserAsAuthor
          writer={question.writer}
          createdAt={question.createdAt}
          updatedAt={question.updatedAt}
        />
      </div>
      <p className="ArticleCard-Content ArticleCardInList-Content mg-top--10 mg-bottom--16">
        {question.mainText}
      </p>
    </div>
  );
};

export default ArticleInFeed;

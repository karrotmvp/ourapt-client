import React from "react";

import { QuestionDto as Question } from "../../__generated__/ourapt";
import { useViewer } from "../../_providers/useViewer";

import UserAsAuthor from "../User/UserAsAuthor";

import { ReactComponent as KebabIcon } from "../../_assets/kebabIcon.svg";

type QuestionInFeedProps = {
  question: Question;
};

const ArticleInFeed: React.FC<QuestionInFeedProps> = ({ question }) => {
  const isMyArticle = useViewer().viewer?.id === question.writer.id;
  const articleBackgroundColor = isMyArticle ? "#f9f9f9" : "#ffffff";

  return (
    <div
      className="ArticleCard ArticleCardInLi pd-16"
      style={{ backgroundColor: articleBackgroundColor }}
    >
      <div className="ArticleCardInlist-Author">
        <UserAsAuthor
          writer={question.writer}
          createdAt={question.createdAt}
          updatedAt={question.updatedAt}
        />
        {isMyArticle && <KebabIcon />}
      </div>
      <p className="ArticleCard-Content ArticleCardInList-Content mg-top--10 mg-bottom--16">
        {question.mainText}
      </p>
    </div>
  );
};

export default ArticleInFeed;

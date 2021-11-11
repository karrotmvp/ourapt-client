import React from "react";
import { useAnalytics } from "../../_analytics/firebase";
import { useViewer } from "../../_providers/useViewer";

import { QuestionDto as Question } from "../../__generated__/ourapt";

import UserAsAuthor from "../User/UserAsAuthor";

type QuestionInFeedProps = {
  question: Question;
};

const ArticleInFeed: React.FC<QuestionInFeedProps> = ({ question }) => {
  const Event = useAnalytics();
  const { viewer } = useViewer();

  function onUserCardClick() {
    Event("clickUserCard", {
      context: "atPageFeed",
      at: viewer?.checkedIn?.id,
      articleType: "question",
      article: question.id,
      user: question.writer.id,
    });
  }

  return (
    <div className="ArticleCard ArticleCardInList pd-16">
      <div
        className="ArticleCardInlist-Author"
        onClick={() => onUserCardClick()}
      >
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

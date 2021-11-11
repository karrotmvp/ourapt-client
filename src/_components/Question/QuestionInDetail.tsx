import React from "react";

import { useAnalytics } from "../../_analytics/firebase";
import { useViewer } from "../../_providers/useViewer";

import { QuestionDto as Question } from "../../__generated__/ourapt";

import UserAsAuthor from "../User/UserAsAuthor";

type QuestionInDetailProps = {
  question: Question;
};

const QuestionInDetail: React.FC<QuestionInDetailProps> = ({ question }) => {
  const Event = useAnalytics();
  const { viewer } = useViewer();

  function onUserCardClick() {
    Event("clickUserCard", {
      context: "atPageDetail",
      at: viewer?.checkedIn?.id,
      articleType: "question",
      article: question.id,
      user: question.writer.id,
    });
  }

  return (
    <div className="ArticleCard pd--16">
      <div onClick={() => onUserCardClick()}>
        <UserAsAuthor
          writer={question.writer}
          createdAt={question.createdAt}
          updatedAt={question.updatedAt}
        />
      </div>
      <p className="ArticleCard-Content mg-top--10 mg-bottom--64">
        {question.mainText}
      </p>
    </div>
  );
};

export default QuestionInDetail;

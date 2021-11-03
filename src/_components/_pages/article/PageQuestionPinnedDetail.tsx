import React from "react";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

const PageQuestionPinnedDetail: React.FC = () => {
  const params = useParams<{ articleId?: string }>();
  const articleId = params.articleId;

  return (
    <div className="Page">
      <ScreenHelmet />
      <form className="BriefSubmitForm pd--24" action="submit">
        <QuestionPinnedTitle>
          우리 아파트의 벽 색깔 맘에 드나요?
        </QuestionPinnedTitle>
        <input
          className="BriefSubmitForm-input mg-bottom--16"
          type="text"
          placeholder="어떻게 생각하세요?"
        />
        <button className="BriefSubmitForm-btn btn-full btn--inactive">
          내 의견 댓글로 남기기
        </button>
      </form>
    </div>
  );
};

export default PageQuestionPinnedDetail;

const QuestionPinnedTitle = styled.div`
  margin-bottom: 80px;

  text-align: left;
  font-size: 26px;
  font-weight: 700;
  line-height: 34px;
`;

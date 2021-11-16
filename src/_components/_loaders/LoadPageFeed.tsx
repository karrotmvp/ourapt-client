import React from "react";

import styled from "@emotion/styled";

const LoadPageFeed: React.FC = () => {
  return (
    <div className="Page">
      <div className="loader--ScreenHelmet"></div>
      <LoadPinnedArea className="pd--16">
        <LoadArticlePinnedContainer className="pd--16">
          <LoadArticlePinnedInFeedWrapper>
            <LoadQuestionIcon className="mg-right--8 loader" />
            <LoadArticlePinnedText className="loader" />
          </LoadArticlePinnedInFeedWrapper>
        </LoadArticlePinnedContainer>
      </LoadPinnedArea>
      <div className="pd--16">
        <LoadArticleInFeed className="loaderItem-first" />
        <LoadArticleInFeed className="loaderItem-third" />
      </div>
    </div>
  );
};

export default LoadPageFeed;

const LoadPinnedArea = styled.div`
  width: 100%;

  border-bottom: 12px solid #f5f5f5;
`;

const LoadArticlePinnedContainer = styled.div`
  width: 100%;
  height: 120px;

  display: flex;
  flex-direction: column;
  align-content: center;

  border: solid 1px #f5f5f5;
  border-radius: 8px;
`;

const LoadArticlePinnedInFeedWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  padding-bottom: 40px;
  margin-bottom: 40px;

  border-bottom: 1px solid #f5f5f5;
`;

const LoadQuestionIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;
const LoadArticlePinnedText = styled.div`
  width: 215px;
  height: 28px;
`;
const LoadArticleInFeed = styled.div`
  width: 100%;
  height: 144px;

  margin-bottom: 16px;

  border-radius: 8px;
`;

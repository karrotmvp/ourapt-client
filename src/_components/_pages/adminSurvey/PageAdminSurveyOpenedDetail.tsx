import React from "react";

import { ScreenHelmet, useParams } from "@karrotframe/navigator";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

const PageTopFeedDetail: React.FC = () => {
  const params = useParams<{ topFeedId?: string }>();
  const topFeedId = params.topFeedId;

  return (
    <div className="Page">
      <ScreenHelmet />
      탑피드 디테일뷰
      <div>{topFeedId}페이지</div>
    </div>
  );
};

export default PageTopFeedDetail;

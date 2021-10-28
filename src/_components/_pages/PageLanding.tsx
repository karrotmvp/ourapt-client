import React from "react";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { ScreenHelmet, useNavigator } from "@karrotframe/navigator";

type PageLandingProps = {
  regionId: string;
};

const PageLanding: React.FC<PageLandingProps> = ({ regionId }) => {
  const { push, pop, replace } = useNavigator();

  const goFeed = (channelId: string) => {
    push(`/feed/${channelId}`);
  };

  // API call:
  // request ---- 가지고 있는 regionId를 서버로 보내고, (regionId는 params로 받아올 예정)
  // response ---- 해당 region이 가지고 있는 channel 목록들을 받아옵니다.

  const channels = [
    {
      id: "123",
      displayName: "더샵",
    },
    {
      id: "456",
      displayName: "푸르지오",
    },
    {
      id: "789",
      displayName: "하버뷰",
    },
  ];

  return (
    <div className="Page">
      <ScreenHelmet />
      {regionId}에서 접속한 사람이 보는 랜딩페이지
      <ButtonWrapper>
        {channels.map((channel) => {
          return (
            <button
              className="tempBtn btn--active"
              onClick={() => goFeed(channel.id)}
            >
              {regionId}의 {channel.displayName} 아파트
            </button>
          );
        })}
      </ButtonWrapper>
    </div>
  );
};

export default PageLanding;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: orange;
`;

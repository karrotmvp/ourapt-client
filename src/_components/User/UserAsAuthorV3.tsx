import React from "react";

import { KarrotProfile as Writer } from "../../__generated__/ourapt";

import styled from "@emotion/styled";

import getTimestamp from "../../_modules/getTimestamp";

type UserAsAuthorProps = {
  writer: Writer;
  createdAt: Date;
  updatedAt: Date;
};

const UserAsAuthor: React.FC<UserAsAuthorProps> = ({
  writer,
  createdAt,
  updatedAt,
}) => {
  const userReplacement = {
    id: "userNotExist",
    nickname: "존재하지 않는 사용자",
    profileImageUrl: null,
  };

  const author = writer || userReplacement;

  return (
    <UserAsAuthorContainer className="horizontal--centered">
      <UserAsAuthorNickname>{author.nickname}</UserAsAuthorNickname>
      <UserAsAuthorTimestamp>
        {getTimestamp(createdAt, updatedAt)}
      </UserAsAuthorTimestamp>
    </UserAsAuthorContainer>
  );
};

export default UserAsAuthor;

const UserAsAuthorContainer = styled.div`
  margin-right: auto;
`;

const UserAsAuthorNickname = styled.div`
  margin-right: 8px;

  color: #555555;
  font-size: 14px;
  font-weight: 500;
`;
const UserAsAuthorTimestamp = styled.div`
  color: #999999;
  font-size: 14px;
  font-weight: 400;
`;

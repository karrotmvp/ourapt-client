import React from "react";

import { KarrotProfile as Writer } from "../../__generated__/ourapt";

import styled from "@emotion/styled";

import getTimestamp from "../../_modules/getTimestamp";

type UserAsSubAuthorProps = {
  writer: Writer;
  createdAt: Date;
  updatedAt: Date;
};

const UserAsSubAuthor: React.FC<UserAsSubAuthorProps> = ({
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

  const UserAsAuthorProfileImage = styled.div`
    width: 24px;
    height: 24px;

    margin-right: 12px;

    border-radius: 50%;
    background-image: url("${author.profileImageUrl}");
    background-size: cover;
  `;

  return (
    <UserAsAuthorContainer>
      {author.profileImageUrl ? (
        <UserAsAuthorProfileImage></UserAsAuthorProfileImage>
      ) : (
        <UserAsAuthorProfileImage>
          <img
            src={require("../../_assets/defaultProfileImage.svg").default}
            alt="프로필 사진"
          />
        </UserAsAuthorProfileImage>
      )}
      <div>
        <UserAsAuthorNickname>{author.nickname}</UserAsAuthorNickname>
        <UserAsAuthorTimestamp>
          {getTimestamp(createdAt, updatedAt)}
        </UserAsAuthorTimestamp>
      </div>
    </UserAsAuthorContainer>
  );
};

export default UserAsSubAuthor;

const UserAsAuthorContainer = styled.div`
  margin-right: auto;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const UserAsAuthorNickname = styled.div`
  color: #555555;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
`;
const UserAsAuthorTimestamp = styled.div`
  color: #999999;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
`;

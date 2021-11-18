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

  const UserAsAuthorProfileImage = styled.div`
    width: 32px;
    height: 32px;

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

export default UserAsAuthor;

const UserAsAuthorContainer = styled.div`
  margin-right: auto;

  display: flex;
  flex-direction: row;
  align-items: center;
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

// 어떤 경우에만 사용되는 컴포넌트인지 As로 설명해주도록 하자!
// 예를 들면 UserAsSignature, UserAsComponentInList... 등의 용례?로 설명해도 좋고
// UserAsDefaultCard, UserAsLargeCard... 나 UserCard1, UserCard2... 등으로 설명해도 좋음
// 중요한건 이건 디자이너와 싱크를 맞춘다는것!
// 유저 컴포넌트가 따로 배리에이션이 없을거같으면 이거 그냥 UserCard로 명명해버리자!

import React from "react";

import { KarrotProfile as Writer } from "../../__generated__/ourapt";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import getTimestamp from "../../_modules/getTimestamp";
import ArticleCreateBtnIcon from "../../_assets/ArticleCreateBtnIcon.svg";

// 같은 엔티티를 가리키고 있는 인터페이스이므로,
// 글로벌로 타입을 빼내어 선언하고 묶어놓은 다음에 매번 임포트해서 써볼 수는 없을까?
// 매번 다른 필드들을 선택적으로 가져오는데, 그리고 그것을 명확하게 보기 쉽게 하려고 하는데,
// 글로벌 타입 선언이 나을까? 매번 새로 선언하는게 나을까? 고민해보자 ---- 토니는 어떻게할까? 왜?

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
  const profileUrl = `${writer.profileImageUrl}`;
  const UserAsAuthorProfileImage = styled.div`
    width: 32px;
    height: 32px;

    margin-right: 12px;

    border-radius: 50%;
    /* background-color: lightgray; */
    background-image: url("${writer.profileImageUrl}");
  `;

  return (
    <UserAsAuthorContainer>
      {writer.profileImageUrl ? (
        <UserAsAuthorProfileImage></UserAsAuthorProfileImage>
      ) : (
        <UserAsAuthorProfileImage>
          <img src={require("../../_assets/defaultProfileImage.svg").default} />
        </UserAsAuthorProfileImage>
      )}
      <div>
        <UserAsAuthorNickname>{writer.nickname}</UserAsAuthorNickname>
        <UserAsAuthorTimestamp>
          {getTimestamp(createdAt, updatedAt)}
        </UserAsAuthorTimestamp>
      </div>
    </UserAsAuthorContainer>
  );
};

export default UserAsAuthor;

const UserAsAuthorContainer = styled.div`
  background-color: yellow;

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

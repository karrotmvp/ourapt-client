import React, { useReducer } from "react";

import { useViewer } from "../../_providers/useViewer";

import { VoteItemDto as VoteItem } from "../../__generated__/ourapt";

import { ReactComponent as CheckIcon } from "../../_assets/VoteIcon.svg";

type VoteItemAsClosedArticleProps = {
  voteItem: VoteItem;
  isSelected: boolean;
  isMostVoted: boolean;
  itemCount: number;
  totalCount: number;
};

const VoteItemAsClosedArticle: React.FC<VoteItemAsClosedArticleProps> = ({
  voteItem,
  itemCount,
  isSelected,
  isMostVoted,
  totalCount,
}) => {
  return (
    <li
      className="VoteItem"
      style={{
        border: isSelected ? "1.5px solid #333333" : "1px solid #DBDBDB",
      }}
    >
      <div
        className="VoteItem-poll"
        style={{
          backgroundColor: isMostVoted ? "#96C5C5" : "#F0F0F0",
          width: `${totalCount !== 0 ? (itemCount / totalCount) * 100 : 0}%`,
        }}
      ></div>
      <div className="VoteItem-label">
        <p
          style={{
            fontWeight: isMostVoted ? 700 : 400,
          }}
        >
          {voteItem.mainText}
        </p>
        <p
          className="VoteItem-count"
          style={{
            color: isMostVoted ? "#398287" : "#000000",
            fontWeight: isMostVoted ? 700 : 400,
          }}
        >
          {totalCount !== 0 ? Math.floor((itemCount / totalCount) * 100) : 0}%
        </p>
      </div>
    </li>
  );
};

export default VoteItemAsClosedArticle;

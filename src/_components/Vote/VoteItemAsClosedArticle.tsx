import React, { useReducer } from "react";

import { useViewer } from "../../_providers/useViewer";

import { VoteItemDto as VoteItem } from "../../__generated__/ourapt";

import { ReactComponent as CheckIcon } from "../../_assets/VoteIcon.svg";
import { ReactComponent as VoteSelectedIcon } from "../../_assets/VoteSelectedIcon.svg";

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
          backgroundColor: isMostVoted ? "#d4d6dc" : "#f2f3f6",
          width: `${totalCount !== 0 ? (itemCount / totalCount) * 100 : 0}%`,
        }}
      ></div>
      <div className="VoteItem-label">
        {isSelected && (
          <VoteSelectedIcon className="mg-right--8" stroke="#000000" />
        )}
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

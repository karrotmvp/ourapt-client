import React, { useReducer } from "react";

import { useViewer } from "../../_providers/useViewer";

import { VoteItemDto as VoteItem } from "../../__generated__/ourapt";

import { ReactComponent as CheckIcon } from "../../_assets/VoteIcon.svg";
import { ReactComponent as VoteSelectedIcon } from "../../_assets/VoteSelectedIcon.svg";

type VoteItemAsArticleProps = {
  displayed: boolean;
  voteItem: VoteItem;
  isSelected: boolean;
  isMostVoted: boolean;
  action: () => void;
  itemCount: number;
  totalCount: number;
};

type State =
  | {
      _t: "not-displayed";
    }
  | {
      _t: "displayed-not-selected";
    }
  | {
      _t: "displayed-selected";
    };

const VoteItemAsArticle: React.FC<VoteItemAsArticleProps> = ({
  displayed,
  voteItem,
  itemCount,
  isSelected,
  isMostVoted,
  action,
  totalCount,
}) => {
  const { viewer } = useViewer();
  const viewerId = viewer?.id || "";

  const state: State = displayed
    ? isSelected
      ? { _t: "displayed-selected" }
      : { _t: "displayed-not-selected" }
    : { _t: "not-displayed" };

  return (
    <li
      className="VoteItem"
      onClick={() => action()}
      style={{
        border:
          state._t === "displayed-selected"
            ? "1.5px solid #459a84"
            : "1px solid #DBDBDB",
      }}
    >
      {state._t !== "not-displayed" && (
        <div
          className="VoteItem-poll"
          style={{
            backgroundColor: isMostVoted ? "#AAE1D4" : "#E1F6F2",
            // borderColor:
            //   state._t === "displayed-selected" ? "#398287" : "#DBDBDB",
            width: `${(itemCount / totalCount) * 100}%`,
          }}
        ></div>
      )}
      <div className="VoteItem-label">
        {state._t === "displayed-selected" && (
          <VoteSelectedIcon className="mg-right--8" stroke="#459a84" />
        )}
        <p
          style={{
            fontWeight:
              state._t === "displayed-selected" && isMostVoted ? 700 : 400,
          }}
        >
          {voteItem.mainText}
        </p>
        {state._t !== "not-displayed" && (
          <p
            className="VoteItem-count"
            style={{
              color: isMostVoted ? "#459A84" : "#000000",
              fontWeight: isMostVoted ? 700 : 400,
            }}
          >
            {Math.floor((itemCount / totalCount) * 100)}%
          </p>
        )}
      </div>
    </li>
  );
};

export default VoteItemAsArticle;

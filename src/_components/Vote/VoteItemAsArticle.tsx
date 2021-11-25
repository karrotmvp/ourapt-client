import React, { useReducer } from "react";

import { useViewer } from "../../_providers/useViewer";

import { VoteItemDto as VoteItem } from "../../__generated__/ourapt";

import { ReactComponent as CheckIcon } from "../../_assets/VoteIcon.svg";

type VoteItemAsArticleProps = {
  displayed: boolean;
  voteItem: VoteItem;
  isSelected: boolean;
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
            ? "1.5px solid #398287"
            : "1px solid #DBDBDB",
      }}
    >
      {state._t !== "not-displayed" && (
        <div
          className="VoteItem-poll"
          style={{
            borderColor:
              state._t === "displayed-selected" ? "#398287" : "#DBDBDB",
            width: `${(itemCount / totalCount) * 100}%`,
          }}
        ></div>
      )}
      <div className="VoteItem-label">
        <CheckIcon
          className="mg-right--8"
          style={{
            fill: state._t === "displayed-selected" ? "#398287" : "",
            stroke: state._t === "displayed-selected" ? "white" : "#AAAAAA",
          }}
        />
        {voteItem.mainText}
        {state._t !== "not-displayed" && (
          <p
            className="VoteItem-count"
            style={{
              color: state._t === "displayed-selected" ? "#398287" : "#000000",
              fontWeight: state._t === "displayed-selected" ? 700 : 400,
            }}
          >
            {(itemCount / totalCount) * 100}%
          </p>
        )}
      </div>
    </li>
  );
};

export default VoteItemAsArticle;

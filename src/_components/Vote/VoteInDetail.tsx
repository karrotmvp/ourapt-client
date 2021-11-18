import React from "react";

import { useAnalytics } from "../../_analytics/firebase";
import { useViewer } from "../../_providers/useViewer";

import { KarrotProfile } from "../../__generated__/ourapt";

import UserAsAuthor from "../User/UserAsAuthor";

type tempVoteItem = {
  id: string; // 객관식질문 ID
  mainText: string; // 질문내용
  votedCount: number;
  isMyVote: boolean;
};

type tempVote = {
  id: string; // 객관식질문 ID
  writer: KarrotProfile; // 작성자
  mainText: string; // 질문내용
  createdAt: Date; // 생성일
  updatedAt: Date; // 최근 수정일
  isPinned: boolean; // 상단 노출 여부
  byAdmin: boolean; // 관리자가 작성한 글인지 여부
  items: Array<tempVoteItem>;
  countOfComments: number;
};

type QuestionInDetailProps = {
  vote: tempVote;
};

const VoteInDetail: React.FC<QuestionInDetailProps> = ({ vote }) => {
  const Event = useAnalytics();
  const { viewer } = useViewer();

  function onUserCardClick() {
    Event("clickUserCard", {
      context: "atPageDetail",
      at: viewer?.checkedIn?.id,
      articleType: "vote",
      article: vote.id,
      user: vote.writer.id,
    });
  }

  return (
    <div className="ArticleCard pd--16">
      <div onClick={() => onUserCardClick()}>
        <UserAsAuthor
          writer={vote.writer}
          createdAt={vote.createdAt}
          updatedAt={vote.updatedAt}
        />
      </div>
      <p className="ArticleCard-Content mg-top--10 mg-bottom--64">
        {vote.mainText}
      </p>
      {/* <VoteItemList>
          {state._t === "not-voted"
            ? vote.items.map((item, idx) => {
                return (
                  <VoteItem key={item.id} onClick={() => onItemClick(item)}>
                    <VoteItemLabel>
                      <CheckIcon width="14" height="12" stroke="#cccccc" />
                      {item.mainText}
                    </VoteItemLabel>
                  </VoteItem>
                );
              })
            : vote.items.map((item, idx) => {
                return (
                  <VoteItem key={item.id} onClick={() => onItemClick(item)}>
                    <VoteItemPoll
                      style={{
                        backgroundColor:
                          state.voted === item ? "purple" : "aliceblue",
                        width:
                          state.voted === item
                            ? `${
                                ((item.votedCount + 1) / (totalVote + 1)) * 100
                              }%`
                            : `${(item.votedCount / (totalVote + 1)) * 100}%`,
                      }}
                    ></VoteItemPoll>
                    <VoteItemLabel>
                      <CheckIcon
                        width="14"
                        height="12"
                        stroke="#cccccc"
                        className="mg-right--16"
                      />
                      {item.mainText}
                      <VoteItemCount>
                        {state.voted === item
                          ? item.votedCount + 1
                          : item.votedCount}
                        명
                      </VoteItemCount>
                    </VoteItemLabel>
                  </VoteItem>
                );
              })}
        </VoteItemList> */}
    </div>
  );
};

export default VoteInDetail;

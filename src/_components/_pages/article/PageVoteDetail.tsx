import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { VoteDto as Vote } from "../../../__generated__/ourapt";

import { useApi } from "../../../api";
import { useViewer } from "../../../_providers/useViewer";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import examineResBody from "../../../_modules/examineResBody";
import VoteClosedInDetail from "../../Vote/VoteClosedInDetail";

const PageVoteDetail: React.FC = () => {
  const params = useParams<{ articleId?: string }>();
  const articleId = params.articleId || "";

  const api = useApi();

  const { push } = useNavigator();

  const [vote, setVote] = useState<Vote>();

  useEffect(() => {
    (async () => {
      const response = await api.voteController.getVoteByIdUsingGET({
        voteId: articleId,
      });

      const safeBody = examineResBody({
        resBody: response,
        validator: (data) => data.vote != null,
        onFailure: () => {
          push(`/error?cause=getVoteByIdAtPageQuestionDetail`);
        },
      });
      setVote(safeBody.data.vote);
    })();
  }, [api.questionController, articleId, push]);

  return (
    <div className="page">
      <ScreenHelmet title="종료된 투표" />
      <ArticleArea>{vote && <VoteClosedInDetail vote={vote} />}</ArticleArea>
    </div>
  );
};

export default PageVoteDetail;

const ArticleArea = styled.div`
  width: 100%;
`;

import React, { useCallback, useEffect, useState } from "react";

import { QuestionDto as Question } from "../../__generated__/ourapt";
import { useApi } from "../../api";
import { useViewer } from "../../_providers/useViewer";

import styled from "@emotion/styled";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import ApartmentInNavigator from "../Apartment/ApartmentInNavigator";
import QuestionPinnedInFeed from "../Question/QuestionPinnedInFeed";
import QuestionInFeed from "../Question/QuestionInFeed";

import examineResBody from "../../_modules/examineResBody";

import { ReactComponent as OuraptLogo } from "../../_assets/ouraptLogo.svg";

type PageFeedProps = {
  apartmentId: string;
};

const PageFeed: React.FC<PageFeedProps> = (props) => {
  const params =
    useParams<{ apartmentId?: string }>().apartmentId || props.apartmentId;

  const api = useApi();

  const [pinnedQuestion, setPinnedQuestion] = useState<Question>();
  const [questions, setQuestions] = useState<Array<Question>>([]);

  const { push } = useNavigator();
  const goArticleDetail = (articleId: string) => {
    push(`/article/${articleId}`);
  };

  // const isMyArticle = useViewer().viewer?.id;
  // const ArticleBackgroundColor = (question: Question) => {
  //   if (isMyArticle === question.writer.id) {
  //     return "#f7f7f7";
  //   } else {
  //     return "#ffffff";
  //   }
  // };

  const onArticleCreateBtnClick = () => {
    push("article/create");
  };

  const getQuestionsByCursorPerPage = useCallback(
    (params: string, cursor: number, perPage: number) => {
      (async () => {
        const resBody = await api.questionController.getQuestionsUsingGET({
          apartmentId: params,
          cursor,
          perPage,
        });
        const safeBody = examineResBody({
          resBody,
          validator: (data) => data.questions != null,
          onFailure: () => {
            push(`/error?cause=getQuestionsByCursorPerPageAtPageFeed`);
          },
        });
        setQuestions(safeBody.data.questions);
      })();
    },
    [api.questionController, push]
  );

  useEffect(() => {
    (async () => {
      const response =
        await api.questionController.getPinnedQuestionOfApartmentUsingGET({
          apartmentId: params,
        });
      if (response && response.status === "DATA_NOT_FOUND_FROM_DB") {
      } else {
        const safeBody = examineResBody({
          resBody: response,
          validator: (data) => data.question != null,
          onFailure: () => {
            push(`/error?cause=getPinnedQuestionAtPageFeed`);
          },
        });
        setPinnedQuestion(safeBody.data.question);
      }
    })();
    // TODO: ???????????? ??? ??? ????????????
    getQuestionsByCursorPerPage(params, Date.now(), 100);
  }, [api.questionController, getQuestionsByCursorPerPage, params, push]);

  function onApartmentInNavigatorClick() {
    push(`/landing`);
  }

  return (
    <div className="Page">
      <div className="PageFeed-inner">
        <ScreenHelmet
          appendLeft={<OuraptLogo />}
          appendRight={
            <ApartmentInNavigator
              apartmentId={params}
              onClickAction={onApartmentInNavigatorClick}
            />
          }
        />
        {pinnedQuestion && pinnedQuestion.id && (
          <PinnedArea className="pd--16">
            <QuestionPinnedInFeed question={pinnedQuestion} />
          </PinnedArea>
        )}
        <ArticleArea>
          <AreaTitle className="pd--16">????????? ?????? ?????????</AreaTitle>
          {questions.length === 0 ? (
            <div>
              <ArticleVacantViewTitle>
                ?????????????????? ?????? ?????? ????????????!
              </ArticleVacantViewTitle>
              <ArticleVacantViewInfo>
                ????????? ??????, ????????? ?????? ?????? ????????????.
              </ArticleVacantViewInfo>
              <button
                className="btn-160 btn btn--active mg-top--48"
                onClick={onArticleCreateBtnClick}
              >
                ????????? ??????
              </button>
            </div>
          ) : (
            <div>
              {questions.map((question) => {
                return (
                  <ArticleWrapper
                    key={question.id}
                    className="pd--16"
                    // style={{
                    //   backgroundColor: ArticleBackgroundColor(question),
                    // }}
                    onClick={() => goArticleDetail(question.id)}
                  >
                    <QuestionInFeed question={question} />
                    <CommentThumbnail>
                      <img
                        className="mg-right--6"
                        src={
                          require("../../_assets/CommentInFeedIcon.svg").default
                        }
                        alt="?????? ???"
                      />
                      <div className="font-size--15 font-weight--400 font-color--11">
                        {question.countOfComments}
                      </div>
                    </CommentThumbnail>
                  </ArticleWrapper>
                );
              })}
              <FeedInfoWrapper>
                <FeedInfoText>
                  ????????? ????????? ?????? ???????????? ????????? ?????????!
                </FeedInfoText>
              </FeedInfoWrapper>
            </div>
          )}
        </ArticleArea>
      </div>
      {questions.length !== 0 && (
        <div className="btn--floating">
          <ArticleCreateBtnFloating onClick={onArticleCreateBtnClick}>
            <img
              src={require("../../_assets/ArticleCreateBtnIcon.svg").default}
              alt="????????? ??????"
            />
          </ArticleCreateBtnFloating>
        </div>
      )}
    </div>
  );
};

export default PageFeed;

const PinnedArea = styled.div`
  width: 100%;

  border-bottom: 12px solid #f5f5f5;
`;

const AreaTitle = styled.div`
  padding-bottom: 8px;
  text-align: left;

  font-size: 18px;
  font-weight: bold;
`;

const ArticleArea = styled.div`
  width: 100%;
`;
const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid #f5f5f5;
`;

const CommentThumbnail = styled.div`
  margin-left: auto;

  display: flex;
  flex-direction: row;
`;

const FeedInfoWrapper = styled.div`
  width: 100%;
  height: 64px;

  padding: 16px 48px;
`;
const FeedInfoText = styled.div`
  width: 100%;
  height: 100%;

  color: #999999;
  font-size: 14px;
  line-height: 32px;

  border-radius: 20px;

  background-color: #f9f9f9;
`;

const ArticleCreateBtnFloating = styled.div`
  width: 64px;
  height: 64px;

  margin-right: 16px;
  margin-left: auto;

  background-color: #e95454;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArticleVacantViewTitle = styled.div`
  margin-top: 80px;
  margin-bottom: 4px;

  color: #aaaaaa;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const ArticleVacantViewInfo = styled.div`
  color: #aaaaaa;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
`;

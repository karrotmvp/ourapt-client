import React, { useCallback, useEffect, useState } from "react";

import { QuestionDto as Question } from "../../__generated__/ourapt";
import { useApi } from "../../api";

import styled from "@emotion/styled";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

import QuestionPinnedInFeed from "../Question/QuestionPinnedInFeed";
import QuestionInFeed from "../Question/QuestionInFeed";

import examineResBody from "../../_modules/examineResBody";

type PageFeedProps = {
  apartmentId: string;
};

const PageFeed: React.FC<PageFeedProps> = ({ apartmentId }) => {
  const params =
    useParams<{ apartmentId?: string }>().apartmentId || apartmentId;

  const api = useApi();

  const [pinnedQuestion, setPinnedQuestion] = useState<Question>();
  const [questions, setQuestions] = useState<Array<Question>>([]);

  const { push } = useNavigator();
  const goArticleDetail = (articleId: string) => {
    push(`/article/${articleId}`);
  };

  const onArticleCreateBtnClick = () => {
    push("article/create");
  };

  const getQuestionsByCursorPerPage = useCallback(
    (params: string, cursor: number, perPage: number) => {
      (async () => {
        const response = await api.questionController.getQuestionsUsingGET({
          apartmentId: params,
          cursor,
          perPage,
        });
        const questions = examineResBody(response, "퀘스쳔 가져오기").data
          .questions;
        setQuestions(questions);
      })();
    },
    [api.questionController]
  );
  // async function getQuestionsByCursorPerPage(
  //   params: string,
  //   cursor: number,
  //   perPage: number
  // ) {
  //   const response = await api.questionController.getQuestionsUsingGET({
  //     apartmentId: params,
  //     cursor,
  //     perPage,
  //   });
  //   const questions = examineResBody(response, "퀘스쳔 가져오기").data
  //     .questions;
  //   setQuestions(questions);
  // }

  useEffect(() => {
    (async () => {
      const response =
        await api.questionController.getPinnedQuestionOfApartmentUsingGET({
          apartmentId: params,
        });
      if (response && response.status === "DATA_NOT_FOUND_FROM_DB") {
      } else {
        const pinnedQuestion = examineResBody(response, "핀드퀘스쳔 가져오기")
          .data.question;
        setPinnedQuestion(pinnedQuestion);
      }
    })();
    // TODO: 페이지당 몇 개 확인하기
    getQuestionsByCursorPerPage(params, Date.now(), 100);
  }, [
    pinnedQuestion,
    api.questionController,
    getQuestionsByCursorPerPage,
    params,
  ]);

  return (
    <div className="Page">
      <button
        onClick={(e) => {
          push(`/landing`);
        }}
      >
        tempBtn
      </button>
      <div className="PageFeed-inner">
        <ScreenHelmet />
        {pinnedQuestion && pinnedQuestion.id && (
          <PinnedArea className="pd--16">
            <QuestionPinnedInFeed question={pinnedQuestion} />;
          </PinnedArea>
        )}
        <ArticleArea>
          <AreaTitle className="pd--16">아파트 주민 라운지</AreaTitle>
          {questions.length === 0 ? (
            <div>
              <ArticleVacantViewTitle>
                우리아파트에 오신 것을 환영해요!
              </ArticleVacantViewTitle>
              <ArticleVacantViewInfo>
                아파트 생활, 맛집, 모임에 대해 글을 써보세요.
              </ArticleVacantViewInfo>
              <button
                className="btn-160 btn btn--active mg-top--48"
                onClick={onArticleCreateBtnClick}
              >
                게시글 작성
              </button>
            </div>
          ) : (
            questions.map((question) => {
              return (
                <ArticleWrapper
                  key={question.id}
                  className="pd--16"
                  onClick={() => goArticleDetail(question.id)}
                >
                  <QuestionInFeed question={question} />
                  <CommentThumbnail>
                    <img
                      className="mg-right--6"
                      src={
                        require("../../_assets/CommentInFeedIcon.svg").default
                      }
                      alt="댓글 수"
                    />
                    <div className="font-size--15 font-weight--400 font-color--11">
                      {question.countOfComments}
                    </div>
                  </CommentThumbnail>
                </ArticleWrapper>
              );
            })
          )}
        </ArticleArea>
      </div>
      {questions.length !== 0 && (
        <div className="btn--floating">
          <ArticleCreateBtnFloating onClick={onArticleCreateBtnClick}>
            <img
              src={require("../../_assets/ArticleCreateBtnIcon.svg").default}
              alt="게시글 쓰기"
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
  margin-bottom: 12px;
  background-color: purple;
`;

const AreaTitle = styled.div`
  margin-bottom: 1px;

  padding-bottom: 8px;
  text-align: left;

  font-size: 18px;
  font-weight: bold;

  background-color: lavender;
`;

const ArticleArea = styled.div`
  width: 100%;
`;
const ArticleWrapper = styled.div`
  margin-top: 1px;
  margin-bottom: 1px;

  display: flex;
  flex-direction: column;

  background-color: lavender;
`;

const CommentThumbnail = styled.div`
  background-color: violet;

  margin-left: auto;

  display: flex;
  flex-direction: row;
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

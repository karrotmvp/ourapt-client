import React, { useCallback, useEffect, useState } from "react";

import { QuestionDto as Question } from "../../__generated__/ourapt";
import { useApi } from "../../api";
import { useViewer } from "../../_providers/useViewer";

import styled from "@emotion/styled";

import { ScreenHelmet, useNavigator, useParams } from "@karrotframe/navigator";

// import ApartmentInNavigator from "../Apartment/ApartmentInNavigator";
import QuestionPinnedInFeed from "../Question/QuestionPinnedInFeed";
import QuestionInFeed from "../Question/QuestionInFeed";

import examineResBody from "../../_modules/examineResBody";

import { ReactComponent as OuraptLogo } from "../../_assets/ouraptLogo.svg";

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

  const isMyArticle = useViewer().viewer?.id;
  const ArticleBackgroundColor = (question: Question) => {
    if (isMyArticle === question.writer.id) {
      return "#f7f7f7";
    } else {
      return "#ffffff";
    }
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
  }, [api.questionController, getQuestionsByCursorPerPage, params]);

  return (
    <div className="Page">
      <div className="PageFeed-inner">
        <ScreenHelmet
          appendLeft={<OuraptLogo />}
          // appendRight={<ApartmentInNavigator apartment={apartment} />}
        />
        {pinnedQuestion && pinnedQuestion.id && (
          <PinnedArea className="pd--16">
            <QuestionPinnedInFeed question={pinnedQuestion} />
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
                아파트 생활, 맛집에 대해 글을 써보세요.
              </ArticleVacantViewInfo>
              <button
                className="btn-160 btn btn--active mg-top--48"
                onClick={onArticleCreateBtnClick}
              >
                게시글 작성
              </button>
            </div>
          ) : (
            <div>
              {questions.map((question) => {
                return (
                  <ArticleWrapper
                    key={question.id}
                    className="pd--16"
                    style={{
                      backgroundColor: ArticleBackgroundColor(question),
                    }}
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
              })}
              <FeedInfoWrapper>
                <FeedInfoText>
                  이웃과 나누고 싶은 이야기를 등록해 보세요!
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

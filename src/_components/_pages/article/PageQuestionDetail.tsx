import React from "react";

import { ScreenHelmet, useParams } from "@karrotframe/navigator";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import UserAsAuthor from "../../User/UserAsAuthor";
import QuestionInDetail from "../../Question/QuestionInDetail";
import CommentInDetail from "../../Comment/CommentInDetail";

const PageArticleDetail: React.FC = () => {
  const params = useParams<{ articleId?: string }>();
  const articleId = params.articleId;

  // API Call:
  // request ---- 현재 페이지의 아티클 아이디를 보내주고,
  // response ---- 를 받아 올 건데요, 대충 예상해보겠습니다! 이건 제이콥과 나의 이해의 싱크가 맞아야 하는지점

  // /kljqwlkrh120hfqw?articleId=123

  const tempArticleData = {
    id: "article1",
    author: {
      id: "authorOfArticle1",
      nickname: "글작성자",
      avatarSrc: "./../..",
    },
    question: {
      content: "우리아파트 벽 색깔 맘에 드나요?",
    },
    createdAt: "Sun May 11, 2021",
    comments: [
      {
        id: "comment1",
        author: {
          id: "authorOfComment1",
          nickname: "댓글작성자1",
          avatarSrc: "./../..",
        },
        content: "좋아요 예뻐요",
        createdAt: "Sun May 11, 2021",
      },
      {
        id: "comment2",
        author: {
          id: "authorOfComment2",
          nickname: "댓글작성자2",
          avatarSrc: "./../..",
        },
        content: "별로예요",
        createdAt: "Sun May 11, 2021",
      },
      {
        id: "comment3",
        author: {
          id: "authorOfComment3",
          nickname: "댓글작성자3",
          avatarSrc: "./../..",
        },
        content: "다른이야기해요",
        createdAt: "Sun May 11, 2021",
      },
    ],
  };

  return (
    <div className="Page">
      <ScreenHelmet />
      {/* AuthorCard가 반복해서 사용된다면 ---- 그리고 UserAsAuthor는 늘 이 AuthorCard 내에서만 사용된다면,
      1. AuthorCard를 하나의 컴포넌트로 만들고 내부에 두 개의 프롭을 받아줄 수 있다. 
      2. 그러나 UserAsAuthor는 User 엔티티를 표현하고, 작성된 시간은 바깥의 맥락에 (경우에 따라 게시글에 혹은 댓글에) 종속되므로 서로 같은 "컴포넌트"로 묶을 수는 없다. 컴포넌트는 어떤 모델을 표현하는 거니까. 
      3. 그래도 반복되는 부분이 있으니 디자인 프리미티브로 묶을 수는 있을 것 같은데... 
      결론 : 그러나 이건 디자인 프리미티브 엘리먼트보다는 서로 다른 엘리먼트들을 컴포짓하는 역할을 하는 것에 가깝고...
      그러니까 form이나 card는 사실은, form은 container고 card는 wrapper인 것!
      그렇다면 form도 card도 프롭스를 넘겨주는 컴포넌트로 선언하지 말고 ---- 왜냐면 그래야 유연해지니까. 
      그런 컴포짓들은 그냥 클래스로만 선언하도록 하자! ---- 내가 세운 원칙!
      그런데 디자인 프리미티브도 프롭스를 가지지 않고, 클래스로만 선언되도록 해야 할까?  */}
      <div className="AuthorCard">
        <UserAsAuthor user={tempArticleData.author} />
        <div className="AuthorCard-TimeStamp">
          작성: {tempArticleData.createdAt}
        </div>
      </div>
      <QuestionInDetail question={tempArticleData.question} />
      <CommentInDetailWrapper>
        {tempArticleData.comments.map((comment) => {
          return <CommentInDetail comment={comment} />;
        })}
      </CommentInDetailWrapper>
      <div className="CommentSubmitForm"></div>
      <div>{articleId} 페이지</div>
    </div>
  );
};

export default PageArticleDetail;

const CommentInDetailWrapper = styled.div``;

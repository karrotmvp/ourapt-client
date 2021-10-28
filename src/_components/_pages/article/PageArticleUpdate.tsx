import React from "react";

type PageArticleUpdateProps = {
  articleId: string;
};

const PageArticleUpdate: React.FC<PageArticleUpdateProps> = ({ articleId }) => {
  return (
    <div>
      아티클 업데이트 폼<div> {articleId} 아티클 수정 페이지 </div>
    </div>
  );
};

export default PageArticleUpdate;

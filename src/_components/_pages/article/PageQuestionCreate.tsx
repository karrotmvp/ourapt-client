import React from "react";

import { ScreenHelmet } from "@karrotframe/navigator";

const PageArticleCreate: React.FC = () => {
  return (
    <div className="Page">
      <ScreenHelmet />
      {/* articleForm으로 하지 않고 questionForm으로 하는 이유, 또 버튼을 분리하지 않고 form 안에 넣어버리는 이유 = 확장은 나중에 생각할 것, 지금은 question에 한정하여 생각할 것이므로!  */}
      <form className="questionForm">
        <input type="text" className="questionForm-input" />
        <button className="questionForm-btn tempBtn btn--active">
          게시글 올리기
        </button>
      </form>
    </div>
  );
};

export default PageArticleCreate;

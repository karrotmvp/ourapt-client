import React, { useReducer } from "react";
import { reducer } from "./PreopenPage.reducer";

const PreopenPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    _t: "not-ready",
  });

  switch (state._t) {
    case "not-ready":
      return null;
    case "not-agreed":
      return <div />;
    case "agree-succeed":
      return <div>{state.showSuccessModal && <div>alert</div>}</div>;
  }
};

export default PreopenPage;

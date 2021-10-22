type State =
  | {
      _t: "not-ready";
    }
  | {
      _t: "not-agreed";
      regionName: string;
    }
  | {
      _t: "agree-succeed";
      commentText: string;
      showSuccessModal: boolean;
    };

type Action =
  | {
      _t: "INIT_NOT_AGREED";
      regionName: string;
    }
  | {
      _t: "INIT_AGREED";
    }
  | {
      _t: "AGREE";
    }
  | {
      _t: "UPDATE_COMMENT_TEXT";
      commentText: string;
    }
  | {
      _t: "SUBMIT_COMMENT";
      commentText: string;
    };

export const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "INIT_NOT_AGREED": {
      return {
        ...prevState,
        _t: "not-agreed",
        regionName: action.regionName,
      };
    }
    case "INIT_AGREED": {
      return {
        ...prevState,
        _t: "agree-succeed",
        commentText: "",
        showSuccessModal: false,
      };
    }
    case "AGREE": {
      return {
        ...prevState,
        _t: "agree-succeed",
        commentText: "",
        showSuccessModal: false,
      };
    }
    case "UPDATE_COMMENT_TEXT":
      return {
        ...prevState,
        commentText: action.commentText,
      };
    case "SUBMIT_COMMENT": {
      return {
        ...prevState,
        _t: "agree-succeed",
        commentText: action.commentText,
        showSuccessModal: true,
      };
    }
  }
};

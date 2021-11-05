import React, { createContext, useContext, useMemo } from "react";

import { Configuration } from "../__generated__/ourapt";
import { Class2Api as ApartmentControllerApi } from "../__generated__/ourapt";
import { Class3Api as OAuthControllerApi } from "../__generated__/ourapt";
import { Class4Api as QuestionControllerApi } from "../__generated__/ourapt";
import { Class5Api as CommentControllerApi } from "../__generated__/ourapt";
import { Class6Api as UserControllerApi } from "../__generated__/ourapt";

import { useAccessToken } from "../_providers/useAccessToken";

// API를 만들어주는데,
function makeApi({ accessToken }: { accessToken?: string | null }) {
  if (accessToken) {
    const configuration = new Configuration({
      // accessToken,
      apiKey: accessToken,
    });
    const apartmentController = new ApartmentControllerApi(configuration);
    const userController = new UserControllerApi(configuration);
    const questionController = new QuestionControllerApi(configuration);
    const commentController = new CommentControllerApi(configuration);
    const oauthController = new OAuthControllerApi(configuration);

    return {
      apartmentController,
      oauthController,
      questionController,
      commentController,
      userController,
    };
  } else {
    const apartmentController = new ApartmentControllerApi();
    const userController = new UserControllerApi();
    const questionController = new QuestionControllerApi();
    const commentController = new CommentControllerApi();
    const oauthController = new OAuthControllerApi();

    return {
      apartmentController,
      oauthController,
      questionController,
      commentController,
      userController,
    };
  }
}

const ApiContext = createContext(makeApi({}));

export const ApiProvider: React.FC = (props) => {
  const { accessToken } = useAccessToken();
  const api = useMemo(() => makeApi({ accessToken }), [accessToken]);

  return (
    <ApiContext.Provider value={api}>{props.children}</ApiContext.Provider>
  );
};

export function useApi() {
  return useContext(ApiContext);
}

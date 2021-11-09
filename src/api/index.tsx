import React, { createContext, useContext, useMemo } from "react";

import { Configuration } from "../__generated__/ourapt";
import { Class2Api as ApartmentControllerApi } from "../__generated__/ourapt";
import { Class3Api as OAuthControllerApi } from "../__generated__/ourapt";
import { Class4Api as QuestionControllerApi } from "../__generated__/ourapt";
import { Class5Api as CommentControllerApi } from "../__generated__/ourapt";
import { Class6Api as UserControllerApi } from "../__generated__/ourapt";
import { Class7Api as LogControlloerApi } from "../__generated__/ourapt";
import { Class99Api as NoApartmentController } from "../__generated__/ourapt";

import { LogFirstRequestUsingGETRefererEnum as RefEnum } from "../__generated__/ourapt";

import { useAccessToken } from "../_providers/useAccessToken";
import { useViewer } from "../_providers/useViewer";

// API를 만들어주는데,
function makeApi({
  accessToken,
  regionId,
  instanceId,
}: {
  accessToken?: string | null;
  regionId: string;
  instanceId: RefEnum;
}) {
  if (accessToken) {
    const configuration = new Configuration({
      // accessToken,
      apiKey: accessToken,
      headers: {
        "Region-Id": regionId,
        "Instance-Id": instanceId,
      },
    });
    const apartmentController = new ApartmentControllerApi(configuration);
    const userController = new UserControllerApi(configuration);
    const questionController = new QuestionControllerApi(configuration);
    const commentController = new CommentControllerApi(configuration);
    const oauthController = new OAuthControllerApi(configuration);
    const logController = new LogControlloerApi(configuration);
    const noApartmentController = new NoApartmentController(configuration);

    return {
      apartmentController,
      oauthController,
      questionController,
      commentController,
      userController,
      logController,
      noApartmentController,
    };
  } else {
    const configuration = new Configuration({
      // accessToken,
      headers: {
        "Region-Id": regionId,
        "Instance-Id": instanceId,
      },
    });
    const apartmentController = new ApartmentControllerApi(configuration);
    const userController = new UserControllerApi(configuration);
    const questionController = new QuestionControllerApi(configuration);
    const commentController = new CommentControllerApi(configuration);
    const oauthController = new OAuthControllerApi(configuration);
    const logController = new LogControlloerApi(configuration);
    const noApartmentController = new NoApartmentController(configuration);

    return {
      apartmentController,
      oauthController,
      questionController,
      commentController,
      userController,
      logController,
      noApartmentController,
    };
  }
}

const ApiContext = createContext(
  makeApi({ regionId: "00000000", instanceId: "UnKnown" as RefEnum })
);

export const ApiProvider: React.FC = (props) => {
  const { regionId, instanceId } = useViewer();
  const { accessToken } = useAccessToken();
  const api = useMemo(
    () => makeApi({ accessToken, regionId, instanceId }),
    [accessToken, regionId, instanceId]
  );

  return (
    <ApiContext.Provider value={api}>{props.children}</ApiContext.Provider>
  );
};

export function useApi() {
  return useContext(ApiContext);
}

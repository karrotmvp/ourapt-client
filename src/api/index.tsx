import React, { createContext, useContext, useMemo } from "react";

import { Configuration } from "../__generated__/ourapt";
import { Class2Api as ApartmentControllerApi } from "../__generated__/ourapt";
import { Class3Api as OAuthControllerApi } from "../__generated__/ourapt";
import { Class6Api as UserControllerApi } from "../__generated__/ourapt";

import { useMyInfoState } from "../_providers/useMyInfo";
import { useAccessToken } from "../_providers/useAccessToken";
import { access } from "fs";

// API를 만들어주는데,
function makeApi({ accessToken }: { accessToken?: string | null }) {
  if (accessToken) {
    const configuration = new Configuration({
      accessToken,
    });

    const apartmentController = new ApartmentControllerApi(configuration);
    const userController = new UserControllerApi(configuration);
    const oauthController = new OAuthControllerApi(configuration);

    return {
      apartmentController,
      userController,
      oauthController,
    };
  } else {
    const apartmentController = new ApartmentControllerApi();
    const userController = new UserControllerApi();
    const oauthController = new OAuthControllerApi();

    return {
      apartmentController,
      userController,
      oauthController,
    };
  }
}

const ApiContext = createContext(makeApi({}));

export const ApiProvider: React.FC = (props) => {
  // const { accessToken } = useMyInfoState();
  const { accessToken } = useAccessToken();
  const api = useMemo(() => makeApi({ accessToken }), [accessToken]);

  return (
    <ApiContext.Provider value={api}>{props.children}</ApiContext.Provider>
  );
};

export function useApi() {
  return useContext(ApiContext);
}

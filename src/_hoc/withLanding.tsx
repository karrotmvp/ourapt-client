import React, { useState } from "react";

import { useAccessToken } from "../_providers/useAccessToken";
import { useApi } from "../api";
import { useViewer } from "../_providers/useViewer";

import { mini } from "../_Karrotmarket/KarrotmarketMini";
import { useNavigator } from "@karrotframe/navigator";

import PageLanding from "../_components/_pages/PageLanding";
import PageFeed from "../_components/_pages/PageFeed";

import {
  getPreloadFromURLParams,
  getRefFromURLParams,
} from "../_modules/getQueryFromURLParams";
import { useCallback, useEffect, useReducer } from "react";
import { useAnalytics } from "../_analytics/firebase";

type State =
  | {
      _t: "before-preset"; // 동의하지 않았고, 프리셋에 진입하기 전이거나 진입하기까지의 상태
    }
  | {
      _t: "leave-preset"; // 동의하지 않았고, 프리셋 진입 이후 동의 없이 프리셋을 닫은 상태
    }
  | {
      _t: "agreed"; // 이미 동의한 상태
    };

type Action = {
  _t: "CLOSE_PRESET";
};

const reducer: React.Reducer<State, Action> = (prevState, action) => {
  switch (action._t) {
    case "CLOSE_PRESET":
      return { _t: "leave-preset" };
  }
};

export default function WithLanding() {
  const ref = getRefFromURLParams();
  const api = useApi();
  const { push } = useNavigator();

  const isPreload = getPreloadFromURLParams();
  const { issueAccessTokenFromAuthorizationCode } = useAccessToken();
  const { viewer, refreshViewer } = useViewer();
  const Event = useAnalytics();

  const [state, dispatch] = useReducer(
    reducer,
    viewer ? { _t: "agreed" } : { _t: "before-preset" }
  );

  const patchFirstlog = useCallback(() => {
    (async () => {
      const response = await api.logController.logFirstRequestUsingGET({
        referer: ref,
      });
      if (response.status !== "SUCCESS") {
        push(`/error`);
      }
    })();
  }, [api.logController, push, ref]);

  const submitAgreement = useCallback(() => {
    Event("viewKarrotOAUTHAgreement", { action: "view" });
    mini.startPreset({
      preset: `${process.env.REACT_APP_PRESET_URL}`,
      params: {
        appId: `${process.env.REACT_APP_ID}`,
      },
      onSuccess: function (result) {
        Event("clickKarrotOAUTHAgreement", { action: "click" });
        if (result && result.code) {
          issueAccessTokenFromAuthorizationCode(result.code);
          refreshViewer();
          setIsMiniClosing(false);
        }
      },
      onClose: () => {
        dispatch({ _t: "CLOSE_PRESET" });
      },
    });
  }, [issueAccessTokenFromAuthorizationCode, refreshViewer]);

  const [isMiniClosing, setIsMiniClosing] = useState(true);

  useEffect(() => {
    if (!isPreload && state._t === "before-preset") {
      submitAgreement();
    }
  }, [state, submitAgreement, isPreload]);

  useEffect(() => {
    if (isMiniClosing && state._t === "leave-preset") {
      mini.close();
    }
  }, [state._t, isMiniClosing]);

  useEffect(() => {
    if (!isPreload) Event("initializeApp", { action: "load" });
  }, []);

  if (!isPreload && viewer && viewer.checkedIn) {
    const checkedInApartmentId = viewer.checkedIn.id;
    patchFirstlog();
    return <PageFeed apartmentId={checkedInApartmentId} />;
  }
  if (!isPreload && viewer && !viewer.checkedIn) {
    patchFirstlog();
    return <PageLanding />;
  }

  return (
    <div>
      <PageLanding />
    </div>
  );
}

// export default OnLanding;

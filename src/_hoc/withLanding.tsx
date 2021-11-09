import { useAccessToken } from "../_providers/useAccessToken";
import { useApi } from "../api";
import { useViewer } from "../_providers/useViewer";

import { useNavigator } from "@karrotframe/navigator";

import PageLanding from "../_components/_pages/PageLanding";
import PageFeed from "../_components/_pages/PageFeed";
import PageError from "../_components/_pages/PageError";

import { getRefFromURLParams } from "../_modules/getQueryFromURLParams";
import { useEffect } from "react";

export default function WithLanding() {
  // const OnLanding: React.FC = () => {

  const ref = getRefFromURLParams();
  const api = useApi();
  const { push } = useNavigator();

  useEffect(() => {
    (async () => {
      const response = await api.logController.logFirstRequestUsingGET({
        referer: ref,
      });
      if (response.status !== "SUCCESS") {
        push(`/error`);
      }
    })();
  }, [api.logController, push, ref]);

  const { accessToken } = useAccessToken();
  const { viewer } = useViewer();

  // 동의하지 않은 경우, 코드가 없기 때문에 액세스토큰도 없다.
  if (viewer && viewer.checkedIn) {
    const checkedInApartmentId = viewer.checkedIn.id;
    return <PageFeed apartmentId={checkedInApartmentId} />;
  }
  if (viewer && !viewer.checkedIn) {
    return <PageLanding />;
  }
  if (!accessToken) {
    return <PageLanding />;
  }
  // TODO: error Throwing Page 만들기
  return <PageError />;
}

// export default OnLanding;

import React, { useState, useEffect } from "react";

import { ApartmentDto as Apartment } from "../__generated__/ourapt";

import { useApi } from "../api";

import PageLanding from "../_components/_pages/PageLanding";
import PageFeed from "../_components/_pages/PageFeed";

import { getRegionFromURLParams } from "../_modules/getQueryFromURLParams";
import { useViewer } from "../_providers/useViewer";
import { useAccessToken } from "../_providers/useAccessToken";

export default function OnLanding() {
  // const OnLanding: React.FC = () => {

  const api = useApi();

  const { accessToken } = useAccessToken();
  const { viewer } = useViewer();

  const [apartments, setApartments] = useState<Array<Apartment>>([]);

  useEffect(() => {
    (async () => {
      const regionId = getRegionFromURLParams();

      const resp = await api.apartmentController.getAvailableApartmentsUsingGET(
        {}
      );

      setApartments(resp.data?.apartments ?? []);
    })();
  }, []);

  // 동의하지 않은 경우, 코드가 없기 때문에 액세스토큰도 없다.
  if (viewer && viewer.checkedIn) {
    const checkedInApartmentId = viewer.checkedIn.id;
    return <PageFeed apartmentId={checkedInApartmentId} />;
  }
  if (viewer && !viewer.checkedIn) {
    return <PageLanding apartments={apartments} />;
  }
  if (!accessToken) {
    return <PageLanding apartments={apartments} />;
  }
  // TODO: error Throwing Page 만들기
  return <div>보이면 안 될 에러페이지 에러 쓰로잉 어떻게 할까요?</div>;
}

// export default OnLanding;

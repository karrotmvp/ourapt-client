import React, { useCallback, useEffect, useState } from "react";

import { ApartmentDto as Apartment } from "../../__generated__/ourapt";
import { useAccessToken } from "../../_providers/useAccessToken";
import { useApi } from "../../api";
import { useViewer } from "../../_providers/useViewer";

import styled from "@emotion/styled";

import { mini } from "../../_Karrotmarket/KarrotmarketMini";
import { ScreenHelmet, useNavigator } from "@karrotframe/navigator";

import ApartmentInLanding from "../Apartment/ApartmentInLanding";
import examineResBody from "../../_modules/examineResBody";
import { useAnalytics } from "../../_analytics/firebase";

const PageLanding: React.FC = () => {
  const api = useApi();
  const { accessToken, issueAccessTokenFromAuthorizationCode } =
    useAccessToken();
  const { viewer, refreshViewer } = useViewer();
  const Event = useAnalytics();

  const { push } = useNavigator();
  const goPageApartmentRequestForm = () => {
    if (viewer?.checkedIn) {
      Event("clickPageAPTRequest", { context: `from ${viewer.checkedIn.id}` });
    } else {
      Event("clickPageAPTRequest", { context: `at first time` });
    }
    push(`/apartment/request`);
  };

  const [apartments, setApartments] = useState<Array<Apartment>>([]);

  async function checkedInAndGoFeed(apartmentId: string) {
    const response = await api.userController.changeMyCheckedInUsingPATCH({
      newCheckedInInfo: {
        newApartmentId: apartmentId,
      },
    });
    if (response.status === "SUCCESS") {
      refreshViewer();
      push(`/feed/${apartmentId}`);
    }
  }

  const submitAgreement = (apartmentId: string) => {
    mini.startPreset({
      preset: `${process.env.REACT_APP_PRESET_URL}`,
      params: {
        appId: `${process.env.REACT_APP_ID}`,
      },
      onSuccess: async function (result) {
        if (result && result.code) {
          await issueAccessTokenFromAuthorizationCode(result.code);
          refreshViewer();
          await checkedInAndGoFeed(apartmentId);
        }
      },
    });
  };

  function onApartmentInLandingClick(apartmentId: string) {
    if (viewer && viewer.checkedIn) {
      Event("clickSelectApartmentAtLanding", {
        context: `from ${viewer.checkedIn.name}`,
      });
    } else if (viewer && !viewer.checkedIn) {
      Event("clickSelectApartmentAtLanding", { context: `first choice` });
    }

    if (accessToken) {
      return checkedInAndGoFeed(apartmentId);
    } else {
      return submitAgreement(apartmentId);
    }
  }

  function groupingApartments(apartments: Array<Apartment>) {
    let aptH = new Map<string, Array<Apartment>>();

    for (let apt of apartments) {
      aptH.set(apt.brandName, aptH.get(apt.brandName)?.concat([apt]) || [apt]);
    }
    let result: Array<{ brand: string; apartments: Array<Apartment> }> = [];
    aptH.forEach((value, key, mapObject) =>
      result.push({ brand: key, apartments: value })
    );
    return result;
  }

  const groupedApt = groupingApartments(apartments || []);

  const isCheckedIn = useCallback(
    (apartmentId: string) => {
      if (apartmentId === viewer?.checkedIn?.id) {
        return true;
      }
      return false;
    },
    [viewer?.checkedIn?.id]
  );

  useEffect(() => {
    (async () => {
      const resBody =
        await api.apartmentController.getAvailableApartmentsUsingGET();
      const safeBody = examineResBody({
        resBody,
        validator: (data) => data.apartments != null,
        onFailure: () => {
          push(`/error?cause=getAvailableApartmentsAtPageLanding`);
        },
      });
      // 여기 왜 리턴으로 받나요?
      setApartments(() => safeBody.data.apartments);
    })();
  }, [api.apartmentController, push]);

  useEffect(() => {
    if (viewer && viewer.checkedIn) {
      Event("viewPageLanding", { context: `from ${viewer.checkedIn.id}` });
    } else if (viewer && !viewer.checkedIn) {
      Event("viewPageLanding", { context: `first choice` });
    } else if (!viewer) {
      Event("viewPageLanding", { context: `not our user` });
    }
  }, []);

  return (
    <div className="Page">
      <ScreenHelmet title="송도 2동" />
      <div className="Page pd--24">
        {!apartments || apartments.length === 0 ? (
          <div></div> // loading
        ) : (
          <div className="width--100">
            <PageLandingTitle>
              현재 살고 계신 <br /> 아파트에 방문해 보세요!
            </PageLandingTitle>
            {groupedApt.map((brandGroup, idx) => {
              return (
                <BrandGroupContainer key={idx}>
                  <BrandWrapper>
                    <BrandTitle>{brandGroup.brand}</BrandTitle>
                    <BrandHorizon />
                  </BrandWrapper>
                  {brandGroup.apartments.map((apartment, idx) => {
                    return (
                      <ApartmentInLanding
                        key={apartment.id}
                        apartment={apartment}
                        isCheckedIn={isCheckedIn(apartment.id)}
                        onApartmentInLandingClick={() => {
                          onApartmentInLandingClick(apartment.id);
                        }}
                      />
                    );
                  })}
                </BrandGroupContainer>
              );
            })}
            <PageLandingAdditionalInfo
              className="font-color--key font-weight--700"
              onClick={() => goPageApartmentRequestForm()}
            >
              목록에 살고 계신 아파트가 없나요?
            </PageLandingAdditionalInfo>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLanding;

const PageLandingTitle = styled.div`
  margin-bottom: 24px;

  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
`;

const PageLandingAdditionalInfo = styled.div`
  width: 100%;
  height: 44px;

  margin-top: 40px;

  font-size: 13px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;

  background-color: #fdeeee;
`;

const BrandGroupContainer = styled.div``;

const BrandWrapper = styled.div`
  margin-bottom: 8px;

  display: flex;
  flex-direction: row;
`;

const BrandTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #999999;
`;

const BrandHorizon = styled.hr`
  height: 1px;
  width: 268px;

  margin-right: 0;

  background-color: #f5f5f5;
`;

import React, { useEffect, useState } from "react";

import { ApartmentDto as Apartment } from "../../__generated__/ourapt";
import { useAccessToken } from "../../_providers/useAccessToken";
import { useApi } from "../../api";
import { useViewer } from "../../_providers/useViewer";

import styled from "@emotion/styled";

import { mini } from "../../_Karrotmarket/KarrotmarketMini";
import { ScreenHelmet, useNavigator } from "@karrotframe/navigator";

import ApartmentInLanding from "../Apartment/ApartmentInLanding";

const PageLanding: React.FC = () => {
  const api = useApi();
  const { accessToken, issueAccessTokenFromAuthorizationCode } =
    useAccessToken();
  const { viewer } = useViewer();

  const { push } = useNavigator();
  const goPageApartmentRequestForm = () => {
    push(`/apartment/request`);
  };

  const [apartments, setApartments] = useState<Array<Apartment>>([]);

  useEffect(() => {
    (async () => {
      const resp =
        await api.apartmentController.getAvailableApartmentsUsingGET();

      setApartments(resp.data?.apartments ?? []);
    })();
  }, []);

  async function checkedInAndGoFeed(apartmentId: string) {
    const response = await api.userController.changeMyCheckedInUsingPATCH({
      newCheckedInInfo: {
        newApartmentId: apartmentId,
      },
    });
    if (response.status === "SUCCESS") push(`/feed/${apartmentId}`);
  }

  const submitAgreement = (apartmentId: string) => {
    mini.startPreset({
      preset: `${process.env.REACT_APP_PRESET_URL}`,
      params: {
        appId: `${process.env.REACT_APP_ID}`,
      },
      onSuccess: function (result) {
        if (result && result.code) {
          issueAccessTokenFromAuthorizationCode(result.code);
        }
        checkedInAndGoFeed(apartmentId);
      },
    });
  };

  function onApartmentInLandingClick(apartmentId: string) {
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
  const isCheckedIn = (apartmentId: string) => {
    console.log("무한히 렌더링되나요?");
    if (apartmentId === viewer?.checkedIn?.id) {
      return true;
    }
    return false;
  };

  return (
    <div className="Page">
      <ScreenHelmet />
      <div className="Page pd--24">
        {!apartments || apartments.length === 0 ? (
          // TODO : Error Throwing 페이지 혹은 이미지 만들어서 넣어놓기
          <div>
            아파트먼트 리스트가 0인데 있을 수 없는 일입니다... 에러 쓰로잉
            페이지로 넘겨줄 것
          </div>
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

            {apartments.map((apartment, idx) => {})}
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

  background-color: black;
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

import React, { useEffect, useState } from "react";

import { useApi } from "../../api";
import { ApartmentDto as Apartment } from "../../__generated__/ourapt";

import styled from "@emotion/styled";

import { useNavigator } from "@karrotframe/navigator";

import { ReactComponent as TheSharp } from "../../_assets/1_1_a.svg";
import { ReactComponent as Xi } from "../../_assets/1_1_b.svg";
import { ReactComponent as Prugio } from "../../_assets/1_1_c.svg";
import examineResBody from "../../_modules/examineResBody";

type ApartmentInNavigatorProps = {
  apartmentId: string;
  onClickAction?: () => void;
};

const ApartmentInNavigator: React.FC<ApartmentInNavigatorProps> = ({
  apartmentId,
  onClickAction,
}) => {
  const api = useApi();
  const { push } = useNavigator();

  const [apartment, setApartment] = useState<Apartment | undefined>();

  useEffect(() => {
    (async () => {
      const resBody = await api.apartmentController.getApartmentByIdUsingGET({
        apartmentId,
      });
      const apartment = examineResBody({
        resBody,
        validator: (data) => data.apartment != null,
        onFailure: () => {
          push(`/error?cause=getApartmentByIdAtNavigator`);
        },
      }).data.apartment;
      setApartment(() => apartment);
    })();
  }, [apartmentId, api.apartmentController, push]);

  function Logo(brandName: string) {
    switch (brandName) {
      case "더샵":
        return (
          <TheSharp
            style={{
              width: "24px",
              height: "24px",
              border: "1px solid #EBEBEB",
              borderRadius: "50%",
            }}
          />
        );
      case "자이":
        return (
          <Xi
            style={{
              width: "24px",
              height: "24px",
              border: "1px solid #EBEBEB",
              borderRadius: "50%",
            }}
          />
        );
      case "푸르지오":
        return (
          <Prugio
            style={{
              width: "24px",
              height: "24px",
              border: "1px solid #EBEBEB",
              borderRadius: "50%",
            }}
          />
        );
      default:
        return (
          <Prugio
            style={{
              width: "24px",
              height: "24px",
              border: "1px solid #EBEBEB",
              borderRadius: "50%",
            }}
          />
        );
    }
  }

  if (!apartment) {
    return <div></div>;
  } else
    return (
      <ApartmentWrapper className="vertical--center" onClick={onClickAction}>
        <ApartmentName className="mg-right--4">{apartment.name}</ApartmentName>
        {Logo(apartment.brandName)}
      </ApartmentWrapper>
    );
};

export default ApartmentInNavigator;

const ApartmentWrapper = styled.div``;

const ApartmentName = styled.div``;

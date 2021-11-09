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
};

const ApartmentInNavigator: React.FC<ApartmentInNavigatorProps> = ({
  apartmentId,
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
      setApartment(apartment);
    })();
  }, [apartment, apartmentId, api.apartmentController, push]);

  function Logo(brandName: string) {
    switch (brandName) {
      case "더샵":
        return <TheSharp style={{ width: "24px", height: "24px" }} />;
      case "자이":
        return <Xi style={{ width: "24px", height: "24px" }} />;
      case "푸르지오":
        return <Prugio style={{ width: "24px", height: "24px" }} />;
    }
  }

  if (!apartment) {
    return <div></div>;
  } else
    return (
      <ApartmentWrapper
        onClick={() => {
          alert("여기 클릭!");
          push(`/landing`);
        }}
      >
        <ApartmentName>{apartment.name}</ApartmentName>
        {Logo(apartment.brandName)}
      </ApartmentWrapper>
    );
};

export default ApartmentInNavigator;

const ApartmentWrapper = styled.div``;

const ApartmentName = styled.div``;

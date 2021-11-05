import React from "react";
// import { Apartment } from "../../_types/ouraptTypes";
import { ApartmentDto as Apartment } from "../../__generated__/ourapt";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { useNavigator } from "@karrotframe/navigator";

type ApartmentInPageLandingProps = {
  apartment: Apartment;
  onApartmentInLandingClick: (apartmentId: string) => void;
};

const ApartmentInPageLanding: React.FC<ApartmentInPageLandingProps> = ({
  apartment,
  onApartmentInLandingClick,
}) => {
  return (
    <ApartmentCard
      style={{
        backgroundImage: `url("${apartment.bannerImage}")`,
      }}
      onClick={() => onApartmentInLandingClick(apartment.id)}
    >
      {apartment.name}
    </ApartmentCard>
  );
};

export default ApartmentInPageLanding;

const ApartmentCard = styled.div`
  width: 100%;
  height: 120px;

  margin-bottom: 16px;
  padding: 16px;

  color: white;

  display: flex;
  align-items: flex-end;

  border-radius: 8px;
  background-color: lightseagreen;
`;

import React from "react";
// import { Apartment } from "../../_types/ouraptTypes";
import { ApartmentDto as Apartment } from "../../__generated__/ourapt";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { useNavigator } from "@karrotframe/navigator";

type ApartmentInPageLandingProps = {
  apartment: Apartment;
};

const ApartmentInPageLanding: React.FC<ApartmentInPageLandingProps> = ({
  apartment,
}) => {
  const { push, pop, replace } = useNavigator();

  const goFeed = (apartmentId: string) => {
    push(`/feed/${apartmentId}`);
  };

  console.log(apartment.bannerImage);
  return (
    <ApartmentCard
      style={{
        backgroundImage: `url("${apartment.bannerImage}")`,
      }}
      onClick={() => goFeed(apartment.id)}
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

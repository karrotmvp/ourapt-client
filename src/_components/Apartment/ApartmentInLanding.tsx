import React from "react";

import { ApartmentDto as Apartment } from "../../__generated__/ourapt";

import styled from "@emotion/styled";

import { ReactComponent as TheSharp } from "../../_assets/1_1_a.svg";
import { ReactComponent as Xi } from "../../_assets/1_1_b.svg";
import { ReactComponent as Prugio } from "../../_assets/1_1_c.svg";
import { ReactComponent as CheckIcon } from "../../_assets/CheckIcon.svg";

type ApartmentInPageLandingProps = {
  apartment: Apartment;
  isCheckedIn: Boolean;
  onApartmentInLandingClick: (apartmentId: string) => void;
};

const ApartmentInPageLanding: React.FC<ApartmentInPageLandingProps> = ({
  apartment,
  isCheckedIn,
  onApartmentInLandingClick,
}) => {
  const borderColor = isCheckedIn ? "#e95454" : "#dbdbdb";
  function Logo(brandName: string) {
    switch (brandName) {
      case "더샵":
        return <TheSharp />;
      case "자이":
        return <Xi />;
      case "푸르지오":
        return <Prugio />;
    }
  }
  return (
    <ApartmentCard
      className="vertical--center"
      onClick={() => onApartmentInLandingClick(apartment.id)}
      style={{ borderColor: borderColor }}
    >
      <div className="vertical--center mg-right--8">
        {Logo(apartment.brandName)}
      </div>
      <ApartmentName>{apartment.name}</ApartmentName>
      {isCheckedIn && <CheckIcon width="16" height="14" stroke="#E95454" />}
    </ApartmentCard>
  );
};

export default ApartmentInPageLanding;

const ApartmentCard = styled.div`
  width: 100%;
  height: 54px;

  margin-bottom: 16px;
  padding-left: 8px;
  padding-right: 24px;

  color: #000000;
  font-size: 18px;
  font-weight: 500;

  border: 1px solid;
  border-radius: 8px;
`;

const ApartmentName = styled.div`
  margin-right: auto;
`;

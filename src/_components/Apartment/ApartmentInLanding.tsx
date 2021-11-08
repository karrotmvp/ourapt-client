import React from "react";
// import { Apartment } from "../../_types/ouraptTypes";
import { ApartmentDto as Apartment } from "../../__generated__/ourapt";

import { ReactComponent as 더샵 } from "../../_assets/1_1_a.svg";
import { ReactComponent as 자이 } from "../../_assets/1_1_b.svg";
import { ReactComponent as 푸르지오 } from "../../_assets/1_1_c.svg";

import { ReactComponent as ApartmentInLandingCheckIcon } from "../../_assets/ApartmentInLandingCheckIcon.svg";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { useNavigator } from "@karrotframe/navigator";

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
    console.log(brandName);
    switch (brandName) {
      case "더샵":
        return <더샵 />;
      case "자이":
        return <자이 />;
      case "푸르지오":
        return <푸르지오 />;
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
      {isCheckedIn && <ApartmentInLandingCheckIcon />}
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
  background-color: lightseagreen;
`;

const ApartmentName = styled.div`
  margin-right: auto;
`;

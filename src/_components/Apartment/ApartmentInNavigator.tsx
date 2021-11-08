import React from "react";

import { ApartmentDto as Apartment } from "../../__generated__/ourapt";

import styled from "@emotion/styled";

import { useNavigator } from "@karrotframe/navigator";

import { ReactComponent as TheSharp } from "../../_assets/1_1_a.svg";
import { ReactComponent as Xi } from "../../_assets/1_1_b.svg";
import { ReactComponent as Prugio } from "../../_assets/1_1_c.svg";

type ApartmentInNavigatorProps = {
  apartment: Apartment;
};

const ApartmentInNavigator: React.FC<ApartmentInNavigatorProps> = ({
  apartment,
}) => {
  const { push } = useNavigator();

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
  return (
    <ApartmentWrapper
      onClick={() => {
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

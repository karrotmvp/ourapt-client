import { LogFirstRequestUsingGETRefererEnum as RefEnum } from "../__generated__/ourapt";

let urlSearchParams = new URLSearchParams(window.location.search);

export function getRegionFromURLParams() {
  const regionId = urlSearchParams.get("region_id");

  if (process.env.REACT_APP_TEST === "MSW_버전") {
    return "a87002cc41f1";
  }

  if (regionId) {
    return regionId;
  } else {
    return "NO_REGION_ID";
  }
}

export function getCodeFromURLParams() {
  const code = urlSearchParams.get("code");
  if (code) {
    return code;
  } else {
    return "NOT_AGREED";
  }
}

export function getRefFromURLParams() {
  const referer = urlSearchParams.get("ref");

  if (referer) {
    return referer as RefEnum;
  } else {
    return RefEnum.Unknown;
  }
}

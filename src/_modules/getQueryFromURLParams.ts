import { LogFirstRequestUsingGETRefererEnum as RefEnum } from "../__generated__/ourapt";
import getLogger from "./logger";

let urlSearchParams = new URLSearchParams(window.location.search);

export function getRegionFromURLParams() {
  const regionId = urlSearchParams.get("region_id");

  if (process.env.REACT_APP_TEST === "MSW_버전") {
    return "testfrombrowser";
  }

  if (regionId) {
    return regionId;
  } else {
    return "NO_REGION_ID";
  }
}

export function getCodeFromURLParams() {
  const code = urlSearchParams.get("code");
  getLogger().info("코드 가져올게요");
  if (code) {
    getLogger().info(code);
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

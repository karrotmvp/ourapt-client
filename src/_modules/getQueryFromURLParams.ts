import { LogFirstRequestUsingGETRefererEnum as RefEnum } from "../__generated__/ourapt";

let urlSearchParams = new URLSearchParams(window.location.search);

export function getRegionFromURLParams() {
  const regionId = urlSearchParams.get("region_id");

  if (process.env.REACT_APP_ENV === "MSW") {
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

export function getPreloadFromURLParams() {
  const isPreload = urlSearchParams.get("preload");
  alert(window.location);
  if (isPreload) {
    alert(
      `트루일 때 ${isPreload} 이며 이 때의 타입은 ${typeof isPreload} 그렇기에 ${Boolean(
        isPreload
      )}`
    );
    return true;
  } else {
    alert(
      `폴스일 때 ${isPreload} 이며 이 때의 타입은 ${typeof isPreload} 그렇기에 ${Boolean(
        isPreload
      )}`
    );
    return false;
  }
}

export function getInstalledFromURLParams() {
  const isInstalled = urlSearchParams.get("installed");
  if (isInstalled === "true") {
    return true;
  } else {
    return false;
  }
}

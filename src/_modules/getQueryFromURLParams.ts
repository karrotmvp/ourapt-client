let urlSearchParams = new URLSearchParams(window.location.search);

export function getRegionFromURLParams() {
  const regionId = urlSearchParams.get("region_id");
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

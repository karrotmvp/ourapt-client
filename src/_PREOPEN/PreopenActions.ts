import { access } from "fs";
import { URLSearchParams } from "url";
import { mini } from "../_Karrotmarket/KarrotmarketMini";

export function sendWebhookToSlack(slackMessage: string) {
  fetch(
    `https://hooks.slack.com/services/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`,
    {
      method: "POST",
      body: JSON.stringify({
        channel: "#_apartment_preopen",
        username: "webhookbot",
        text: new Date() + slackMessage,
        icon_emoji: ":rocket:",
      }),
    }
  );
}

export async function getAccessToken(code: string | null) {
  //   alert(code);
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/oauth/karrot`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorizationCode: code,
      }),
    }
  );
  if (response.ok) {
    const resBody = await response.json();
    if (!resBody || !resBody.data || resBody.status !== "SUCCESS") {
      //   alert(JSON.stringify(resBody, null, 2));
      //   alert(resBody.data);
      //   alert(resBody.status);
      console.log(resBody.status);
      //   alert("다시 한 번 시도해 주세요!");
      //   mini.close();
      throw new Error("앱을 종료하고 다시 실행해주세요!");
    }
    console.log(`액세스토큰 발급되었습니다?`);
    // alert(JSON.stringify(resBody, null, 2));
    return "Bearer " + resBody.data.accessToken;
  }
  alert("잠시 후 다시 시도해 주세요!");
  console.log(response.status);
}

export async function getRegionInfo(regionId: string | any) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/apartment?regionId=${regionId}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const resBody = await response.json();
    if (!resBody || !resBody.data || resBody.status !== "SUCCESS") {
      throw new Error("regionInfo 확인 실패");
    }
    return resBody.data.apartments.length > 0
      ? resBody.data.apartments[0].regionHashDepth3
      : "regionTest";
  }
}

export async function takeReservation(regionId: string, accessToken: string) {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/v1/preopen/reservation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        regionId,
      }),
    }
  );

  if (!response.ok) {
    alert("알림신청 실패");
  }
}

import { rest } from "msw";

export const handlers = [
  // 캐럿 OAUTH 에서 액세스토큰 강제로 반환하기
  rest.post(
    "https://api-alpha.daangn-ourapt.com/api/v1/oauth/karrot",
    async (req, res, ctx) => {
      return await res(
        ctx.json({
          data: {
            accessToken: "bWaEIsMLTyfch1qDkiTDmQs_yQc", // 2021-11-10-21:43
            expiredIn: 0,
            scope: "string",
            tokenType: "string",
          },
          devMessage: "string",
          displayMessage: "string",
          status: "SUCCESS",
        })
      );
    }
  ),
];

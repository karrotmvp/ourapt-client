import { rest } from "msw";

export const handlers = [
  // 캐럿 가져오기 : 해결!
  rest.post(
    "https://api-alpha.daangn-ourapt.com/api/v1/oauth/karrot",
    async (req, res, ctx) => {
      // alert("제가 돌아보겠습니다!");
      return await res(
        ctx.json({
          data: {
            accessToken: "9joua7ChMJanpw7P1gw_p6K3HHA",
            expiredIn: 0,
            scope: "string",
            tokenType: "string",
          },
          devMessage: "string",
          displayMessage: "string",
          // status: "DATA_NOT_FOUND_FROM_DB",
          status: "SUCCESS",
        })
      );
    }
  ),
  // rest.get(
  //   "http://api-alpha.daangn-ourapt.com/api/v1/user/me",
  //   async (req, res, ctx) => {
  //     return await res(
  //       ctx.json({
  //         status: "SUCCESS",
  //         devMessage: "",
  //         displayMessage: "",
  //         data: {
  //           user: {
  //             id: "be397b9028bc4ce684d8ddf65d3ade6e",
  //             profile: {
  //               id: "be397b9028bc4ce684d8ddf65d3ade6e",
  //               nickname: "유미네아파트",
  //               profileImageUrl:
  //                 "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 640 640'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath fill='%23DDE1E6' d='M0 0h640v640H0z'/%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M506 277c0 65-33 121-83 154 95 40 161 134 161 243v118a263 263 0 11-526 0V674c0-109 66-203 161-243a185 185 0 11287-154zm-233 43a6 6 0 10-12 4c20 54 97 56 120 0a7 7 0 00-12-4 51 51 0 01-96 0zm-18-57c0-4 4-8 8-8h1c4 0 8 4 8 8v12c0 4-4 8-8 8h-1c-4 0-8-4-8-8v-12zm123-8c-4 0-8 4-8 8v12c0 4 4 8 8 8h1c4 0 8-4 8-8v-12c0-4-4-8-8-8h-1z' clip-rule='evenodd'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Cpath fill='%23fff' d='M0 0h640v640H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E",
  //             },
  //             isPushAgreed: true,
  //             bannedAt: null,
  //             createdAt: 1636088218000,
  //             updatedAt: 1636088218000,
  //             checkedIn: null,
  //             admin: false,
  //           },
  //         },
  //       })
  //     );
  //   }
  // ),
  // rest.get(
  //   "http://api-alpha.daangn-ourapt.com/api/v1/apartment/:apartmentId/questions/pinned",
  //   async (req, res, ctx) => {
  //     return await res(
  //       ctx.json({
  //         data: {
  //           question: {
  //             byAdmin: true,
  //             createdAt: "2021-11-04T15:15:21.172Z",
  //             id: "string",
  //             mainText: "string",
  //             updatedAt: "2021-11-04T15:15:21.172Z",
  //             writer: {
  //               id: "string",
  //               nickname: "string",
  //               profileImageUrl: "string",
  //             },
  //           },
  //         },
  //         devMessage: "string",
  //         displayMessage: "string",
  //         status: "SUCCESS",
  //       })
  //     );
  //   }
  // ),

  // 퀘스천 데이터 빈 값일 경우 확인하기 위해 남겨놓는다
  // rest.get(
  //   "http://api-alpha.daangn-ourapt.com/api/v1/apartment/:apartmentId/questions?cursor=0&perPage=3",
  //   async (req, res, ctx) => {
  //     return await res(
  //       ctx.json({
  //         data: {
  //           questions: [],
  //         },
  //         devMessage: "string",
  //         displayMessage: "string",
  //         status: "SUCCESS",
  //       })
  //     );
  //   }
  // ),
];

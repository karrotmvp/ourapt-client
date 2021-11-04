import { rest } from "msw";
import { createTextChangeRange } from "typescript";

export const handlers = [
  // 아파트먼트 목록 가져오기 : 해결!
  // rest.get(
  //   "http://api-alpha.daangn-ourapt.com/api/v1/apartments",
  //   async (req, res, ctx) => {
  //     return res(
  //       ctx.json({
  //         data: {
  //           apartments: [
  //             {
  //               active: true,
  //               createdAt: "2021-11-01T11:19:42.933Z",
  //               id: "string",
  //               name: "더샵",
  //               regionDepth1: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               regionDepth2: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               regionDepth3: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               regionDepth4: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               updatedAt: "2021-11-01T11:19:42.933Z",
  //             },
  //             {
  //               active: true,
  //               createdAt: "2021-11-01T11:19:42.933Z",
  //               id: "string",
  //               name: "푸르지오",
  //               regionDepth1: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               regionDepth2: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               regionDepth3: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               regionDepth4: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               updatedAt: "2021-11-01T11:19:42.933Z",
  //             },
  //             {
  //               active: true,
  //               createdAt: "2021-11-01T11:19:42.933Z",
  //               id: "string",
  //               name: "하버뷰",
  //               regionDepth1: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               regionDepth2: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               regionDepth3: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               regionDepth4: {
  //                 id: "string",
  //                 name: "string",
  //               },
  //               updatedAt: "2021-11-01T11:19:42.933Z",
  //             },
  //           ],
  //         },
  //         devMessage: "string",
  //         displayMessage: "string",
  //         status: "DATA_NOT_FOUND_FROM_DB",
  //       })
  //     );
  //   }
  // ),

  // 캐럿 가져오기 : 해결!
  rest.post(
    "http://api-alpha.daangn-ourapt.com/api/v1/oauth/karrot",
    async (req, res, ctx) => {
      return await res(
        ctx.json({
          data: {
            accessToken: "string",
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
  rest.get(
    "http://api-alpha.daangn-ourapt.com/api/v1/user/me",
    async (req, res, ctx) => {
      return await res(
        ctx.json({
          data: {
            admin: true,
            bannedAt: "2021-11-03T06:07:40.826Z",
            checkedIn: {
              active: true,
              bannerImage: "string",
              brandName: "string",
              createdAt: "2021-11-03T06:07:40.826Z",
              id: "string",
              name: "string",
              regionDepth1: {
                id: "string",
                name: "string",
              },
              regionDepth2: {
                id: "string",
                name: "string",
              },
              regionDepth3: {
                id: "string",
                name: "string",
              },
              regionDepth4: {
                id: "string",
                name: "string",
              },
              updatedAt: "2021-11-03T06:07:40.826Z",
            },
            createdAt: "2021-11-03T06:07:40.826Z",
            id: "string",
            isPushAgreed: true,
            profile: {
              id: "string",
              nickname: "string",
              profileImageUrl: "string",
            },
            updatedAt: "2021-11-03T06:07:40.826Z",
          },
          devMessage: "string",
          displayMessage: "string",
          status: "SUCCESS",
        })
      );
    }
  ),
];

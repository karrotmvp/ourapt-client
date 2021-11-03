import { rest } from "msw";
import { createTextChangeRange } from "typescript";

export const handlers = [
  rest.get(
    "http://api-alpha.daangn-ourapt.com/api/v1/apartments",
    async (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            apartments: [
              {
                active: true,
                createdAt: "2021-11-01T11:19:42.933Z",
                id: "string",
                name: "더샵",
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
                updatedAt: "2021-11-01T11:19:42.933Z",
              },
              {
                active: true,
                createdAt: "2021-11-01T11:19:42.933Z",
                id: "string",
                name: "푸르지오",
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
                updatedAt: "2021-11-01T11:19:42.933Z",
              },
              {
                active: true,
                createdAt: "2021-11-01T11:19:42.933Z",
                id: "string",
                name: "하버뷰",
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
                updatedAt: "2021-11-01T11:19:42.933Z",
              },
            ],
          },
          devMessage: "string",
          displayMessage: "string",
          status: "DATA_NOT_FOUND_FROM_DB",
        })
      );
    }
  ),
  rest.post(
    "http://api-alpha.daangn-ourapt.com/api/v1/oauth/karrot",
    async (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            accessToken: "string",
            expiredIn: 0,
            scope: "string",
            tokenType: "string",
          },
          devMessage: "string",
          displayMessage: "string",
          status: "DATA_NOT_FOUND_FROM_DB",
        })
      );
    }
  ),
  rest.get(
    "http://api-alpha.daangn-ourapt.com/api/v1/user/me",
    async (req, res, ctx) => {
      return res(
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
          status: "DATA_NOT_FOUND_FROM_DB",
        })
      );
    }
  ),
];

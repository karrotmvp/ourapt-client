/* tslint:disable */
/* eslint-disable */
/**
 * 우리아파트 API 문서
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    CommonResponseBodyKarrotAccessTokenDto,
    CommonResponseBodyKarrotAccessTokenDtoFromJSON,
    CommonResponseBodyKarrotAccessTokenDtoToJSON,
    KarrotLoginDto,
    KarrotLoginDtoFromJSON,
    KarrotLoginDtoToJSON,
} from '../models';

export interface KarrotLoginUsingPOSTRequest {
    body: KarrotLoginDto;
}

/**
 * 
 */
export class Class3Api extends runtime.BaseAPI {

    /**
     * 당근마켓 OAuth 로그인
     */
    async karrotLoginUsingPOSTRaw(requestParameters: KarrotLoginUsingPOSTRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<CommonResponseBodyKarrotAccessTokenDto>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling karrotLoginUsingPOST.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/oauth/karrot`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: KarrotLoginDtoToJSON(requestParameters.body),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommonResponseBodyKarrotAccessTokenDtoFromJSON(jsonValue));
    }

    /**
     * 당근마켓 OAuth 로그인
     */
    async karrotLoginUsingPOST(requestParameters: KarrotLoginUsingPOSTRequest, initOverrides?: RequestInit): Promise<CommonResponseBodyKarrotAccessTokenDto> {
        const response = await this.karrotLoginUsingPOSTRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

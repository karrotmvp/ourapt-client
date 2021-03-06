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
    ChangeMyCheckedInDto,
    ChangeMyCheckedInDtoFromJSON,
    ChangeMyCheckedInDtoToJSON,
    CommonResponseBodyOneUserDto,
    CommonResponseBodyOneUserDtoFromJSON,
    CommonResponseBodyOneUserDtoToJSON,
    CommonResponseBodyVoid,
    CommonResponseBodyVoidFromJSON,
    CommonResponseBodyVoidToJSON,
} from '../models';

export interface ChangeMyCheckedInUsingPATCHRequest {
    newCheckedInInfo: ChangeMyCheckedInDto;
}

/**
 * 
 */
export class Class6Api extends runtime.BaseAPI {

    /**
     * 자신의 아파트 체크인 정보 업데이트
     */
    async changeMyCheckedInUsingPATCHRaw(requestParameters: ChangeMyCheckedInUsingPATCHRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<CommonResponseBodyVoid>> {
        if (requestParameters.newCheckedInInfo === null || requestParameters.newCheckedInInfo === undefined) {
            throw new runtime.RequiredError('newCheckedInInfo','Required parameter requestParameters.newCheckedInInfo was null or undefined when calling changeMyCheckedInUsingPATCH.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // KarrotAccessToken authentication
        }

        const response = await this.request({
            path: `/api/v1/user/me/checkedIn`,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: ChangeMyCheckedInDtoToJSON(requestParameters.newCheckedInInfo),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommonResponseBodyVoidFromJSON(jsonValue));
    }

    /**
     * 자신의 아파트 체크인 정보 업데이트
     */
    async changeMyCheckedInUsingPATCH(requestParameters: ChangeMyCheckedInUsingPATCHRequest, initOverrides?: RequestInit): Promise<CommonResponseBodyVoid> {
        const response = await this.changeMyCheckedInUsingPATCHRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 자신의 정보 조회
     */
    async getMyInfoUsingGETRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<CommonResponseBodyOneUserDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // KarrotAccessToken authentication
        }

        const response = await this.request({
            path: `/api/v1/user/me`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommonResponseBodyOneUserDtoFromJSON(jsonValue));
    }

    /**
     * 자신의 정보 조회
     */
    async getMyInfoUsingGET(initOverrides?: RequestInit): Promise<CommonResponseBodyOneUserDto> {
        const response = await this.getMyInfoUsingGETRaw(initOverrides);
        return await response.value();
    }

}

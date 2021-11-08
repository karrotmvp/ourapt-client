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
    CommonResponseBodyVoid,
    CommonResponseBodyVoidFromJSON,
    CommonResponseBodyVoidToJSON,
} from '../models';

export interface LogFirstRequestUsingGETRequest {
    referer: LogFirstRequestUsingGETRefererEnum;
}

/**
 * 
 */
export class Class7Api extends runtime.BaseAPI {

    /**
     * 앱 방문시 첫 요청
     */
    async logFirstRequestUsingGETRaw(requestParameters: LogFirstRequestUsingGETRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<CommonResponseBodyVoid>> {
        if (requestParameters.referer === null || requestParameters.referer === undefined) {
            throw new runtime.RequiredError('referer','Required parameter requestParameters.referer was null or undefined when calling logFirstRequestUsingGET.');
        }

        const queryParameters: any = {};

        if (requestParameters.referer !== undefined) {
            queryParameters['referer'] = requestParameters.referer;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/log/first-request`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommonResponseBodyVoidFromJSON(jsonValue));
    }

    /**
     * 앱 방문시 첫 요청
     */
    async logFirstRequestUsingGET(requestParameters: LogFirstRequestUsingGETRequest, initOverrides?: RequestInit): Promise<CommonResponseBodyVoid> {
        const response = await this.logFirstRequestUsingGETRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum LogFirstRequestUsingGETRefererEnum {
    Feed = 'FEED',
    Message = 'MESSAGE',
    NearBy = 'NEAR_BY',
    Qr = 'QR'
}

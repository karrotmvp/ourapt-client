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

/**
 * 
 */
export class Class1APIApi extends runtime.BaseAPI {

    /**
     * 서버 HealthCheck
     */
    async healthCheckUsingGETRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<CommonResponseBodyVoid>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/app/health-check`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommonResponseBodyVoidFromJSON(jsonValue));
    }

    /**
     * 서버 HealthCheck
     */
    async healthCheckUsingGET(initOverrides?: RequestInit): Promise<CommonResponseBodyVoid> {
        const response = await this.healthCheckUsingGETRaw(initOverrides);
        return await response.value();
    }

}

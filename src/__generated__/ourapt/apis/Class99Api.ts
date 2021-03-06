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
    NoApartmentAnswerDto,
    NoApartmentAnswerDtoFromJSON,
    NoApartmentAnswerDtoToJSON,
} from '../models';

export interface SubmitAnswerNoApartmentUsingPOSTRequest {
    answer: NoApartmentAnswerDto;
}

/**
 * 
 */
export class Class99Api extends runtime.BaseAPI {

    /**
     * 거주하는 아파트가 없나요? 답변
     */
    async submitAnswerNoApartmentUsingPOSTRaw(requestParameters: SubmitAnswerNoApartmentUsingPOSTRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<CommonResponseBodyVoid>> {
        if (requestParameters.answer === null || requestParameters.answer === undefined) {
            throw new runtime.RequiredError('answer','Required parameter requestParameters.answer was null or undefined when calling submitAnswerNoApartmentUsingPOST.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/no-apartment`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: NoApartmentAnswerDtoToJSON(requestParameters.answer),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommonResponseBodyVoidFromJSON(jsonValue));
    }

    /**
     * 거주하는 아파트가 없나요? 답변
     */
    async submitAnswerNoApartmentUsingPOST(requestParameters: SubmitAnswerNoApartmentUsingPOSTRequest, initOverrides?: RequestInit): Promise<CommonResponseBodyVoid> {
        const response = await this.submitAnswerNoApartmentUsingPOSTRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

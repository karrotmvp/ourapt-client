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
    CommonResponseBodyGetQuestionsDto,
    CommonResponseBodyGetQuestionsDtoFromJSON,
    CommonResponseBodyGetQuestionsDtoToJSON,
    CommonResponseBodyVoid,
    CommonResponseBodyVoidFromJSON,
    CommonResponseBodyVoidToJSON,
    WriteNewQuestionDto,
    WriteNewQuestionDtoFromJSON,
    WriteNewQuestionDtoToJSON,
} from '../models';

export interface GetQuestionsUsingGETRequest {
    apartmentId: string;
    cursor: number;
    perPage: number;
}

export interface WriteNewQuestionUsingPOSTRequest {
    questionContent: WriteNewQuestionDto;
}

/**
 * 
 */
export class Class4Api extends runtime.BaseAPI {

    /**
     * 질문목록 Date 커서기반 페이징으로 조회
     */
    async getQuestionsUsingGETRaw(requestParameters: GetQuestionsUsingGETRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<CommonResponseBodyGetQuestionsDto>> {
        if (requestParameters.apartmentId === null || requestParameters.apartmentId === undefined) {
            throw new runtime.RequiredError('apartmentId','Required parameter requestParameters.apartmentId was null or undefined when calling getQuestionsUsingGET.');
        }

        if (requestParameters.cursor === null || requestParameters.cursor === undefined) {
            throw new runtime.RequiredError('cursor','Required parameter requestParameters.cursor was null or undefined when calling getQuestionsUsingGET.');
        }

        if (requestParameters.perPage === null || requestParameters.perPage === undefined) {
            throw new runtime.RequiredError('perPage','Required parameter requestParameters.perPage was null or undefined when calling getQuestionsUsingGET.');
        }

        const queryParameters: any = {};

        if (requestParameters.cursor !== undefined) {
            queryParameters['cursor'] = requestParameters.cursor;
        }

        if (requestParameters.perPage !== undefined) {
            queryParameters['perPage'] = requestParameters.perPage;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/apartment/{apartmentId}/questions`.replace(`{${"apartmentId"}}`, encodeURIComponent(String(requestParameters.apartmentId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommonResponseBodyGetQuestionsDtoFromJSON(jsonValue));
    }

    /**
     * 질문목록 Date 커서기반 페이징으로 조회
     */
    async getQuestionsUsingGET(requestParameters: GetQuestionsUsingGETRequest, initOverrides?: RequestInit): Promise<CommonResponseBodyGetQuestionsDto> {
        const response = await this.getQuestionsUsingGETRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 새로운 질문 작성
     */
    async writeNewQuestionUsingPOSTRaw(requestParameters: WriteNewQuestionUsingPOSTRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<CommonResponseBodyVoid>> {
        if (requestParameters.questionContent === null || requestParameters.questionContent === undefined) {
            throw new runtime.RequiredError('questionContent','Required parameter requestParameters.questionContent was null or undefined when calling writeNewQuestionUsingPOST.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // KarrotAccessToken authentication
        }

        const response = await this.request({
            path: `/api/v1/question`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: WriteNewQuestionDtoToJSON(requestParameters.questionContent),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CommonResponseBodyVoidFromJSON(jsonValue));
    }

    /**
     * 새로운 질문 작성
     */
    async writeNewQuestionUsingPOST(requestParameters: WriteNewQuestionUsingPOSTRequest, initOverrides?: RequestInit): Promise<CommonResponseBodyVoid> {
        const response = await this.writeNewQuestionUsingPOSTRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

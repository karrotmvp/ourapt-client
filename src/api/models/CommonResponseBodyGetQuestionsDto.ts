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

import { exists, mapValues } from '../runtime';
import {
    GetQuestionsDto,
    GetQuestionsDtoFromJSON,
    GetQuestionsDtoFromJSONTyped,
    GetQuestionsDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface CommonResponseBodyGetQuestionsDto
 */
export interface CommonResponseBodyGetQuestionsDto {
    /**
     * 
     * @type {GetQuestionsDto}
     * @memberof CommonResponseBodyGetQuestionsDto
     */
    data?: GetQuestionsDto;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyGetQuestionsDto
     */
    devMessage: string;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyGetQuestionsDto
     */
    displayMessage: string;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyGetQuestionsDto
     */
    status: CommonResponseBodyGetQuestionsDtoStatusEnum;
}

/**
* @export
* @enum {string}
*/
export enum CommonResponseBodyGetQuestionsDtoStatusEnum {
    DataNotFoundFromDb = 'DATA_NOT_FOUND_FROM_DB',
    InvalidInput = 'INVALID_INPUT',
    KarrotInvalidAccessToken = 'KARROT_INVALID_ACCESS_TOKEN',
    KarrotUnauthorizedCode = 'KARROT_UNAUTHORIZED_CODE',
    NotCheckedInUser = 'NOT_CHECKED_IN_USER',
    NotServicedRegion = 'NOT_SERVICED_REGION',
    RegisteredUserNotFound = 'REGISTERED_USER_NOT_FOUND',
    ResourceDuplicate = 'RESOURCE_DUPLICATE',
    Success = 'SUCCESS'
}

export function CommonResponseBodyGetQuestionsDtoFromJSON(json: any): CommonResponseBodyGetQuestionsDto {
    return CommonResponseBodyGetQuestionsDtoFromJSONTyped(json, false);
}

export function CommonResponseBodyGetQuestionsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommonResponseBodyGetQuestionsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : GetQuestionsDtoFromJSON(json['data']),
        'devMessage': json['devMessage'],
        'displayMessage': json['displayMessage'],
        'status': json['status'],
    };
}

export function CommonResponseBodyGetQuestionsDtoToJSON(value?: CommonResponseBodyGetQuestionsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': GetQuestionsDtoToJSON(value.data),
        'devMessage': value.devMessage,
        'displayMessage': value.displayMessage,
        'status': value.status,
    };
}


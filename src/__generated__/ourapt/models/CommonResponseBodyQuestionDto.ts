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
    QuestionDto,
    QuestionDtoFromJSON,
    QuestionDtoFromJSONTyped,
    QuestionDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface CommonResponseBodyQuestionDto
 */
export interface CommonResponseBodyQuestionDto {
    /**
     * 
     * @type {QuestionDto}
     * @memberof CommonResponseBodyQuestionDto
     */
    data?: QuestionDto;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyQuestionDto
     */
    devMessage: string;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyQuestionDto
     */
    displayMessage: string;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyQuestionDto
     */
    status: CommonResponseBodyQuestionDtoStatusEnum;
}

/**
* @export
* @enum {string}
*/
export enum CommonResponseBodyQuestionDtoStatusEnum {
    BannedUser = 'BANNED_USER',
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

export function CommonResponseBodyQuestionDtoFromJSON(json: any): CommonResponseBodyQuestionDto {
    return CommonResponseBodyQuestionDtoFromJSONTyped(json, false);
}

export function CommonResponseBodyQuestionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommonResponseBodyQuestionDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : QuestionDtoFromJSON(json['data']),
        'devMessage': json['devMessage'],
        'displayMessage': json['displayMessage'],
        'status': json['status'],
    };
}

export function CommonResponseBodyQuestionDtoToJSON(value?: CommonResponseBodyQuestionDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': QuestionDtoToJSON(value.data),
        'devMessage': value.devMessage,
        'displayMessage': value.displayMessage,
        'status': value.status,
    };
}


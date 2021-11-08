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
    GetCommentsOfQuestionDto,
    GetCommentsOfQuestionDtoFromJSON,
    GetCommentsOfQuestionDtoFromJSONTyped,
    GetCommentsOfQuestionDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface CommonResponseBodyGetCommentsOfQuestionDto
 */
export interface CommonResponseBodyGetCommentsOfQuestionDto {
    /**
     * 
     * @type {GetCommentsOfQuestionDto}
     * @memberof CommonResponseBodyGetCommentsOfQuestionDto
     */
    data?: GetCommentsOfQuestionDto;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyGetCommentsOfQuestionDto
     */
    devMessage: string;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyGetCommentsOfQuestionDto
     */
    displayMessage: string;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyGetCommentsOfQuestionDto
     */
    status: CommonResponseBodyGetCommentsOfQuestionDtoStatusEnum;
}

/**
* @export
* @enum {string}
*/
export enum CommonResponseBodyGetCommentsOfQuestionDtoStatusEnum {
    BannedUser = 'BANNED_USER',
    DataNotFoundFromDb = 'DATA_NOT_FOUND_FROM_DB',
    InvalidInput = 'INVALID_INPUT',
    KarrotInvalidAccessToken = 'KARROT_INVALID_ACCESS_TOKEN',
    KarrotUnauthorizedCode = 'KARROT_UNAUTHORIZED_CODE',
    NotCheckedInUser = 'NOT_CHECKED_IN_USER',
    NotServicedRegion = 'NOT_SERVICED_REGION',
    NoPermission = 'NO_PERMISSION',
    RegisteredUserNotFound = 'REGISTERED_USER_NOT_FOUND',
    ResourceDuplicate = 'RESOURCE_DUPLICATE',
    Success = 'SUCCESS'
}

export function CommonResponseBodyGetCommentsOfQuestionDtoFromJSON(json: any): CommonResponseBodyGetCommentsOfQuestionDto {
    return CommonResponseBodyGetCommentsOfQuestionDtoFromJSONTyped(json, false);
}

export function CommonResponseBodyGetCommentsOfQuestionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommonResponseBodyGetCommentsOfQuestionDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : GetCommentsOfQuestionDtoFromJSON(json['data']),
        'devMessage': json['devMessage'],
        'displayMessage': json['displayMessage'],
        'status': json['status'],
    };
}

export function CommonResponseBodyGetCommentsOfQuestionDtoToJSON(value?: CommonResponseBodyGetCommentsOfQuestionDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': GetCommentsOfQuestionDtoToJSON(value.data),
        'devMessage': value.devMessage,
        'displayMessage': value.displayMessage,
        'status': value.status,
    };
}


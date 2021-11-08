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
    OneCommentDto,
    OneCommentDtoFromJSON,
    OneCommentDtoFromJSONTyped,
    OneCommentDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface CommonResponseBodyOneCommentDto
 */
export interface CommonResponseBodyOneCommentDto {
    /**
     * 
     * @type {OneCommentDto}
     * @memberof CommonResponseBodyOneCommentDto
     */
    data?: OneCommentDto;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyOneCommentDto
     */
    devMessage: string;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyOneCommentDto
     */
    displayMessage: string;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyOneCommentDto
     */
    status: CommonResponseBodyOneCommentDtoStatusEnum;
}

/**
* @export
* @enum {string}
*/
export enum CommonResponseBodyOneCommentDtoStatusEnum {
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

export function CommonResponseBodyOneCommentDtoFromJSON(json: any): CommonResponseBodyOneCommentDto {
    return CommonResponseBodyOneCommentDtoFromJSONTyped(json, false);
}

export function CommonResponseBodyOneCommentDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommonResponseBodyOneCommentDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : OneCommentDtoFromJSON(json['data']),
        'devMessage': json['devMessage'],
        'displayMessage': json['displayMessage'],
        'status': json['status'],
    };
}

export function CommonResponseBodyOneCommentDtoToJSON(value?: CommonResponseBodyOneCommentDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': OneCommentDtoToJSON(value.data),
        'devMessage': value.devMessage,
        'displayMessage': value.displayMessage,
        'status': value.status,
    };
}


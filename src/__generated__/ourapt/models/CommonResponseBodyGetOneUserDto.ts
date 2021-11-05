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
    GetOneUserDto,
    GetOneUserDtoFromJSON,
    GetOneUserDtoFromJSONTyped,
    GetOneUserDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface CommonResponseBodyGetOneUserDto
 */
export interface CommonResponseBodyGetOneUserDto {
    /**
     * 
     * @type {GetOneUserDto}
     * @memberof CommonResponseBodyGetOneUserDto
     */
    data?: GetOneUserDto;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyGetOneUserDto
     */
    devMessage: string;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyGetOneUserDto
     */
    displayMessage: string;
    /**
     * 
     * @type {string}
     * @memberof CommonResponseBodyGetOneUserDto
     */
    status: CommonResponseBodyGetOneUserDtoStatusEnum;
}

/**
* @export
* @enum {string}
*/
export enum CommonResponseBodyGetOneUserDtoStatusEnum {
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

export function CommonResponseBodyGetOneUserDtoFromJSON(json: any): CommonResponseBodyGetOneUserDto {
    return CommonResponseBodyGetOneUserDtoFromJSONTyped(json, false);
}

export function CommonResponseBodyGetOneUserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommonResponseBodyGetOneUserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : GetOneUserDtoFromJSON(json['data']),
        'devMessage': json['devMessage'],
        'displayMessage': json['displayMessage'],
        'status': json['status'],
    };
}

export function CommonResponseBodyGetOneUserDtoToJSON(value?: CommonResponseBodyGetOneUserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': GetOneUserDtoToJSON(value.data),
        'devMessage': value.devMessage,
        'displayMessage': value.displayMessage,
        'status': value.status,
    };
}


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
/**
 * 
 * @export
 * @interface ChangeMyCheckedInDto
 */
export interface ChangeMyCheckedInDto {
    /**
     * 
     * @type {string}
     * @memberof ChangeMyCheckedInDto
     */
    newApartmentId?: string;
}

export function ChangeMyCheckedInDtoFromJSON(json: any): ChangeMyCheckedInDto {
    return ChangeMyCheckedInDtoFromJSONTyped(json, false);
}

export function ChangeMyCheckedInDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ChangeMyCheckedInDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'newApartmentId': !exists(json, 'newApartmentId') ? undefined : json['newApartmentId'],
    };
}

export function ChangeMyCheckedInDtoToJSON(value?: ChangeMyCheckedInDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'newApartmentId': value.newApartmentId,
    };
}


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
 * @interface KarrotProfile
 */
export interface KarrotProfile {
    /**
     * 
     * @type {string}
     * @memberof KarrotProfile
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof KarrotProfile
     */
    nickname: string;
    /**
     * 
     * @type {string}
     * @memberof KarrotProfile
     */
    profileImageUrl?: string;
}

export function KarrotProfileFromJSON(json: any): KarrotProfile {
    return KarrotProfileFromJSONTyped(json, false);
}

export function KarrotProfileFromJSONTyped(json: any, ignoreDiscriminator: boolean): KarrotProfile {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'nickname': json['nickname'],
        'profileImageUrl': !exists(json, 'profileImageUrl') ? undefined : json['profileImageUrl'],
    };
}

export function KarrotProfileToJSON(value?: KarrotProfile | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'nickname': value.nickname,
        'profileImageUrl': value.profileImageUrl,
    };
}


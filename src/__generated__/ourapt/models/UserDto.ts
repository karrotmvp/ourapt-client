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
    ApartmentDto,
    ApartmentDtoFromJSON,
    ApartmentDtoFromJSONTyped,
    ApartmentDtoToJSON,
    KarrotProfile,
    KarrotProfileFromJSON,
    KarrotProfileFromJSONTyped,
    KarrotProfileToJSON,
} from './';

/**
 * 
 * @export
 * @interface UserDto
 */
export interface UserDto {
    /**
     * 
     * @type {boolean}
     * @memberof UserDto
     */
    admin?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof UserDto
     */
    bannedAt?: Date;
    /**
     * 
     * @type {ApartmentDto}
     * @memberof UserDto
     */
    checkedIn?: ApartmentDto;
    /**
     * 
     * @type {Date}
     * @memberof UserDto
     */
    createdAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof UserDto
     */
    id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserDto
     */
    isPushAgreed?: boolean;
    /**
     * 
     * @type {KarrotProfile}
     * @memberof UserDto
     */
    profile?: KarrotProfile;
    /**
     * 
     * @type {Date}
     * @memberof UserDto
     */
    updatedAt?: Date;
}

export function UserDtoFromJSON(json: any): UserDto {
    return UserDtoFromJSONTyped(json, false);
}

export function UserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'admin': !exists(json, 'admin') ? undefined : json['admin'],
        'bannedAt': !exists(json, 'bannedAt') ? undefined : (new Date(json['bannedAt'])),
        'checkedIn': !exists(json, 'checkedIn') ? undefined : ApartmentDtoFromJSON(json['checkedIn']),
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'isPushAgreed': !exists(json, 'isPushAgreed') ? undefined : json['isPushAgreed'],
        'profile': !exists(json, 'profile') ? undefined : KarrotProfileFromJSON(json['profile']),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
    };
}

export function UserDtoToJSON(value?: UserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'admin': value.admin,
        'bannedAt': value.bannedAt === undefined ? undefined : (value.bannedAt.toISOString()),
        'checkedIn': ApartmentDtoToJSON(value.checkedIn),
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'id': value.id,
        'isPushAgreed': value.isPushAgreed,
        'profile': KarrotProfileToJSON(value.profile),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
    };
}


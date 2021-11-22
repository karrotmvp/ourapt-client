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
 * @interface VoteItemDto
 */
export interface VoteItemDto {
    /**
     * 
     * @type {string}
     * @memberof VoteItemDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof VoteItemDto
     */
    mainText: string;
    /**
     * 
     * @type {boolean}
     * @memberof VoteItemDto
     */
    myVote?: boolean;
    /**
     * 
     * @type {number}
     * @memberof VoteItemDto
     */
    votedCount: number;
}

export function VoteItemDtoFromJSON(json: any): VoteItemDto {
    return VoteItemDtoFromJSONTyped(json, false);
}

export function VoteItemDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): VoteItemDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'mainText': json['mainText'],
        'myVote': !exists(json, 'myVote') ? undefined : json['myVote'],
        'votedCount': json['votedCount'],
    };
}

export function VoteItemDtoToJSON(value?: VoteItemDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'mainText': value.mainText,
        'myVote': value.myVote,
        'votedCount': value.votedCount,
    };
}


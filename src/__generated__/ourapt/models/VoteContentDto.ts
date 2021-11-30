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
    VoteItemContentDto,
    VoteItemContentDtoFromJSON,
    VoteItemContentDtoFromJSONTyped,
    VoteItemContentDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface VoteContentDto
 */
export interface VoteContentDto {
    /**
     * 
     * @type {Array<VoteItemContentDto>}
     * @memberof VoteContentDto
     */
    items: Array<VoteItemContentDto>;
    /**
     * 
     * @type {string}
     * @memberof VoteContentDto
     */
    mainText: string;
}

export function VoteContentDtoFromJSON(json: any): VoteContentDto {
    return VoteContentDtoFromJSONTyped(json, false);
}

export function VoteContentDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): VoteContentDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'items': ((json['items'] as Array<any>).map(VoteItemContentDtoFromJSON)),
        'mainText': json['mainText'],
    };
}

export function VoteContentDtoToJSON(value?: VoteContentDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'items': ((value.items as Array<any>).map(VoteItemContentDtoToJSON)),
        'mainText': value.mainText,
    };
}

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
 * @interface NoApartmentAnswerDto
 */
export interface NoApartmentAnswerDto {
    /**
     * 
     * @type {string}
     * @memberof NoApartmentAnswerDto
     */
    answer: string;
}

export function NoApartmentAnswerDtoFromJSON(json: any): NoApartmentAnswerDto {
    return NoApartmentAnswerDtoFromJSONTyped(json, false);
}

export function NoApartmentAnswerDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): NoApartmentAnswerDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'answer': json['answer'],
    };
}

export function NoApartmentAnswerDtoToJSON(value?: NoApartmentAnswerDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'answer': value.answer,
    };
}


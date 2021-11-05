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
 * @interface GetOneQuestionDto
 */
export interface GetOneQuestionDto {
    /**
     * 
     * @type {QuestionDto}
     * @memberof GetOneQuestionDto
     */
    question?: QuestionDto;
}

export function GetOneQuestionDtoFromJSON(json: any): GetOneQuestionDto {
    return GetOneQuestionDtoFromJSONTyped(json, false);
}

export function GetOneQuestionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetOneQuestionDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'question': !exists(json, 'question') ? undefined : QuestionDtoFromJSON(json['question']),
    };
}

export function GetOneQuestionDtoToJSON(value?: GetOneQuestionDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'question': QuestionDtoToJSON(value.question),
    };
}


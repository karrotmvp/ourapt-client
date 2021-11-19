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

import * as runtime from "../runtime";
import {
  CommonResponseBodyGetQuestionsDto,
  CommonResponseBodyGetQuestionsDtoFromJSON,
  CommonResponseBodyGetQuestionsDtoToJSON,
  CommonResponseBodyOneQuestionDto,
  CommonResponseBodyOneQuestionDtoFromJSON,
  CommonResponseBodyOneQuestionDtoToJSON,
  CommonResponseBodyVoid,
  CommonResponseBodyVoidFromJSON,
  CommonResponseBodyVoidToJSON,
  QuestionContentDto,
  QuestionContentDtoFromJSON,
  QuestionContentDtoToJSON,
} from "../models";

export interface DeleteQuestionUsingDELETERequest {
  questionId: string;
}

export interface GetQuestionByIdUsingGETRequest {
  questionId: string;
}

export interface GetQuestionsUsingGETRequest {
  apartmentId: string;
  cursor: number;
  perPage: number;
}

export interface GetRandomPinnedQuestionOfApartmentUsingGETRequest {
  apartmentId: string;
}

export interface UpdateQuestionUsingPATCHRequest {
  questionId: string;
  questionContent: QuestionContentDto;
}

export interface WriteNewQuestionUsingPOSTRequest {
  questionContent: QuestionContentDto;
}

/**
 *
 */
export class Class41Api extends runtime.BaseAPI {
  /**
   * 질문 게시글 삭제하기
   */
  async deleteQuestionUsingDELETERaw(
    requestParameters: DeleteQuestionUsingDELETERequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<CommonResponseBodyVoid>> {
    if (
      requestParameters.questionId === null ||
      requestParameters.questionId === undefined
    ) {
      throw new runtime.RequiredError(
        "questionId",
        "Required parameter requestParameters.questionId was null or undefined when calling deleteQuestionUsingDELETE."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] =
        this.configuration.apiKey("Authorization"); // KarrotAccessToken authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/question/{questionId}`.replace(
          `{${"questionId"}}`,
          encodeURIComponent(String(requestParameters.questionId))
        ),
        method: "DELETE",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CommonResponseBodyVoidFromJSON(jsonValue)
    );
  }

  /**
   * 질문 게시글 삭제하기
   */
  async deleteQuestionUsingDELETE(
    requestParameters: DeleteQuestionUsingDELETERequest,
    initOverrides?: RequestInit
  ): Promise<CommonResponseBodyVoid> {
    const response = await this.deleteQuestionUsingDELETERaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * ID로 질문 게시글 조회
   */
  async getQuestionByIdUsingGETRaw(
    requestParameters: GetQuestionByIdUsingGETRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<CommonResponseBodyOneQuestionDto>> {
    if (
      requestParameters.questionId === null ||
      requestParameters.questionId === undefined
    ) {
      throw new runtime.RequiredError(
        "questionId",
        "Required parameter requestParameters.questionId was null or undefined when calling getQuestionByIdUsingGET."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] =
        this.configuration.apiKey("Authorization"); // KarrotAccessToken authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/question/{questionId}`.replace(
          `{${"questionId"}}`,
          encodeURIComponent(String(requestParameters.questionId))
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CommonResponseBodyOneQuestionDtoFromJSON(jsonValue)
    );
  }

  /**
   * ID로 질문 게시글 조회
   */
  async getQuestionByIdUsingGET(
    requestParameters: GetQuestionByIdUsingGETRequest,
    initOverrides?: RequestInit
  ): Promise<CommonResponseBodyOneQuestionDto> {
    const response = await this.getQuestionByIdUsingGETRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * 질문 게시글 목록 Date 커서 기반 페이징으로 조회
   */
  async getQuestionsUsingGETRaw(
    requestParameters: GetQuestionsUsingGETRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<CommonResponseBodyGetQuestionsDto>> {
    if (
      requestParameters.apartmentId === null ||
      requestParameters.apartmentId === undefined
    ) {
      throw new runtime.RequiredError(
        "apartmentId",
        "Required parameter requestParameters.apartmentId was null or undefined when calling getQuestionsUsingGET."
      );
    }

    if (
      requestParameters.cursor === null ||
      requestParameters.cursor === undefined
    ) {
      throw new runtime.RequiredError(
        "cursor",
        "Required parameter requestParameters.cursor was null or undefined when calling getQuestionsUsingGET."
      );
    }

    if (
      requestParameters.perPage === null ||
      requestParameters.perPage === undefined
    ) {
      throw new runtime.RequiredError(
        "perPage",
        "Required parameter requestParameters.perPage was null or undefined when calling getQuestionsUsingGET."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.cursor !== undefined) {
      queryParameters["cursor"] = requestParameters.cursor;
    }

    if (requestParameters.perPage !== undefined) {
      queryParameters["perPage"] = requestParameters.perPage;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] =
        this.configuration.apiKey("Authorization"); // KarrotAccessToken authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/apartment/{apartmentId}/questions`.replace(
          `{${"apartmentId"}}`,
          encodeURIComponent(String(requestParameters.apartmentId))
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CommonResponseBodyGetQuestionsDtoFromJSON(jsonValue)
    );
  }

  /**
   * 질문 게시글 목록 Date 커서 기반 페이징으로 조회
   */
  async getQuestionsUsingGET(
    requestParameters: GetQuestionsUsingGETRequest,
    initOverrides?: RequestInit
  ): Promise<CommonResponseBodyGetQuestionsDto> {
    const response = await this.getQuestionsUsingGETRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * 사용자에게 보여질 핀 질문 랜덤 조회
   */
  async getRandomPinnedQuestionOfApartmentUsingGETRaw(
    requestParameters: GetRandomPinnedQuestionOfApartmentUsingGETRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<CommonResponseBodyOneQuestionDto>> {
    if (
      requestParameters.apartmentId === null ||
      requestParameters.apartmentId === undefined
    ) {
      throw new runtime.RequiredError(
        "apartmentId",
        "Required parameter requestParameters.apartmentId was null or undefined when calling getRandomPinnedQuestionOfApartmentUsingGET."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] =
        this.configuration.apiKey("Authorization"); // KarrotAccessToken authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/apartment/{apartmentId}/question/pinned`.replace(
          `{${"apartmentId"}}`,
          encodeURIComponent(String(requestParameters.apartmentId))
        ),
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CommonResponseBodyOneQuestionDtoFromJSON(jsonValue)
    );
  }

  /**
   * 사용자에게 보여질 핀 질문 랜덤 조회
   */
  async getRandomPinnedQuestionOfApartmentUsingGET(
    requestParameters: GetRandomPinnedQuestionOfApartmentUsingGETRequest,
    initOverrides?: RequestInit
  ): Promise<CommonResponseBodyOneQuestionDto> {
    const response = await this.getRandomPinnedQuestionOfApartmentUsingGETRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * 질문 게시글 수정하기
   */
  async updateQuestionUsingPATCHRaw(
    requestParameters: UpdateQuestionUsingPATCHRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<CommonResponseBodyOneQuestionDto>> {
    if (
      requestParameters.questionId === null ||
      requestParameters.questionId === undefined
    ) {
      throw new runtime.RequiredError(
        "questionId",
        "Required parameter requestParameters.questionId was null or undefined when calling updateQuestionUsingPATCH."
      );
    }

    if (
      requestParameters.questionContent === null ||
      requestParameters.questionContent === undefined
    ) {
      throw new runtime.RequiredError(
        "questionContent",
        "Required parameter requestParameters.questionContent was null or undefined when calling updateQuestionUsingPATCH."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] =
        this.configuration.apiKey("Authorization"); // KarrotAccessToken authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/question/{questionId}`.replace(
          `{${"questionId"}}`,
          encodeURIComponent(String(requestParameters.questionId))
        ),
        method: "PATCH",
        headers: headerParameters,
        query: queryParameters,
        body: QuestionContentDtoToJSON(requestParameters.questionContent),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CommonResponseBodyOneQuestionDtoFromJSON(jsonValue)
    );
  }

  /**
   * 질문 게시글 수정하기
   */
  async updateQuestionUsingPATCH(
    requestParameters: UpdateQuestionUsingPATCHRequest,
    initOverrides?: RequestInit
  ): Promise<CommonResponseBodyOneQuestionDto> {
    const response = await this.updateQuestionUsingPATCHRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * 새로운 질문 게시글 작성
   */
  async writeNewQuestionUsingPOSTRaw(
    requestParameters: WriteNewQuestionUsingPOSTRequest,
    initOverrides?: RequestInit
  ): Promise<runtime.ApiResponse<CommonResponseBodyOneQuestionDto>> {
    if (
      requestParameters.questionContent === null ||
      requestParameters.questionContent === undefined
    ) {
      throw new runtime.RequiredError(
        "questionContent",
        "Required parameter requestParameters.questionContent was null or undefined when calling writeNewQuestionUsingPOST."
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] =
        this.configuration.apiKey("Authorization"); // KarrotAccessToken authentication
    }

    const response = await this.request(
      {
        path: `/api/v1/question`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: QuestionContentDtoToJSON(requestParameters.questionContent),
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      CommonResponseBodyOneQuestionDtoFromJSON(jsonValue)
    );
  }

  /**
   * 새로운 질문 게시글 작성
   */
  async writeNewQuestionUsingPOST(
    requestParameters: WriteNewQuestionUsingPOSTRequest,
    initOverrides?: RequestInit
  ): Promise<CommonResponseBodyOneQuestionDto> {
    const response = await this.writeNewQuestionUsingPOSTRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}

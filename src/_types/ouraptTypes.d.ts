// 유저

export interface KarrotProfile {
  userId: string;
  nickname: string;
  profileImgUrl: string;
}

export interface User {
  profile: KarrotProfile;
  pushAgreedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 지역 정보

export interface Region {
  // 서비스 하는 리전
  id: string; // 리전 ID
  name: string; // 리전 이름
  createdAt: Date; // 생성일
  updatedAt: Date; // 최근 수정일
}

export interface Apartment {
  id: string; // 아파트 ID
  name: string; // 아파트 이름
  // channelName?: string; // 아파트가 속한 채널 이름 (채널 없음)
  regionDepth1: Region; // 아파트 속한 depth1 리전
  regionDepth2: Region; // 아파트 속한 depth2 리전
  regionDepth3: Region; // 아파트 속한 depth3 리전
  regionDepth4: Region; // 아파트 속한 depth4 리전
  createdAt: Date; // 생성일
  updatedAt: Date; // 최근 수정일
}

// 유저가 생성한 콘텐츠 --- 구 아티클

export interface Question {
  id: string; // 주관식질문 ID
  writer: User; // 작성자
  mainText: string; // 질문내용
  createdAt: Date; // 생성일
  updatedAt: Date; // 최근 수정일
}

export interface Comment {
  // 댓글
  id: string; // 댓글 ID
  writer: User; // 작성자
  mainText: string; // 댓글내용
  createdAt: Date; // 생성일
  updatedAt: Date; // 최근 수정일
}

// 관리자가 생성한 콘텐츠

export interface AdminQuestion {
  // 관리자가 생성한 질문
  id: string; // 관리자 생성 질문 ID
  mainText: string; // 관리자 생성 질문 내용
  expiredAt: Date; // 유저에게 질문 노출 만료일
  inactiveAt?: Date; // 비활성화 일시
  createdAt: Date; // 생성일
  updatedAt: Date; // 최근 수정일
}

export interface AdminQuestionAnswer {
  // 관리자가 생성한 질문에 달아진 답변
  id: string; // 답변 ID
  mainText: string; // 답변 내용
  createdOn: Region; // 해당 답변이 작성된 지역 정보
  createdAt: Date; // 생성일
  updatedAt: Date; // 최근 수정일
}

// 알림

export interface Notification {
  id: string; // 푸시알림 ID
  mainText: string; // 본문
  createdAt: Date; // 생성일
  updatedAt: Date; // 최근 수정일
}

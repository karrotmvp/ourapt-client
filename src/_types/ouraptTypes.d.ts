// 유저

export interface KarrotProfile {
  id: string;
  nickname: string;
  profileImageUrl: string;
}

export interface User {
  id: string;
  profile: KarrotProfile;
  isPushAgreed: boolean;
  bannedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  checkedIn: Aapartment;
}

// 지역 정보

export interface Region {
  id: string; // 리전 ID
  name: string; // 리전 이름
}

export interface Apartment {
  id: string; // 아파트 ID
  name: string; // 아파트 이름
  brandName: string;
  // channelName?: string; // 아파트가 속한 채널 이름 (채널 없음)
  regionDepth1: Region; // 아파트 속한 depth1 리전
  regionDepth2: Region; // 아파트 속한 depth2 리전
  regionDepth3: Region; // 아파트 속한 depth3 리전
  regionDepth4: Region; // 아파트 속한 depth4 리전
  bannerImage: String;
  isActive: boolean; // 활성화 여부
  createdAt: Date; // 생성일
  updatedAt: Date; // 최근 수정일
}

// 유저가 생성한 콘텐츠 --- 구 아티클

export interface Question {
  id: string; // 주관식질문 ID
  writer: KarrotProfile; // 작성자
  mainText: string; // 질문내용
  createdAt: Date; // 생성일
  updatedAt: Date; // 최근 수정일
  isPinned: boolean; // 상단 노출 여부
  byAdmin: boolean; // 관리자가 작성한 글인지 여부
}

export interface Comment {
  id: string; // 댓글 ID
  writer: KarrotProfile; // 작성자
  mainText: string; // 댓글내용
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

import dayjs from "dayjs";

export default function getTimestamp(createdAt: Date, updatedAt: Date) {
  // 오늘로부터 며칠 전인지 구하기
  const editedMomentFromNow = dayjs(updatedAt).fromNow(true);

  // 수정 여부
  const isEdited = Boolean(createdAt.getTime() !== updatedAt.getTime());
  return `${editedMomentFromNow} ${isEdited ? "수정" : "작성"}`;
}

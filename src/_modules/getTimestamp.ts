import dayjs from "dayjs";
// import newDayjs from "../dayjs";

export default function getTimestamp(createdAt: Date, updatedAt: Date) {
  // 오늘로부터 며칠 전인지 구하기
  const editedMomentFromNow = dayjs(updatedAt).fromNow(true);

  // 수정 여부
  const isEdited = Boolean(createdAt !== updatedAt);
  return `${editedMomentFromNow} ${isEdited ? "수정" : "작성"}됨`;
}

// dayjs 커스터마이징 확인하기

// test 콘솔 찍기
function testTimestamp(testTime: Object) {
  console.log(dayjs(testTime.toString()).fromNow(true));
}

// test 타임스탬프들
const testTimes: Array<{ expectation: string; date: Object }> = [
  {
    expectation: "지금",
    date: dayjs().subtract(3, "second"),
  },
  {
    expectation: "3분 전",
    date: dayjs().subtract(3, "minute"),
  },
  {
    expectation: "2시간 전",
    date: dayjs().subtract(2, "hour"),
  },
  {
    expectation: "23시간 전",
    date: dayjs().subtract(23, "hour"),
  },
  {
    expectation: "어제",
    date: dayjs().subtract(1, "day"),
  },
  {
    expectation: "2일 전",
    date: dayjs().subtract(2, "day"),
  },
  {
    expectation: "1주 전",
    date: dayjs().subtract(1, "week"),
  },
  {
    expectation: "4주 전",
    date: dayjs().subtract(1000, "hour"),
  },
  {
    expectation: "5달 전",
    date: dayjs().subtract(5, "month"),
  },
];

testTimes.map((testTime, idx) => {
  // console.log(testTime.date);
  testTimestamp(testTime.date);
});

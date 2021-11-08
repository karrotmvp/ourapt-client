import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import ko from "dayjs/locale/ko";

dayjs.locale(ko);
dayjs.extend(updateLocale);

dayjs.updateLocale("ko", {
  relativeTime: {
    future: "%s 후",
    past: "%s 전",
    s: "지금",
    m: "지금",
    mm: "%d분 전",
    h: "an hour",
    hh: "%d시간 전",
    d: "어제",
    dd: "%d일 전",
    w: "a week",
    ww: "%d주 전",
    M: "a month",
    MM: "%d달 전",
    y: "a year",
    yy: "%d년 전",
  },
});

// const newDayjs = dayjs.extend(relativeTime, {
dayjs.extend(relativeTime, {
  thresholds: [
    { l: "s", r: 1 },
    { l: "m", r: 1 },
    { l: "mm", r: 59, d: "minute" },
    // { l: "h", r: 1 },
    { l: "hh", r: 23, d: "hour" },
    { l: "d", r: 1 },
    { l: "dd", r: 6, d: "day" },
    // { l: "w", r: 1 },
    { l: "ww", r: 4, d: "week" },
    // { l: "M", r: 1 },
    { l: "MM", r: 11, d: "month" },
    { l: "y" },
    { l: "yy", d: "year" },
  ],
  //   thresholds: [
  //     { l: "s", r: 1 },
  //     { l: "m", r: 1 },
  //     { l: "mm", r: 59, d: "minute" },
  //     { l: "h", r: 1 },
  //     { l: "hh", r: 23, d: "hour" },
  //     { l: "d", r: 1 },
  //     { l: "dd", r: 29, d: "day" },
  //     { l: "M", r: 1 },
  //     { l: "MM", r: 11, d: "month" },
  //     { l: "y" },
  //     { l: "yy", d: "year" },
  //   ],
});

// export default newDayjs;

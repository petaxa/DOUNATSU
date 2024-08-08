import { TaskRecord, TimeRange } from "@/types/dailyReport";
import { format } from "@formkit/tempo";

/**
 * timeRangeを成形し、その配列を返却する
 * @param timeRange 作業時間
 * @param emptyString 未入力文字列
 * @returns
 */
export const createTimeRange = (
  timeRange: TimeRange[],
  emptyString: string
): string[] => {
  return timeRange.map((range) => {
    const formatedStart = range.start
      ? format(range.start, "HH:mm")
      : emptyString;
    const formatedEnd = range.end ? format(range.end, "HH:mm") : emptyString;
    return `${formatedStart} ~ ${formatedEnd}`;
  });
};

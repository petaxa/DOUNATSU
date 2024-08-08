import { TaskRecord, TimeRange } from "@/types/dailyReport";
import { createTimeRange } from "@/business/letterBody/engines/utils";
import { TASK_SCHEDULED_HEADER } from "@/const/startNotification";

const EMPTY = "--";
const INDENT_UNIT = "  ";

/**
 * 作業予定日、作業予定作業時間のテンプレートエンジン
 *
 * @param taskScheduledTimeRange 作業予定作業時間
 * @param indent インデント数
 * @returns
 */
export const taskScheduledDateEngine = (
  taskScheduledTimeRange: TimeRange[],
  indent: number
): string => {
  const formatedTimeRange = createTimeRange(taskScheduledTimeRange, EMPTY);

  const indentStr = `${INDENT_UNIT.repeat(indent)}`;
  return `${indentStr}${formatedTimeRange.join(", ")}で作業予定です。`;
};

/**
 * 作業予定レコードのテンプレートエンジン
 *
 * @param taskScheduledRecords 作業予定レコード
 * @param title タイトル
 * @param indent インデント数
 * @returns
 */
export const taskScheduledRecordEngine = (
  taskScheduledRecords: TaskRecord[],
  indent: number
): string => {
  const indentStr = INDENT_UNIT.repeat(indent);

  // titleが空文字の要素を削除、内容を出力文字列に成形
  const formatedRecords = taskScheduledRecords
    .filter((record) => !!record.title)
    .map((record) => record.title);

  // レコード部分の出力文字を決定
  const recordPart =
    formatedRecords.length > 0
      ? `${indentStr}${formatedRecords.join(`\n${indentStr}`)}`
      : `${indentStr}${EMPTY}`;

  return `${TASK_SCHEDULED_HEADER}\n${recordPart}`;
};

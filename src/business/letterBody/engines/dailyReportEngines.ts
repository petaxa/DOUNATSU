import {
  PROJECT_NAME_INDEX,
  PROJECT_NAME_TITLE,
  TASK_ACTUAL_DATE_INDEX,
  TASK_ACTUAL_DATE_TITLE,
  TASK_SCHEDULED_DATE_INDEX,
  TASK_SCHEDULED_DATE_TITLE,
  TASK_ACTUAL_RECORD_INDEX,
  TASK_ACTUAL_RECORD_TITLE,
  TASK_SCHEDULED_RECORD_INDEX,
  TASK_SCHEDULED_RECORD_TITLE,
} from "@/const/dailyReport";
import { TaskRecord, TimeRange } from "@/types/dailyReport";
import { format } from "@formkit/tempo";
import { createTimeRange } from "@/business/letterBody/engines/utils";

const EMPTY = "--";
const INDENT_UNIT = "  ";

// セクションごとに、出力可能なかたちの文字列を作成する

/**
 * プロジェクト名のテンプレートエンジン
 *
 * @param projectName プロジェクト名
 * @param indent インデント数
 * @returns
 */
export const projectNameEngine = (
  projectName: string,
  indent: number
): string => {
  return `${INDENT_UNIT.repeat(
    indent
  )}${PROJECT_NAME_INDEX}. ${PROJECT_NAME_TITLE} ${projectName ?? EMPTY}`;
};

/**
 * 日付関連のプライベートなテンプレートエンジン
 *
 * @param date 日付
 * @param startTime 開始時間
 * @param endTimeDate 終了時間
 * @param index セクションのインデックス文字列
 * @param indent インデント数
 * @param title セクションタイトル
 * @returns
 */
const dateEngine = (
  date: Date | null,
  timeRange: TimeRange[],
  index: string,
  indent: number,
  title: string
): string => {
  const formatedDate = date ? format(date, "YYYY/MM/DD (d)", "ja") : EMPTY;
  const formatedTimeRange = createTimeRange(timeRange, EMPTY);

  return `${INDENT_UNIT.repeat(
    indent
  )}${index}. ${title} ${formatedDate} ${formatedTimeRange.join(", ")}`;
};

/**
 * 作業実績日、作業実績作業時間のテンプレートエンジン
 *
 * @param taskActualDate 作業実績日
 * @param taskActualTimeRange 作業実績作業時間
 * @param indent インデント数
 * @returns
 */
export const taskActualDateEngine = (
  taskActualDate: Date | null,
  taskActualTimeRange: TimeRange[],
  indent: number
): string => {
  return dateEngine(
    taskActualDate,
    taskActualTimeRange,
    TASK_ACTUAL_DATE_INDEX,
    indent,
    TASK_ACTUAL_DATE_TITLE
  );
};

/**
 * 作業予定日、作業予定作業時間のテンプレートエンジン
 *
 * @param taskScheduledDate 作業予定日
 * @param taskScheduledTimeRange 作業予定作業時間
 * @param indent インデント数
 * @returns
 */
export const taskScheduledDateEngine = (
  taskScheduledDate: Date | null,
  taskScheduledTimeRange: TimeRange[],
  indent: number
): string => {
  return dateEngine(
    taskScheduledDate,
    taskScheduledTimeRange,
    TASK_SCHEDULED_DATE_INDEX,
    indent,
    TASK_SCHEDULED_DATE_TITLE
  );
};

/**
 * 作業レコード関連のプライベートなテンプレートエンジン
 *
 * @param taskRecords 作業レコード
 * @param index セクションのインデックス文字列
 * @param indent インデント数
 * @param title セクションタイトル
 * @returns
 */
const taskRecordEngine = (
  taskRecords: TaskRecord[],
  index: string,
  indent: number,
  title: string
): string => {
  const indentStr = INDENT_UNIT.repeat(indent);

  // titleが空文字の要素を削除、内容を出力文字列に成形
  const formatedRecords = taskRecords
    .filter((record) => !!record.title)
    .map((record, recordIndex) => {
      const title = `${index}-${recordIndex + 1}. ${record.title}`;
      const detail = record.detail.split("\n").join(`\n${indentStr.repeat(2)}`);

      return detail.length > 0
        ? `${title}\n${indentStr.repeat(2)}${detail}`
        : `${title}`;
    });

  // タイトル部分の出力文字
  const titlePart = `${indentStr}${index}. ${title}`;
  // レコード部分の出力文字を決定
  const recordPart =
    formatedRecords.length > 0
      ? `\n${indentStr}${formatedRecords.join(`\n${indentStr}`)}`
      : `${indentStr}${EMPTY}`;

  return `${titlePart}${recordPart}`;
};

/**
 * 作業実績レコードのテンプレートエンジン
 *
 * @param taskActualRecords 作業実績レコード
 * @param indent インデント数
 * @returns
 */
export const taskActualRecordEngine = (
  taskActualRecords: TaskRecord[],
  indent: number
): string => {
  return taskRecordEngine(
    taskActualRecords,
    TASK_ACTUAL_RECORD_INDEX,
    indent,
    TASK_ACTUAL_RECORD_TITLE
  );
};

/**
 * 作業予定レコードのテンプレートエンジン
 *
 * @param taskScheduledRecords 作業予定レコード
 * @param indent インデント数
 * @returns
 */
export const taskScheduledRecordEngine = (
  taskScheduledRecords: TaskRecord[],
  indent: number
): string => {
  return taskRecordEngine(
    taskScheduledRecords,
    TASK_SCHEDULED_RECORD_INDEX,
    indent,
    TASK_SCHEDULED_RECORD_TITLE
  );
};

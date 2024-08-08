// 入力中種別名

import { TaskRecord } from "@/types/dailyReport";

/** 今回作業の入力 */
export const TASK_TYPE_ACTUAL = "actual";
/** 次回作業予定の入力 */
export const TASK_TYPE_SCHEDULED = "scheduled";

// 日報のひな型に関する定数
/** ヘッダー */
export const DAILY_REPORT_HEADER =
  "ーーーーーーーーーーーーーーーーー\n【日報】";
/** プロジェクト名 インデックス */
export const PROJECT_NAME_INDEX = "1";
/** プロジェクト名 タイトル */
export const PROJECT_NAME_TITLE = "[プロジェクト名]";
/** 作業日 インデックス */
export const TASK_ACTUAL_DATE_INDEX = "2";
/** 作業日 タイトル */
export const TASK_ACTUAL_DATE_TITLE = "[作業日]";
/** 作業内容 インデックス */
export const TASK_ACTUAL_RECORD_INDEX = "3";
/** 作業内容 タイトル */
export const TASK_ACTUAL_RECORD_TITLE = "[作業内容]";
/** 次回作業予定日 インデックス */
export const TASK_SCHEDULED_DATE_INDEX = "4";
/** 次回作業予定日 タイトル */
export const TASK_SCHEDULED_DATE_TITLE = "[次回作業予定日]";
/** 次回作業予定 インデックス */
export const TASK_SCHEDULED_RECORD_INDEX = "5";
/** 次回作業予定 タイトル */
export const TASK_SCHEDULED_RECORD_TITLE = "[次回作業予定]";

// 作業レコードの初期値
export const INIT_TASK_RECORD: TaskRecord = {
  title: "",
  detail: "",
};

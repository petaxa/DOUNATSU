import { TaskRecord, TimeRange } from "@/types/dailyReport";
import * as dailyReportEngine from "@/business/letterBody/engines/dailyReportEngines";
import * as startNotificationEngine from "@/business/letterBody/engines/startNotificationEngines";
import { DAILY_REPORT_HEADER } from "@/const/dailyReport";
import {
  START_NOTIFICATION_HEADER,
  TASK_SCHEDULED_HEADER,
} from "@/const/startNotification";

/**
 * 日報の出力文章を作成する
 *
 * ーーーーーーーーーーーーーーーーー
 * 【日報】
 *   1. [プロジェクト名] ${プロジェクト名}
 *   2. [作業日] ${作業実績日} (${作業実績曜日}) ${作業実績開始時間} ~ ${作業実績終了時間}
 *   3. [作業内容]
 *   3-1. ${作業実績タイトル}
 *     ${作業実績詳細}
 *   4. [次回作業予定日]
 *     ${作業予定日} (${作業予定曜日}) ${作業予定開始時間} ~ ${作業予定終了時間}
 *   5. [次回作業予定]
 *   5-1. ${作業予定タイトル}
 *     ${作業予定詳細}
 *
 * @param projectName プロジェクト名
 * @param taskActualDate 作業実績日
 * @param taskActualStartTime 作業実績開始時間
 * @param taskActualEndTimeDate 作業実績終了時間
 * @param taskRecords 作業実績レコード
 * @param taskScheduledDate 作業予定日
 * @param taskScheduledStartTime 作業予定開始時間
 * @param taskScheduledEndTimeDate 作業予定終了時間
 * @param taskScheduledRecords 作業予定レコード
 * @returns
 */
export const createDailyReport = (
  projectName: string,
  taskActualDate: Date | null,
  taskActualTimeRange: TimeRange[],
  taskRecords: TaskRecord[],
  taskScheduledDate: Date | null,
  taskScheduledTimeRange: TimeRange[],
  taskScheduledRecords: TaskRecord[]
): string => {
  const indent = 1;

  const header = DAILY_REPORT_HEADER;
  const projectNameLetter = dailyReportEngine.projectNameEngine(
    projectName,
    indent
  );
  const taskActualDateLetter = dailyReportEngine.taskActualDateEngine(
    taskActualDate,
    taskActualTimeRange,
    indent
  );
  const taskActualRecordLetter = dailyReportEngine.taskActualRecordEngine(
    taskRecords,
    indent
  );
  const taskScheduledDateLetter = dailyReportEngine.taskScheduledDateEngine(
    taskScheduledDate,
    taskScheduledTimeRange,
    indent
  );
  const taskScheduledRecordLetter = dailyReportEngine.taskScheduledRecordEngine(
    taskScheduledRecords,
    indent
  );

  return `${header}\n${projectNameLetter}\n${taskActualDateLetter}\n${taskActualRecordLetter}\n${taskScheduledDateLetter}\n${taskScheduledRecordLetter}`;
};

export const createStartNotification = (
  taskScheduledTimeRange: TimeRange[],
  taskScheduledRecords: TaskRecord[]
): string => {
  const indent = 0;
  const taskScheduledDateLetter =
    startNotificationEngine.taskScheduledDateEngine(
      taskScheduledTimeRange,
      indent
    );
  const taskScheduledRecordLetter =
    startNotificationEngine.taskScheduledRecordEngine(
      taskScheduledRecords,
      indent
    );
  return `${START_NOTIFICATION_HEADER}\n${taskScheduledDateLetter}\n${taskScheduledRecordLetter}`;
};

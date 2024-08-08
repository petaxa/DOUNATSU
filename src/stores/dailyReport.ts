import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { addDay, addHour } from "@formkit/tempo";
import { TaskRecord, TimeRange } from "@/types/dailyReport";

// ストアの初期値
// 参照を渡してしまう問題を回避するため初期値を返すメソッドを作成
export const TASK_ACTUAL_TIME_RANGE_INIT = (): TimeRange[] => {
  return [
    {
      /** 作業実績開始時間 */
      start: new Date(),
      /** 作業実績終了時間 */
      end: addHour(new Date(), 2),
    },
  ];
};

export const TASK_ACTUAL_RECORDS_INIT = (): TaskRecord[] => {
  return [];
};
export const TASK_SCHEDULED_DATE_INIT = (): Date => {
  return addDay(new Date(), 1);
};
export const TASK_SCHEDULED_TIME_RANGE_INIT = (): TimeRange[] => {
  return [
    {
      /** 作業予定開始時間 */
      start: addDay(new Date(), 1),
      /** 作業予定終了時間 */
      end: addHour(addDay(new Date(), 1), 2),
    },
  ];
};
export const TASK_SCHEDULED_RECORDS_INIT = (): TaskRecord[] => {
  return [];
};

export const useDailyReportStore = defineStore("dailyReport", () => {
  const taskActualTimeRange: Ref<TimeRange[]> = ref(
    TASK_ACTUAL_TIME_RANGE_INIT()
  );
  const taskActualRecords: Ref<TaskRecord[]> = ref(TASK_ACTUAL_RECORDS_INIT());
  const taskScheduledDate: Ref<Date> = ref(TASK_SCHEDULED_DATE_INIT());
  const taskScheduledTimeRange: Ref<TimeRange[]> = ref(
    TASK_SCHEDULED_TIME_RANGE_INIT()
  );
  const taskScheduledRecords: Ref<TaskRecord[]> = ref(
    TASK_SCHEDULED_RECORDS_INIT()
  );

  // メソッド
  const initializeDailyReportStore = () => {
    taskActualTimeRange.value = TASK_ACTUAL_TIME_RANGE_INIT();
    taskActualRecords.value = TASK_ACTUAL_RECORDS_INIT();
    taskScheduledDate.value = TASK_SCHEDULED_DATE_INIT();
    taskScheduledTimeRange.value = TASK_SCHEDULED_TIME_RANGE_INIT();
    taskScheduledRecords.value = TASK_SCHEDULED_RECORDS_INIT();
    console.log("initializeDailyReportStore done");
  };

  return {
    /** 作業実績作業時間 */
    taskActualTimeRange,
    /** 作業実績レコード */
    taskActualRecords,
    /** 作業予定日 */
    taskScheduledDate,
    /** 作業予定作業時間 */
    taskScheduledTimeRange,
    /** 作業予定レコード */
    taskScheduledRecords,
    /** ストア初期化 */
    initializeDailyReportStore,
  };
});

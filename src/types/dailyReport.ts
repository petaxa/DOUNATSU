/** 入力タイプ */
export type TaskType = "actual" | "scheduled";

/** 作業レコード */
export type TaskRecord = {
  title: string;
  detail: string;
};

/** 作業時間 */
export type TimeRange = {
  start: Date;
  end: Date;
};

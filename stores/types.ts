/**
 * 作業時間のfrom, to
 */
export type WorkTimeRange = {
    from: string; // (hh:mm)
    to: string; // (hh:mm)
};

// NOTE: エディタの補完機能で型のプロパティを見たいので重複して定義している

/**
 * 当日タスク内容
 */
export type TodayTask = {
    title: string;
    pending: number;
    detail: string;
};

/**
 * 次回予定タスク内容
 */
export type NextTask = {
    title: string;
    detail: string;
};


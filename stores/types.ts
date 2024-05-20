/**
 * 作業時間のfrom, to
 */
export type WorkTimeRange = {
    from: string;
    to: string;
};

export type DateDetails = {
    date: Date | null;
    display: string;
};

/**
 * 変換済み作業時間オブジェクト
 */
export type WorkTimeDetailsTypeRange = {
    [Prop in keyof WorkTimeRange]: DateDetails;
};

// NOTE: エディタの補完機能で型のプロパティを見たいので重複して定義している
export type Task = {
    title: string;
    pending?: number;
    detail?: string;
};
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

import { defineStore } from "pinia";
import type { TodayTask, WorkTimeRange } from "./types";
import type { DisplayWorkTimeRange } from "../composables/type";
import {
    formatToHHMM,
    formatToYYYYMMDD,
    translateDate,
} from "../composables/date";

type TodayWorkValuesType = {
    projectName: Ref<string>;
    todayWorkDate: Ref<string>;
    todayWorkTimeRange: Ref<WorkTimeRange[]>;
    todayTasks: Ref<TodayTask[]>;
    initializeUseTodayWorkStore: () => void;
    todayWorkDateAsDate: ComputedRef<Date | null>;
    todayWorkDateAsYYYYMMDD: ComputedRef<string>;
    todayWorkTimeRangeAsDate: ComputedRef<DisplayWorkTimeRange[]>;
    todayWorkTimeRangeAsHHMM: ComputedRef<WorkTimeRange[]>;
    updateTodayWorkDate: (date: Date) => void;
    updateTodayWorkTime: (workTimesDate: DisplayWorkTimeRange[]) => void;
};

export const useTodayWorkStore = defineStore(
    "todayWork",
    (): TodayWorkValuesType => {
        const projectName: TodayWorkValuesType["projectName"] = ref("");
        const todayWorkDate: TodayWorkValuesType["todayWorkDate"] = ref("");
        const todayWorkTimeRange: TodayWorkValuesType["todayWorkTimeRange"] =
            ref([]);
        const todayTasks: TodayWorkValuesType["todayTasks"] = ref([]);

        /**
         * useTodayWorkStoreのすべての値を初期化する
         */
        const initializeUseTodayWorkStore: TodayWorkValuesType["initializeUseTodayWorkStore"] =
            () => {
                projectName.value = "";
                todayWorkDate.value = "";
                todayWorkTimeRange.value = [];
                todayTasks.value = [];
            };

        /**
         * todayWorkDateをDate型で返却する
         */
        const todayWorkDateAsDate: TodayWorkValuesType["todayWorkDateAsDate"] =
            computed(() => translateDate(todayWorkDate.value));
        /**
         * todayWorkDateをString型で返却する
         */
        const todayWorkDateAsYYYYMMDD: TodayWorkValuesType["todayWorkDateAsYYYYMMDD"] =
            computed(() => {
                const date = translateDate(todayWorkDate.value);
                return date ? formatToYYYYMMDD(date) : "";
            });

        /**
         * todayWorkTimeRangeをDate型で返却する
         */
        const todayWorkTimeRangeAsDate: TodayWorkValuesType["todayWorkTimeRangeAsDate"] =
            computed(() => {
                return todayWorkTimeRange.value.map((range) => ({
                    from: translateDate(range.from),
                    to: translateDate(range.to),
                }));
            });
        /**
         * todayWorkTimeRangeをDate型で返却する
         */
        const todayWorkTimeRangeAsHHMM: TodayWorkValuesType["todayWorkTimeRangeAsHHMM"] =
            computed(() => {
                return todayWorkTimeRange.value.map((range) => {
                    const fromDate = translateDate(range.from);
                    const from = fromDate ? formatToHHMM(fromDate) : "";

                    const fromTo = translateDate(range.to);
                    const to = fromTo ? formatToHHMM(fromTo) : "";

                    return {
                        from,
                        to,
                    };
                });
            });

        /**
         * フォームからの作業日の入力値をフォーマットしてtodayWorkDateを更新する
         * @param date
         */
        const updateTodayWorkDate: TodayWorkValuesType["updateTodayWorkDate"] =
            (inputDate: Date) => {
                todayWorkDate.value = String(inputDate);
            };

        /**
         * フォームからの作業時間の入力値(配列)をフォーマットしてtodayWorkTimeRangeを更新する
         * @param workTimesDate
         */
        const updateTodayWorkTime: TodayWorkValuesType["updateTodayWorkTime"] =
            (inputWorkTimesDate: DisplayWorkTimeRange[]) => {
                const workTimesDate = inputWorkTimesDate.map((range) => ({
                    from: String(range.from),
                    to: String(range.to),
                }));
                todayWorkTimeRange.value = workTimesDate;
            };

        return {
            projectName,
            todayWorkDate,
            todayWorkTimeRange,
            todayTasks,
            initializeUseTodayWorkStore,
            todayWorkDateAsDate,
            todayWorkDateAsYYYYMMDD,
            todayWorkTimeRangeAsDate,
            todayWorkTimeRangeAsHHMM,
            updateTodayWorkDate,
            updateTodayWorkTime,
        };
    },
    {
        persist: true,
    }
);

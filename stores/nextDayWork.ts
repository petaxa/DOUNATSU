import { defineStore } from "pinia";
import { ComputedRef, Ref, computed, ref } from "vue";
import {
    DateDetails,
    NextTask,
    WorkTimeDetailsTypeRange,
    WorkTimeRange,
} from "./types";
import {
    translateDetailsWorkDate,
    translateDetailsWorkTime,
} from "../composables/stores";
import { DisplayWorkTimeRange } from "../composables/type";
import {
    formatToHHMM,
    formatToYYYYMMDD,
    translateDate,
} from "../composables/date";

type TodayWorkValuesType = {
    nextDayWorkDate: Ref<string>;
    nextDayWorkTimeRange: Ref<WorkTimeRange[]>;
    nextDayTasks: Ref<NextTask[]>;
    initializeUseNextDayWorkStore: () => void;
    nextDayWorkDateAsDate: ComputedRef<Date | null>;
    nextDayWorkDateAsYYYYMMDD: ComputedRef<string>;
    nextDayWorkTimeRangeAsDate: ComputedRef<DisplayWorkTimeRange[]>;
    nextDayWorkTimeRangeAsHHMM: ComputedRef<WorkTimeRange[]>;
    updateNextDayWorkDate: (date: Date) => void;
    updateNextDayWorkTime: (workTimesDate: DisplayWorkTimeRange[]) => void;
};

export const useNextDayWorkStore = defineStore(
    "nextDayWork",
    (): TodayWorkValuesType => {
        const nextDayWorkDate: TodayWorkValuesType["nextDayWorkDate"] = ref("");
        const nextDayWorkTimeRange: TodayWorkValuesType["nextDayWorkTimeRange"] =
            ref([]);
        const nextDayTasks: TodayWorkValuesType["nextDayTasks"] = ref([]);

        /**
         * useNextDayWorkStoreのすべての値を初期化する
         */
        const initializeUseNextDayWorkStore: TodayWorkValuesType["initializeUseNextDayWorkStore"] =
            () => {
                nextDayWorkDate.value = "";
                nextDayWorkTimeRange.value = [];
                nextDayTasks.value = [];
            };

        /**
         * nextDayWorkDateAsDateをDate型で返却する
         */
        const nextDayWorkDateAsDate: TodayWorkValuesType["nextDayWorkDateAsDate"] =
            computed(() => {
                return translateDate(nextDayWorkDate.value);
            });
        /**
         * nextDayWorkDateAsDateをString型で返却する
         */
        const nextDayWorkDateAsYYYYMMDD: TodayWorkValuesType["nextDayWorkDateAsYYYYMMDD"] =
            computed(() => {
                const date = translateDate(nextDayWorkDate.value);
                return date ? formatToYYYYMMDD(date) : "";
            });

        /**
         * nextDayWorkTimeRangeをDate型で返却する
         */
        const nextDayWorkTimeRangeAsDate: TodayWorkValuesType["nextDayWorkTimeRangeAsDate"] =
            computed(() => {
                return nextDayWorkTimeRange.value.map((range) => ({
                    from: translateDate(range.from),
                    to: translateDate(range.to),
                }));
            });
        /**
         * nextDayWorkTimeRangeをString型で返却する
         */
        const nextDayWorkTimeRangeAsHHMM: TodayWorkValuesType["nextDayWorkTimeRangeAsHHMM"] =
            computed(() => {
                return nextDayWorkTimeRange.value.map((range) => {
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
         * フォームからの作業日の入力値をフォーマットしてnextDayWorkDateを更新する
         * @param date
         */
        const updateNextDayWorkDate: TodayWorkValuesType["updateNextDayWorkDate"] =
            (date: Date) => {
                nextDayWorkDate.value = String(date);
            };

        /**
         * フォームからの作業時間の入力値(配列)をフォーマットしてnextDayWorkTimeRangeを更新する
         * @param workTimesDate
         */
        const updateNextDayWorkTime: TodayWorkValuesType["updateNextDayWorkTime"] =
            (inputWorkTimesDate: DisplayWorkTimeRange[]) => {
                const workTimesDate = inputWorkTimesDate.map((range) => ({
                    from: String(range.from),
                    to: String(range.to),
                }));
                nextDayWorkTimeRange.value = workTimesDate;
            };

        return {
            nextDayWorkDate,
            nextDayWorkTimeRange,
            nextDayTasks,
            initializeUseNextDayWorkStore,
            nextDayWorkDateAsDate,
            nextDayWorkDateAsYYYYMMDD,
            nextDayWorkTimeRangeAsDate,
            nextDayWorkTimeRangeAsHHMM,
            updateNextDayWorkDate,
            updateNextDayWorkTime,
        };
    },
    {
        persist: true,
    }
);

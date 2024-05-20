import { defineStore } from "pinia";
import { ComputedRef, Ref, computed, ref } from "vue";
import {
    DateDetails,
    TodayTask,
    WorkTimeDetailsTypeRange,
    WorkTimeRange,
} from "./types";
import {
    translateDetailsWorkDate,
    translateDetailsWorkTime,
} from "../composables/stores";
import { DisplayWorkTimeRange } from "../composables/type";

type TodayWorkValuesType = {
    projectName: string;
    todayWorkDate: string;
    todayWorkTimeRange: WorkTimeRange[];
    todayTasks: TodayTask[];
    initializeUseTodayWorkStore: () => void;
    todayWorkDateDetails: DateDetails;
    todayWorkTimeRangeDetails: WorkTimeDetailsTypeRange[];
    updateTodayWorkDate: (date: Date) => void;
    updateTodayWorkTime: (workTimesDate: DisplayWorkTimeRange[]) => void;
};

export const useTodayWorkStore = defineStore(
    "todayWork",
    () => {
        const projectName: Ref<TodayWorkValuesType["projectName"]> = ref("");
        const todayWorkDate: Ref<TodayWorkValuesType["todayWorkDate"]> =
            ref("");
        const todayWorkTimeRange: Ref<
            TodayWorkValuesType["todayWorkTimeRange"]
        > = ref([]);
        const todayTasks: Ref<TodayWorkValuesType["todayTasks"]> = ref([]);

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
         * todayWorkDateをDateとStringそれぞれに変換してを返却する
         */
        const todayWorkDateDetails: ComputedRef<
            TodayWorkValuesType["todayWorkDateDetails"]
        > = computed(() => {
            return translateDetailsWorkDate(todayWorkDate.value);
        });

        /**
         * todayWorkTimeRangeをDateとStringそれぞれに変換してを返却する
         */
        const todayWorkTimeRangeDetails: ComputedRef<
            TodayWorkValuesType["todayWorkTimeRangeDetails"]
        > = computed(() => {
            return translateDetailsWorkTime(todayWorkTimeRange.value);
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
            todayWorkDateDetails,
            todayWorkTimeRangeDetails,
            updateTodayWorkDate,
            updateTodayWorkTime,
        };
    },
    {
        persist: true,
    }
);

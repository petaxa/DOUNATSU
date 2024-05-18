import { defineStore } from "pinia";
import { Ref, computed, ref } from "vue";
import { TodayTask, WorkTimeRange } from "./types";
import {
    formatToStoreStringDate,
    formatToStoreStringTime,
    translateStoreDateToDate,
} from "../composables/date";

export const useTodayWorkStore = defineStore("todayWork", () => {
    const projectName = ref("");
    const todayWorkDate = ref("");
    const todayWorkTimeRange: Ref<WorkTimeRange[]> = ref([]);
    const todayTasks: Ref<TodayTask[]> = ref([]);

    /**
     * useTodayWorkStoreのすべての値を初期化する
     */
    const initializeUseTodayWorkStore = () => {
        projectName.value = "";
        todayWorkDate.value = "";
        todayWorkTimeRange.value = [];
        todayTasks.value = [];
    };

    /**
     * フォームからの作業日の入力値をフォーマットしてtodayWorkDateを更新する
     * @param date
     */
    const updateTodayWorkDateFromDate = (date: Date) => {
        todayWorkDate.value = formatToStoreStringDate(date);
    };
    /**
     * todayWorkDateをDate型に変換して返却
     * 無効なDateだった場合はnullを返却
     */
    const dateTypeTodayWorkDate = computed(() => {
        // 無効な場合はnullを返すのは、意味のある値を返すならstoreを更新しないといけないから
        return translateStoreDateToDate(todayWorkDate.value);
    });

    /**
     * フォームからの作業時間の入力値(配列)をフォーマットしてtodayWorkTimeRangeを更新する
     * @param workTimesDate
     */
    const updateTodayWorkTimeFromDate = (
        workTimesDate: { [Prop in keyof WorkTimeRange]: Date }[]
    ) => {
        todayWorkTimeRange.value = workTimesDate.map((workTime) => ({
            from: formatToStoreStringTime(workTime.from),
            to: formatToStoreStringTime(workTime.to),
        }));
    };

    return {
        projectName,
        todayWorkDate,
        todayWorkTimeRange,
        todayTasks,
        initializeUseTodayWorkStore,
        updateTodayWorkDateFromDate,
        dateTypeTodayWorkDate,
        updateTodayWorkTimeFromDate,
    };
});

import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { TodayTask, WorkTimeRange } from "./types";

export const useNextDayWorkStore = defineStore("nextDayWork", () => {
    const nextDayWorkDate = ref("");
    const nextDayWorkTimeRange: Ref<WorkTimeRange[]> = ref([]);
    const nextDayTasks: Ref<TodayTask[]> = ref([]);

    /**
     * useNextDayWorkStoreのすべての値を初期化する
     */
    const initializeUseNextDayWorkStore = () => {
        nextDayWorkDate.value = "";
        nextDayWorkTimeRange.value = [];
        nextDayTasks.value = [];
    };

    return {
        nextDayWorkDate,
        nextDayWorkTimeRange,
        nextDayTasks,
        initializeUseNextDayWorkStore,
    };
});

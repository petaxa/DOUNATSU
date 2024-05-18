import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { TodayTask, WorkTimeRange } from "./types";

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

    return {
        projectName,
        todayWorkDate,
        todayWorkTimeRange,
        todayTasks,
        initializeUseTodayWorkStore,
    };
});

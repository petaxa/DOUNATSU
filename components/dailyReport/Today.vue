<script setup lang="ts">
import type { WorkDateTimeProps } from "../../composables/type";
import { useTodayWorkStore } from "../../stores/todayWork";
import { storeToRefs } from "pinia";

// store読み込み
const store = useTodayWorkStore();
const {
    projectName,
    todayWorkDateDetails,
    todayWorkTimeRangeDetails,
    todayTasks,
} = storeToRefs(store);

const workDateTimeStore: WorkDateTimeProps["store"] = {
    WorkDate: todayWorkDateDetails.value,
    WorkTimeRange: todayWorkTimeRangeDetails.value,
    updateWorkDate: store.updateTodayWorkDate,
    updateWorkTimeRange: store.updateTodayWorkTime,
};

const resetStore = () => {
    store.initializeUseTodayWorkStore();
};
</script>
<template>
    <p>1. プロジェクト名</p>
    <InputText type="text" v-model="projectName" />
    <p>2. 作業日</p>
    <DailyReportChildsWorkDateTime :store="workDateTimeStore" />
    <p>3. 作業内容</p>
    <DailyReportChildsTasks :tasks="todayTasks" />

    <Button label="ストアのクリア" @click="resetStore" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { WorkDateTimeProps } from "../../composables/type";
import { useTodayWorkStore } from "../../stores/todayWork";
import { storeToRefs } from "pinia";

const props = defineProps<{
    isInput: boolean;
}>();

// store読み込み
const store = useTodayWorkStore();
const {
    projectName,
    todayWorkDateDetails,
    todayWorkTimeRangeDetails,
    todayTasks,
} = storeToRefs(store);

// storeをpropsに渡せるように成型
const workDateTimeStore: WorkDateTimeProps["store"] = {
    workDate: todayWorkDateDetails.value,
    workTimeRange: todayWorkTimeRangeDetails.value,
    updateWorkDate: store.updateTodayWorkDate,
    updateWorkTimeRange: store.updateTodayWorkTime,
};

// テスト。
const resetStore = () => {
    store.initializeUseTodayWorkStore();
};
</script>
<template>
    <p>1. プロジェクト名</p>
    <div v-if="props.isInput">
        <InputText type="text" v-model="projectName" />
    </div>
    <div v-else>
        <p>{{ projectName }}</p>
    </div>
    <p>2. 作業日</p>
    <DailyReportChildsWorkDateTime
        :store="workDateTimeStore"
        :isInput="props.isInput"
    />
    <p>3. 作業内容</p>
    <DailyReportChildsTasks :tasks="todayTasks" :isInput="props.isInput" />
</template>

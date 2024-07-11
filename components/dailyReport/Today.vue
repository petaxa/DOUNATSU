<script setup lang="ts">
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
    todayWorkDateAsDate,
    todayWorkDateAsYYYYMMDD,
    todayWorkTimeRangeAsDate,
    todayWorkTimeRangeAsHHMM,
    todayTasks,
} = storeToRefs(store);

// storeをpropsに渡せるように成型
const workDateTimeStore: WorkDateTimeProps["store"] = {
    workDateAsDate: todayWorkDateAsDate,
    workDateAsYYYYMMDD: todayWorkDateAsYYYYMMDD,
    workTimeRangeAsDate: todayWorkTimeRangeAsDate,
    workTimeRangeAsHHMM: todayWorkTimeRangeAsHHMM,
    updateWorkDate: store.updateTodayWorkDate,
    updateWorkTimeRange: store.updateTodayWorkTime,
};
</script>
<template>
    <div class="today" :class="props.isInput ? 'wide' : 'thin'">
        <div class="row-1">
            <div class="project">
                <p>1. プロジェクト名</p>
                <div v-if="props.isInput">
                    <InputText type="text" v-model="projectName" />
                </div>
                <div v-else>
                    <p>{{ projectName }}</p>
                </div>
            </div>
            <div class="work-date-time">
                <DailyReportChildsWorkDateTime
                    index="2"
                    title="作業日時"
                    :store="workDateTimeStore"
                    :isInput="props.isInput"
                />
            </div>
        </div>
        <div class="tasks">
            <DailyReportChildsTasks
                index="3"
                title="作業内容"
                :tasks="todayTasks"
                :isInput="props.isInput"
            />
        </div>
    </div>
</template>

<style scoped>
.today {
    height: 100%;
}
.wide {
    width: 60%;
}
.thin {
    width: 20%;
}

.row-1 {
    display: flex;
    justify-content: space-between;
    height: 40%;
}

.tasks {
    height: 60%;
}
</style>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNextDayWorkStore } from "../../stores/nextDayWork";
import type { WorkDateTimeProps } from "../../composables/type";

const props = defineProps<{
    isInput: boolean;
}>();

// store読み込み
const store = useNextDayWorkStore();
const {
    nextDayWorkDateAsDate,
    nextDayWorkDateAsYYYYMMDD,
    nextDayWorkTimeRangeAsDate,
    nextDayWorkTimeRangeAsHHMM,
    nextDayTasks,
} = storeToRefs(store);

// storeをpropsに渡せるように成型
const workDateTimeStore: WorkDateTimeProps["store"] = {
    workDateAsDate: nextDayWorkDateAsDate,
    workDateAsYYYYMMDD: nextDayWorkDateAsYYYYMMDD,
    workTimeRangeAsDate: nextDayWorkTimeRangeAsDate,
    workTimeRangeAsHHMM: nextDayWorkTimeRangeAsHHMM,
    updateWorkDate: store.updateNextDayWorkDate,
    updateWorkTimeRange: store.updateNextDayWorkTime,
};
</script>

<template>
    <div class="next-day" :class="props.isInput ? 'wide' : 'thin'">
        <div class="work-date-time">
            <DailyReportChildsWorkDateTime
                index="4"
                title="次回作業予定日"
                :store="workDateTimeStore"
                :isInput="props.isInput"
            />
        </div>
        <div class="tasks">
            <DailyReportChildsTasks
                index="5"
                title="次回作業予定"
                :tasks="nextDayTasks"
                :inActive="['pending']"
                :isInput="props.isInput"
            />
        </div>
    </div>
</template>

<style scoped>
.next-day {
    height: 100%;
}
.wide {
    width: 60%;
}
.thin {
    width: 20%;
}

.work-date-time {
    height: 40%;
}
.tasks {
    height: 60%;
}
</style>

<script setup lang="ts">
import { createError } from "nuxt/app";
import type {
    DisplayWorkTimeRange,
    WorkDateTimeProps,
} from "../../../composables/type";

const props = defineProps<WorkDateTimeProps>();

onMounted(() => {
    // 作業日を初期化
    const dateTypeDate = props.store.workDateAsDate.value;
    if (dateTypeDate === null) {
        // 無効な値だった場合は現在日時で更新する
        const now = new Date();
        props.store.updateWorkDate(now);
        date.value = now;
    }

    // 作業時間を初期化
    if (workTimes.value.length === 0) {
        // ストアに何もなかったら現在日時で初期化
        const initRange = [
            {
                from: new Date(),
                to: new Date(),
            },
        ];
        props.store.updateWorkTimeRange(initRange);
        workTimes.value = initRange;
    }
});

/** 作業日 */
const date: Ref<Date | null> = ref(props.store.workDateAsDate.value);
watch(date, (newDate) => {
    // 作業日に変更があったらStoreを更新
    if (newDate === null) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
        });
    }
    props.store.updateWorkDate(newDate);
});

// storeの作業時間の内、from,toどちらもnullのものは除外
const filteredWorkTime = props.store.workTimeRangeAsDate.value.filter(
    (range) => range.from !== null || range.to !== null
);
/** 作業時間配列 */
const workTimes: Ref<DisplayWorkTimeRange[]> = ref(filteredWorkTime);
watch(
    workTimes,
    (newAry) => {
        // 作業時間に変更があったらStoreを更新
        props.store.updateWorkTimeRange(newAry);
    },
    { deep: true }
);

const timePlus = () => {
    workTimes.value.push({
        from: new Date("2022-11-16 00:00"),
        to: new Date("2022-11-16 00:00"),
    });
};
const timeMinus = () => {
    workTimes.value.pop();
};
</script>

<template>
    <div class="date-time" v-if="props.isInput">
        <div class="title">
            <p>{{ props.index }}. {{ props.title }}</p>
            <DailyReportChildsFormStepper @plus="timePlus" @minus="timeMinus" />
        </div>
        <Calendar
            class="date"
            v-model="date"
            dateFormat="yy/mm/dd"
            showButtonBar
        />
        <div class="times">
            <div v-for="range in workTimes">
                <Calendar v-model="range.from" timeOnly />
                <span>~</span>
                <Calendar v-model="range.to" timeOnly />
            </div>
        </div>
    </div>
    <div class="date-time" v-else>
        <p>{{ props.index }}. {{ props.title }}</p>
        <p>{{ props.store.workDateAsYYYYMMDD.value || "--/--" }}</p>
        <div v-if="props.store.workTimeRangeAsHHMM.value.length > 0">
            <div v-for="range in props.store.workTimeRangeAsHHMM.value">
                <p>{{ range.from }}<span>~</span>{{ range.to }}</p>
            </div>
        </div>
        <div v-else>
            <p>--<span> ~ </span>--</p>
        </div>
    </div>
</template>

<style scoped>
.date-time {
    height: 100%;
}
.title {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    height: 10%;
}
.date {
    /* height: 20%; */
}
.times {
    overflow-y: auto;
    height: 70%;
}
</style>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import Slider from "primevue/slider";
import Textarea from "primevue/textarea";
import { useTodayWorkStore } from "../../stores/todayWork";
import { storeToRefs } from "pinia";
import { ref, watch, onMounted, Ref } from "vue";
// import type { Ref } from "vue";
import type { WorkTimeRange } from "../../stores/types";
import { createError } from "nuxt/app";

onMounted(() => {
    // 作業日を初期化
    const dateTypeDate = dateTypeTodayWorkDate.value;
    if (dateTypeDate === null) {
        // 無効な値だった場合は現在日時で更新する
        const now = new Date();
        store.updateTodayWorkDateFromDate(now);
        date.value = now;
    } else {
        date.value = dateTypeDate;
    }
});

// store読み込み
const store = useTodayWorkStore();
const { projectName, dateTypeTodayWorkDate, todayWorkTimeRange, todayTasks } =
    storeToRefs(store);

/** 作業日 */
const date: Ref<Date | undefined> = ref(undefined);
watch(date, (newDate) => {
    // 作業日に変更があったらStoreを更新
    if (newDate === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
        });
    }
    store.updateTodayWorkDateFromDate(newDate);
});

/** 作業時間配列 */
const workTimes: Ref<{ [Prop in keyof WorkTimeRange]: Date }[]> = ref([]);
watch(
    workTimes,
    (newAry) => {
        // 作業時間に変更があったらStoreを更新
        store.updateTodayWorkTimeFromDate(newAry);
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

// 作業内容の処理

const taskPlus = () => {
    todayTasks.value.push({
        title: "",
        pending: 0,
        detail: "",
    });
};
const taskMinus = () => {
    todayTasks.value.pop();
};
</script>
<template>
    <p>1. プロジェクト名</p>
    <InputText type="text" v-model="projectName" />
    <p>2. 作業日</p>
    <Calendar v-model="date" dateFormat="yy/mm/dd" showButtonBar />
    <div class="trans-buttons">
        <Button :onclick="timePlus" icon="pi pi-plus" />
        <Button :onclick="timeMinus" icon="pi pi-minus" />
    </div>
    <div class="times" v-for="range in workTimes">
        <Calendar v-model="range.from" timeOnly />
        <Calendar v-model="range.to" timeOnly />
    </div>
    <p>3. 作業内容</p>
    <div class="trans-buttons">
        <Button :onclick="taskPlus" icon="pi pi-plus" />
        <Button :onclick="taskMinus" icon="pi pi-minus" />
    </div>
    <div class="tasks" v-for="task in todayTasks">
        <InputText type="text" v-model="task.title" />
        <p>{{ task.pending }}</p>
        <Slider v-model="task.pending" />
        <Textarea v-model="task.detail" rows="5" cols="30" />
    </div>
</template>

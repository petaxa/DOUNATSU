<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { WorkDateTimeProps } from "../composables/type";
import { useNextDayWorkStore } from "../stores/nextDayWork";
import { createStartReport } from "../composables/startReport";
import { ref, watch } from "vue";
import { useToast } from "primevue/usetoast";
import { useTodayWorkStore } from "../stores/todayWork";
const storeNextDay = useNextDayWorkStore();
const {
    nextDayWorkDateAsDate,
    nextDayWorkDateAsYYYYMMDD,
    nextDayWorkTimeRangeAsDate,
    nextDayWorkTimeRangeAsHHMM,
    nextDayTasks,
} = storeToRefs(storeNextDay);
const workDateTimeStore: WorkDateTimeProps["store"] = {
    workDateAsDate: nextDayWorkDateAsDate,
    workDateAsYYYYMMDD: nextDayWorkDateAsYYYYMMDD,
    workTimeRangeAsDate: nextDayWorkTimeRangeAsDate,
    workTimeRangeAsHHMM: nextDayWorkTimeRangeAsHHMM,
    updateWorkDate: storeNextDay.updateNextDayWorkDate,
    updateWorkTimeRange: storeNextDay.updateNextDayWorkTime,
};

// storeの値とページ内の値、ちゃんと分けよう。

const storeToday = useTodayWorkStore();
const tasks = ref(nextDayTasks.value.map((task) => ({ ...task })));
watch(tasks.value, (newTasks) => {
    storeNextDay.initializeUseNextDayWorkStore();
    storeToday.todayTasks = newTasks.map((task) => ({ ...task, pending: 0 }));
});

// 本文を作成
const dialog = ref({
    workTime: "",
    tasks: "",
    copiedText: "",
});
const dialogVisible = ref(false);
const toast = useToast();

const clickClear = () => {
    storeNextDay.initializeUseNextDayWorkStore();
};
const clickCreate = () => {
    // 日報作成のストアを全部クリア
    storeToday.initializeUseTodayWorkStore();
    storeNextDay.initializeUseNextDayWorkStore();

    // 日報作成の当日作業に作業予定を格納
    storeToday.todayTasks = tasks.value.map((task) => ({
        ...task,
        detail: "",
        pending: 0,
    }));

    // クリップボードにコピー
    navigator.clipboard.writeText(dialog.value.copiedText);

    // ダイアログ表示
    dialog.value = createStartReport(
        nextDayWorkTimeRangeAsHHMM.value,
        tasks.value
    );
    dialogVisible.value = true;

    // トースト表示
    toast.add({
        severity: "success",
        summary: "コピー成功！",
        detail: "日報をクリップボードへコピーしました",
        life: 3000,
    });
};
</script>

<template>
    <div class="page">
        <section class="content">
            <div class="input">
                <h1 class="title">【作業開始文言】</h1>
                <div class="work-date">
                    <DailyReportChildsWorkDateTime
                        index="1"
                        title="作業予定時間"
                        :store="workDateTimeStore"
                        :isInput="true"
                    />
                </div>
                <div class="tasks">
                    <DailyReportChildsTasks
                        index="2"
                        title="作業予定内容"
                        :tasks="tasks"
                        :isInput="true"
                        :inActive="['pending', 'details']"
                    />
                </div>
            </div>
        </section>
        <div class="controllers">
            <DailyReportChildsFormControllers
                @clear="clickClear"
                @create="clickCreate"
            />
        </div>
    </div>
    <Dialog
        v-model:visible="dialogVisible"
        modal
        header="【作業開始文言】"
        :style="{ width: '80%', height: '80%' }"
    >
        <p class="dialog-text">{{ dialog.workTime }}</p>
        <p class="dialog-text" v-html="dialog.tasks.replace('\n', '<br>')"></p>
    </Dialog>
    <Toast :baseZIndex="9999999999999999" />
</template>

<style scoped>
.page {
    height: 92vh;
}
.content {
    height: 100%;
    display: flex;
    justify-content: center;
}
.input {
    width: 90%;
}
.title {
    height: 8%;
}
.work-date {
    height: 42%;
}
.tasks {
    height: 50%;
}
.controllers {
    position: fixed;
    top: 90%;
    width: 100%;
}
.dialog-text {
    white-space: pre-wrap;
    margin: 1rem 0;
    overflow-wrap: break-word;
}
</style>
import { useToast } from "primevue/usetoast"; import { ref } from "vue";

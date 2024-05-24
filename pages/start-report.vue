<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { WorkDateTimeProps } from "../composables/type";
import { useNextDayWorkStore } from "../stores/nextDayWork";
import { createStartReport } from "../composables/startReport";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
const store = useNextDayWorkStore();
const {
    nextDayWorkDateAsDate,
    nextDayWorkDateAsYYYYMMDD,
    nextDayWorkTimeRangeAsDate,
    nextDayWorkTimeRangeAsHHMM,
    nextDayTasks,
} = storeToRefs(store);
const workDateTimeStore: WorkDateTimeProps["store"] = {
    workDateAsDate: nextDayWorkDateAsDate,
    workDateAsYYYYMMDD: nextDayWorkDateAsYYYYMMDD,
    workTimeRangeAsDate: nextDayWorkTimeRangeAsDate,
    workTimeRangeAsHHMM: nextDayWorkTimeRangeAsHHMM,
    updateWorkDate: store.updateNextDayWorkDate,
    updateWorkTimeRange: store.updateNextDayWorkTime,
};

// 本文を作成
const dialog = ref({
    workTime: "",
    tasks: "",
    copiedText: "",
});
const dialogVisible = ref(false);
const toast = useToast();

const clickClear = () => {
    store.initializeUseNextDayWorkStore();
};
const clickCreate = () => {
    const text = createStartReport(
        nextDayWorkTimeRangeAsHHMM.value,
        nextDayTasks.value
    );
    console.log(text);

    dialog.value = createStartReport(
        nextDayWorkTimeRangeAsHHMM.value,
        nextDayTasks.value
    );
    dialogVisible.value = true;
    navigator.clipboard.writeText(dialog.value.copiedText);

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
                        :tasks="nextDayTasks"
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
    <Toast baseZIndex="9999999999999999" />
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
}
.dialog-text {
    white-space: pre-wrap;
    margin: 1rem 0;
    overflow-wrap: break-word;
}
</style>
import { useToast } from "primevue/usetoast"; import { ref } from "vue";

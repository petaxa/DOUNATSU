<script setup lang="ts">
import { useNextDayWorkStore } from "../stores/nextDayWork";
import { useTodayWorkStore } from "../stores/todayWork";
import { createDailyReport } from "../composables/dailyReport";
import { useToast } from "primevue/usetoast";
import { storeToRefs } from "pinia";

const isToday = computed(() =>
    selectedOptions.value === "作業実績" ? true : false
);
const selectedOptions = ref("作業実績");
const inputOptions = ref(["作業実績", "作業予定"]);

const storeToday = useTodayWorkStore();
const storeNextDay = useNextDayWorkStore();
// storeをクリア
const clickClear = () => {
    storeToday.initializeUseTodayWorkStore();
    storeNextDay.initializeUseNextDayWorkStore();
};

// 本文を作成
const dialog = ref({
    projectName: "",
    todayDateTime: "",
    todayTasks: "",
    nextDayDateTime: "",
    nextDayTasks: "",
    copiedText: "",
});
const dialogVisible = ref(false);
const toast = useToast();
const {
    projectName,
    todayWorkDateAsYYYYMMDD,
    todayWorkTimeRangeAsHHMM,
    todayTasks,
} = storeToRefs(storeToday);
const { nextDayWorkDateAsYYYYMMDD, nextDayWorkTimeRangeAsHHMM, nextDayTasks } =
    storeToRefs(storeNextDay);
const clickCreate = () => {
    const input = {
        projectName: projectName.value,
        todayDateAsYYYYMMDD: todayWorkDateAsYYYYMMDD.value,
        todayTimesAsHHMM: todayWorkTimeRangeAsHHMM.value,
        todayTasks: todayTasks.value,
        nextDayDateAsYYYYMMDD: nextDayWorkDateAsYYYYMMDD.value,
        nextDayTimesAsHHMM: nextDayWorkTimeRangeAsHHMM.value,
        nextDayTasks: nextDayTasks.value,
    };
    dialog.value = createDailyReport(input);
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
        <section class="head">
            <h1 class="title">【日報】</h1>
            <SelectButton
                class="select"
                v-model="selectedOptions"
                :options="inputOptions"
                aria-labelledby="basic"
            />
        </section>
        <section class="forms">
            <dailyReportToday :isInput="isToday" />
            <dailyReportNextDay :isInput="!isToday" />
        </section>
        <section class="controllers">
            <DailyReportChildsFormControllers
                @clear="clickClear"
                @create="clickCreate"
            />
        </section>
    </div>
    <Dialog
        v-model:visible="dialogVisible"
        modal
        header="【日報】"
        :style="{ width: '80%', height: '80%' }"
    >
        <p class="dialog-text">{{ dialog.projectName }}</p>
        <p class="dialog-text">{{ dialog.todayDateTime }}</p>
        <p
            class="dialog-text"
            v-html="dialog.todayTasks.replace('\n', '<br>')"
        ></p>
        <p class="dialog-text">{{ dialog.nextDayDateTime }}</p>
        <p
            class="dialog-text"
            v-html="dialog.nextDayTasks.replace('\n', '<br>')"
        ></p>
    </Dialog>
    <Toast :baseZIndex="9999999999999999" />
</template>

<style scoped>
.page {
    height: 92vh;
}
.head {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 10%;
}
.title {
    width: 60%;
}
.select {
    width: 20%;
}

.forms {
    display: flex;
    justify-content: space-around;
    height: 90%;
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

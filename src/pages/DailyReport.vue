<script setup lang="ts">
import TaskActual from "@/components/pages/dailyReport/TaskActual.vue";
import TaskScheduled from "@/components/pages/dailyReport/TaskScheduled.vue";
import FormResolver from "@/components/utils/FormResolver.vue";
import DailyReportDialog from "@/components/pages/dailyReport/DailyReportDialog.vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import { onMounted, type Ref, ref, watch } from "vue";
import { useDailyReportStore } from "@/stores/dailyReport";
import { storeToRefs } from "pinia";
import { addDay } from "@formkit/tempo";
import { TaskRecord, TaskType, TimeRange } from "@/types/dailyReport";
import { useSettingsStore } from "@/stores/settings";
import {
  INIT_TASK_RECORD,
  TASK_TYPE_ACTUAL,
  TASK_TYPE_SCHEDULED,
} from "@/const/dailyReport";
import { createDailyReport } from "@/business/letterBody/createLetterBody";
import { useToast } from "primevue/usetoast";

// ストア読み込み
const { initialTaskFields } = storeToRefs(useSettingsStore());
const dailyReportStore = useDailyReportStore();
const dailyReportStoreRef = storeToRefs(dailyReportStore);

// プロパティ
/** プロジェクト名 */
const projectName: Ref<string> = ref("");
/** 作業実績日 */
const taskActualDate: Ref<Date> = ref(new Date());
/** 作業実績作業時間 */
const taskActualTimeRange: Ref<TimeRange[]> =
  dailyReportStoreRef.taskActualTimeRange;
/** 作業実績レコード */
const taskActualRecords: Ref<TaskRecord[]> =
  dailyReportStoreRef.taskActualRecords;
/** 作業予定日 */
const taskScheduledDate: Ref<Date> = ref(addDay(taskActualDate.value, 1));
/** 作業予定作業時間 */
const taskScheduledTimeRange: Ref<TimeRange[]> =
  dailyReportStoreRef.taskScheduledTimeRange;
/** 作業予定レコード */
const taskScheduledRecords: Ref<TaskRecord[]> =
  dailyReportStoreRef.taskScheduledRecords;

// 作業レコードを設定の初期表示個数まで用意する
onMounted(() => {
  while (taskActualRecords.value.length < initialTaskFields.value) {
    taskActualRecords.value.push({ ...INIT_TASK_RECORD });
  }
  while (taskScheduledRecords.value.length < initialTaskFields.value) {
    taskScheduledRecords.value.push({ ...INIT_TASK_RECORD });
  }
});

// 画面の状態
/** 入力中種別名 */
const currentTaskType: Ref<TaskType> = ref(TASK_TYPE_ACTUAL);
/** ダイアログの表示可否 */
const dialogVisible: Ref<boolean> = ref(false);
/** ダイアログ表示文字列 */
const dialogText: Ref<string> = ref("");

// Toast有効化
const toast = useToast();

// イベント
const clickClear = (): void => {
  dailyReportStore.initializeDailyReportStore();
};
const clickCreate = (): void => {
  // 本文作成
  const letter = createDailyReport(
    projectName.value,
    taskActualDate.value,
    taskActualTimeRange.value,
    taskActualRecords.value,
    taskScheduledDate.value,
    taskScheduledTimeRange.value,
    taskScheduledRecords.value
  );

  // ダイアログ表示
  dialogText.value = letter;
  dialogVisible.value = true;

  // クリップボードにコピー
  navigator.clipboard.writeText(letter);

  // Toast表示
  toast.add({
    severity: "success",
    summary: "コピー成功！",
    detail: "日報をクリップボードへコピーしました",
    life: 3000,
  });
};
</script>

<template>
  <DefaultLayout>
    <div class="page">
      <section class="head">
        <h1 class="title">【日報】</h1>
        <SelectButton
          class="select"
          v-model="currentTaskType"
          :options="[TASK_TYPE_ACTUAL, TASK_TYPE_SCHEDULED]"
          aria-labelledby="basic"
        />
      </section>
      <section class="forms">
        <TaskActual
          :task-type="currentTaskType"
          v-model:project-name="projectName"
          v-model:task-actual-date="taskActualDate"
          v-model:task-actual-time-range="taskActualTimeRange"
          v-model:task-actual-records="taskActualRecords"
        />
        <TaskScheduled
          :taskType="currentTaskType"
          v-model:task-scheduled-date="taskScheduledDate"
          v-model:task-scheduled-time-range="taskScheduledTimeRange"
          v-model:task-scheduled-records="taskScheduledRecords"
        />
      </section>
      <section class="controllers">
        <FormResolver @clear="clickClear" @create="clickCreate" />
      </section>
    </div>
    <Dialog
      v-model:visible="dialogVisible"
      :modal="true"
      :style="{ width: '80%', height: '80%' }"
    >
      <DailyReportDialog :text="dialogText" />
    </Dialog>
    <Toast :baseZIndex="9999999999999999" />
  </DefaultLayout>
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
</style>

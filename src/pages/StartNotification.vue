<script setup lang="ts">
import WorkDateTime from "@/components/utils/WorkDateTime.vue";
import WorkTaskRecord from "@/components/utils/WorkTaskRecord.vue";
import FormResolver from "@/components/utils/FormResolver.vue";
import StartNotificationDialog from "@/components/pages/startNotification/StartNotificationDialog.vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import { addHour } from "@formkit/tempo";
import {
  TASK_SCHEDULED_RECORDS_INIT,
  useDailyReportStore,
} from "@/stores/dailyReport";
import { storeToRefs } from "pinia";
import { onMounted, Ref, ref } from "vue";
import { TaskRecord, TimeRange } from "@/types/dailyReport";
import { useToast } from "primevue/usetoast";
import { INIT_TASK_RECORD } from "@/const/dailyReport";
import { useSettingsStore } from "@/stores/settings";
import { createStartNotification } from "@/business/letterBody/createLetterBody";

// ストア読み込み
const { initialTaskFields } = storeToRefs(useSettingsStore());
const dailyReportStore = useDailyReportStore();
const dailyReportStoreRef = storeToRefs(dailyReportStore);

// プロパティ
/** 作業予定作業時間 */
const taskScheduledTimeRange: Ref<TimeRange[]> = ref(
  dailyReportStore.taskScheduledTimeRange.map((copy) => ({
    start: copy.start,
    end: copy.end,
  }))
);
/** 作業予定レコード */
const taskScheduledRecords: Ref<TaskRecord[]> = ref(
  dailyReportStore.taskScheduledRecords.map((copy) => ({
    title: copy.title,
    detail: copy.detail,
  }))
);

// ローカルな定数、変数を定義
/** 追加された作業時間の初期値 */
const addedTimeRange = {
  start: new Date(),
  end: addHour(new Date(), 2),
};

// 作業レコードを設定の初期表示個数まで用意する
onMounted(() => {
  while (taskScheduledRecords.value.length < initialTaskFields.value) {
    taskScheduledRecords.value.push({ ...INIT_TASK_RECORD });
  }
});

// 画面の状態
/** ダイアログの表示可否 */
const dialogVisible: Ref<boolean> = ref(false);
/** ダイアログ表示文字列 */
const dialogText: Ref<string> = ref("");

// Toast有効化
const toast = useToast();

// イベント
const clickClear = () => {
  // NOTE: このクリアでこのページで操作しないデータまでクリアしてよいのか検討
  // 使用感をみて判断したい。
  dailyReportStore.initializeDailyReportStore();
};
const clickCreate = () => {
  // ストアを更新
  dailyReportStore.initializeDailyReportStore();
  dailyReportStoreRef.taskActualTimeRange.value = taskScheduledTimeRange.value;
  dailyReportStoreRef.taskActualRecords.value = taskScheduledRecords.value;

  dailyReportStoreRef.taskScheduledRecords.value =
    TASK_SCHEDULED_RECORDS_INIT();
  console.log("TASK_SCHEDULED_RECORDS_INIT", TASK_SCHEDULED_RECORDS_INIT());

  // 本文作成
  const letter = createStartNotification(
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
    detail: "作業開始文言をクリップボードへコピーしました",
    life: 3000,
  });
};
</script>
<template>
  <DefaultLayout>
    <div class="page">
      <section class="content">
        <div class="input">
          <h1 class="title">【作業開始文言】</h1>
          <div class="work-date">
            <WorkDateTime
              index="1"
              title="作業予定時間"
              :addedTimeRange="addedTimeRange"
              :is-active-date="false"
              v-model:time-range="taskScheduledTimeRange"
            />
          </div>
          <div class="tasks">
            <WorkTaskRecord
              index="2"
              title="作業予定内容"
              :is-active-details="false"
              v-model:task-records="taskScheduledRecords"
            />
          </div>
        </div>
      </section>
      <div class="controllers">
        <FormResolver @clear="clickClear" @create="clickCreate" />
      </div>
    </div>
    <Dialog
      v-model:visible="dialogVisible"
      :modal="true"
      :style="{ width: '80%', height: '80%' }"
      header="【作業開始文言】"
    >
      <StartNotificationDialog :text="dialogText" />
    </Dialog>
    <Toast :baseZIndex="9999999999999999" />
  </DefaultLayout>
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

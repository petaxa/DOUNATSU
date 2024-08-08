<script setup lang="ts">
import WorkDateTime from "@/components/utils/WorkDateTime.vue";
import WorkTaskRecord from "@/components/utils/WorkTaskRecord.vue";
import { TASK_TYPE_SCHEDULED } from "@/const/dailyReport";
import { TaskRecord, TaskType, TimeRange } from "@/types/dailyReport";
import { addHour, format } from "@formkit/tempo";
import { computed } from "vue";

const props = defineProps<{ taskType: TaskType }>();
const isScheduled = computed(() => props.taskType === TASK_TYPE_SCHEDULED);

// v-model受け取り
const taskScheduledDate = defineModel<Date>("taskScheduledDate");
const taskScheduledTimeRange = defineModel<TimeRange[]>(
  "taskScheduledTimeRange"
);
const taskScheduledRecords = defineModel<TaskRecord[]>("taskScheduledRecords");

// ローカルな定数、変数を定義
const DATE_TIME_INDEX = "4";
const DATE_TIME_TITLE = "次回作業予定日時";
const RECORD_INDEX = "5";
const RECORD_TITLE = "次回作業予定";
const addedTimeRange = {
  start: new Date(),
  end: addHour(new Date(), 2),
};
</script>

<template>
  <div class="next-day" :class="isScheduled ? 'wide' : 'thin'">
    <div class="work-date-time">
      <div v-if="isScheduled">
        <WorkDateTime
          :index="DATE_TIME_INDEX"
          :title="DATE_TIME_TITLE"
          :addedTimeRange="addedTimeRange"
          :is-active-date="true"
          v-model:date="taskScheduledDate"
          v-model:time-range="taskScheduledTimeRange"
        />
      </div>
      <div v-else>
        <p>{{ `${DATE_TIME_INDEX}. ${DATE_TIME_TITLE}` }}</p>
        <p>
          {{ taskScheduledDate ? format(taskScheduledDate, "short") : "--" }}
        </p>
        <p v-for="range in taskScheduledTimeRange">
          {{
            `${format(range.start, { time: "short" })} ~ ${format(range.end, {
              time: "short",
            })}`
          }}
        </p>
      </div>
    </div>
    <div class="tasks">
      <div v-if="isScheduled">
        <WorkTaskRecord
          :isActiveDetails="false"
          :index="RECORD_INDEX"
          :title="RECORD_TITLE"
          v-model:task-records="taskScheduledRecords"
        />
      </div>
      <div v-else>
        <p>{{ `${RECORD_INDEX}.${RECORD_TITLE}` }}</p>
        <div v-for="record in taskScheduledRecords">
          <p>{{ record.title }}</p>
          <p>{{ record.detail }}</p>
        </div>
      </div>
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
import { TASK_TYPE_ACTUAL } from "@/consts/dailyReport"; import { computed }
from "vue";

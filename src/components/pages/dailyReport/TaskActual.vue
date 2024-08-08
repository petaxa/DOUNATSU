<script setup lang="ts">
import WorkDateTime from "@/components/utils/WorkDateTime.vue";
import WorkTaskRecord from "@/components/utils/WorkTaskRecord.vue";
import type { TaskRecord, TaskType, TimeRange } from "@/types/dailyReport";
import { TASK_TYPE_ACTUAL } from "@/const/dailyReport";
import { computed } from "vue";
import { addHour, format } from "@formkit/tempo";

const props = defineProps<{ taskType: TaskType }>();
const isActual = computed(() => props.taskType === TASK_TYPE_ACTUAL);

// v-model受け取り
const projectName = defineModel<string>("projectName");
const taskActualDate = defineModel<Date>("taskActualDate");
const taskActualTimeRange = defineModel<TimeRange[]>("taskActualTimeRange");
const taskActualRecords = defineModel<TaskRecord[]>("taskActualRecords");

// ローカルな定数、変数を定義
const DATE_TIME_INDEX = "2";
const DATE_TIME_TITLE = "作業日時";
const RECORD_INDEX = "3";
const RECORD_TITLE = "作業内容";
const addedTimeRange = {
  start: new Date(),
  end: addHour(new Date(), 2),
};
</script>
<template>
  <div class="today" :class="isActual ? 'wide' : 'thin'">
    <div class="row-1">
      <div class="project">
        <p>1. プロジェクト名</p>
        <div v-if="isActual">
          <InputText type="text" v-model="projectName" />
        </div>
        <div v-else>
          <p>{{ projectName }}</p>
        </div>
      </div>
      <div class="work-date-time">
        <div v-if="isActual">
          <WorkDateTime
            :index="DATE_TIME_INDEX"
            :title="DATE_TIME_TITLE"
            :addedTimeRange="addedTimeRange"
            :is-active-date="true"
            v-model:date="taskActualDate"
            v-model:time-range="taskActualTimeRange"
          />
        </div>
        <div v-else>
          <p>{{ `${DATE_TIME_INDEX}.${DATE_TIME_TITLE}` }}</p>
          <p>{{ taskActualDate ? format(taskActualDate, "short") : "--" }}</p>
          <p v-for="range in taskActualTimeRange">
            {{
              `${format(range.start, { time: "short" })} ~ ${format(range.end, {
                time: "short",
              })}`
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="tasks">
      <div v-if="isActual">
        <WorkTaskRecord
          :index="RECORD_INDEX"
          :title="RECORD_TITLE"
          :is-active-details="true"
          v-model:task-records="taskActualRecords"
        />
      </div>
      <div v-else>
        <p>{{ `${RECORD_INDEX}.${RECORD_TITLE}` }}</p>
        <div v-for="record in taskActualRecords">
          <p>{{ record.title }}</p>
          <p>{{ record.detail }}</p>
        </div>
      </div>
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

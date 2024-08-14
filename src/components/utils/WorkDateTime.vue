<script setup lang="ts">
import { TimeRange } from "@/types/dailyReport";
import FormStepper from "@/components/utils/FormStepper.vue";

const props = defineProps<{
  index: string;
  title: string;
  addedTimeRange: TimeRange;
  isActiveDate: boolean;
}>();

const date = defineModel<Date>("date");
const timeRange = defineModel<TimeRange[]>("timeRange");

const addTime = () => {
  timeRange.value?.push(props.addedTimeRange);
};
const popTime = () => {
  timeRange.value?.pop();
};
</script>

<template>
  <div class="date-time">
    <div class="title">
      <p>{{ props.index }}. {{ props.title }}</p>
      <FormStepper @add="addTime" @pop="popTime" />
    </div>

    <div v-if="isActiveDate">
      <DatePicker
        class="date"
        v-model="date"
        dateFormat="yy/mm/dd"
        showButtonBar
      />
    </div>
    <div class="times">
      <div v-for="range in timeRange">
        <DatePicker v-model="range.start" timeOnly />
        <span>~</span>
        <DatePicker v-model="range.end" timeOnly />
      </div>
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
.times {
  overflow-y: auto;
  height: 70%;
}
</style>

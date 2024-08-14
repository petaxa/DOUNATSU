<script setup lang="ts">
import { TaskRecord } from "@/types/dailyReport";
import FormStepper from "./FormStepper.vue";

// inActiveに登録されているものは外して処理を行う。
const props = defineProps<{
  isActiveDetails: Boolean;
  index: string;
  title: string;
}>();

const taskRecords = defineModel<TaskRecord[]>("taskRecords");

const addTask = () => {
  taskRecords.value?.push({
    title: "",
    detail: "",
  });
};
const popTask = () => {
  taskRecords.value?.pop();
};
</script>

<template>
  <div class="outer">
    <div class="tasks">
      <div class="input-row-1 title">
        <p>{{ props.index }}. {{ props.title }}</p>
        <FormStepper @add="addTask" @pop="popTask" />
      </div>
      <div class="inputs">
        <div v-for="(task, i) in taskRecords">
          <div class="first-row">
            <div class="input-title">
              <p>{{ index }}-{{ i + 1 }}.</p>
              <InputText type="text" v-model="task.title" />
            </div>
          </div>
          <Textarea
            v-if="props.isActiveDetails"
            class="detail"
            v-model="task.detail"
            rows="5"
            cols="30"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
Textarea {
  height: 8rem;
}

.input-row-1 {
  display: flex;
  align-items: center;
}

.first-row {
  display: flex;
  align-items: first;
  margin: 1rem 0;
}

.pending {
  width: 35%;
}
.pending > p {
  margin-bottom: 0.3rem;
}

.input-title {
  width: 60%;
  display: flex;
  align-items: center;
}
.input-title > .p-inputtext {
  width: 80%;
}
.input-title > p {
  margin: 0.5rem;
}

.detail {
  width: 95%;
  margin-left: 2.5rem;
}

.text-detail {
  overflow-wrap: break-word;
  word-break: auto-phrase;
}

.title {
  height: 5%;
}
.inputs {
  overflow-y: auto;
  height: 95%;
}
.outer {
  height: 100%;
}
.tasks {
  height: 100%;
}
</style>

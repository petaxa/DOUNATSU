<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Task } from "../../../stores/types";

// inActiveに登録されているものは外して処理を行う。
const props = defineProps<{
    tasks: Task[];
    inActive?: "pending"[];
}>();

const isActive = ref({
    pending: true,
});
onMounted(() => {
    // コンテンツのアクティブを判定
    props.inActive?.forEach((content) => {
        switch (content) {
            case "pending":
                isActive.value.pending = false;
        }
    });
});

const taskPlus = () => {
    props.tasks.push({
        title: "",
        pending: isActive.value.pending ? 0 : undefined,
        detail: "",
    });
};
const taskMinus = () => {
    props.tasks.pop();
};
</script>
<template>
    <div class="trans-buttons">
        <Button :onclick="taskPlus" icon="pi pi-plus" />
        <Button :onclick="taskMinus" icon="pi pi-minus" />
    </div>
    <div class="tasks" v-for="task in props.tasks">
        <InputText type="text" v-model="task.title" />
        <p v-if="isActive.pending">{{ task.pending }}</p>
        <Slider v-if="isActive.pending" v-model="task.pending" />
        <Textarea v-model="task.detail" rows="5" cols="30" />
    </div>
</template>

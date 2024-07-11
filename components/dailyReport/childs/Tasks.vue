<script setup lang="ts">
import type { Task } from "../../../stores/types";
import { useSettingsStore } from "../../../stores/settings";
import { storeToRefs } from "pinia";

// inActiveに登録されているものは外して処理を行う。
const props = defineProps<{
    tasks: Task[];
    inActive?: ("pending" | "details")[];
    index: string;
    title: string;
    isInput: boolean;
}>();

const isActive = ref({
    pending: true,
    details: true,
});

// 設定読み込み
const settings = useSettingsStore();
const { initialTaskInputCount } = storeToRefs(settings);

onMounted(() => {
    // コンテンツのアクティブを判定
    props.inActive?.forEach((content) => {
        switch (content) {
            case "pending":
                isActive.value.pending = false;
                break;
            case "details":
                isActive.value.details = false;
                break;
        }
    });

    // デフォルト表示個数まで充填
    while (props.tasks.length < initialTaskInputCount.value) {
        props.tasks.push({
            title: "",
            pending: isActive.value.pending ? 0 : undefined,
            detail: "",
        });
    }
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
    <div class="outer">
        <div class="tasks" v-if="props.isInput">
            <div class="input-row-1 title">
                <p>{{ props.index }}. {{ props.title }}</p>
                <DailyReportChildsFormStepper
                    @plus="taskPlus"
                    @minus="taskMinus"
                />
            </div>
            <div class="inputs">
                <div v-for="(task, i) in props.tasks">
                    <div class="first-row">
                        <div class="input-title">
                            <p>{{ index }}-{{ i + 1 }}.</p>
                            <InputText type="text" v-model="task.title" />
                        </div>
                        <div class="pending">
                            <p v-if="isActive.pending">{{ task.pending }}</p>
                            <Slider
                                v-if="isActive.pending"
                                v-model="task.pending"
                            />
                        </div>
                    </div>
                    <Textarea
                        v-if="isActive.details"
                        class="detail"
                        v-model="task.detail"
                        rows="5"
                        cols="30"
                    />
                </div>
            </div>
        </div>
        <div class="tasks" v-else>
            <p class="title">{{ props.index }}. {{ props.title }}</p>
            <div class="inputs">
                <div v-for="(task, i) in props.tasks">
                    <p>{{ index }}-{{ i + 1 }}. {{ task.title }}</p>
                    <p
                        v-if="
                            isActive.pending && task.pending && task.pending > 0
                        "
                    >
                        {{ task.pending }}
                    </p>
                    <p v-if="isActive.details" class="text-detail">
                        {{ task.detail }}
                    </p>
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

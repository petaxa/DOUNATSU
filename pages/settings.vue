<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "../stores/settings";
import { watch } from "vue";
import { useToast } from "primevue/usetoast";

const settings = useSettingsStore();

const { initialTaskInputCount } = storeToRefs(settings);
// 設定変数が更新されたらtoastでその旨を表示する
const toast = useToast();
watch(initialTaskInputCount, (newCount) => {
    toast.add({
        severity: "success",
        summary: "設定更新",
        detail: `作業内容入力欄デフォルト表示個数を${newCount}に変更しました`,
        life: 3000,
    });
});
</script>
<template>
    <div class="page">
        <section class="content">
            <div class="settings">
                <h1 class="title">Settings</h1>
                <div class="initial-task-input-count">
                    <p>作業内容入力欄デフォルト表示個数</p>
                    <InputNumber
                        v-model="initialTaskInputCount"
                        inputId="integeronly"
                    />
                </div>
            </div>
        </section>
    </div>
    <Toast />
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
.settings {
    width: 90%;
}
.title {
    height: 10%;
    font-size: 2rem;
}
</style>

<script setup lang="ts">
import { computed, ref } from "vue";

const isInput = computed(() =>
    selectedOptions.value === "作業実績" ? true : false
);
const selectedOptions = ref("作業実績");
const inputOptions = ref(["作業実績", "作業予定"]);
</script>

<template>
    <SelectButton
        v-model="selectedOptions"
        :options="inputOptions"
        aria-labelledby="basic"
    />
    <h1>【日報】</h1>
    <dailyReportToday :isInput="isInput" />
    <Button label="ストアのクリア" @click="resetStore" />
</template>

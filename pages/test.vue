<script setup lang="ts">
import { ref, watch } from "vue";

const now = new Date();
const date = ref(null);
const time = ref();

watch(date, () => {
    console.log("check date", date.value);
    console.log("check date", typeof date.value);
});

watch(time, () => {
    console.log("check time", time.value);
    console.log("check time", typeof time.value);
});

</script>

<template>
    <h2>Date Picker</h2>
    <Calendar v-model="date" dateFormat="yy/mm/dd" showButtonBar />

    <h2>timeonly</h2>
    <Calendar v-model="time" timeOnly />
</template>

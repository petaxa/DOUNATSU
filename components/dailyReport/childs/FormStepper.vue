<script setup lang="ts">
const emit = defineEmits(["plus", "minus"]);

const clickPlus = () => {
    emit("plus");
};
const clickMinus = () => {
    emit("minus");
};
</script>

<template>
    <div class="trans-buttons">
        <Button @click="clickPlus" icon="pi pi-plus" />
        <Button @click="clickMinus" icon="pi pi-minus" />
    </div>
</template>

<style scoped>
.trans-buttons {
    width: 15%;
    display: flex;
    justify-content: space-around;
}
.p-button {
    height: 2rem;
    width: 2rem;
}
</style>

<script setup lang="ts">
const emits = defineEmits(["plus", "minus"]);

const clickPlus = () => {
    emits("plus");
};
const clickMinus = () => {
    emits("minus");
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
    width: 15rem;
    display: flex;
    justify-content: space-around;
}
.p-button {
    height: 2rem;
    width: 2rem;
}
</style>

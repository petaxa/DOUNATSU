<script setup lang="ts">
const emits = defineEmits<{
  clear: [];
  create: [];
}>();

const clickClear = () => {
  emits("clear");
};
const clickCreate = () => {
  emits("create");
};
</script>

<template>
  <div class="controllers">
    <div class="buttons">
      <Button label="クリア" @click="clickClear" />
      <Button label="作成" @click="clickCreate" />
    </div>
  </div>
</template>

<style scoped>
.controllers {
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.buttons {
  margin-right: 3%;
  width: 20%;
  display: flex;
  justify-content: space-between;
}
.buttons > .p-button {
  height: 3rem;
  width: 45%;
}
</style>

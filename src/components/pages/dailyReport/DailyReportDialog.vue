<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ text: string }>();

// 受け取ったtextを、改行文字で分割、v-forでpを出力する。
const textAry = ref(props.text.split("\n"));
</script>
<template>
  <div class="dialog">
    <div>
      <p v-for="text in textAry" class="dialog-text">{{ text }}</p>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dialog-text {
  white-space: pre-wrap;
  margin: 1rem 0;
  overflow-wrap: break-word;
}
</style>

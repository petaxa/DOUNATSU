<script setup lang="ts">
import { WindowAction } from "./electron/type";

function windowControl(action: WindowAction) {
  window.electron.windowControl(action);
}
</script>

<template>
  <div class="window-controls">
    <i class="pi pi-minus" @click="windowControl('minimize')"></i>
    <i class="pi pi-stop" @click="windowControl('maximize')"></i>
    <i class="pi pi-times" @click="windowControl('close')"></i>
  </div>
  <RouterView />
</template>

<style>
.window-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #333;
  padding: 10px;
  position: fixed;
  height: 35px;
  width: 100%;
  -webkit-app-region: drag;
}

.window-controls i {
  color: white;
  cursor: pointer;
  margin: 0 10px;
  -webkit-app-region: no-drag;
}
</style>

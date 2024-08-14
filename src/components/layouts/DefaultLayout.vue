<script setup lang="ts">
import { PURODUCT_NAME } from "@/const/donatsu";
</script>

<template>
  <div class="layoutvue">
    <header>
      <div class="title">
        <router-link class="nuxt-link" to="/">
          <p class="title-text">{{ PURODUCT_NAME }}</p>
        </router-link>
      </div>
    </header>
    <slot />
  </div>
</template>
<style scoped>
.layoutvue {
  padding-top: 35px;
  height: 100%;
}
header {
  display: flex;
  height: 8vh;
  align-items: center;
}
.title {
  width: fit-content;
}
.title-text {
  margin-left: 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: black;
}
.nuxt-link {
  text-decoration: none;
  width: fit-content;
}
</style>

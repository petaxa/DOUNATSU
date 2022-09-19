<script setup lang="ts">
import router from '@/router'

const prev = () => {
  router.push('/')
}
</script>
<template>
    <div class="hoge">
        <div class="component">
        <img id="preparateImg" alt="preparate logo" src="../assets/logo.png">
        <p id="preparateText">準備中</p>
        <button class="button-content" @click="prev()">戻る</button>
    </div>
    </div>
</template>
<style>
    #preparateText {
        color: white;
        font-size: 40px;
    }
    #preparateImg {
        width: 300px;
        height: auto;
    }
</style>

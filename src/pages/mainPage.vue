<script setup>
import router from '../router'
// import { ref } from 'vue'

// 日報作成画面へ移動
const goNippou = () => {
  router.push('/createReport')
}

// 準備中画面へ移動
const goPreparation = () => {
  router.push('/preparation')
}

// 作業開始文言作成画面へ移動
const goStartChat = () => {
  router.push('/startChat')
}

// 設定画面へ移動
const goSetting = () => {
  router.push('/setting')
}
</script>

<template>
  <div id="content">
    <button @click="goNippou" class="mainpage-button">日報作成</button>
    <button @click="goStartChat" class="mainpage-button">作業開始文言作成</button>
    <div class="half-button">
      <button @click="goSetting" class="mainpage-half-button" style="margin-right:10px;">設定</button>
      <button @click="goPreparation" class="mainpage-half-button">内容照会</button>
    </div>
  </div>
</template>

<style scoped>
/* コンテンツ欄 */
#content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25vh;
}

/* 横幅Max */
.mainpage-button {
  width: 550px;
  height: 100px;
  color: #000000;
  font-size: 25px;
  margin-bottom: 20px;
}

/* 横幅Half */
.mainpage-half-button {
  width: 270px;
  height: 100px;
  color: #000000;
  font-size: 25px;
}
</style>

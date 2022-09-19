<script setup>
import router from '../router'
import { ref } from 'vue'

// 日報作成画面へ移動
const goNippou = () => {
  router.push('/createReport')
}

// 準備中画面へ移動
const goPreparation = () => {
  router.push('/preparation')
}

// メニューのホバー処理
const isMenuBtn = ref(false) // メニューボタン表示フラグ
const onContent = () => {
  isMenuBtn.value = true
}
const leaveContent = () => {
  isMenuBtn.value = false
}
</script>

<template>
  <div id="title">
    <h1 id="title-txt">mainPage</h1>
  </div>
  <div id="above">
    <button @click="goNippou()" id="nippou" class="below-content button-content">
      <img src="../assets/logo.png">
      <p class="text">日報作成</p>
    </button>
    <div @mouseenter="onContent" @mouseleave="leaveContent" id="menu" class="button-content">
      <div v-show="!isMenuBtn">
        <img src="../assets/logo.png">
        <p class="text">メニュー</p>
      </div>
      <div id="menuBtns" v-show="isMenuBtn">
        <button>111</button>
        <button>setup</button>
        <button>222</button>
      </div>
    </div>
  </div>
  <div id="below">
    <div id="below-left">
      <button @click="goPreparation()" class="below-content button-content">
        <img src="../assets/logo.png">
        <p class="text">課題登録/完了</p>
      </button>
      <button @click="goPreparation()" id="kadaiSearch" class="below-content button-content">
        <img src="../assets/logo.png">
        <p class="text">課題検索</p>
      </button>
    </div>
    <button @click="goPreparation()" id="below-right" class="below-content button-content">
      <img src="../assets/logo.png">
      <p class="text">課題一覧</p>
    </button>
  </div>
</template>
<style>
#title {
  height: 70px;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

#above {
  height: 200px;
  display: flex;
  justify-content: space-between;
}

#nippou {
  width: 70%;
  min-width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px 0 20px;
}

#menu {
  width: 10%;
  min-width: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 40px 0 10px;
}

#below {
  display: flex;
  height: 250px;
  margin-top: 30px;
  justify-content: space-between;
}

#below-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
  min-width: 150px;
  margin-right: 10px;
  margin: 0 10px 0 20px;
}

#below-right {
  width: 40%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 40px 0 10px;
}

.below-content {
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text {
  width: auto;
  color: white;
}

.button-content {
  border-radius: 15px;
  border: medium solid #74b1be;
  display: inline-block;
}

.button-content:hover {
  opacity: 70%;
}

img {
  width: 50px;
  height: 50px;
}

p {
  margin: 0;
  font-size: 15px;
}

#menuBtns {
  display: flex;
  flex-direction: column;
}

#menuBtns button {
  margin: 10px;
  width: 80px;
  height: 40px;
  background-color: #74b1be;
}
</style>

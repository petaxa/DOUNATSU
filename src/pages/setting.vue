<script setup lang="ts">
import { getSetting, setSetting } from '@/lib/localStorage'
import router from '@/router'
import { ref, watch } from 'vue'

// 戻るボタン押下時処理
const clickBack = () => {
  router.push('/')
}

// 設定
// 初期値はmain.tsで設定
const isAutocomplete = getSetting('isAutocomplete') ? ref(true) : ref(false) // null回避
const isLight = getSetting('isLight') ? ref(true) : ref(false) // null回避
const inputNum = ref(getSetting('inputNum'))

// 設定が変更されたらlocalStorageを更新
watch([isAutocomplete, isLight, inputNum], () => {
  if (isAutocomplete.value === undefined || isLight.value === undefined || inputNum.value === undefined) return
  setSetting('isAutocomplete', isAutocomplete.value)
  setSetting('isLight', isLight.value)
  setSetting('inputNum', inputNum.value)
})

</script>

<template>
  <button class="icon" @click="clickBack">
    <font-awesome-icon icon="fa-regular fa-arrow-alt-circle-left" />
  </button>
  <div class="content">
    <div style="display:flex;">
      <p id="title">setting</p>
    </div>
    <div class="line"></div>
    <div class="setting-contents">
      <span class="setting-text">作業内容自動入力</span>
      <input v-model="isAutocomplete" class="switch" type="checkbox" id="is-auto-input-switch" /><label
        for="is-auto-input-switch">Toggle</label>
    </div>
    <!-- テーマ設定は一旦外す。また今度やる。
      <div class="line"></div>
    <div class="setting-contents">
      <p class="setting-text">テーマ選択</p>
      <input v-model="isLight" class="switch" type="checkbox" id="theme-switch" /><label
        for="theme-switch">Toggle</label>
    </div> -->
    <div class="line"></div>
    <div class="setting-contents">
      <span class="setting-text">日報作業内容デフォルト個数</span>
      <input v-model="inputNum" type="number" class="input-num">
    </div>
  </div>
</template>

<style scoped>
/* コンテンツ全体 */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3em;
}

/* タイトル */
#title {
  font-size: 40px;
  margin: 0;
}

/* 設定入力欄 */
.setting-contents {
  width: 390px;
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}

/* 設定テキスト */
.setting-text {
  font-size: 20px;
  /* margin-right: 150px; */
}

/* toggle button */
.switch {
  height: 0;
  width: 0;
  visibility: hidden;
  display: none;
}
label {
  cursor: pointer;
  text-indent: -9999px;
  width: 70px;
  height: 35px;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;
}
label:after {
  content: '';
  position: absolute;
  top: 2.3px;
  left: 2.3px;
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
  transition: 0.3s;
}
input:checked+label {
  background: #74b1be;
}
input:checked+label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}
label:active:after {
  width: 43px;
}

/* 数字入力欄 */
.input-num {
  width: 4em;
}

/* 区切り線 */
.line {
  margin-bottom: 20px;
}

</style>

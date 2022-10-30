<script setup lang="ts">
import router from '@/router'
// 戻るボタン押下時処理
const clickBack = () => {
  router.push('/')
}

</script>

<template>
  <div class="content">
    <div style="display:flex;">
      <p id="title">setting</p>
      <div class="back-button setting-backBtn">
        <button @click="clickBack" class="close icon"></button>
      </div>
    </div>
    <div class="line"></div>
    <div class="setting-contents">
      <span class="setting-text">作業内容自動入力</span>
      <input type="checkbox" id="is-auto-input-switch" /><label for="is-auto-input-switch">Toggle</label>
    </div>
    <div class="line"></div>
    <div class="setting-contents">
      <p class="setting-text">テーマ選択</p>
      <input type="checkbox" id="theme-switch" /><label for="theme-switch">Toggle</label>
    </div>
    <div class="line"></div>
    <div class="setting-contents">
      <span class="setting-text">日報作業内容デフォルト個数</span>
      <input type="checkbox" id="switch" /><label for="switch">Toggle</label>
    </div>
  </div>
</template>

<style scoped>
/* toggle button */
input {
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

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25vh;
}

#title {
  font-size: 40px;
  margin: 0;
}

.setting-contents {
  width: 390px;
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
}

.setting-text {
  font-size: 20px;
  /* margin-right: 150px; */
}
.setting-backBtn{
  width: 15em;
}
.line{
  margin-bottom: 20px;
}
</style>

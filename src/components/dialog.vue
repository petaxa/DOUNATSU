<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  msg: String
})

const fullTexts = props.msg.replace('<p>', '').replace('</p>', '').replace('ーーーーーーーーーーーーーーーーー', '')
  .split('\n')
  .filter(msg => msg !== '')
console.log(fullTexts)
</script>

<template>
  <div id="dialogOuter">
    <div id="dialogWindow">
      <div id="dialogClose">
        <font-awesome-icon icon="fa-regular fa-circle-xmark" />
      </div>
      <h2 id="dialogTitle">日報</h2>
      <div v-for="text in fullTexts" :key="text" id="dialogTexts">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style>
#dialogOuter {
  height: 45em;
  width: 55em;
  border: 5px solid #74b1be;
  background-color: black;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 10px;
  text-align: center;
  overflow-y: scroll;
}

#dialogWindow {
  display: block;
}

#dialogTexts {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  margin-left: 17em;
}

#dialogClose {
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px 0 0;
}

#dialogTitle {
  margin-top: 0;
}
</style>

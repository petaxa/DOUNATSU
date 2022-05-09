<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  text1: String,
  text2: String
})
</script>

<template>
    <div id="dialogOuter">
        <div id="dialogWindow">
            <div id="dialogClose">
                <p>X</p>
            </div>
            <h2 id="dialogTitle">日報</h2>
            <div id="dialogTexts">
                <p v-html="props.text1"></p>
                <p v-html="props.text2"></p>
            </div>
        </div>
    </div>
</template>

<style>
#dialogOuter {
    width: 30%;
    min-width: 450px;
    border: 5px solid orange;
    background-color: black;
    color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 10px;
}
#dialogWindow {
    display: block;
}
#dialogTexts {
    display: flex;
    justify-content: space-between;
    margin: 15px;
}
#dialogClose {
    display: flex;
    justify-content: flex-end;
    margin:10px 10px 0 0;
}
#dialogTitle {
    margin-top:0;
}
</style>

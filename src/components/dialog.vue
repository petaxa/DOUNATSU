<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  msg: String
})

const splitNum = props.msg.indexOf('4. [次回作業予定日]')
const text1 = props.msg.split(0, splitNum - 1)
const text2 = props.msg.split(splitNum)
</script>

<template>
    <div id="dialogOuter">
        <div id="dialogWindow">
            <div id="dialogClose">
                <p>X</p>
            </div>
            <h2 id="dialogTitle">日報</h2>
            <div id="dialogTexts">
                <p>{{text1}}</p>
                <p>{{text2}}</p>
            </div>
        </div>
    </div>
</template>

<style>
#dialogOuter {
    min-width: 450px;
    border: 5px solid #74b1be;
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
#dialogTexts p {
    margin:10px;
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

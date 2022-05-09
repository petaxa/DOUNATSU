<script setup>
// inputの扱いがうまくできない。いつかやりたいなぁ。
const worked = ''
const result = ''
const workType = ''

// const returnAry = [worked]
</script>

<template>
    <div class="form">
        <!--業務内容-->
        <input type="text" v-model="worked" class="form" />
        <!--進捗割合-->
        <input type="number" v-model="result" class="form" />
        <!--テンプレ-->
        <select name="workType" v-model="workType">
            <option value="UT">UT課題</option>
            <option value="none">none</option>
        </select>
    </div>
</template>

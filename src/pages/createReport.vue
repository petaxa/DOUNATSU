<script setup>
// 日報作成画面

import { ref } from 'vue'
import { result, works, projectTxt, workingDate, worksToText } from '../lib/createReportLib.js'
import Dialog from '../components/dialog.vue'
import router from '../router/index.js'

// 日付のフォーマット関数
const yyyymmdd = (date) => {
  // inputのデフォルト用
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}
const slashyyyymmdd = (date) => {
  return date.replace('-', '/')
}
// デフォルト表示
let now = new Date() // 現在年月日
now = yyyymmdd(now)
let tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)// 翌日年月日
tomorrow = yyyymmdd(tomorrow)

// 変数作成
const todayDate = ref(now) // 作業年月日TODO: 日付のフォーマット関数
const nextDate = ref(tomorrow) // 次回作業予定年月日TODO: 日付のフォーマット関数

const todayTimeAry = ref([
  { startTime: '14:00', endTime: '17:00' },
  { startTime: '21:00', endTime: '23:00' }
]) // 今回作業時間配列

const project = ref('') // 作業プロジェクト

const nextTimeAry = ref([
  { startTime: '14:00', endTime: '17:00' },
  { startTime: '21:00', endTime: '23:00' }
]) // 次回作業時間配列
const issueText = ref('') // 備考欄

const msg = ref('') // 本文
const message1 = ref('') // ダイアログ用本文
const message2 = ref('') // ダイアログ用本文
const isClose = ref(true) // ダイアログ非表示フラグ

// 入力内容格納
const todayWorkedAry = ['', '', '', '', ''] // 今回作業内容
const todayResultAry = ['', '', '', '', ''] // 今回作業進捗
const workTypeAry = ['UT', 'UT', 'UT', 'UT'] // 今回作業課題タイプ
const nextWorkedAry = ['', '', '', '', ''] // 次回作業内容
const nextWorkTypeAry = ['UT', 'UT', 'UT', 'UT'] // 次回作業課題タイプ

let todayFormCount = 4 // 今回作業入力フォーム数
let nextFormCount = 4 // 次回作業入力フォーム数
const todayFormCountAry = ref([0, 1, 2, 3]) // 今回作業
const nextFormCountAry = ref([0, 1, 2, 3]) // 次回作業予定

// 作成ボタン押下処理
const clickCreate = () => {
  // 受け取った日付をDate型に
  const nowYYYYMMDD = slashyyyymmdd(todayDate.value) // 現在年月日フォーマット
  const nextYYYYMMDD = slashyyyymmdd(nextDate.value) // 翌日年月日フォーマット
  const DateStart = new Date(todayDate.value) // 作業日時のDate
  const DateNext = new Date(nextYYYYMMDD) // 次回作業予定日のDate
  // 文章作成
  const todayWorkedTextAry = todayWorkedAry.map((el, i) => works(el, workTypeAry[i]))
  const todayResultTextAry = todayResultAry
  const nextWorkedTextAry = nextWorkedAry.map((el, i) => works(el, nextWorkTypeAry[i]))

  // 文章格納
  message1.value = `
        1. [プロジェクト名]${projectTxt(project.value)}<br>
        2. [作業日]${workingDate(nowYYYYMMDD, todayTimeAry.value, DateStart.getDay())}<br>
        3. [作業内容]<br>
        ${worksToText(todayWorkedTextAry, result(todayResultTextAry), 'today')}<br>`
  message2.value = `4. [次回作業予定日]<br>
        ${workingDate(nextYYYYMMDD, nextTimeAry.value, DateNext.getDay())}<br>
        5. [次回作業予定]<br>
        ${worksToText(nextWorkedTextAry, '', 'next')}<br>
        [問題点]<br>
        ${issueText.value}</p>`
  msg.value = `<P>ーーーーーーーーーーーーーーーーー
【日報】<br>
1. [プロジェクト名]${projectTxt(project.value)}
2. [作業日]${workingDate(nowYYYYMMDD, todayTimeAry.value, DateStart.getDay())}
3. [作業内容]
${worksToText(todayWorkedTextAry, result(todayResultTextAry), 'today')}
4. [次回作業予定日]
${workingDate(nextYYYYMMDD, nextTimeAry.value, DateNext.getDay())}
5. [次回作業予定]
${worksToText(nextWorkedTextAry, '', 'next')}
[問題点]
${issueText.value}</p>`
  console.log(msg.value)

  // dialog表示
  isClose.value = false
  // クリップボードにコピー
  // コピー内容を選択する.
  const output = document.getElementById('output')
  setTimeout(async () => {
    await navigator.clipboard.writeText(output.textContent)
    console.log('copied')
  }, 1000)
}

// 閉じるボタン押下時処理
const clickClose = () => {
  isClose.value = true
}

// 戻るボタン押下時処理
const clickBack = () => {
  router.push('/')
}

// 今回作業増加ボタン押下時処理
const clickTodayPlus = () => {
  todayFormCountAry.value.push(todayFormCount)
  todayWorkedAry.push('')
  todayResultAry.push('')
  workTypeAry.push('UT')
  todayFormCount++
}

// 次回作業増加ボタン押下時処理
const clickNextPlus = () => {
  nextFormCountAry.value.push(nextFormCount)
  nextWorkedAry.push('')
  nextWorkTypeAry.push('UT')
  nextFormCount++
}

// 今回作業減少ボタン押下時処理
const clickTodayMin = () => {
  todayFormCountAry.value.pop()
  todayWorkedAry.pop()
  todayResultAry.pop()
  workTypeAry.pop()
  todayFormCount--
}

// 次回作業増加ボタン押下時処理
const clickNextMin = () => {
  nextFormCountAry.value.pop()
  nextWorkedAry.pop()
  nextWorkTypeAry.pop()
  nextFormCount--
}

// 作業時間入力フォーム増減処理

// 今回増加
const clickTodayTimePlus = () => {
  todayTimeAry.value.push({ startTime: '', endTime: '' })
}
// 今回減少
const clickTodayTimeMin = () => {
  todayTimeAry.value.pop()
}

// 次回増加
const clickNextTimePlus = () => {
  nextTimeAry.value.push({ startTime: '', endTime: '' })
}

// 次回減少
const clickNextTimeMin = () => {
  nextTimeAry.value.pop()
}

</script>
<template>
    <div id="createReport">
        <div id="inputArea">
            <div class="today">
                <div id="workedDate">
                    <div id="date-input">
                        <input type="date" v-model="todayDate" class="date" />
                        <input type="project" v-model="project" placeholder="OPAL" class="project" />
                    </div>
                    <div class="button">
                        <button id="TimePlus" class="formButton" @click="clickTodayTimePlus">+</button>
                        <button id="TimeMin" class="formButton" @click="clickTodayTimeMin">-</button>
                    </div>
                    <div v-for="i of todayTimeAry" :key="i">
                        <input type="time" v-model="i.startTime" class="time" />
                        <input type="time" v-model="i.endTime" class="time" />
                    </div>
                    <div class="button">
                        <button id="workedPlus" class="formButton" @click="clickTodayPlus">+</button>
                        <button id="workedMin" class="formButton" @click="clickTodayMin">-</button>
                    </div>
                </div>
                <div id="workedList">
                    <div class="form" v-for="item of todayFormCountAry" :key="item">
                        <input type="text" v-model="todayWorkedAry[item]" class="work" />
                        <input type="number" v-model="todayResultAry[item]" class="result" />
                        <select name="workType" v-model="workTypeAry[item]" class="workType">
                            <option value="UT">UT課題</option>
                            <option value="none">none</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="next">
                <div id="willDate">
                    <input type="date" v-model="nextDate" class="date" />
                </div>
                <div class="button">
                    <button id="TimePlus" class="formButton" @click="clickNextTimePlus">+</button>
                    <button id="TimeMin" class="formButton" @click="clickNextTimeMin">-</button>
                </div>
                <div v-for="i of nextTimeAry" :key="i">
                    <input type="time" v-model="i.startTime" class="time" />
                    <input type="time" v-model="i.endTime" class="time" />
                </div>
                <div id="willList">
                    <div>
                        <button id="nextPlus" class="formButton" @click="clickNextPlus">+</button>
                        <button id="nextMin" class="formButton" @click="clickNextMin">-</button>
                    </div>
                    <div id="nextForm-1" class="form" v-for="item of nextFormCountAry" :key="item">
                        <input type="text" v-model="nextWorkedAry[item]" class="work" />
                        <select name="workType" v-model="nextWorkTypeAry[item]" class="workType">
                            <option value="UT">UT課題</option>
                            <option value="none">none</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div id="endContents">
            <div id="issue">
                <textarea type="text" v-model="issueText" class="issue"></textarea>
            </div>
            <div>
                <button id="create" @click="clickCreate" class="finButton">作成</button>
                <button @click="clickBack" class="finButton">戻る</button>
            </div>
        </div>
    </div>
    <div v-if="!isClose" id="dialogDisplay" @click="clickClose">
        <Dialog :text1="message1" :text2="message2"></Dialog>
    </div>
    <p id="output" v-html="msg"></p>
</template>
<style>
#dialogDisplay {
    height: 50%;
    width: 100%;
    min-width: 450px;
}

#output {
    display: none;
}

input,
select,
button,
textarea {
    border-radius: 5px;
    border: 1px solid orange;
    color: white;
    background-color: black;
    height: 25px;
}

.date {
    /* 日付 */
    width: 120px;
    margin-right: 5px;
}

.time {
    /* 時間 */
    width: 65px;
    margin-right: 5px;
}

.project {
    /* プロジェクト名 */
    width: 80px;
}

.work {
    /* 課題内容 */
    width: 200px;
    margin-right: 15px;
}

.result {
    /* 進捗 */
    width: 60px;
    margin-right: 10px;
}

.workType {
    width: 70px;
}

.finButton {
    /* 作成、戻るボタン */
    width: 60px;
    margin: 20px;
}

.formButton {
    /* フォーム増減ボタン */
    width: 40px;
    margin: 10px;
}

.issue {
    width: 400px;
    height: 60px;
    margin-top: 10px;
}

.form {
    margin-top: 5px;
}

#inputArea {
    display: flex;
    justify-content: space-between;
}

#createReport {
    margin: 10px;
}
</style>

<script setup lang="ts">
// 日報作成画面

import { ref } from 'vue'
import { result, works, worksObject, createBodyStr, omitStr } from '../lib/createReportLib'
import Dialog from '../components/dialog.vue'
import router from '../router/index'
import { getWorkedAry, setLocalStorage } from '@/lib/localStorage'

/**
 * 日付を表示用にフォーマット
 * @param date フォーマットする日付のDate
 * @retunr YYYY-MM-DD
 */
const yyyymmdd = (date: Date) => {
  // inputのデフォルト用
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

/**
 * 日付を本文用にフォーマット
 * @param date フォーマットする日付 YYYY-MM-DDの形式
 * @return YYYY/MM/DD
 */
const slashyyyymmdd = (date: string) => {
  return date.replace(/-/g, '/')
}
// デフォルト表示
// 現在年月日
const nowDate = new Date()
const now = yyyymmdd(nowDate)
const tomorrowDate = new Date()
// 翌日年月日
tomorrowDate.setDate(nowDate.getDate() + 1)
const tomorrow = yyyymmdd(tomorrowDate)

// 変数作成
const todayDate = ref(now) // 作業年月日TODO: 日付のフォーマット関数
const nextDate = ref(tomorrow) // 次回作業予定年月日TODO: 日付のフォーマット関数

// 今回作業時間配列
const todayTimeAry = ref([
  { startTime: '11:00', endTime: '17:00' },
  { startTime: '21:00', endTime: '23:00' }
])

const project = ref('') // 作業プロジェクト

// 次回作業時間配列
const nextTimeAry = ref([
  { startTime: '11:00', endTime: '17:00' },
  { startTime: '21:00', endTime: '23:00' }
])
const issueText = ref('') // 備考欄

const msg = ref('') // 本文
const DialogMsg = ref('') // ダイアログ表示用本文
const isClose = ref(true) // ダイアログ非表示フラグ

// 入力内容格納
// localStorageの業務開始内容を初期値とする
const willWorkAry = getWorkedAry('willWorkAry')
const todayWorkedAry = willWorkAry ? ref(willWorkAry) : ref(['', '', '', '']) // 今回作業内容
const todayResultAry = ref(['', '', '', '']) // 今回作業進捗
const workTypeAry = ref(['none', 'none', 'none', 'none']) // 今回作業課題タイプ
const workDetailAry = ref(['', '', '', '']) // 今回作業内容詳細
const nextWorkedAry = ref(['', '', '', '']) // 次回作業内容
const nextWorkTypeAry = ref(['none', 'none', 'none', 'none']) // 次回作業課題タイプ
const NextworkDetailAry = ref(['', '', '', '']) // 次回作業内容詳細

// 複数の入力項目をv-forで処理するときのindexとなる。
let todayFormCount = 4 // 今回作業入力フォーム数
let nextFormCount = 4 // 次回作業入力フォーム数
const todayFormCountAry = ref([0, 1, 2, 3]) // 今回作業
const nextFormCountAry = ref([0, 1, 2, 3]) // 次回作業予定

// 作成ボタン押下処理
const clickCreateBtn = () => {
  // 受け取った日付をDate型に
  const nowYYYYMMDD = slashyyyymmdd(todayDate.value) // 現在年月日フォーマット
  const nextYYYYMMDD = slashyyyymmdd(nextDate.value) // 翌日年月日フォーマット
  const DateStart = new Date(todayDate.value) // 作業日時のDate
  const DateNext = new Date(nextYYYYMMDD) // 次回作業予定日のDate

  // localStorageの業務開始文言作成時の作業内容を初期値とする
  setLocalStorage('nextWorkedAry', nextWorkedAry.value.filter(v => v !== ''))

  // 文章作成
  const todayResultTextAry = result(todayResultAry.value)
  const todayWorksTextAry: worksObject[] = todayFormCountAry.value.map((v, index) => {
    return {
      works: works(todayWorkedAry.value[index], workTypeAry.value[index]),
      result: todayResultTextAry[index],
      detail: workDetailAry.value[index]
    }
  })
  const nextWorksTextAry: worksObject[] = nextFormCountAry.value.map((v, index) => {
    return {
      works: works(nextWorkedAry.value[index], nextWorkTypeAry.value[index]),
      detail: NextworkDetailAry.value[index]
    }
  })

  // 文章格納
  msg.value = createBodyStr(
    project.value,
    nowYYYYMMDD,
    todayTimeAry.value,
    DateStart.getDay(),
    todayWorksTextAry,
    nextYYYYMMDD,
    nextTimeAry.value,
    DateNext.getDay(),
    nextWorksTextAry,
    issueText.value
  )
  console.log(msg.value)

  console.log(todayWorksTextAry)
  DialogMsg.value = createBodyStr(
    project.value,
    nowYYYYMMDD,
    todayTimeAry.value,
    DateStart.getDay(),
    todayWorksTextAry.map(work => {
      const msg = omitStr(work.detail)
      return {
        works: work.works,
        result: work.result,
        detail: msg
      }
    }),
    nextYYYYMMDD,
    nextTimeAry.value,
    DateNext.getDay(),
    nextWorksTextAry.map(work => {
      const msg = omitStr(work.detail)
      return {
        works: work.works,
        result: work.result,
        detail: msg
      }
    }),
    issueText.value
  )

  // dialog表示
  isClose.value = false
  // クリップボードにコピー
  // コピー内容を選択する.
  const output = document.getElementById('output')
  setTimeout(async () => {
    // textContntからじゃないとコピーが上手くいかない。
    await navigator.clipboard.writeText(output?.textContent ?? 'can not be copied')
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

// クリアボタン押下処理
const clickClear = () => {
  // それぞれの入力欄を数は変えずに空にする
  const clearInputs = [todayWorkedAry.value, todayResultAry.value, workDetailAry.value, nextWorkedAry.value, NextworkDetailAry.value]
  clearInputs.forEach(ary => {
    ary.forEach((w, index) => {
      ary[index] = ''
    })
  })
  // UTをセットする配列たち
  const setUTArys = [nextWorkTypeAry.value, workTypeAry.value]
  setUTArys.forEach(ary => {
    ary.forEach((w, index) => {
      ary[index] = 'none'
    })
  })

  // 備考欄をクリア
  issueText.value = ''

  // 日付を現在日時に変更
  const nowDate = new Date()
  const tomorrowDate = new Date()
  tomorrowDate.setDate(nowDate.getDate() + 1)
  todayDate.value = yyyymmdd(nowDate)
  nextDate.value = yyyymmdd(tomorrowDate)

  // 作業時間をクリア
  todayTimeAry.value = [
    { startTime: '11:00', endTime: '17:00' },
    { startTime: '21:00', endTime: '23:00' }
  ]
  nextTimeAry.value = [
    { startTime: '11:00', endTime: '17:00' },
    { startTime: '21:00', endTime: '23:00' }
  ]
}

// 作業内容入力フォーム増減処理
// 今回増加
const clickTodayPlus = () => {
  todayFormCountAry.value.push(todayFormCount)
  todayWorkedAry.value.push('')
  todayResultAry.value.push('')
  workTypeAry.value.push('none')
  workDetailAry.value.push('')
  todayFormCount++
}

// 次回増加
const clickNextPlus = () => {
  nextFormCountAry.value.push(nextFormCount)
  nextWorkedAry.value.push('')
  nextWorkTypeAry.value.push('none')
  NextworkDetailAry.value.push('')
  nextFormCount++
}

// 今回減少
const clickTodayMin = () => {
  todayFormCountAry.value.pop()
  todayWorkedAry.value.pop()
  todayResultAry.value.pop()
  workTypeAry.value.pop()
  workDetailAry.value.pop()
  todayFormCount--
}

// 次回増加
const clickNextMin = () => {
  nextFormCountAry.value.pop()
  nextWorkedAry.value.pop()
  nextWorkTypeAry.value.pop()
  NextworkDetailAry.value.pop()
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
    <div style="height:3px"></div>
    <div class="back-button">
      <button @click="clickBack" class="close icon"></button>
    </div>
    <div id="inputArea">
      <div class="today">
        <p>1.プロジェクト名 <input type="project" v-model="project" placeholder="OPAL" class="project" /></p>
        <div id="workedDate">
          <div class="button">
            <span>2.作業日</span>
            <button id="TimePlus" class="formButton" @click="clickTodayTimePlus">+</button>
            <button id="TimeMin" class="formButton" @click="clickTodayTimeMin">-</button>
          </div>
          <input type="date" v-model="todayDate" class="date" />
          <div v-for="(i, index) of todayTimeAry" :key="index">
            <p>
              <input type="time" v-model="i.startTime" class="time" />
              <span> ~ </span>
              <input type="time" v-model="i.endTime" class="time" />
            </p>
          </div>
          <div class="button">
            <span>3.作業内容</span>
            <button id="workedPlus" class="formButton" @click="clickTodayPlus">+</button>
            <button id="workedMin" class="formButton" @click="clickTodayMin">-</button>
          </div>
        </div>
        <div id="workedList">
          <div class="form" v-for="(item, index) of todayFormCountAry" :key="index">
            <span>{{ `3-${index + 1}.` }}<input type="text" v-model="todayWorkedAry[item]" class="work" /></span>
            <input type="number" v-model="todayResultAry[item]" class="result" />
            <select name="workType" v-model="workTypeAry[item]" class="workType">
              <option value="UT">UT課題</option>
              <option value="none">none</option>
            </select>
            <textarea v-model="workDetailAry[item]" cols="30" rows="10"
              style="display: block; height:fit-content; width:100%;"></textarea>
          </div>
        </div>
      </div>

      <div class="next">
        <div class="button">
          <span>4.次回作業予定日</span>
          <button id="TimePlus" class="formButton" @click="clickNextTimePlus">+</button>
          <button id="TimeMin" class="formButton" @click="clickNextTimeMin">-</button>
        </div>
        <input type="date" v-model="nextDate" class="date" />
        <div v-for="(i, index) of nextTimeAry" :key="index">
          <p>
            <input type="time" v-model="i.startTime" class="time" />
            <span> ~ </span>
            <input type="time" v-model="i.endTime" class="time" />
          </p>
        </div>
        <div id="willList">
          <div>
            <span>5.次回作業予定</span>
            <button id="nextPlus" class="formButton" @click="clickNextPlus">+</button>
            <button id="nextMin" class="formButton" @click="clickNextMin">-</button>
          </div>
          <div class="form" v-for="(item, index) of nextFormCountAry" :key="index">
            <span>{{ `5-${index + 1}. ` }}<input type="text" v-model="nextWorkedAry[item]" class="work" /></span>
            <select name="workType" v-model="nextWorkTypeAry[item]" class="workType">
              <option value="UT">UT課題</option>
              <option value="none">none</option>
            </select>
            <textarea v-model="NextworkDetailAry[item]" cols="30" rows="10"
              style="display: block; height:fit-content; width:100%;"></textarea>
          </div>
        </div>
      </div>

      <div id="endContents">
        <div id="issue">
          <textarea type="text" v-model="issueText" class="issue" style="height:250px;"></textarea>
        </div>
        <div>
          <button id="create" @click="clickCreateBtn" class="finButton">作成</button>
          <button @click="clickClear" class="finButton">クリア</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!isClose" id="dialogDisplay" @click="clickClose">
    <Dialog :msg="DialogMsg"></Dialog>
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
  border: 1px solid #74b1be;
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
  margin-bottom: 15px;
}

#inputArea {
  display: flex;
  justify-content: space-between;
}

#createReport {
  margin: 10px 40px;
}

.next {
  margin-top: 25px;
}

#endContents {
  text-align: center;
}

.back-button {
  height: 40px;
  display: flex;
  flex-direction: row-reverse;
}
</style>

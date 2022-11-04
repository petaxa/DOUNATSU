<script setup lang="ts">
// 日報作成画面

import { ref } from 'vue'
import { result, works, worksObject, createBodyStr, omitStr } from '../lib/createReportLib'
import Dialog from '../components/dialog.vue'
import router from '../router/index'
import { getSetting, getWorkedAry, setWorkedAry } from '@/lib/localStorage'

// フォーマット関数
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

// 現在年月日 Date
const nowDate = new Date()
const tomorrowDate = new Date()
// 翌日年月日 Date
tomorrowDate.setDate(nowDate.getDate() + 1)

/** 現在年月日 yyyy-mm-dd */
const todayDate = ref(yyyymmdd(nowDate)) // 作業年月日TODO: 日付のフォーマット関数
/** 翌日年月日 yyyy-mm-dd */
const nextDate = ref(yyyymmdd(tomorrowDate)) // 次回作業予定年月日TODO: 日付のフォーマット関数

/** 今回作業プロジェクト */
const project = ref('')

/**
 * 今回作業時間配列
 * [{開始時間, 終了時間}, {}...]
 */
const todayTimeAry = ref([
  { startTime: '11:00', endTime: '17:00' },
  { startTime: '21:00', endTime: '23:00' }
])

/**
 * 次回作業時間配列
 * [{開始時間, 終了時間}, {}...]
 */
const nextTimeAry = ref([
  { startTime: '11:00', endTime: '17:00' },
  { startTime: '21:00', endTime: '23:00' }
])

/** 問題点 */
const issueText = ref('')

/** 本文 */
const msg = ref('')

/** ダイアログ表示用本文 省略処理済み */
const DialogMsg = ref('')

// ダイアログ非表示フラグ
const isClose = ref(true)

// 入力内容
// localStorageの業務開始内容
const willWorkAry = getWorkedAry('willWorkAry')
// 作業内容自動入力設定取得
const isAutocomplete = !!getSetting('isAutocomplete') // null回避
console.log(isAutocomplete)

/** 今回作業内容 */
const todayWorkedAry = willWorkAry && isAutocomplete ? ref(willWorkAry) : ref(['', '', '', ''])
/** 今回作業進捗 */
const todayResultAry = ref(['', '', '', ''])
/** 今回作業課題タイプ */
const workTypeAry = ref(['none', 'none', 'none', 'none'])
/** 今回作業内容詳細 */
const workDetailAry = ref(['', '', '', ''])

/** 次回作業内容 */
const nextWorkedAry = ref(['', '', '', ''])
/** 次回作業課題タイプ */
const nextWorkTypeAry = ref(['none', 'none', 'none', 'none'])
/** 次回作業内容詳細 */
const NextworkDetailAry = ref(['', '', '', ''])

// 複数の入力項目をv-forで処理するときのindexとなる。
/** 今回作業入力フォーム数 */
let todayFormCount = 4
/** 次回作業入力フォーム数 */
let nextFormCount = 4

/** 表示中入力欄 -今回作業 */
const todayFormCountAry = ref([0, 1, 2, 3])
/** 表示中入力欄 -次回作業予定 */
const nextFormCountAry = ref([0, 1, 2, 3])

/**
 * 作成ボタン押下処理
 */
const clickCreateBtn = () => {
  // 受け取った日付をDate型に
  const nowYYYYMMDD = slashyyyymmdd(todayDate.value) // 現在年月日フォーマット
  const nextYYYYMMDD = slashyyyymmdd(nextDate.value) // 翌日年月日フォーマット
  const DateStart = new Date(todayDate.value) // 作業日時のDate
  const DateNext = new Date(nextYYYYMMDD) // 次回作業予定日のDate

  // localStorageに次回作業予定を保存
  setWorkedAry('nextWorkedAry', nextWorkedAry.value.filter(v => v !== ''))

  // 文章作成
  // 今回作業進捗
  const todayResultTextAry = result(todayResultAry.value)
  /**
   * 今回作業データ配列
   * [{作業内容, 作業進捗, 作業詳細}, {}...]
   */
  const todayWorksTextAry: worksObject[] = todayFormCountAry.value.map((v, index) => {
    return {
      works: works(todayWorkedAry.value[index], workTypeAry.value[index]),
      result: todayResultTextAry[index],
      detail: workDetailAry.value[index]
    }
  })

  /**
   * 次回作業予定データ配列
   * [{作業内容, 作業詳細}, {}...]
   */
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

  // 画面表示用
  DialogMsg.value = createBodyStr(
    project.value,
    nowYYYYMMDD,
    todayTimeAry.value,
    DateStart.getDay(),
    // 省略処理
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
    omitStr(issueText.value)
  )

  // dialog表示
  isClose.value = false

  // クリップボードにコピー
  const output = document.getElementById('output')
  setTimeout(async () => {
    // textContntからじゃないとコピーが上手くいかない。
    await navigator.clipboard.writeText(output?.textContent ?? 'can not be copied')
    console.log('copied')
  }, 1000)
}

// ダイアログクローズ処理
const clickClose = () => {
  isClose.value = true
}

// ホームへ戻る
const clickBack = () => {
  router.push('/')
}

/**
 * クリアボタン押下処理
 * 入力欄を全て空に。課題タイプ、日時は初期値を格納
 * localStorageのwillWorkAryをクリア
 */
const clickClear = () => {
  // 備考欄をクリア
  issueText.value = ''
  // それぞれの入力欄を数は変えずに空にする
  const clearInputs = [todayWorkedAry.value, todayResultAry.value, workDetailAry.value, nextWorkedAry.value, NextworkDetailAry.value]
  clearInputs.forEach(ary => {
    ary.forEach((w, index) => {
      ary[index] = ''
    })
  })
  // 課題タイプのセット
  const setWorkTypeArys = [nextWorkTypeAry.value, workTypeAry.value]
  setWorkTypeArys.forEach(ary => {
    ary.forEach((w, index) => {
      ary[index] = 'none'
    })
  })

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

  // localStorageのwillWorkAryをクリア
  setWorkedAry('willWorkAry', ['', '', '', ''])
}

// 作業内容入力フォーム増減処理
/** 今回作業入力フォーム増加 */
const clickTodayPlus = () => {
  todayFormCountAry.value.push(todayFormCount) // 表示中入力欄 -今回作業
  todayWorkedAry.value.push('') // 今回作業内容
  todayResultAry.value.push('') // 今回作業進捗
  workTypeAry.value.push('none') // 今回作業課題タイプ
  workDetailAry.value.push('') // 今回作業内容詳細
  todayFormCount++
}

/** 今回作業入力フォーム減少 */
const clickTodayMin = () => {
  todayFormCountAry.value.pop() // 表示中入力欄 -今回作業
  todayWorkedAry.value.pop() // 今回作業内容
  todayResultAry.value.pop() // 今回作業進捗
  workTypeAry.value.pop() // 今回作業課題タイプ
  workDetailAry.value.pop() // 今回作業内容詳細
  todayFormCount--
}

/** 次回作業入力フォーム増加 */
const clickNextPlus = () => {
  nextFormCountAry.value.push(nextFormCount) // 表示中入力欄 -次回作業予定
  nextWorkedAry.value.push('') // 次回作業内容
  nextWorkTypeAry.value.push('none') // 次回作業課題タイプ
  NextworkDetailAry.value.push('') // 次回作業内容詳細
  nextFormCount++
}

/** 次回作業入力フォーム減少 */
const clickNextMin = () => {
  nextFormCountAry.value.pop() // 表示中入力欄 -次回作業予定
  nextWorkedAry.value.pop()// 次回作業内容
  nextWorkTypeAry.value.pop()// 次回作業課題タイプ
  NextworkDetailAry.value.pop()// 次回作業内容詳細
  nextFormCount--
}

// 作業時間入力フォーム増減処理
/** 今回作業時間入力フォーム増加 */
const clickTodayTimePlus = () => {
  todayTimeAry.value.push({ startTime: '', endTime: '' })
}

/** 今回作業時間入力フォーム減少 */
const clickTodayTimeMin = () => {
  todayTimeAry.value.pop()
}

/** 次回作業時間入力フォーム増加 */
const clickNextTimePlus = () => {
  nextTimeAry.value.push({ startTime: '', endTime: '' })
}

/** 次回作業時間入力フォーム減少 */
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
<style scoped>
#dialogDisplay {
  height: 50px;
  width: 100px;
  min-width: 450px;
}

#output {
  display: none;
}

.project {
  /* プロジェクト名 */
  width: 80px;
}

.result {
  /* 進捗 */
  width: 60px;
  margin-right: 10px;
}

.workType {
  width: 70px;
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

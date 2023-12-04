/**
 * 進捗割合配列からそれぞれを文章に成型して返却
 * 配列で返る
 * @param ary 進捗割合配列
 * @return 進捗本文配列
 */
export const result = (ary: string[]) => {
  const newAry = ary.map(el => {
    if (el === '90') return '90%(確認待ち)'
    else if (el !== '') return `${el}%`
    else return ''
  })
  return newAry
}

/**
 * 作業内容をプルダウンの結果によって成型
 * @param work 作業内容
 * @param select 作業種別 プルダウンの指定内容
 * @return 作業内容本文
 */
export const works = (work = '', select = ''):string => {
  let worksText = ''
  // TODO: 空白の場合は0だとダメじゃない？もし「0」という名前の課題が来たらバグる
  if (work === '') return '0'

  if (select === 'UT') worksText = `UT課題No.${work}`
  else worksText = work

  return worksText
}

export interface worksObject {
  works: string
  result?: string
  detail: string
}
/**
 * 作業内容を文章に成型
 * @param works 作業内容配列
 * @param isTodaysWork 今回作業、次回作業を指定 true: 今回 false: 次回
 * @return 作業内容本文
 */
export const worksToText = (works: worksObject[], isTodaysWork: boolean): string => {
  let text = ''
  if (isTodaysWork) {
    // 今回作業内容の場合
    works.forEach((wk, index) => {
      if (wk.works === '0') return
      text += `3 - ${index + 1}. ${wk.works}
${wk.result ? `→${wk.result}` : ''}
${wk.detail}

`
    })
  } else if (!isTodaysWork) {
    // 次回作業内容の場合
    works.forEach((wk, index) => {
      if (wk.works === '0') return
      text += `5 - ${index + 1}. ${wk.works}
${wk.detail}

`
    })
  }
  return text
}

/**
 * 作業日時テキストを生成
 * YYYY/MM/DD (aaa) hh:mm ~ hh:mm
 * @param date 日付 YYYY/MM/DDで利用している
 * @param timeAry 作業時間配列
 * @param week 曜日番号 Date.getDay()を利用
 * @return 作業日時テキスト
 */
export const workingDate = (date: string, timeAry: {startTime: string, endTime: string}[], week: number) => {
  const weekStr = ['日', '月', '火', '水', '木', '金', '土'] // 曜日配列
  let timeTxt = '' // 作業時間文章
  for (let i = 0; i < timeAry.length; i++) {
    timeTxt += `${timeAry[i].startTime} ~ ${timeAry[i].endTime} `
  }
  return `${date} (${weekStr[week]}) ${timeTxt}`
}

// 本文成型
/**
 * 本文成型
 * テンプレートに与えられた情報を格納する
 * @param project プロジェクト名
 * @param nowYYYYMMDD 今回作業年月日
 * @param todayTimeAry 今回作業時間オブジェクト {開始時間, 終了時間}
 * @param todaysDate 今回作業日の曜日 Date.getDay()の数字
 * @param todayWorksTextAry 今回作業データ配列 [{作業内容, 作業進捗, 作業詳細}, {}...]
 * @param nextYYYYMMDD 次回作業予定年月日
 * @param nextTimeAry 次回作業予定時間オブジェクト {開始時間, 終了時間}
 * @param nextDate 次回作業予定日の曜日 Date.getDay()の数字
 * @param nextWorksTextAry 次回作業データ配列 [{作業内容, 作業詳細}, {}...]
 * @param issueText 問題点
 * @returns 成型済み本文
 */
export const createBodyStr = (
  project: string,
  nowYYYYMMDD: string,
  todayTimeAry: { startTime: string, endTime: string}[],
  todaysDate: number,
  todayWorksTextAry: worksObject[],
  nextYYYYMMDD: string,
  nextTimeAry: { startTime: string, endTime: string}[],
  nextDate: number,
  nextWorksTextAry: worksObject[],
  issueText: string
) => {
  return `ーーーーーーーーーーーーーーーーー
  【日報】
  1. [プロジェクト名]${project === '' ? '' : project}

  2. [作業日]${workingDate(nowYYYYMMDD, todayTimeAry, todaysDate)}

  3. [作業内容]
  ${worksToText(todayWorksTextAry, true)}

  4. [次回作業予定日]
  ${workingDate(nextYYYYMMDD, nextTimeAry, nextDate)}

  5. [次回作業予定]
  ${worksToText(nextWorksTextAry, false)}

  [問題点]
  ${issueText}`
}

/**
 * 文字列省略処理
 * ${omitNum}文字以降は"..."に省略
 * @param str 省略処理文字列
 * @returns 処理済み文字列
 */
export const omitStr = (str: string) => {
  console.log(typeof str)
  const omitNum = 30
  if (String(str).length > omitNum) return `${str.substring(0, omitNum)}...`
  return str
}

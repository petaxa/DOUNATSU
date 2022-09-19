// 進捗割合関数
export const result = (ary) => {
  const newAry = ary.map(el => {
    if (el === 90) return '90%(確認待ち)'
    else if (el !== '') return `${el}%`
    else return ''
  })
  return newAry
}

// 作業内容成型関数
// 入れた値をselectの指定通りに成型して返す
export const works = (arg = '', select = '') => {
  let worksText = ''
  if (arg === '') return 0

  if (select === 'UT') worksText = `UT課題No.${arg}`
  else worksText = arg

  return worksText
}
// 内容と結果の配列を入れて文章に成型
export const worksToText = (works, rslt, detail, when) => {
  let text = ''
  if (when === 'today') {
    works.forEach((wk, index) => {
      if (wk === 0) return
      text += `3 - ${index + 1}. ${wk}
→${rslt[index]}
${detail[index]}

`
    })
  } else if (when === 'next') {
    works.forEach((wk, index) => {
      if (wk === 0) return
      text += `5 - ${index + 1}. ${works[index]}
${detail[index]}

`
    })
  }
  return text
}
// 作業日時関数
export const workingDate = (date, timeAry, week) => {
  const weekStr = ['日', '月', '火', '水', '木', '金', '土'] // 曜日配列
  let timeTxt = '' // 作業時間文章
  for (let i = 0; i < timeAry.length; i++) {
    timeTxt += `${timeAry[i].startTime} ~ ${timeAry[i].endTime} `
  }
  return `${date} (${weekStr[week]}) ${timeTxt}`
}
// プロジェクトテキスト生成関数
export const projectTxt = (project) => {
  if (project === '') {
    return 'OPAL'
  } else {
    return project
  }
}

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
export const worksToText = (wk, rslt, when) => {
  let text = ''
  if (when === 'today') {
    for (let i = 0; i < wk.length; i++) {
      if (wk[i] === 0) {
        text += ''
      } else {
        text += `${wk[i]}<br>
→${rslt[i]}<br>
`
      }
    }
  } else if (when === 'next') {
    for (let i = 0; i < wk.length; i++) {
      if (wk[i] === 0) {
        text += ''
      } else {
        text += `${wk[i]}<br>
`
      }
    }
  }
  return text
}
// 作業日時関数
export const workingDate = (date, start, end, week) => {
  // console.log(date)
  // console.log(start)
  // console.log(end)
  // console.log(week)
  const weekStr = ['日', '月', '火', '水', '木', '金', '土']
  return `${date} (${weekStr[week]}) ${start}~${end}`
}
// プロジェクトテキスト生成関数
export const projectTxt = (project) => {
  if (project === '') {
    return 'OPAL'
  } else {
    return project
  }
}

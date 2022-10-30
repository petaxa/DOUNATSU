type workedAryKeys = 'willWorkAry' | 'nextWorkedAry'
type settingKeys = 'isAutocomplete' | 'isLight' | 'inputNum'
/**
 * 任意のkeyでlocalStorageにデータをセット
 * @param key 型に登録した文字列 willWorkAry: 業務開始文言作成時の作業内容, nextWortkedAry: 日報作成時の次回業務内容
 * @param setData セットしたいデータ
 */
export const setWorkedAry = (key: workedAryKeys, setData: string[]) => {
  localStorage.setItem(key, JSON.stringify(setData))
}

/**
 * 任意のkeyでlocalStorageに格納されているデータを取り出す
 * @param key 型に登録した文字列 willWorkAry: 業務開始文言作成時の作業内容, nextWortkedAry: 日報作成時の次回業務内容
 * @returns 登録データのオブジェクトまたはnull
 */
export const getWorkedAry = (key: workedAryKeys): string[]|null => {
  const storageData = localStorage.getItem(key) ?? ''
  // localStorageにデータがある場合はそのデータのオブジェクト型、ない場合はnull
  return storageData ? JSON.parse(storageData) : null
}

export const setSetting = (key: settingKeys, setData: boolean | number) => {
  localStorage.setItem(key, String(setData))
}

export const getSetting = (key: settingKeys) => {
  const data = localStorage.getItem(key)
  if (key === 'isAutocomplete' || key === 'isLight') {
    return data ? Boolean(data) : false
  } else if (key === 'inputNum') {
    return data ? Number(data) : 0
  }
}

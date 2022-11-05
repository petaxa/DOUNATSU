type workedAryKeys = 'willWorkAry' | 'nextWorkedAry'
type workedTimeAryKeys = 'workTimeAry' | 'nextTimeAry'
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
export const getWorkedAry = (key: workedAryKeys): string[] | null => {
  const storageData = localStorage.getItem(key) ?? ''
  // localStorageにデータがある場合はそのデータのオブジェクト型、ない場合はnull
  return storageData ? JSON.parse(storageData) : null
}

/**
 * 任意のkeyでlocalStorageにデータをセット
 * @param key 型に登録した文字列 workTimeAry: 業務開始文言作成時の作業時間, nextTimeAry: 日報作成時の次回作業時間
 * @param setData セットしたいデータ
 */
export const setWorkedTimeAry = (key: workedTimeAryKeys, setData: { startTime: string, endTime: string }[]) => {
  localStorage.setItem(key, JSON.stringify(setData))
}

/**
 * 任意のkeyでlocalStorageに格納されているデータを取り出す
 * @param key 型に登録した文字列 workTimeAry: 業務開始文言作成時の作業時間, nextTimeAry: 日報作成時の次回作業時間
 * @returns 登録データのオブジェクトまたはnull
 */
export const getWorkedTimeAry = (key: workedTimeAryKeys): { startTime: string, endTime: string }[] | null => {
  const storageData = localStorage.getItem(key) ?? ''
  // localStorageにデータがある場合はそのデータのオブジェクト型、ない場合はnull
  return storageData ? JSON.parse(storageData) : null
}

/**
 * 設定に関するデータをlocalStorageに保存
 * @param key 型に登録した文字列 isAutocomplete: 作業内容自動入力, isLight: ライトテーマ, inputNum: 作業内容デフォルト個数
 * @param setData セットする値
 */
export const setSetting = (key: settingKeys, setData: boolean | number) => {
  localStorage.setItem(key, String(setData))
}

// string → booleanの変換関数
const toBoolean = (boolStr: string) => {
  return boolStr.toLowerCase() === 'true'
}

/**
 * 設定に関するデータをlocalStorageから取得
 * @param key 型に登録した文字列 isAutocomplete: 作業内容自動入力, isLight: ライトテーマ, inputNum: 作業内容デフォルト個数
 * @return データがない場合、型ごとに初期値が返るようになっている
 */
export const getSetting = (key: settingKeys) => {
  const data = localStorage.getItem(key)
  if (key === 'isAutocomplete' || key === 'isLight') {
    return data !== null ? toBoolean(data) : false
  } else if (key === 'inputNum') {
    return data ? Number(data) : 0
  }
}

type localStorageKey = 'willWorkAry' | 'nextWorkedAry'

/**
 * 任意のkeyでlocalStorageにデータをセット
 * @param key 型に登録した文字列 willWorkAry: 業務開始文言作成時の作業内容, nextWortkedAry: 日報作成時の次回業務内容
 * @param setData セットしたいデータ
 */
export const setLocalStorage = (key: localStorageKey, setData: string[]) => {
  localStorage.setItem(key, JSON.stringify(setData))
}

/**
 * 任意のkeyでlocalStorageに格納されているデータを取り出す
 * @param key 型に登録した文字列 willWorkAry: 業務開始文言作成時の作業内容, nextWortkedAry: 日報作成時の次回業務内容
 * @returns 登録データのオブジェクトまたはnull
 */
export const getWorkedAry = (key: localStorageKey): string[]|null => {
  const storageData = localStorage.getItem(key) ?? ''
  // localStorageにデータがある場合はそのデータのオブジェクト型、ない場合はnull
  return storageData ? JSON.parse(storageData) : null
}

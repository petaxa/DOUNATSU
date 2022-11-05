/**
 * await利用のsetTimeOut
 * @param second 秒数
 * @returns Promise
 */
export const delay = (second: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, second * 1000)
  })
}
